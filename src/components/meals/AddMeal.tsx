import { useState } from "react";
import { addMeal } from "../../services/meal.service";
import { foodType } from "../../types/food.type";

export const AddMeal = () => {
    const [formData, setFormData] = useState({
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        cholesterol: 0,
        sugars: 0,
        sodium: 0,
        foods: [] as foodType[],
        typeMealId: 0,
        dietId: 0
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
        console.log(response);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>הוספת ארוחה</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>קלוריות:</label>
                <input type="number" name="calories" value={formData.calories} onChange={handleChange} />

                <label>פחמימות:</label>
                <input type="number" name="carbohydrates" value={formData.carbohydrates} onChange={handleChange} />

                <label>חלבונים:</label>
                <input type="number" name="proteins" value={formData.proteins} onChange={handleChange} />

                <label>מזונות (מופרדים בפסיק):</label>
                <input type="text" name="foods" onChange={handleFoodsChange} />

                <label>סוג הארוחה:</label>
                <input type="number" name="typeMealId" value={formData.typeMealId} onChange={handleChange} />

                <button type="submit">הוסף ארוחה</button>
            </form>
        </div>
    );
};


// סטיילים עבור ה-Modal
const modalOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
};

const modalStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
};