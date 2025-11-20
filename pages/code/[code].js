import fetch from 'isomorphic-unfetch'

export async function getServerSideProps({ params }){
  const res = await fetch(`${process.env.BASE_URL || ''}/api/links/${params.code}`)
  if (res.status === 404) return { props: { notFound: true } }
  const data = await res.json()
  return { props: { data } }
}

export default function CodeStats({ data, notFound }){
  if (notFound) return <div style={{padding:40}}>404 — Not found</div>
  return (
    <div className="p-8">
      <h2 className="text-xl">Stats for {data.code}</h2>
      <p>Target: {data.targetUrl}</p>
      <p>Clicks: {data.clicks}</p>
      <p>Last clicked: {data.lastClicked || '—'}</p>
    </div>
  )
}
