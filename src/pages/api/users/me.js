// src/pages/api/users/me.js
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Periksa cookie sesi secara manual
    const sessionCookie = req.cookies['next-auth.session-token'] || req.cookies['__Secure-next-auth.session-token'];
    
    if (!sessionCookie) {
      return res.status(401).json({ message: 'Anda tidak terautentikasi.' });
    }

    // Decode JWT dari cookie untuk mendapatkan email
    // Sementara menggunakan email dari query untuk debugging
    const email = req.query.email;
    
    if (email) {
      // Ambil data user dari database berdasarkan email
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          nama: true,
          email: true,
          role: true,
          image: true,
          tandaTangan: true
        }
      });

      if (user) {
        return res.status(200).json(user);
      }
    }
    
    // Jika tidak ada email atau user tidak ditemukan
    return res.status(404).json({ message: 'Pengguna tidak ditemukan di database.' });
  } catch (error) {
    console.error("Error fetching current user data:", error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
} 