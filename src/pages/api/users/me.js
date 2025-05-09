// src/pages/api/users/me.js
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware'; // Middleware manual Anda

async function handler(req, res) {


  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: 'Sesi tidak valid atau pengguna tidak ditemukan.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { 
        id: true,
        nama: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan di database.' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Error fetching current user data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default authenticate(handler); 