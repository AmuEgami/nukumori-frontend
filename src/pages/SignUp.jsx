import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';

const poolData = {
  UserPoolId: "ap-northeast-1_aA4DL452b",
  ClientId: "54t90vuctd51vubi0sqft6jvko"
};

const userPool = new CognitoUserPool(poolData);

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        setMessage(`❌ エラー: ${err.message}`);
        return;
      }

      setMessage("✅ サインアップ成功！メールを確認してください。");
      navigate('/confirm');
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/login.png')" }} // ここに背景画像パス
    >
      {/* ← 戻るボタン */}
    <div className="absolute top-4 left-4">
      <button
        onClick={() => navigate('/')}
        className="text-white underline text-sm"
      >
        戻る
      </button>
    </div>

      <h1 className="text-white text-3xl font-bold mb-6">nukumori</h1>

      <div className="bg-white rounded-3xl shadow-lg p-8 w-80">
        <h2 className="text-xl font-bold text-center mb-6">新規登録</h2>
        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            required
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            required
            className="p-2 rounded-md border border-gray-300"
          />
          <button
            type="submit"
            className="bg-gray-400 text-white rounded-full py-2 font-semibold hover:bg-gray-500 transition"
          >
            登録
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}
