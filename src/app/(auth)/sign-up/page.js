// export default function Page() {
//     return(
//         <div>SIGN UP PAGE</div>
//     )
// }


// src/app/(auth)/sign-up/page.js
// 'use server' // Tidak perlu

import SignUpCard from "@/components/ui/sign-up-card"; // Impor card sign-up baru
// import { auth } from "@/lib/auth"; // Komentari jika auth belum siap
// import { redirect } from "next/navigation";

// export default async function Page() { // Async jika menggunakan auth()
export default function Page() { // Non-async jika auth() belum siap
    // --- Cek Sesi (Aktifkan jika auth sudah siap) ---
    // const session = await auth();
    // if (session) {
    //     redirect("/dashboard"); // Redirect jika sudah login
    // }
    // --- Akhir Cek Sesi ---

    return <SignUpCard />; // Render card sign-up
}

// Tambahkan metadata
export const metadata = {
    title: 'Sign Up | Aplikasi Notulensi Rapat',
    description: 'Create a new account',
};