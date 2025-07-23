import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log("API /users: Attempting to fetch users");
      
      // Build where clause
      const whereClause = {
        role: {
          not: 'ADMIN'
        }
      };
      
      // Add role filter if present
      if (req.query.role) {
        whereClause.role = req.query.role;
      }
      
      const users = await prisma.user.findMany({
        orderBy: { nama: 'asc' },
        select: {
          id: true,
          nama: true,
          email: true,
          tandaTangan: true,
          role: true,
        },
        where: whereClause
      });
      
      console.log(`API /users: Found ${users.length} users`);
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
  } else if (req.method === 'POST') {
    try {
      const { nama, email, tandaTangan, role, password } = req.body;
      if (!nama) {
        return res.status(400).json({ message: 'Nama pengguna wajib diisi' });
      }
      
      if (!password) {
        return res.status(400).json({ message: 'Password wajib diisi' });
      }
      
      // Hash password before storing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const newUser = await prisma.user.create({
        data: {
          nama,
          email,
          password: hashedPassword,
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

// export default authenticate(handler);
export default handler; 