import { useState } from "react";
import { addMeal } from "../../services/meal.service";
import { Categories, foodType, Pmd } from "../../types/food.type";

interface AddMealProps {
    dietId: number
}

export const AddMeal: React.FC<AddMealProps> = ({ dietId }) => {
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
        const numericValue = Number(value);
        if (numericValue < 0) {
            setError("יש להזין ערכים חיוביים בלבד.");
            return;
        }
        setError("");
        setFormData(prevState => ({
            ...prevState,
            [name]: numericValue
        }));
    };

    const handleFoodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!value.trim()) {
            setError("יש להזין לפחות מזון אחד.");
            return;
        }
        const foodItems: foodType[] = value.split(",").map((food, index) => ({
            id: index + 1,
            name: food.trim(),
            calories: 0,
            carbohydrates: 0,
            proteins: 0,
            cholesterol: 0,
            sugars: 0,
            sodium: 0,
            imageUrl: "",
            pmd: Pmd.Parve,
            category: Categories.Dairy,
            imageFile: null
        }));

        setFormData(prevState => ({
            ...prevState,
            foods: foodItems
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.calories <= 0 || formData.proteins < 0 || formData.carbohydrates < 0 || formData.sugars < 0 || formData.sodium < 0 || formData.cholesterol < 0) {
            setError("כל הערכים חייבים להיות מספרים חיוביים.");
            return;
        }
        if (formData.foods.length === 0) {
            setError("נא להזין לפחות מזון אחד.");
            return;
        }
        if (formData.typeMealId <= 0) {
            setError("נא לבחור סוג ארוחה תקין.");
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

                <label>קולוסרול:</label>
                <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} />

                <label>סוכרים:</label>
                <input type="number" name="sugars" value={formData.sugars} onChange={handleChange} />

                <label>נתרן:</label>
                <input type="number" name="sodium" value={formData.sodium} onChange={handleChange} />

                <button type="submit">הוסף ארוחה</button>
            </form>
        </div>
    );
}


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
