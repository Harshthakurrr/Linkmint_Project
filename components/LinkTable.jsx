export default function LinkTable({ links }){
  if (!links) return <div>Loading...</div>
  if (links.length === 0) return <div>No links yet.</div>
  return (
    <table className="min-w-full text-left">
      <thead>
        <tr><th>Code</th><th>URL</th><th>Clicks</th><th>Last</th></tr>
      </thead>
      <tbody>
        {links.map(l => (
          <tr key={l.code} className="border-t">
            <td><a className="text-blue-600" href={`/${l.code}`}>{l.code}</a></td>
            <td title={l.targetUrl}>{l.targetUrl.length>60? l.targetUrl.slice(0,60)+'...': l.targetUrl}</td>
            <td>{l.clicks}</td>
            <td>{l.lastClicked? new Date(l.lastClicked).toLocaleString(): '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
