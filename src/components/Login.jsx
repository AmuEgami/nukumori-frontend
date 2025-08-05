import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_aA4DL452b',
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('ログイン成功:', result);
        const idToken = result.getIdToken().decodePayload();
        const userId = idToken.sub;

        // プロフィールの存在チェック
        fetch(`http://localhost:8080/api/profile/${userId}`)
          .then((res) => {
            if (res.status === 404) {
              // プロフィール未登録→プロフィール登録画面へ
              navigate('/setup');

            } else if (res.ok) {
              // プロフィール登録済み→ホームへ
              navigate('/home');
            } else {
              console.error('プロフィール取得に失敗しました');
              setErrorMsg('ログイン後の処理でエラーが発生しました');
            }
          })
          .catch((err) => {
            console.error('プロフィール確認エラー:', err);
            setErrorMsg('ログイン後の通信に失敗しました');
          });
      },
      onFailure: (err) => {
        console.error('ログイン失敗:', err);
        if (err.code === 'UserNotFoundException') {
          setErrorMsg('登録されていないユーザーです。');
        } else if (err.code === 'NotAuthorizedException') {
          setErrorMsg('パスワードが間違っています。');
        } else {
          setErrorMsg('ログインに失敗しました。');
        }
      },
    });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-top bg-no-repeat sm:bg-top bg-right-mobile"
      style={{ backgroundImage: "url('/login.png')" }}
    >
      <div className="flex flex-col items-center w-full max-w-md px-6 sm:px-4">
        <h1 className="text-white text-3xl font-bold tracking-wide mb-6 drop-shadow">
          nukumori
        </h1>

        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-md w-full">
          <h2 className="text-xl font-bold mb-6 text-center tracking-wide">ログイン</h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
              placeholder="example@jstec.jp"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-300"
              placeholder="********"
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

          <button
            onClick={handleLogin}
            className="w-full py-2 rounded-full bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
          >
            ログイン
          </button>

          <p className="text-center text-sm mt-6 text-blue-500 hover:underline cursor-pointer">
            パスワードを忘れてしまった
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
