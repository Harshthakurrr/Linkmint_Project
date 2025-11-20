const prisma = require('../../../lib/prisma_client');
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
  const { code } = req.query;

  if (req.method === 'GET') {
    const link = await prisma.link.findUnique({
      where: { code }
    });

    if (!link) return res.status(404).json({ error: 'Link not found' });

    return res.status(200).json({
      code: link.code,
      targetUrl: link.targetUrl,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      title: link.title,
      faviconUrl: link.faviconUrl,
      tags: link.tags,
      groupName: link.groupName,
      passwordProtected: !!link.passwordHash
    });
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await prisma.link.delete({
        where: { code }
      });

      return res.status(200).json({ success: true, deleted });
    } catch (e) {
      return res.status(404).json({ error: 'Link not found' });
    }
  }

  if (req.method === 'POST') {
    const { password } = req.body;

    const link = await prisma.link.findUnique({
      where: { code }
    });

    if (!link) return res.status(404).json({ error: 'Not found' });

    if (!link.passwordHash) return res.status(400).json({ error: 'No password set' });

    const match = await bcrypt.compare(password || '', link.passwordHash);

    if (!match) return res.status(401).json({ error: 'Invalid password' });

    return res.status(200).json({
      ok: true,
      targetUrl: link.targetUrl
    });
  }

  res.setHeader('Allow', ['GET', 'DELETE', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
