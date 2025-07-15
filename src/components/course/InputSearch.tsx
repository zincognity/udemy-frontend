import { useEffect, useState } from "react";

export default function InputSearch() {
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:8080/curso/search?name=${encodeURIComponent(
                    search
                )}`
            );

            const data = await response.json();

            console.log(data);
        };

        if (search) fetchData();
    }, [search]);

    return (
        <>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
        </>
    );
}
