import SignInForm from './sign-in-form';

export default function SignInCard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden relative">
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-blue-600">Aplikasi Notulensi Rapat</h1>
                        <p className="text-gray-600 mt-1">Teknik Informatika</p>
                        <p className="text-gray-600">Universitas Tanjungpura</p>
                    </div>

                    <SignInForm />
                    

                </div>
            </div>
        </div>
    );
}