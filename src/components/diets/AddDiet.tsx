import React, { useEffect, useState, useRef } from "react"
import { addDiet, getDiet } from "../../services/diets.service";
import { dietType } from "../../types/diet.type";
import { mealType } from "../../types/meal.type"
import { useNavigate } from "react-router-dom";

// את כל ענייני הגלילה והעלמת רשימת המטרות עם הלחיצה מצ'אט GPT

export const AddDiet = () => {
    //ערך דיפולטיבי לסוג סעודה
    const defaultMealType = {
        id: 0,
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        cholesterol: 0,
        sugars: 0,
        sodium: 0,
        foods: [],
        typeMealId: 0
    };

    const [formData, setFormData] = useState({
        DietitianId: 0,
        descGoal: "",
        meals: [] as mealType[],
        rate: 0,
        ageMinimum: 0,
        ageMaximum: 0
    });

    const [error, setError] = useState<string | null>(null)
    const [diets, setDiets] = useState<Array<dietType>>([])
    const [showDropdown, setShowDropdown] = useState(false)  // לצורך הגלילה
    const [goalInput, setGoalInput] = useState("")           //טקסט שמקלידים כמטרת הדיאטה
    const filteredGoals = diets.filter((diet) =>             //סינון המטרות
        diet.descGoal.includes(goalInput)
    );
    const dropdownRef = useRef<HTMLDivElement | null>(null)                        // שימוש ב-useRef כדי לזהות לחיצות חיצוניות לרשימה

    useEffect(() => {
        const fetchDiets = async () => {
            const getDiets = await getDiet();
            setDiets(getDiets);
        }
        fetchDiets()
    }, [])

    // סגירת הרשימה בלחיצה מחוץ לשדה
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const dietType = formData

        try {
            console.log("trying add diet")
            const response = await addDiet(dietType)
            console.log(response)
        } catch (err) {
            setError("Failed to add diet")
        } finally {
            console.log("Finally")
        }
    }

    const navigate = useNavigate();
    return (
        <div style={{ textAlign: "center", direction: "rtl" }}>
            <h2>דיאטה חדשה</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <label>תיאור:</label>
                <input type="text" value={formData.descGoal} onChange={(e) => setFormData({ ...formData, descGoal: e.target.value })} />

                <label>משך זמן בשבועות:</label>
                <input type="number" onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value) })} />

                <label>גיל מינימום:</label>
                <input type="number" onChange={(e) => setFormData({ ...formData, ageMinimum: Number(e.target.value) })} />

                <label>גיל מקסימום:</label>
                <input type="number" onChange={(e) => setFormData({ ...formData, ageMaximum: Number(e.target.value) })} />


                <label>מטרה:</label>
                <div style={{ position: "relative", width: "200px" }}>
                    <input
                        type="text"
                        value={goalInput}
                        onChange={(e) => {
                            setGoalInput(e.target.value);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        style={{ width: "100%" }}
                    />
                    {showDropdown && filteredGoals.length > 0 && (
                        <div
                        ref={dropdownRef}
                            style={{
                                position: "absolute",
                                width: "100%",
                                maxHeight: "150px", // גובה מקסימלי לגלילה
                                overflowY: "auto",
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                zIndex: 1000,
                            }}
                        >
                            {filteredGoals.map((diet) => (
                                <div
                                    key={diet.id}
                                    onClick={() => {
                                        setGoalInput(diet.descGoal);
                                        setShowDropdown(false);
                                    }}
                                    style={{
                                        padding: "5px",
                                        cursor: "pointer",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    {diet.descGoal}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button type="button" onClick={() => navigate("/meal")}>ארוחה מס' 1</button>
                    <button type="button" onClick={() => navigate("/meal")}>ארוחה מס' 2</button>
                    <button type="button" onClick={() => navigate("/meal")}>ארוחה מס' 3</button>
                </div>

                <button type="submit" style={{ marginTop: "10px", backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>
                    הוסף דיאטה
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}