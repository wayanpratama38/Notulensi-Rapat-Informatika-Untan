
import Link from 'next/link';
import SignUpForm from './sign-up-form'; 

export default function SignUpCard() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                 {/* Logo/Ikon (Sama seperti Sign In) */}
                 <div className="flex justify-center items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-app-window-icon lucide-app-window text-gray-900 dark:text-gray-200">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M10 4v4"/>
                        <path d="M2 8h20"/>
                        <path d="M6 4v4"/>
                    </svg>
                </div>
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Create your account
                </h2>
            </div>

            {/* Masukkan Form Sign Up */}
            <SignUpForm />

             {}
             <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                Sudah punya akun?{' '}
                <Link href="/sign-in" className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                    Sign In
                </Link>
            </p>
        </div>
    );
}