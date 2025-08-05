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
        setMessage(`エラー: ${err.message}`);
        return;
      }

      setMessage("サインアップ成功！メールを確認してください。");
      //ここでConfirmSignup画面に遷移させる
      navigate('/confirm');
    });
  };

  return (
    <div>
      <h2>サインアップ</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
