import GoogleSignIn from "./google-sign-in";

export default function SignInCard() {
    return(
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-app-window-icon lucide-app-window">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M10 4v4"/>
                    <path d="M2 8h20"/>
                    <path d="M6 4v4"/>
                </svg>
            </div>
            <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="flex justify-center items-center w-auto">
            <GoogleSignIn/>
        </div>
    </div>
   
    )
}