import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import resorts from '../data/ski_resorts.json'

export default function ResortDetailPage() {
  const { id } = useParams()
  const { user, profile } = useAuth()
  const resort = resorts.find(r => r.id === parseInt(id))

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    xiaohongshu_name: '',
    xiaohongshu_url: '',
    start_date: '',
    end_date: '',
    note: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const fetchListings = useCallback(async () => {
    if (!resort) return
    setLoading(true)
    const { data } = await supabase
      .from('buddy_listings')
      .select('*')
      .eq('resort_id', resort.id)
      .order('created_at', { ascending: false })
    setListings(data || [])
    setLoading(false)
  }, [resort])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return
    setSubmitting(true)
    const { error } = await supabase.from('buddy_listings').insert({
      resort_id: resort.id,
      resort_name: resort.name_en,
      user_id: user.id,
      xiaohongshu_name: formData.xiaohongshu_name,
      xiaohongshu_url: formData.xiaohongshu_url,
      start_date: formData.start_date,
      end_date: formData.end_date,
      note: formData.note,
    })
    setSubmitting(false)
    if (error) {
      alert('提交失败：' + error.message)
      return
    }
    setFormData({ xiaohongshu_name: '', xiaohongshu_url: '', start_date: '', end_date: '', note: '' })
    setShowForm(false)
    fetchListings()
  }

  if (!resort) {
    return <div className="max-w-md mx-auto px-4 py-20 text-center text-gray-400">雪场不存在</div>
  }

  const formatDate = (d) => {
    if (!d) return ''
    const date = new Date(d)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  const isExpired = (endDate) => {
    if (!endDate) return false
    return new Date(endDate) < new Date()
  }

  return (
    <div className="max-w-md mx-auto px-4 py-4">
      {/* Back */}
      <Link to="/" className="inline-flex items-center text-sm text-gray-500 mb-3">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回搜索
      </Link>

      {/* Resort info card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-5 text-white mb-4">
        <h1 className="text-xl font-bold">{resort.name_en}</h1>
        <p className="text-sm opacity-90 mt-0.5">{resort.name_cn}</p>
        <div className="flex items-center gap-3 mt-3 text-xs">
          <span className="bg-white/20 px-2 py-0.5 rounded-full">{resort.pass_type}</span>
          <span className="opacity-80">{resort.location}</span>
        </div>
        {resort.area_acres > 0 && (
          <p className="text-xs opacity-80 mt-2">可滑面积: {resort.area_acres.toLocaleString()} 英亩 ({resort.area_hectares} 公顷)</p>
        )}
        {resort.url && (
          <a href={resort.url} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs underline opacity-90">
            访问雪场官网 →
          </a>
        )}
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-gray-800">找搭子 ({listings.length})</h2>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded-full"
          >
            {showForm ? '取消' : '+ 我要找搭子'}
          </button>
        )}
      </div>

      {/* Submit form */}
      {showForm && user && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 border border-gray-100 mb-4 space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">小红书昵称 *</label>
            <input
              required
              type="text"
              value={formData.xiaohongshu_name}
              onChange={e => setFormData({...formData, xiaohongshu_name: e.target.value})}
              placeholder="你的小红书昵称"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">小红书个人主页链接 *</label>
            <input
              required
              type="url"
              value={formData.xiaohongshu_url}
              onChange={e => setFormData({...formData, xiaohongshu_url: e.target.value})}
              placeholder="https://www.xiaohongshu.com/user/..."
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary-400"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">到达日期 *</label>
              <input
                required
                type="date"
                value={formData.start_date}
                onChange={e => setFormData({...formData, start_date: e.target.value})}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary-400"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">离开日期 *</label>
              <input
                required
                type="date"
                value={formData.end_date}
                onChange={e => setFormData({...formData, end_date: e.target.value})}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">找搭子要求/备注</label>
            <textarea
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
              placeholder="例如：水平中级，想找人一起滑双黑道，AA拼车拼饭..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary-400 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-10 bg-primary-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {submitting ? '提交中...' : '发布找搭子'}
          </button>
        </form>
      )}

      {!user && (
        <div className="bg-primary-50 rounded-xl p-4 text-center mb-4">
          <p className="text-sm text-gray-600 mb-2">登录后可以发布找搭子信息</p>
          <Link to="/auth" className="inline-block text-sm text-primary-600 font-medium">去登录 →</Link>
        </div>
      )}

      {/* Listings */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">加载中...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-2">🏂</p>
          <p className="text-gray-400 text-sm">还没有人发布找搭子信息</p>
          <p className="text-gray-400 text-xs mt-1">成为第一个吧！</p>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map(l => (
            <div
              key={l.id}
              className={`bg-white rounded-xl p-4 border border-gray-100 ${isExpired(l.end_date) ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <a
                    href={l.xiaohongshu_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary-600 text-sm hover:underline"
                  >
                    {l.xiaohongshu_name}
                  </a>
                  <span className="text-xs text-gray-400 ml-2">小红书</span>
                </div>
                {isExpired(l.end_date) && (
                  <span className="text-xs text-gray-400">已过期</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded">
                  {formatDate(l.start_date)} ~ {formatDate(l.end_date)}
                </span>
              </div>
              {l.note && (
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap break-words">{l.note}</p>
              )}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                <span className="text-xs text-gray-300">{new Date(l.created_at).toLocaleDateString('zh-CN')}</span>
                {user && user.id === l.user_id && (
                  <DeleteButton id={l.id} onDelete={fetchListings} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DeleteButton({ id, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const handleDelete = async () => {
    if (!confirm('确定删除这条找搭子信息吗？')) return
    setDeleting(true)
    await supabase.from('buddy_listings').delete().eq('id', id)
    setDeleting(false)
    onDelete()
  }
  return (
    <button onClick={handleDelete} disabled={deleting} className="text-xs text-red-400">
      删除
    </button>
  )
}
