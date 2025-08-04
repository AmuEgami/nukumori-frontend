import React, { useState } from "react";
import {
  CognitoUserPool
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-northeast-1_XXXXXXX", // ユーザープールID
  ClientId: "54t90vuctd51vubi0sqft6jvko" // クライアントID
};

const userPool = new CognitoUserPool(poolData);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        setMessage(err.message || JSON.stringify(err));
        return;
      }

      setMessage("サインアップ成功！メールを確認してください。");
      console.log("user name is " + result.user.getUsername());
    });
  };

  return (
    <div className="signup-container">
      <h2>サインアップ</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
