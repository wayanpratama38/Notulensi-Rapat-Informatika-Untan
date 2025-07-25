import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'; 

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'authToken'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password dibutuhkan' });
  }

  try {
    // Log request for debugging
    console.log(`Login attempt for email: ${email}`);
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${email}`);
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Include role in the token payload
    const tokenPayload = { 
      userId: user.id, 
      email: user.email, 
      nama: user.nama,
      role: user.role 
    };
    
    // Log the payload for debugging
    console.log('Creating token with payload:', tokenPayload);
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' }); 

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', 
      sameSite: 'strict', 
      maxAge: 24 * 60 * 60 * 1000, 
      path: '/',
    };
    res.setHeader('Set-Cookie', serialize(COOKIE_NAME, token, cookieOptions));

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    console.log(`Login successful for user: ${email}, role: ${user.role}`);
    res.status(200).json({ message: 'Login berhasil', user: userWithoutPassword });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}