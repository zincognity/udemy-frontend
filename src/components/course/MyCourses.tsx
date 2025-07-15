import { useEffect, useState } from "react";

type Course = {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    price: number;
};

export default function MyCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");

        if (!userData) {
            setError("Debes iniciar sesión primero.");
            setLoading(false);
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
            return;
        }

        const user = JSON.parse(userData);

        const fetchCourses = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/inscription/courses?id=${user.id}`
                );
                if (!res.ok) {
                    throw new Error("Error al obtener inscripciones");
                }

                const data = await res.json();
                const inscriptions = data || [];
                const coursesFromResponse = inscriptions.map(
                    (inscription: any) => inscription.course
                );
                setCourses(coursesFromResponse);
            } catch (err: any) {
                setError(err.message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-10 px-4 text-gray-700">
                Cargando tus cursos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto py-10 px-4 text-red-600 text-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Tus Cursos Inscritos
            </h1>

            {courses.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white shadow-sm rounded-lg overflow-hidden"
                        >
                            <img
                                src={`/src/assets${course.imagePath}`}
                                alt={course.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {course.name}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {course.description?.substring(0, 100)}...
                                </p>
                                <p className="text-purple-600 font-bold mt-3">
                                    S/{course.price.toFixed(2)}
                                </p>
                                <a
                                    href={`/course/${course.id}`}
                                    className="block mt-4 text-sm text-white bg-purple-600 px-4 py-2 text-center rounded hover:bg-purple-700 transition"
                                >
                                    Ir al curso
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">
                    No estás inscrito en ningún curso.
                </p>
            )}
        </div>
    );
}
