// src/pages/api/auth/logout.js
import { serialize } from 'cookie';

const COOKIE_NAME = 'authToken'; // Pastikan sama dengan yang diset saat login

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Set cookie dengan tanggal kedaluwarsa di masa lalu untuk menghapusnya
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // true di produksi
    sameSite: 'strict',
    expires: new Date(0), // Set expired
    path: '/', // Path harus sama dengan saat cookie diset
  }));

  res.status(200).json({ message: 'Logout berhasil' });
}