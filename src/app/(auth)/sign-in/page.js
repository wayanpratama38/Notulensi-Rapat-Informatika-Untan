// 'use server'

// import GoogleSignIn from "@/components/ui/google-sign-in";
// import SignInCard from "@/components/ui/sign-in-card";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function Page() {
//     const session = await auth();
//     if (session) {
//         redirect("/dashboard");
//     }

//     return <SignInCard/>
// }



// src/app/(auth)/sign-in/page.js
// 'use server' // Tidak perlu 'use server' di sini, ini komponen halaman standar

import SignInCard from "@/components/ui/sign-in-card"; // Impor card yang sudah dimodifikasi
// import { auth } from "@/lib/auth"; // Komentari jika auth belum siap atau sesuaikan
// import { redirect } from "next/navigation";

// export default async function Page() { // Async jika menggunakan auth()
export default function Page() { // Buat non-async jika auth() belum siap
    // --- Cek Sesi (Aktifkan jika auth sudah siap) ---
    // const session = await auth();
    // if (session) {
    //     redirect("/dashboard");
    // }
    // --- Akhir Cek Sesi ---

    return <SignInCard />; // Render card yang berisi form dan Google button
}

// Tambahkan metadata jika perlu
export const metadata = {
    title: 'Sign In | Aplikasi Notulensi Rapat',
    description: 'Sign in to your account',
};