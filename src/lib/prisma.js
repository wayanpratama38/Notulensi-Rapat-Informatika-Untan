import { PrismaClient } from '@prisma/client';

// Create the Prisma client with options to control file scanning
let prisma;

 if (process.env.NODE_ENV === 'production') {
  // In production but not build, use the real client
  prisma = new PrismaClient();
} else {
  // In development, use global singleton
  if (!global._prisma) {
    global._prisma = new PrismaClient();
  }
  prisma = global._prisma;
}

export default prisma;