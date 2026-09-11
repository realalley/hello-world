import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import SearchPage from './pages/SearchPage'
import ResortDetailPage from './pages/ResortDetailPage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'

function NavBar() {
  const { user, signOut } = useAuth()
  const loc = useLocation()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">⛷️</span>
          <span className="font-bold text-gray-800 text-lg">海外滑雪找搭子</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/" className={`text-sm ${loc.pathname === '/' ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
            搜索
          </Link>
          {user ? (
            <>
              <Link to="/profile" className={`text-sm ${loc.pathname === '/profile' ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                我的
              </Link>
              <button onClick={signOut} className="text-sm text-gray-400">退出</button>
            </>
          ) : (
            <Link to="/auth" className="text-sm text-primary-600 font-medium">登录</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/resort/:id" element={<ResortDetailPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}
