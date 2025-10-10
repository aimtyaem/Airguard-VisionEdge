
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // In a real app, this would involve authentication logic
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-dark items-center justify-center p-4">
            <div className="flex flex-col max-w-[480px] flex-1 w-full items-center justify-center">
                <div className="w-20 h-20 bg-center bg-no-repeat bg-contain mb-6" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBufcJt-ql7vaMQaEmuRNhA0LNvD86wFSwCcao2Y1Rmc9D05xcDHMrOg6ChUxtbaajMPzHIFJp7QIjYBtuwDtkhvacTkwqALhJYxA6BCvbjwSdkLW26keDS-_lWrmUADXl8EewOrKiF_p1MiqBnV8UU9XJgsXrN7_gtrASHjwm47qHD5lkaVQD9gi6RUJuN_fm4eenMgJh9NZT1-g7D3_as-rD5Gn21EN23a2uBECtQYFCFsdIcPg_EulVKPFKaUSTxmoAIsT1obf7R')` }}></div>
                <div className="text-center mb-6">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Greenhouse Gas Anomaly Detector</h1>
                    <p className="text-text-secondary text-base font-normal leading-normal mt-3">Sign in to continue</p>
                </div>
                <div className="w-full max-w-[480px] flex flex-col gap-3 px-4">
                    <button onClick={handleLogin} className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold transition-opacity hover:opacity-80">
                        Sign in with Google
                    </button>
                    <button onClick={handleLogin} className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-surface-accent text-white text-base font-bold transition-opacity hover:opacity-80">
                        Sign in with Institutional Account
                    </button>
                </div>
                <div className="my-8 w-full">
                    <h4 className="text-text-secondary text-sm font-bold text-center px-4 py-2">Sync Edge Impulse Devices</h4>
                    <div className="grid grid-cols-2 gap-2 px-4">
                        <div className="flex flex-col items-center gap-2 py-2.5 text-center">
                            <div className="rounded-full bg-surface-accent p-2.5">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>bluetooth</span>
                            </div>
                            <p className="text-white text-sm font-medium">Bluetooth</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 py-2.5 text-center">
                            <div className="rounded-full bg-surface-accent p-2.5">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>wifi</span>
                            </div>
                            <p className="text-white text-sm font-medium">WiFi</p>
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 py-3">
                    <button className="flex items-center justify-center gap-2 w-full cursor-pointer rounded-lg h-12 px-5 bg-transparent border border-primary text-primary text-base font-bold transition-colors hover:bg-primary/10">
                        <span className="material-symbols-outlined">add</span>
                        <span>Add New Station</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
