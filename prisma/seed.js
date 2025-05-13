// import { PrismaClient } from '@prisma/client';
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Delete all existing users
  await prisma.user.deleteMany({});
  
  // Create sample users (previously participants)
  const usersData = [
    { nama: 'Adit', email: 'adit@informatika.untan.ac.id', tandaTangan: '/uploads/signatures/ttd_adit.jpg', role: 'DOSEN' }, 
    { nama: 'Una', email: 'una@informatika.untan.ac.id', tandaTangan: '/uploads/signatures/ttd_una.jpg', role: 'DOSEN' },
    { nama: 'Kevin', email: "kevin@informatika.untan.ac.id", tandaTangan: '/uploads/signatures/ttd_kevin.jpg', role: 'ADMIN' },
  ];

  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: { 
        nama: userData.nama,
        email: userData.email,
        tandaTangan: userData.tandaTangan,
        role: userData.role,
      },
    });
    console.log(`Created user with id: ${user.id}, name: ${user.nama}`);
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