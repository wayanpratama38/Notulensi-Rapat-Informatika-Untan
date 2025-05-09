import { PrismaClient } from '@/generated/prisma';
// Atau path absolut relatif terhadap root proyek jika alias '@' belum terkonfigurasi benar untuk lib:
// import { PrismaClient } from '../generated/prisma'; // (asumsi lib ada di src/lib)
// atau jika lib di root:
// import { PrismaClient } from './src/generated/prisma';

let prisma;

// Cek apakah sudah ada instance global (khususnya penting dalam mode development Next.js)
if (process.env.NODE_ENV === 'production') {
  // Di produksi, selalu buat instance baru
  prisma = new PrismaClient();
} else {
  // Di development, gunakan instance global jika ada, jika tidak buat baru
  if (!global._prisma) {
    global._prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'], // Uncomment untuk debug query SQL
    });
  }
  prisma = global._prisma;
}

export default prisma;