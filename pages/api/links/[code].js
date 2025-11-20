import prisma from '../../../lib/prisma_client'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  const { code } = req.query
  
  if (req.method === 'GET') {
    const link = await prisma.link.findUnique({ where: { code } })
    if (!link) return res.status(404).json({ error: 'Not found' })

    return res.status(200).json({
      code: link.code,
      targetUrl: link.targetUrl,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      title: link.title,
      faviconUrl: link.faviconUrl,
      tags: link.tags,
      groupName: link.groupName
    })
  }

  if (req.method === 'DELETE') {
    await prisma.link.deleteMany({ where: { code } })
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', ['GET','DELETE'])
  res.status(405).end()
}
