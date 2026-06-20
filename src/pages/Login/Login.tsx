import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { setLocalStrorage } from "../../utils/storage"; // Tetap import sesuai nama utility kamu
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        const form = event.target as HTMLFormElement;
        const payload = {
            email: form.email.value,
            password: form.password.value,
        };

        try {
            const result = await login(payload);
            
            if (result && result.token) {
                setLocalStrorage('auth', result.token);
                navigate('/orders');
            } else {
                setErrorMsg("Email atau password salah.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMsg("Terjadi kesalahan jaringan atau server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-amber-50 h-screen w-full flex justify-center items-center overflow-hidden">
            <div className="w-full h-full lg:grid lg:grid-cols-2 max-w-[1440px] mx-auto">
                
                {/* SISI KIRI: FORM LOGIN */}
                <div className="flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 h-full bg-amber-50">
                    <div className="w-full max-w-md space-y-6">
                        
                        {/* LOGO & BRANDING */}
                        <div className="space-y-2">
                            {/* Catatan: Di Vite, folder public langsung dipanggil dari '/' tanpa kata 'public' */}
                            <img src="/logo.png" alt="logoyumacafe" className="w-[70px] md:w-[90px] h-auto object-contain" />
                            <h1 className="life-savers-extrabold text-3xl font-bold mt-4 text-[#523728] tracking-tight">
                                Masuk
                            </h1>
                            <p className="life-savers-regular text-[#523728]/80 text-lg">
                                Selamat Datang di Platform YumaCafe
                            </p>
                        </div>

                        {/* ERROR MESSAGE (JIKA GAGAL) */}
                        {errorMsg && (
                            <div className="p-3 text-sm bg-red-100 text-red-700 rounded-xl border border-red-200 animate-shake">
                                {errorMsg}
                            </div>
                        )}

                        {/* FORM UTAMA */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-[#523728]/70 pl-1">Email</label>
                                <Input 
                                    type="email" 
                                    placeholder="Masukkan Email" 
                                    className="input md:input-lg w-full focus:ring-2 focus:ring-[#523728]/20 transition-all" 
                                    name="email"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-[#523728]/70 pl-1">Password</label>
                                <Input 
                                    type="password" 
                                    placeholder="Masukkan Password" 
                                    className="input md:input-lg w-full focus:ring-2 focus:ring-[#523728]/20 transition-all" 
                                    name="password"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <Button 
                                    variant="coklat" 
                                    type="submit" 
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            {/* Spinner Loading Indikator */}
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Memproses...</span>
                                        </>
                                    ) : (
                                        "Masuk"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* SISI KANAN: BANNER BESAR IMAGE (HANYA LAYAR LARGE) */}
                <div className="hidden lg:block h-full bg-[#523728]/5 p-6">
                    <img 
                        src="/logolg.jpeg" 
                        alt="YumaCafe Banner" 
                        className="w-full h-full object-cover rounded-3xl shadow-md border border-[#523728]/10" 
                    />
                </div>

            </div>
        </div>
    );
};

export default Login;