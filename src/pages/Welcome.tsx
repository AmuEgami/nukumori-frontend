import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: "url('/login.png')", // publicフォルダに画像を配置しておく
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1 className="text-white text-4xl font-bold mb-2">nukumori</h1>
      <p className="text-white mb-10">ようこそ！</p>

      <button
        onClick={() => navigate('/signup')}
        className="bg-white text-gray-700 font-semibold rounded-full px-10 py-3 mb-4 shadow"
      >
        新規登録
      </button>

      <button
        onClick={() => navigate('/login')}
        className="bg-gray-400 text-white font-semibold rounded-full px-10 py-3 mb-4 shadow"
      >
        ログイン
      </button>

      <button
        onClick={() => navigate('/forgot-password')}
        className="text-white underline text-sm"
      >
        パスワードを忘れてしまった
      </button>
    </div>
  );
}
