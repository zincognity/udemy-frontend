import { useEffect, useState } from "react";

export default function Header() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const stored = window.localStorage.getItem("user");
        console.log("Contenido de localStorage:", stored);

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                console.log("Usuario parseado:", parsed);
                setUser(parsed);
            } catch (err) {
                console.error("Error al parsear usuario:", err);
            }
        }
    }, []);

    return (
        <header className="bg-white border-b border-gray-300 shadow-md sticky top-0 z-50">
            <div className="mx-auto px-5 h-[70px] flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <a href="/" className="text-xl font-bold text-black">
                        Udemy
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    <a href="/payout" className="text-2xl text-gray-800">
                        🛒
                    </a>

                    {user ? (
                        <>
                            <span className="text-sm text-gray-700">
                                Hola, {user.name}
                            </span>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}
                                className="px-4  text-sm font-semibold text-white py-2 rounded bg-purple-600 hover:bg-purple-700"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <a
                                href="/login"
                                className="bg-white text-gray-900 px-4 py-2 text-sm font-semibold rounded hover:bg-gray-100"
                            >
                                Iniciar Sesión
                            </a>
                            <a
                                href="/register"
                                className="bg-gray-900 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-black"
                            >
                                Regístrate
                            </a>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
