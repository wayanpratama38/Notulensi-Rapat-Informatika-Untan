import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { authenticate } from '@/lib/authMiddleware';

async function handler(req, res) {
  const { id: userId } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          nama: true,
          email: true,
          tandaTangan: true,
          role: true
        }
      });
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { nama, email, tandaTangan, role, password, oldPassword } = req.body;
      
      // Prepare data object to update
      const dataToUpdate = {};
      
      // Only add fields that are provided and not undefined
      if (nama !== undefined) dataToUpdate.nama = nama;
      if (email !== undefined) dataToUpdate.email = email;
      if (tandaTangan !== undefined) dataToUpdate.tandaTangan = tandaTangan;
      if (role !== undefined) dataToUpdate.role = role;
      
      // If password provided, verify old password first when it's a password change request
      if (password && oldPassword) {
        // Get current user data to verify password
        const currentUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { password: true }
        });
        
        if (!currentUser) {
          return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        
        // Verify old password
        const isPasswordValid = await bcrypt.compare(oldPassword, currentUser.password);
        
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Password lama tidak valid' });
        }
        
        // Password is valid, hash the new password
        const saltRounds = 10;
        dataToUpdate.password = await bcrypt.hash(password, saltRounds);
      } else if (password) {
        // Regular admin update without oldPassword verification
        const saltRounds = 10;
        dataToUpdate.password = await bcrypt.hash(password, saltRounds);
      }
      
      // Only proceed with update if there's data to update
      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'Tidak ada data yang diperbarui' });
      }
      
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: dataToUpdate, 
        select: {
          id: true,
          nama: true,
          email: true,
          tandaTangan: true,
          role: true
        }
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(409).json({ message: 'Email sudah digunakan oleh pengguna lain.' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Cari pengguna terlebih dahulu
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      
      // Hapus semua catatan partisipasi rapat terlebih dahulu
      await prisma.meetingParticipant.deleteMany({
        where: { userId }
      });
      
      // Hapus pengguna
      await prisma.user.delete({ where: { id: userId } });
      res.status(200).json({ message: 'Pengguna berhasil dihapus' }); 
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler); 