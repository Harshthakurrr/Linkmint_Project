import prisma from '../../../lib/prisma_client'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(links.map(l => ({
      code: l.code,
      targetUrl: l.targetUrl,
      clicks: l.clicks,
      lastClicked: l.lastClicked,
      title: l.title,
      faviconUrl: l.faviconUrl,
      tags: l.tags,
      groupName: l.groupName
    })))
  }

  if (req.method === 'POST') {
    const { targetUrl, code, password, tags = [], groupName, title, faviconUrl } = req.body || {}
    try { new URL(targetUrl) } catch (e) { return res.status(400).json({ error: 'Invalid URL' }) }

    let shortCode = (code || '').trim() || nanoid(7)
    if (!/^[A-Za-z0-9]{6,8}$/.test(shortCode)) {
      return res.status(400).json({ error: 'Code must follow [A-Za-z0-9]{6,8}' })
    }

    const exists = await prisma.link.findUnique({ where: { code: shortCode } })
    if (exists) return res.status(409).json({ error: 'Code already exists' })

    const passwordHash = password ? await bcrypt.hash(password, 8) : null
    const created = await prisma.link.create({
      data: {
        code: shortCode,
        targetUrl,
        title,
        faviconUrl,
        tags,
        groupName,
        passwordHash
      }
    })

    return res.status(201).json({
      code: created.code,
      targetUrl: created.targetUrl,
      shortUrl: `${process.env.BASE_URL || ''}/${created.code}`
    })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
