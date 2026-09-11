import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import resorts from '../data/ski_resorts.json'

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()
  const [listings, setListings] = useState([])
  const [editing, setEditing] = useState(false)
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    supabase
      .from('buddy_listings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setListings(data || [])
        setLoading(false)
      })
    setNickname(profile?.nickname || '')
  }, [user, profile])

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-3">⛷️</p>
        <p className="text-gray-500 text-sm mb-4">请先登录</p>
        <Link to="/auth" className="text-primary-600 text-sm font-medium">去登录 →</Link>
      </div>
    )
  }

  const handleSave = async () => {
    await updateProfile({ nickname })
    setEditing(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('确定删除这条信息吗？')) return
    await supabase.from('buddy_listings').delete().eq('id', id)
    setListings(listings.filter(l => l.id !== id))
  }

  const formatDate = (d) => {
    if (!d) return ''
    const date = new Date(d)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <div className="max-w-md mx-auto px-4 py-4">
      {/* User card */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl">
            {user.email[0].toUpperCase()}
          </div>
          <div className="flex-1">
            {editing ? (
              <input
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="设置昵称"
                className="h-8 px-2 rounded border border-gray-200 text-sm"
              />
            ) : (
              <p className="font-medium text-gray-800 text-sm">{profile?.nickname || '未设置昵称'}</p>
            )}
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          {editing ? (
            <button onClick={handleSave} className="text-xs text-primary-600">保存</button>
          ) : (
            <button onClick={() => setEditing(true)} className="text-xs text-gray-400">编辑</button>
          )}
        </div>
      </div>

      {/* My listings */}
      <h2 className="font-bold text-gray-800 mb-3">我的找搭子记录 ({listings.length})</h2>

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">加载中...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-2">🏂</p>
          <p className="text-gray-400 text-sm">还没有发布过找搭子信息</p>
          <Link to="/" className="inline-block mt-3 text-sm text-primary-600 font-medium">去搜索雪场 →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map(l => {
            const resort = resorts.find(r => r.id === l.resort_id)
            return (
              <div key={l.id} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Link to={`/resort/${l.resort_id}`} className="font-medium text-primary-600 text-sm">
                    {resort?.name_en || l.resort_name}
                  </Link>
                  <button onClick={() => handleDelete(l.id)} className="text-xs text-red-400">删除</button>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(l.start_date)} ~ {formatDate(l.end_date)}
                </p>
                {l.note && <p className="text-sm text-gray-600 mt-2">{l.note}</p>}
                <p className="text-xs text-gray-300 mt-2">{new Date(l.created_at).toLocaleDateString('zh-CN')}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
