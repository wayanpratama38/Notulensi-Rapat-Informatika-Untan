import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma"

// Konfigurasi AUTH tanpa adapter, hanya menggunakan JWT
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }
    }
  })],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        // Periksa domain email
        if (!profile.email.endsWith("@informatika.untan.ac.id") && !profile.email.endsWith("@student.untan.ac.id")) {
          console.log(`Login ditolak untuk ${profile.email}: domain tidak valid`);
          return false;
        }
        
        const adminEmails = [
          // Add admin emails here if needed
          "d1041221054@student.untan.ac.id",
        ];
        
        const isAdmin = adminEmails.includes(profile.email);
        
        // Periksa apakah user sudah ada di database
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
          select: { id: true, role: true, email: true }
        });
        
        if (existingUser) {
          // Update role jika diperlukan
          if (isAdmin && existingUser.role !== "ADMIN") {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { role: "ADMIN" }
            });
            console.log(`Updated user ${existingUser.email} to ADMIN role`);
          }
        } else {
          // Buat user baru jika belum ada
          await prisma.user.create({
            data: {
              id: user.id,
              email: profile.email,
              nama: profile.name || user.name,
              image: profile.picture,
              role: isAdmin ? "ADMIN" : "DOSEN"
            }
          });
          console.log(`Created new user ${profile.email} with role ${isAdmin ? "ADMIN" : "DOSEN"}`);
        }
        
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    
    async jwt({ token, user, account, profile }) {
      try {
        // Selalu ambil data terbaru dari database
        if (token.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { id: true, role: true, nama: true }
          });
          
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.name = dbUser.nama;
          }
        }
        
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      
      return session;
    }
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET || process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
})