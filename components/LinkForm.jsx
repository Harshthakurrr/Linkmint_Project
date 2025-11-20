import { useState } from 'react'

export default function LinkForm({ onCreate }){
  const [targetUrl, setTargetUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e){
    e.preventDefault(); setLoading(true); setError(null)
    try{
      const res = await fetch('/api/links', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ targetUrl, code }) })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'Error')
      setTargetUrl(''); setCode('')
      if (onCreate) onCreate()
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">URL</label>
        <input value={targetUrl} onChange={e=>setTargetUrl(e.target.value)} placeholder="https://..." className="mt-1 p-2 border rounded w-full" />
      </div>
      <div>
        <label className="block text-sm">Custom code (optional)</label>
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="6-8 chars" className="mt-1 p-2 border rounded w-full" />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading? 'Creating...':'Create'}</button>
      </div>
    </form>
)
}
