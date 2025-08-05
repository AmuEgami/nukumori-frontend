import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: "url('/login.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1 className="text-white text-3xl font-bold mb-2">nukumori</h1>
      <p className="text-white text-sm mb-8">ようこそ！</p>

      <button
        onClick={() => navigate('/signup')}
        className="bg-white text-gray-700 text-sm font-semibold rounded-full px-6 py-2 mb-3 shadow"
      >
        新規登録
      </button>

      <button
        onClick={() => navigate('/login')}
        className="bg-gray-300 text-white text-sm font-semibold rounded-full px-6 py-2 mb-3 shadow"
      >
        ログイン
      </button>

      
      <button
        onClick={() => navigate('/forgot-password')}
        className="text-white underline text-xs"
      >
        パスワードを忘れてしまった
      </button>
    </div>
  );
}
