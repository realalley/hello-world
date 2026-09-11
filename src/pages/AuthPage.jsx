import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AuthPage() {
  const { signInWithOtp, verifyOtp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await signInWithOtp(email)
    setLoading(false)
    if (error) {
      setMessage('发送失败：' + error.message)
    } else {
      setStep(2)
      setMessage('验证码已发送到你的邮箱，请查收')
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await verifyOtp(email, token)
    setLoading(false)
    if (error) {
      setMessage('验证失败：' + error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-gray-500 mb-6 inline-block">← 返回首页</Link>
      
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">⛷️</div>
        <h1 className="text-xl font-bold text-gray-800">海外滑雪找搭子</h1>
        <p className="text-sm text-gray-500 mt-1">邮箱验证码登录</p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1.5">邮箱地址</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary-600 text-white rounded-xl text-sm font-medium disabled:opacity-50"
          >
            {loading ? '发送中...' : '发送验证码'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1.5">验证码</label>
            <input
              required
              type="text"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="输入邮箱收到的验证码"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary-600 text-white rounded-xl text-sm font-medium disabled:opacity-50"
          >
            {loading ? '验证中...' : '验证登录'}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-sm text-gray-400"
          >
            ← 换个邮箱
          </button>
        </form>
      )}

      {message && (
        <p className={`text-sm text-center mt-4 ${message.includes('失败') ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <p className="text-xs text-gray-400 text-center mt-6">
        登录即同意使用本应用发布找搭子信息，请确保填写真实信息。
      </p>
    </div>
  )
}
