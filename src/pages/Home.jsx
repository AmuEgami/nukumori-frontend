import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_aA4DL452b',
  ClientId: '54t90vuctd51vubi0sqft6jvko',
};

const userPool = new CognitoUserPool(poolData);

const weekdayMessages = {
  0: '今日は日曜日。しっかり休んでね☀️明日から頑張ろー！',
  1: 'みなさん！今日もお疲れ様です！\n今日からまた一週間頑張りましょう！',
  2: '火曜日ですね〜今週まだまだありますが、休憩しつつ頑張りましょう！！',
  3: '水曜の折り返し地点。今週もあと半分ですね💪',
  4: '木曜まで頑張ったあなた、えらいです！あと二日頑張りましょう！',
  5: '今日は華金！あとちょっとでおやすみ〜🌸\nここまでほんとによく頑張った！！',
  6: '土曜日、ちゃんと休めてる？自分にやさしくね🫶',
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState(''); 
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().getDay();
    setMessage(weekdayMessages[today]);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = userPool.getCurrentUser();
      if (!currentUser) return;

      currentUser.getSession(async (err, session) => {
        if (err) return console.error('セッションエラー', err);
        const idToken = session.getIdToken();
        const userId = idToken.decodePayload().sub;

        try {
          const res = await fetch(`${API_URL}/api/profile/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setUserName(data.userName);
          } else {
            console.error("プロフィール取得失敗");
          }
        } catch (e) {
          console.error("プロフィール取得エラー", e);
        }
      });
    };

    fetchProfile();
  }, [API_URL]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('投稿の取得に失敗しました', error);
      }
    };

    fetchPosts();
  }, [API_URL]);

  const handleSubmit = async () => {
    if (newPost.trim() === '') return;

    const newEntry = {
      userName: userName || '名無しのうさぎさん', // ← プロフィールがなければ仮名
      content: newPost,
    };

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) throw new Error('投稿に失敗しました');

      const savedPost = await response.json();
      setPosts([savedPost, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('エラー:', error);
      alert('投稿できませんでした😢');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* ヘッダー */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white flex justify-between items-center px-4 py-2 border-b">
        <div className="text-center w-full font-bold">ホーム</div>
        <img src="/calendar.png" alt="カレンダー" className="w-8 h-8 absolute right-4" />
      </div>

      {/* 掲示板メッセージ */}
      <div className="fixed top-12 left-0 right-0 z-20 px-4 py-3">
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-3 text-sm whitespace-pre-line font-semibold">
          {message}
        </div>
      </div>

      {/* 投稿一覧 */}
      <div className="flex-1 overflow-y-auto mt-36 mb-32 z-0">
        {posts.map((post) => (
          <div key={post.postId} className="border-b px-4 py-4">
            <div className="flex items-center gap-3">
              <img src={post.avatar || '/default-avatar.png'} alt="avatar" className="w-10 h-10 rounded-full" />
              <div className="font-light">{post.userName}</div>
            </div>
            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{post.content}</p>
            <div className="flex items-center gap-4 mt-3 text-pink-300 text-xl">
              <span>♡</span>
              <span className="text-gray-400">💬</span>
            </div>
          </div>
        ))}
      </div>

      {/* 投稿フォーム */}
      <div className="fixed bottom-16 left-0 right-0 px-4">
        <div className="bg-white border rounded-2xl p-3 shadow-md flex flex-col">
          <textarea
            className="w-full resize-none p-2 rounded border text-sm"
            rows={3}
            placeholder="何でもどうぞ"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="text-right mt-2">
            <button
              onClick={handleSubmit}
              className="bg-gray-400 text-white px-4 py-1 rounded-full hover:bg-gray-500 transition"
            >
              投稿
            </button>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-30">
        <img src="/icons/home_blue.png" alt="ホーム" className="w-10 h-10" />
        <img src="/icons/search.png" alt="検索" className="w-8 h-8" />
        <img src="/icons/plus.png" alt="投稿" className="w-8 h-8" />
        <img src="/icons/bell.png" alt="通知" className="w-8 h-8" />
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

export default Home;
