import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSetup() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [mbti, setMbti] = useState('');
  const [favoriteFoods, setFavoriteFoods] = useState('');
  const [dislikedFoods, setDislikedFoods] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) return;

    // 登録データ仮出力（後でAPI処理に置き換え）
    console.log('プロフィール登録データ:', {
      username,
      bio,
      hobbies: hobbies.split(','),
      mbti,
      favoriteFoods: favoriteFoods.split(','),
      dislikedFoods: dislikedFoods.split(','),
      location,
      avatar,
    });

    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-white px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-sky-600 mb-4">プロフィール登録</h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-left text-sm">
          <Input label="ユーザー名" value={username} setValue={setUsername} placeholder="例: うさぎさん" required />
          <Input label="自己紹介" value={bio} setValue={setBio} placeholder="好きなことや性格など" />
          <Input label="趣味（カンマ区切り）" value={hobbies} setValue={setHobbies} placeholder="例: 映画, 音楽" />
          <Input label="MBTI" value={mbti} setValue={setMbti} placeholder="例: INFJ" />
          <Input label="好きな食べ物" value={favoriteFoods} setValue={setFavoriteFoods} placeholder="例: ラーメン, いちご" />
          <Input label="苦手な食べ物" value={dislikedFoods} setValue={setDislikedFoods} placeholder="例: ピーマン" />
          <Input label="地域" value={location} setValue={setLocation} placeholder="例: 神奈川" />
          <div>
            <label className="block mb-1 font-medium">アバター画像（任意）</label>
            <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="w-full" />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
          >
            登録する
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
