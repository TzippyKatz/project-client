import { useState } from "react";
import { addFood } from "../../services/food.service";
import { foodType } from "../../types/food.type";
import { useNavigate } from "react-router-dom";

export const AddFood = () => {
    const [formData, setFormData] = useState<Omit<foodType, 'id'>>({
        name: "",
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        cholesterol: 0,
        sugars: 0,
        sodium: 0,
        imageUrl: ""
    });
    
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "name" || name === "imageUrl" ? value : Number(value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || formData.calories <= 0) {
            setError("יש להזין שם וכמות קלוריות תקינה.");
            return;
        }
        setError("");
        console.log("נתוני המזון:", formData);
        const response = await addFood(formData);
        console.log(response);
        navigate("/diet");
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "right" }}>
            <h2>הוספת מזון</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>שם המזון:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />

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

                <label>תמונה (קישור):</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

                <label>סוג מזון (Parve, Meaty, Dairy):</label>
                <input type="text" name="pmd" onChange={handleChange} />

                <button type="submit">הוסף מזון</button>
            </form>
        </div>
    );
};
