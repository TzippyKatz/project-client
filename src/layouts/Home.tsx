import { useEffect, useState } from "react";
import { getFoods } from "../services/food.service";
import { getUsers } from "../services/user.service";
import { foodType } from "../types/food.type";
import { userType } from "../types/user.type";

export const HomePage = () => {
    const [f, setF] = useState<foodType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                const data = await getFoods();
                setF(data);
            } catch (err) {
                setError("Failed to fetch food");
            } finally {
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {f.map(f => (
                    <li key={f.id}>
                        <p>Name: {f.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
