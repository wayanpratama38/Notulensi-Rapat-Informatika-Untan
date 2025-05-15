import { PrismaClient } from '../generated/prisma';


let prisma;


if (process.env.NODE_ENV === 'production') {
  
  prisma = new PrismaClient();
} else {
  
  if (!global._prisma) {
    global._prisma = new PrismaClient({
      // log: ['query', 'info', 'warn', 'error'], 
    });
  }
  prisma = global._prisma;
}

export default prisma;