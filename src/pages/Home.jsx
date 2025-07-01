import React, { useState, useEffect } from 'react';

const weekdayMessages = {
  0: '今日は日曜日。しっかり休んでね☀️明日から頑張ろー！',
  1: 'みなさん！今日もお疲れ様です！\n月曜日から出勤ほんときついね…\n今日も生きててえらい！',
  2: '火曜日だね〜今週まだまだあるけど、休憩しつつ頑張ろう！！',
  3: '水曜の折り返し地点。あと半分だよ💪',
  4: '木曜まできたあなた、えらい！',
  5: '今日は華金！あとちょっとでおやすみ〜🌸\nここまでマジでよく頑張った！！\nいつもありがとね〜！❤️',
  6: '土曜日、ちゃんと休めてる？自分にやさしくね🫶',
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const today = new Date().getDay();
    setMessage(weekdayMessages[today]);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('投稿の取得に失敗しました', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async () => {
  if (newPost.trim() === '') return;

  const newEntry = {
    userName: 'うさぎさん',
    content: newPost,
    // createdAt は送らない！
  };

  try {
    const response = await fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    if (!response.ok) {
      throw new Error('投稿に失敗しました');
    }

    const savedPost = await response.json(); // ← Javaから返ってきた投稿（createdAt入り）

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
            <p className="mt-2 text-gray-700">{post.content}</p>
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
        <img src="/icons/user.png" alt="プロフィール" className="w-8 h-8" />
      </div>
    </div>
  );
}

export default Home;
