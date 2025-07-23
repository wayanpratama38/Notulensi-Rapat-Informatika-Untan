// src/pages/api/users/me.js
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'authToken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the auth token from cookies
    const cookies = parse(req.headers?.cookie || '');
    const token = cookies[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ message: 'Tidak terautentikasi' });
    }

    // Verify and decode the JWT
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Token tidak valid' });
    }

    // Get user ID from decoded token
    const userId = decoded.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Data pengguna tidak ditemukan dalam token' });
    }

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        tandaTangan: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan di database' });
    }

    // Return user data
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user data:", error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
} 