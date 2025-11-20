import prisma from '../lib/prisma_client'

export async function getServerSideProps({ params, req, res }){
  const code = params.code
  const link = await prisma.link.findUnique({ where: { code } })
  if (!link) {
    res.statusCode = 404
    return { props: { notFound: true } }
  }
  if (link.passwordHash) {
    return { props: { needsPassword: true, code } }
  }
  await prisma.link.update({ where: { id: link.id }, data: { clicks: { increment: 1 }, lastClicked: new Date() } })
  await prisma.click.create({ data: { linkId: link.id, referrer: req.headers.referer || null, userAgent: req.headers['user-agent'] || null } })

  res.writeHead(302, { Location: link.targetUrl })
  res.end()
  return { props: {} }
}

export default function RedirectPage({ notFound, needsPassword }){
  if (notFound) return <div style={{padding:40}}>404 — Link not found</div>
  if (needsPassword) return <div style={{padding:40}}>This link is password protected</div>
  return <div style={{padding:40}}>Redirecting…</div>
}
