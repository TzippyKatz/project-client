import { useEffect, useState } from "react";
import { addFood } from "../../services/food.service";
import { Categories, foodType, Pmd } from "../../types/food.type";
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
        imageUrl: "",
        pmd: Pmd.Parve,
        category: Categories.Dairy,
        imageFile: null
    });

    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "imageFile" && files) {
            setFormData(prevState => ({
                ...prevState,
                imageFile: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: name === "name" || name === "imageUrl" ? value : Number(value)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        const response = await addFood(formData);
        console.log(response);
        navigate("/diet");
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "יש להזין שם מזון.";
        if (formData.calories <= 0) return "כמות הקלוריות חייבת להיות מספר חיובי.";
        if (formData.carbohydrates < 0 || formData.proteins < 0 || formData.cholesterol < 0 || formData.sugars < 0 || formData.sodium < 0) {
            return "כל הערכים התזונתיים חייבים להיות מספרים חיוביים או אפס.";
        }
        if (!formData.imageUrl && !formData.imageFile) return "יש להעלות תמונת מוצר";
        return "";
    };
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value as unknown as Pmd | Categories
        }));
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

                <label>תמונה (קובץ):</label>
                <input type="file" name="imageFile" onChange={handleChange} accept="image/*" />
                
                <label>סוג (PMD):</label>
                <select name="pmd" value={formData.pmd} onChange={handleSelectChange}>
                    <option value="">בחר סוג</option>
                    {Object.values(Pmd).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>

                <label>קטגוריה:</label>
                <select name="category" value={formData.category} onChange={handleSelectChange}>
                    <option value="">בחר קטגוריה</option>
                    {Object.values(Categories).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <button type="submit">הוסף מזון</button>
            </form>
        </div>
    );
};
