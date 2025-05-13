import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        orderBy: { nama: 'asc' },
        select: {
          id: true,
          nama: true,
          email: true,
          tandaTangan: true,
          role: true,
          image: true
        }
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { nama, email, tandaTangan, role } = req.body;
      if (!nama) {
        return res.status(400).json({ message: 'Nama pengguna wajib diisi' });
      }
      
      const newUser = await prisma.user.create({
        data: {
          nama,
          email,
          tandaTangan,
          role: role || 'DOSEN'
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(409).json({ message: 'Email sudah digunakan oleh pengguna lain.' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler); 