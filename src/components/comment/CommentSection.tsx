import { useEffect, useState } from "react";

interface Comment {
    id: number;
    message: string;
    author: {
        name: string;
        avatarUrl?: string;
        position?: string;
    };
}

interface CreateCommentRequest {
    message: string;
    userId: number;
    courseId: number;
}

interface Props {
    courseId: number;
}

export default function CommentSection({ courseId }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/comment/search?course=${courseId}`)
            .then((res) => res.json())
            .then((data) => setComments(data.elements || []))
            .finally(() => setLoading(false));
    }, [courseId]);

    const handleSubmit = async () => {
        if (!user) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }

        const payload: CreateCommentRequest = {
            message,
            userId: user.id,
            courseId,
        };

        const res = await fetch("http://localhost:8080/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            const newComment = await res.json();
            setComments((prev) => [newComment, ...prev]);
            setMessage("");
        } else {
            alert("Error al comentar");
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-4 py-6">
            <h2 className="text-xl font-semibold mb-4">
                {comments.length > 0
                    ? `${comments.length} valoraciones del curso`
                    : "Sin comentarios aún"}
            </h2>

            {user && (
                <div className="mb-6">
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 mb-2"
                        rows={3}
                        placeholder="Deja tu comentario..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold"
                    >
                        Comentar
                    </button>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
                {loading ? (
                    <p className="text-gray-500">Cargando comentarios...</p>
                ) : comments.length > 0 ? (
                    comments.map((c) => (
                        <div key={c.id} className="bg-white rounded shadow p-4">
                            <p className="text-gray-800 mb-4">"{c.message}"</p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={
                                        c.author.avatarUrl ||
                                        "/default-avatar.png"
                                    }
                                    alt={c.author.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold">
                                        {c.author.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {c.author.position || "Estudiante"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full">
                        Sé el primero en dejar un comentario.
                    </p>
                )}
            </div>
        </section>
    );
}
