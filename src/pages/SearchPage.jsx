import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import resorts from '../data/ski_resorts.json'

const passColors = {
  'Ikon Pass': 'bg-green-100 text-green-700',
  'Ikon Pass Bonus': 'bg-orange-100 text-orange-700',
  'Epic Pass': 'bg-blue-100 text-blue-700',
  '无': 'bg-red-100 text-red-600',
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [filterPass, setFilterPass] = useState('all')

  const filtered = useMemo(() => {
    let result = resorts
    if (query.trim()) {
      const q = query.toLowerCase().trim()
      result = result.filter(r =>
        r.name_en.toLowerCase().includes(q) ||
        r.name_cn.includes(query.trim()) ||
        r.location.includes(query.trim())
      )
    }
    if (filterPass !== 'all') {
      if (filterPass === 'none') {
        result = result.filter(r => r.pass_type === '无')
      } else if (filterPass === 'has') {
        result = result.filter(r => r.pass_type !== '无')
      } else {
        result = result.filter(r => r.pass_type.includes(filterPass))
      }
    }
    return result
  }, [query, filterPass])

  return (
    <div className="max-w-md mx-auto px-4 py-4">
      {/* Hero */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">⛷️ 海外滑雪找搭子</h1>
        <p className="text-sm text-gray-500">搜索雪场，找到你的滑雪搭子</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="搜索雪场名称（中英文均可）"
          className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
        <svg className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[
          { key: 'all', label: '全部' },
          { key: 'Ikon', label: 'Ikon Pass' },
          { key: 'Epic', label: 'Epic Pass' },
          { key: 'none', label: '无Pass' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterPass(tab.key)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition ${
              filterPass === tab.key
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-3">共 {filtered.length} 个雪场</p>

      {/* Resort list */}
      <div className="space-y-2">
        {filtered.map(resort => (
          <Link
            key={resort.id}
            to={`/resort/${resort.id}`}
            className="block bg-white rounded-xl p-3.5 border border-gray-100 hover:border-primary-300 hover:shadow-sm transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm truncate">{resort.name_en}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{resort.name_cn}</p>
                <p className="text-xs text-gray-400 mt-1">{resort.location}</p>
              </div>
              <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${passColors[resort.pass_type] || 'bg-purple-100 text-purple-700'}`}>
                  {resort.pass_type}
                </span>
                {resort.area_acres > 0 && (
                  <span className="text-xs text-gray-400">{resort.area_acres.toLocaleString()} 英亩</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-2">🔍</p>
          <p className="text-gray-400 text-sm">没有找到匹配的雪场</p>
        </div>
      )}
    </div>
  )
}
