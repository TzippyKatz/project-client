import { useState } from "react";
import { AddMeal } from '../components/meals/AddMeal'

export const MealPage = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <h1>דף הארוחות</h1>
            <button onClick={() => setShowModal(true)}>הוסף ארוחה</button>
            <AddMeal />
        </div>
    );
};