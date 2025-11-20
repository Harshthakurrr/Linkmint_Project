import useSWR from 'swr'
import LinkForm from '../components/LinkForm'
import LinkTable from '../components/LinkTable'

const fetcher = (url) => fetch(url).then(r=>r.json())

export default function Dashboard(){
  const { data: links, mutate } = useSWR('/api/links', fetcher)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">LinkMint — Dashboard</h1>
      <div className="mt-6 max-w-2xl">
        <LinkForm onCreate={mutate} />
      </div>
      <div className="mt-8">
        <LinkTable links={links} onDeleted={mutate} />
      </div>
    </div>
  )
}
