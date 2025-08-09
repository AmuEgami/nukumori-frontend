import React, { useEffect, useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';

const poolData = {
  UserPoolId: 'ap-northeast-1_aA4DL452b',
  ClientId: '54t90vuctd51vubi0sqft6jvko',
};

const userPool = new CognitoUserPool(poolData);

function ProfileScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
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

        const idTokenPayload = session.getIdToken().decodePayload();
        const userId = idTokenPayload.sub;
        const API_URL = process.env.REACT_APP_API_URL || 'https://nukumori-app.com';


        try {
          const res = await fetch(`${API_URL}/api/profile/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setProfile(data);
          } else {
            console.error("プロフィール取得失敗");
          }
        } catch (err) {
          console.error("通信エラー:", err);
        }
      });
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-white">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4">
      {/* 編集ボタン */}
      <div className="flex justify-end mb-2">
        <button
  onClick={() => navigate('/setup', { state: { profile } })}
  className="text-sm text-sky-600 font-semibold underline hover:text-sky-800"
>
  編集
</button>
      </div>

      {/* プロフィールカード */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 text-center">
        <div className="mb-4">
          <img
            src="/default-avatar.png"
            alt="アバター"
            className="w-24 h-24 rounded-full mx-auto border-2 border-sky-300"
          />
          <h2 className="text-xl font-bold mt-2">{profile.userName}</h2>
        </div>
        <div className="text-left text-sm space-y-2">
          <Info label="自己紹介" value={profile.bio} />
          <Info label="趣味" value={profile.hobbies?.join(', ')} />
          <Info label="MBTI" value={profile.mbti} />
          <Info label="好きな食べ物" value={profile.favoriteFoods?.join(', ')} />
          <Info label="苦手な食べ物" value={profile.dislikedFoods?.join(', ')} />
          <Info label="地域" value={profile.location} />
          <Info label="誕生日" value={profile.birthday} />
        </div>
      </div>

      {/* フッター */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-30">
        <img src="/icons/home_blue.png" alt="ホーム" className="w-10 h-10" onClick={() => navigate('/home')} />
        <img src="/icons/search.png" alt="検索" className="w-8 h-8" onClick={() => navigate('/search')} />
        <img src="/icons/plus.png" alt="投稿" className="w-8 h-8" onClick={() => navigate('/post')} />
        <img src="/icons/bell.png" alt="通知" className="w-8 h-8" onClick={() => navigate('/notifications')} />
        <img
          src="/icons/user.png"
          alt="プロフィール"
          className="w-8 h-8 cursor-pointer"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span className="font-medium">{label}：</span>
      <span>{value || '未登録'}</span>
    </div>
  );
}

function NavIcon({ icon, label, to, active }) {
  return (
    <a href={to} className={`flex flex-col items-center text-xs ${active ? 'text-sky-500 font-bold' : 'text-gray-500'}`}>
      <div>{icon}</div>
      <div>{label}</div>
    </a>
  );
}

export default ProfileScreen;
