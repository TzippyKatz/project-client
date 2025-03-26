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
    const [selectedPmd, setSelectedPmd] = useState<Pmd | "">("");
    const [selectedCategory, setSelectedCategory] = useState<Categories | "">("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "imageFile" && files) {
            // עדכון הסטייט עבור קובץ התמונה
            setFormData(prevState => ({
                ...prevState,
                imageFile: files[0] // כאן אנחנו מעדכנים את הסטייט עם הקובץ עצמו
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
        if (!formData.name.trim()) {
            return "יש להזין שם מזון.";
        }
        if (formData.calories <= 0) {
            return "כמות הקלוריות חייבת להיות מספר חיובי.";
        }
        if (formData.carbohydrates < 0 || formData.proteins < 0 || formData.cholesterol < 0 || formData.sugars < 0 || formData.sodium < 0) {
            return "כל הערכים התזונתיים חייבים להיות מספרים חיוביים או אפס.";
        }
        if (formData.imageUrl === "" && formData.imageFile === null) {
            return "יש להעלות תמונת מוצר"
        }
        return "";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, imageFile: e.target.files ? e.target.files[0] : null });
    };

    // עדכון הסטייט רק אם נבחר ערך תקני
    useEffect(() => {
        if (selectedPmd !== "") {
            setFormData(prevState => ({ ...prevState, pmd: Number(selectedPmd) }));
        }
    }, [selectedPmd]);

    useEffect(() => {
        if (selectedCategory !== "") {
            setFormData(prevState => ({ ...prevState, category: Number(selectedCategory) }));
        }
    }, [selectedCategory]);


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
                <input type="file" id="file" name="imageFile" onChange={handleChange} accept="image/*" />
                {/* <label>תמונה (קישור):</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} /> */}
                <div className="selectors-container">
                    <select value={selectedPmd} onChange={(e) => setSelectedPmd(e.target.value as unknown as Pmd)}>
                        <option value="">בחר סוג</option>
                        {Object.keys(Pmd).map((key) => (
                            <option key={key} value={Pmd[key as keyof typeof Pmd]}>
                                {key} {/* מציג את הערכים המחרוזתיים */}
                            </option>
                        ))}
                    </select>

                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as unknown as Categories)}>
                        <option value="">בחר קטגוריה</option>
                        {Object.values(Categories).map((category) => (
                            <option key={category} value={Categories[category as keyof typeof Categories]}>{category}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">הוסף מזון</button>
            </form>
        </div>
    );
};