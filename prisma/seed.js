// import { PrismaClient } from '@prisma/client';
const {PrismaClient} = require("@prisma/client");


const prisma = new PrismaClient();

async function main() {

  const participantsData = [
    { nama: 'Adit', email: 'adit@example.com', tandaTangan: '/uploads/signatures/ttd_adit.jpg' }, 
    { nama: 'Una', email: 'una@example.com', tandaTangan: '/uploads/signatures/ttd_una.jpg' },
    { nama: 'Kevin' , email: "kevin@example.com" ,tandaTangan: '/uploads/signatures/ttd_kevin.jpg' },
  ];

  for (const p of participantsData) {
    const participant = await prisma.participant.upsert({
      where: { email: p.email }, 
      update: {}, 
      create: { 
        nama: p.nama,
        email: p.email,
        tandaTangan: p.tandaTangan,
      },
    });
    console.log(`Created participant with id: ${participant.id}, name: ${participant.nama}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });