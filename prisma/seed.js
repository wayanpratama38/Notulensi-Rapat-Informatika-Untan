// import { PrismaClient } from '@prisma/client';
const {PrismaClient} = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");
const { Role } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  // Check if we already have users to avoid deleting production data
  const userCount = await prisma.user.count();
  
  // Only delete existing users if we're in development or have no users yet
  if (process.env.NODE_ENV !== 'production' || userCount === 0) {
    console.log("Deleting existing users (safe in development or empty database)");
    await prisma.user.deleteMany({});
  } else {
    console.log("Skipping deletion of existing users in production environment");
  }

  const adminEmail = "admin@informatika.untan.ac.id";
  const adminPassword = "admin";
  const saltRounds = 10;

  const hashedAdminPassword  = await bcrypt.hash(adminPassword, saltRounds);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { // Jika user admin sudah ada, update field ini
      password: hashedAdminPassword,
      nama: "Admin Utama",
      role: Role.ADMIN, // Gunakan enum Role jika sudah diimpor, atau string 'ADMIN'
      // tandaTangan dan image bisa di-set jika ada atau dibiarkan null
    },
    create: { // Jika user admin belum ada, buat baru
      email: adminEmail,
      password: hashedAdminPassword,
      nama: "Admin Utama",
      role: Role.ADMIN, // Gunakan enum Role atau string 'ADMIN'
      // image: null, // contoh
      // tandaTangan: null, // contoh
    },
  })

  console.log(
    `Created/Updated admin user: ${adminUser.email} with ID: ${adminUser.id}`
  );



  // Create sample users (previously participants)
  const usersData = [
    {
      nama: "Alfian Abdul Jalid, S.Kom., M.Cs", // Nama bisa dibedakan agar tidak bingung dengan admin jika email sama
      email: "fianjld@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_adit.jpg",
      role: Role.DOSEN, // Gunakan enum Role atau string 'DOSEN'
      password: "password123", // Contoh password untuk user dosen, bisa juga null
    },
    {
      nama: "Anggi Perwitasari, S.T., M.T",
      email: "anggiperwitasari@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_una.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Anggi Srimurdianti S., S.T., M.T",
      email: "anggidianti@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Desepta Isna Ulumi, S.Kom, M.Kom",
      email: "ulum@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Dr. Arif Bijaksana Putra Negara, S.T., M.T",
      email: "arifbpn@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Dr. Ir. Yus Sholva, S.T., M.T",
      email: "sholvariza@untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Enda Esyudha Pratama, S.T., M.T",
      email: "enda@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Eva Faja Ripanti, S.Kom. MMSI., Ph.D",
      email: "evaripanti@untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Fauzan Asrin, S.Kom, M. Kom",
      email: "asrin@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "H. Hengky Anra, S.T., M.Kom",
      email: "hengkyanra@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Haried Novriando, S.Kom., M.Eng",
      email: "haried@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Helen Sastypratiwi, S.T., M.Eng",
      email: "helensastypratiwi@informatics.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Helfi Nasution, S.Kom, M.Cs",
      email: "helfinas@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Heri Priyanto, S.T., M.T",
      email: "heripriyanto@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Ibnu Arif S.Kom., M.Kom",
      email: "ibnuarif@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Ir. M. Azhar Irwansyah, ST, M.Eng",
      email: "irwansyah.azhar@untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Izuardo Zulkarnain, S.Pd., M.T",
      email: "izuardozulkarnain@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Khairul Hafidh, S.T., M.Kom",
      email: "hafidh@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "M. Tsanauddin Farid, S.Kom., M.Eng",
      email: "farid@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Morteza Muthahhari, S.Kom., M.T.I",
      email: "morteza.muthahhari@teknik.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Niken Candraningrum, S.T., M.Cs",
      email: "nikenc@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Novi Safriadi, S.T., M.T",
      email: "safriadi@informatics.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Prof. Dr. Herry Sujaini, S.T., M.T",
      email: "hs@untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Rickhy Artha Octaviyana, S.Kom., M.M., M.Kom",
      email: "artha@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Rifqi Anugrah, S.Kom.,M.Kom",
      email: "rifqianugrah@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Rina Septiriana, ST, M.Cs",
      email: "rinaseptiriana@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Rudy Dwi Nyoto, ST, M.Eng",
      email: "rudydn@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Tursina, S.T., M.Cs",
      email: "tursina@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    },
    {
      nama: "Yulianti, S.Kom, MMSI",
      email: "yulianti@informatika.untan.ac.id",
      tandaTangan: "/uploads/signatures/ttd_kevin.jpg",
      role: Role.DOSEN,
      password: "password123",
    }
  ];

  for (const userData of usersData) {
    // Jika email sama dengan admin, user ini sudah dibuat/diupdate di atas, jadi skip
    if (userData.email === adminEmail) {
      console.log(`Skipping user data for ${userData.email} as it's the admin email.`);
      continue;
    }

    let hashedPassword = null;
    if (userData.password) { // Hanya hash jika password disediakan
      hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    }

    // Menggunakan upsert untuk user lain juga merupakan praktik yang baik
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        nama: userData.nama,
        password: hashedPassword, // Update password jika ada
        tandaTangan: userData.tandaTangan,
        role: userData.role, // Pastikan ini adalah nilai enum yang valid ('DOSEN' atau 'ADMIN')
      },
      create: {
        nama: userData.nama,
        email: userData.email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        tandaTangan: userData.tandaTangan,
        role: userData.role, // Pastikan ini adalah nilai enum yang valid
      },
    });
    console.log(
      `Created/Updated user with id: ${user.id}, name: ${user.nama}`
    );
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