import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  
  console.log("Register API hit. Method:", req.method);
  console.log("Request Body:", req.body);
  

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
     
     console.error("Missing required fields:", { nama, email, password: password ? '***' : undefined });
     
    return res.status(400).json({ message: 'Nama, email, dan password dibutuhkan' });
  }

  try {
    
    console.log(`Checking existing user for email: ${email}`);
    
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
       
       console.log(`Email already exists: ${email}`);
       
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    
    console.log(`Hashing password for user: ${email}`);
    
    const hashedPassword = await bcrypt.hash(password, 10); 
    
    console.log(`Password hashed successfully for: ${email}`);
    

    
    console.log(`Creating user in DB:`, { nama, email, password: '***' }); 
    
    const user = await prisma.user.create({
      data: { nama, email, password: hashedPassword },
    });
    
    console.log(`User created successfully:`, user.id);
     

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ message: 'User berhasil dibuat', user: userWithoutPassword });

  } catch (error) {
    
    console.error('Registrasi error in catch block:', error);
    
    if (error.code) {
      console.error('Prisma Error Code:', error.code);
    }
    
    res.status(500).json({ message: 'Internal server error', error: error.message }); 
  }
}