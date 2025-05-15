import SignInCard from "@/components/ui/sign-in-card";

// Tambahkan metadata jika perlu
export const metadata = {
    title: 'Sign In | Aplikasi Notulensi Rapat',
    description: 'Sign in to your account',
};


export default function Page() { 
   
    return <SignInCard />; // Render card yang berisi form dan Google button
}
