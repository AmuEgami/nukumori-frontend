import React, { useState } from "react";
import {
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js";
import { Link } from "react-router-dom";

const poolData = {
  UserPoolId: "ap-northeast-1_aA4DL452b",
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
        setMessage(`❌ エラー: ${err.message || JSON.stringify(err)}`);
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
        setMessage(`❌ 再送信エラー: ${err.message || JSON.stringify(err)}`);
        return;
      }
      setMessage("📨 認証コードを再送信しました！");
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/login.png')" }} // 背景画像パス
    >
      <h1 className="text-white text-3xl font-bold mb-6">nukumori</h1>

      <div className="bg-white rounded-3xl shadow-lg p-8 w-80">
        <h2 className="text-xl font-bold text-center mb-6">メール認証</h2>

        <form onSubmit={handleConfirm} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            placeholder="認証コード"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="p-2 rounded-md border border-gray-300"
          />
          <button
            type="submit"
            className="bg-gray-400 text-white rounded-full py-2 font-semibold hover:bg-gray-500 transition"
          >
            認証する
          </button>
        </form>

        <button
          onClick={handleResend}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          認証コードを再送信する
        </button>

        {message && (
          <p className="mt-4 text-sm text-center">{message}</p>
        )}

        {isConfirmed && (
          <p className="mt-4 text-center text-green-600 text-sm">
            👉 <Link to="/login" className="underline">ログイン画面に戻る</Link>
          </p>
        )}
      </div>
    </div>
  );
}
