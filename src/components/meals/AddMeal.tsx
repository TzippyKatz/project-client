import { useState } from "react";
import { addMeal } from "../../services/meal.service";
import { foodType } from "../../types/food.type";
import { useNavigate } from "react-router-dom";


export const AddMeal = () => {
    const [formData, setFormData] = useState({
        id: 0,
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        cholesterol: 0,
        sugars: 0,
        sodium: 0,
        foods: [] as foodType[],
        typeMealId: 0
    });
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: Number(value)
        }));
    };

    const handleFoodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
    
        const foodItems: foodType[] = value.split(",").map((food, index) => ({
            id: index + 1,
            name: food.trim(),
            calories: 0,
            carbohydrates: 0,
            proteins: 0,
            cholesterol: 0,
            sugars: 0,
            sodium: 0,
            imageUrl: ""
        }));
    
    
        setFormData(prevState => ({
            ...prevState,
            foods: foodItems
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.calories <= 0 || formData.proteins < 0) {
            setError("יש להזין ערכים תקינים.");
            return;
        }
        setError("");
        console.log("נתוני הארוחה:", formData);
        const response = await addMeal(formData);
        console.log(response)
    };

    const navigate = useNavigate()
    
    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "right" }}>
            <h2>הוספת ארוחה</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>קלוריות:</label>
                <input type="number" name="calories" value={formData.calories} onChange={handleChange} />

                <label>פחמימות:</label>
                <input type="number" name="carbohydrates" value={formData.carbohydrates} onChange={handleChange} />

                <label>חלבונים:</label>
                <input type="number" name="proteins" value={formData.proteins} onChange={handleChange} />

                <label>כולסטרול:</label>
                <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} />

                <label>סוכרים:</label>
                <input type="number" name="sugars" value={formData.sugars} onChange={handleChange} />

                <label>נתרן:</label>
                <input type="number" name="sodium" value={formData.sodium} onChange={handleChange} />

                <label>מזונות (מופרדים בפסיק):</label>
                <input type="text" name="foods" onChange={handleFoodsChange} />

                <label>סוג הארוחה:</label>
                <input type="number" name="typeMealId" value={formData.typeMealId} onChange={handleChange} />

                <button type="submit" onClick={() => navigate("/diet")}>הוסף ארוחה</button>

            </form>
        </div>
    );
};
