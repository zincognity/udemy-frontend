import { useEffect, useState } from "react";
import type { Category } from "../../types/category";
import type { Course } from "../../types/course";

export default function SearchSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(
                "https://udemy-backend.incognity.dev/categoria/list"
            );
            const data = await response.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const fetchAllCourses = async () => {
        const response = await fetch(
            "https://udemy-backend.incognity.dev/curso/list"
        );
        const data = await response.json();
        setCourses(data);
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const fetchCoursesByName = async (name: string) => {
        if (name.trim() === "") {
            fetchAllCourses();
            return;
        }

        const response = await fetch(
            `https://udemy-backend.incognity.dev/curso/search?name=${encodeURIComponent(
                name
            )}`
        );
        const data = await response.json();
        setCourses(data);
    };

    const handleCategoryClick = async (id: number) => {
        if (selectedCategoryId === id) {
            setSelectedCategoryId(null);
            fetchAllCourses();
        } else {
            setSelectedCategoryId(id);
            const response = await fetch(
                `https://udemy-backend.incognity.dev/curso/search?category=${id}`
            );
            const data = await response.json();
            setCourses(data);
        }
    };

    return (
        <>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-[300px]">
                <input
                    type="text"
                    placeholder="Buscar cualquier cosa"
                    className="bg-transparent focus:outline-none text-sm flex-1"
                    onChange={(e) => {
                        setSelectedCategoryId(null);
                        fetchCoursesByName(e.target.value);
                    }}
                />
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold">
                    Todas las habilidades profesionales que necesitas
                </h2>
                <p className="text-gray-600 mt-2">
                    Desde habilidades esenciales hasta temas técnicos de
                    cualquier área.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                    {categories.map((category) => {
                        const isSelected = selectedCategoryId === category.id;
                        return (
                            <button
                                key={category.id}
                                className={`px-4 py-2 rounded transition-all ${
                                    isSelected
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800 text-white hover:bg-gray-700"
                                }`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                {category.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mt-10">
                    Cursos para iniciar con tus metas
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img
                                src={`/src/assets${course.imagePath}`}
                                alt={course.name}
                                className="w-full h-44 object-cover"
                            />
                            <div className="p-4">
                                <a
                                    href={`/course/${course.id}`}
                                    rel="noopener noreferrer"
                                    className="font-semibold block hover:underline"
                                >
                                    {course.name}
                                </a>
                                <p className="text-sm text-gray-600 mt-2">
                                    {course.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
