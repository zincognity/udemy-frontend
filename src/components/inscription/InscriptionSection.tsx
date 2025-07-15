import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function InscriptionSection() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            } catch {
                setUser(null);
            }
        }
    }, []);

    if (!user) {
        return (
            <>
                <section className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        1. Inicia sesión o crea una cuenta
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Necesitas una cuenta de Udemy para poder acceder a tus
                        cursos. Asegúrate de que tu correo sea correcto. Al
                        registrarte aceptas nuestras{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                            Condiciones de uso
                        </a>{" "}
                        y nuestra{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                            Política de privacidad
                        </a>
                        .
                    </p>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block font-bold text-gray-700 mb-2"
                        >
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            disabled
                            placeholder="ejemplo@correo.com"
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                        />
                        <small className="text-gray-500 text-sm">
                            No se necesita contraseña
                        </small>
                    </div>
                    <button
                        onClick={() => (window.location.href = "/register")}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md font-semibold transition-colors"
                    >
                        Registrarse
                    </button>
                </section>
            </>
        );
    }

    return (
        <>
            <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    1. Usuario identificado
                </h3>
                <p className="text-gray-700 mb-2">
                    Correo: <strong>{user.email}</strong>
                </p>
                <p className="text-gray-700 mb-2">
                    Nombres: <strong>{user.name}</strong>
                </p>
            </section>
        </>
    );
}
