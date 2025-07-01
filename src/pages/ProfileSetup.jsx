import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSetup() {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 必須チェック（usernameはrequired属性で足りてるが念のため）
    if (!username) return;

    // ★後でAPIで登録処理（Java/AWS）をここに追加
    console.log('仮プロフィール登録:', { username, avatar });

    // 登録完了後にホームへ
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-white px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">プロフィール登録</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-left mb-1">ユーザー名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="例: うさぎさん"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-left mb-1">アバター画像（任意）</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-pink-400 text-white font-semibold hover:bg-pink-500 transition"
          >
            登録する
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;
