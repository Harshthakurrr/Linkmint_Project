const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  await prisma.link.createMany({
    data: [
      { code: 'demo01a', targetUrl: 'https://example.com', title: 'Example', clicks: 3 },
      { code: 'demo02b', targetUrl: 'https://vercel.com', title: 'Vercel', clicks: 1 }
    ],
    skipDuplicates: true
  })
  console.log('Seed done')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
