import { parse, serialize } from 'cookie'; // Impor fungsi spesifik
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'authToken';

export function authenticate(handler) {
  return async (req, res) => {
    // Cek apakah parse ada
    if (typeof parse !== 'function') {
       console.error('ERROR: parse function is not available!');
       return res.status(500).json({ message: 'Internal Server Error - Middleware Config' });
    }

    const cookies = parse(req.headers?.cookie || ''); 
    const token = cookies[COOKIE_NAME];

    if (!token) {
         console.log(`Auth Middleware: Token "${COOKIE_NAME}" not found.`);
         return res.status(401).json({ message: 'Akses ditolak. Sesi tidak ditemukan.' });
     }
     
     try {
       const decoded = jwt.verify(token, JWT_SECRET);
       
       // Log the decoded token for debugging
       console.log("Auth Middleware: Decoded token:", {
         userId: decoded.userId,
         email: decoded.email,
         role: decoded.role || 'No role in token'
       });
       
       // Make sure to include role in the user object
       req.user = {
         ...decoded,
         role: decoded.role // Ensure role is explicitly included
       };
       
       return handler(req, res);
     } catch (ex) {
       console.error("Auth Middleware: Invalid token -", ex.message);
       res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', { 
         httpOnly: true,
         secure: process.env.NODE_ENV !== 'development',
         sameSite: 'strict',
         expires: new Date(0),
         path: '/',
       }));
       return res.status(401).json({ message: 'Sesi tidak valid.' });
     }
  };
}