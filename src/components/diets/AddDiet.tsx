import React, { useEffect, useState, useRef } from "react"
import { addDiet, getDiet } from "../../services/diets.service";
import { dietType } from "../../types/diet.type";
import { mealType } from "../../types/meal.type"
import { useNavigate } from "react-router-dom";

export const AddDiet = () => {
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
        dietitianId: 0,
        descGoal: "",
        meals: [] as mealType[],
        rate: 0,
        ageMinimum: 0,
        ageMaximum: 0
    });

    const [error, setError] = useState<string | null>(null);
    const [diets, setDiets] = useState<Array<dietType>>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [goalInput, setGoalInput] = useState("");
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchDiets = async () => {
            const getDiets = await getDiet();
            setDiets(getDiets);
        }
        fetchDiets()
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const validateForm = () => {
        if (!formData.descGoal.trim()) return "תיאור הדיאטה נדרש.";
        if (formData.ageMinimum < 0 || formData.ageMinimum > 120) return "גיל מינימום חייב להיות בין 0 ל-120.";
        if (formData.ageMaximum < formData.ageMinimum || formData.ageMaximum > 120) return "גיל מקסימום חייב להיות בין 0 ל-120 ולגדול מגיל מינימום.";
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            console.log("trying add diet");
            const response = await addDiet(formData);
            console.log(response);
        } catch (err) {
            setError("Failed to add diet");
        }
    }

    const navigate = useNavigate();
    return (
        <div style={{ textAlign: "center", direction: "rtl" }}>
            <h2>דיאטה חדשה</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <label>תיאור:</label>
                <input type="text" value={formData.descGoal} onChange={(e) => setFormData({ ...formData, descGoal: e.target.value })} />
                
                {/* <label>משך זמן בשבועות:</label>
                <input type="number" onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value) })} /> */}

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
                    {showDropdown && diets.length > 0 && (
                        <div ref={dropdownRef} style={{ position: "absolute", width: "100%", maxHeight: "150px", overflowY: "auto", backgroundColor: "white", border: "1px solid #ccc", zIndex: 1000 }}>
                            {diets.filter(diet => diet.descGoal.includes(goalInput)).map((diet) => (
                                <div key={diet.id} onClick={() => { setGoalInput(diet.descGoal); setShowDropdown(false); }} style={{ padding: "5px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                                    {diet.descGoal}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" style={{ marginTop: "10px", backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>הוסף דיאטה</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
