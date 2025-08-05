import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import userPool from '../aws/cognito';

function ProfileSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile;
  const isEditMode = !!profile;

  const [username, setUsername] = useState(profile?.userName || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [hobbies, setHobbies] = useState(profile?.hobbies?.join(', ') || '');
  const [mbti, setMbti] = useState(profile?.mbti || '');
  const [favoriteFoods, setFavoriteFoods] = useState(profile?.favoriteFoods?.join(', ') || '');
  const [dislikedFoods, setDislikedFoods] = useState(profile?.dislikedFoods?.join(', ') || '');
  const [locationValue, setLocationValue] = useState(profile?.location || '');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;

    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      console.error("ログインユーザーが見つかりません");
      return;
    }

    currentUser.getSession(async (err, session) => {
      if (err) {
        console.error("セッション取得エラー:", err);
        return;
      }

      const userId = session.getIdToken().decodePayload().sub;

      const payload = {
        userId,
        userName: username,
        bio,
        hobbies: hobbies.split(',').map(s => s.trim()),
        mbti,
        favoriteFoods: favoriteFoods.split(',').map(s => s.trim()),
        dislikedFoods: dislikedFoods.split(',').map(s => s.trim()),
        location: locationValue,
        updatedAt: new Date().toISOString(),
        birthday: profile?.birthday || "1990-01-01"
      };

      try {
        const res = await fetch('http://localhost:8080/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          console.log("プロフィール保存完了");

          //初回登録と編集で遷移先を分ける
          if (isEditMode) {
            navigate('/profile');
          } else {
            navigate('/home');
          }
        } else {
          console.error("プロフィール保存失敗");
        }
      } catch (err) {
        console.error("通信エラー:", err);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-white px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-sky-600 mb-4">
          {isEditMode ? 'プロフィール編集' : 'プロフィール登録'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-left text-sm">
          <Input label="ユーザー名" value={username} setValue={setUsername} placeholder="例: うさぎさん" required />
          <Input label="自己紹介" value={bio} setValue={setBio} placeholder="好きなことや性格など" />
          <Input label="趣味（カンマ区切り）" value={hobbies} setValue={setHobbies} placeholder="例: 映画, 音楽" />
          <Input label="MBTI" value={mbti} setValue={setMbti} placeholder="例: INFJ" />
          <Input label="好きな食べ物" value={favoriteFoods} setValue={setFavoriteFoods} placeholder="例: ラーメン, いちご" />
          <Input label="苦手な食べ物" value={dislikedFoods} setValue={setDislikedFoods} placeholder="例: ピーマン" />
          <Input label="地域" value={locationValue} setValue={setLocationValue} placeholder="例: 神奈川" />
          <div>
            <label className="block mb-1 font-medium">アバター画像（任意）</label>
            <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="w-full" />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
          >
            {isEditMode ? '更新する' : '登録する'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, value, setValue, placeholder, required }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-sky-300"
      />
    </div>
  );
}

export default ProfileSetup;
