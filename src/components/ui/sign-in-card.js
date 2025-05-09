import Link from 'next/link'; 
import GoogleSignIn from "./google-sign-in";
import SignInForm from './sign-in-form'; 


export default function SignInCard() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Logo/Ikon */}
                <div className="flex justify-center items-center">
                    {/* SVG Anda */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-app-window-icon lucide-app-window text-gray-900 dark:text-gray-200">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M10 4v4"/>
                        <path d="M2 8h20"/>
                        <path d="M6 4v4"/>
                    </svg>
                </div>
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Sign in to your account
                </h2>
            </div>

            {/* Masukkan Form Sign In */}
            <SignInForm />

            {}
            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                    </div>
                </div>

                {/* Tombol Google Sign In */}
                <div className="mt-6 flex justify-center">
                    <GoogleSignIn />
                </div>
            </div>

             {/* Link ke Sign Up */}
             <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                Belum punya akun?{' '}
                <Link href="/sign-up" className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                    Sign Up Sekarang
                </Link>
            </p>
        </div>
    );
}