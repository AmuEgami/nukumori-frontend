import React, { useState } from "react";
import {
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js";
import { Link } from "react-router-dom"; // React Routerを使用している場合

const poolData = {
  UserPoolId: "ap-northeast-1_XXXXXXX", // ← あなたの UserPoolId に変更
  ClientId: "54t90vuctd51vubi0sqft6jvko"
};

const userPool = new CognitoUserPool(poolData);

export default function ConfirmSignup() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        setMessage(`エラー: ${err.message || JSON.stringify(err)}`);
        return;
      }
      setIsConfirmed(true);
      setMessage("✅ メール認証が完了しました！");
    });
  };

  const handleResend = () => {
    if (!email) {
      setMessage("📩 メールアドレスを先に入力してください。");
      return;
    }

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        setMessage(`再送信エラー: ${err.message || JSON.stringify(err)}`);
        return;
      }
      setMessage("📨 認証コードを再送信しました！");
    });
  };

  return (
    <div className="confirm-container">
      <h2>メール確認</h2>
      <form onSubmit={handleConfirm}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="認証コード"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">認証する</button>
      </form>

      <button onClick={handleResend} style={{ marginTop: "10px" }}>
        認証コードを再送信する
      </button>

      {message && <p>{message}</p>}

      {isConfirmed && (
        <p style={{ marginTop: "10px" }}>
          👉 <Link to="/login">ログイン画面に戻る</Link>
        </p>
      )}
    </div>
  );
}
