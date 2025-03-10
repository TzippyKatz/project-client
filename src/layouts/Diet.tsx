import React, { useEffect, useState } from "react"
import { addDiet, getDiet } from "../services/diets.service";
import { dietType } from "../types/diet.type";
import { mealType } from "../types/meal.type"


export const DietPage = () => {
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
      });

    const [error, setError] = useState<string | null>(null)
    const [diets, setDiets] = useState<Array<dietType>>([])

    useEffect(() => {
        const fetchDiets = async () => {
            const getDiets = await getDiet();
        setDiets(getDiets);
        }
        fetchDiets()
    }, [])
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const dietType = formData

        try{
            console.log("trying add diet")
            const response = await addDiet(dietType)
            console.log("response")
        } catch(err){
            setError("Failed to add diet")
        } finally {
            console.log("Finally")
        }
    }

    return (
        <div style={{ textAlign: "center", direction: "rtl" }}>
            <h2>דיאטה חדשה</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <label>תיאור:</label>
                <input type="text" value={formData.descGoal} onChange={(e) => setFormData({ ...formData, descGoal: e.target.value})} />
    
                <label>משך זמן בשבועות:</label>
                <input type="number" onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value)})} />
    
                <label>גיל מינימום:</label>
                <input type="number" />
    
                <label>גיל מקסימום:</label>
                <input type="number" />
    
                <label>מטרה:</label>
                <select>
                    <option>בחר מטרה</option>
                    {diets.map(diets => (
                        <option key={diets.id} value={diets.descGoal}>{diets.descGoal}</option>
                    ))}
                </select>
    
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button type="button">ארוחה מס' 1</button>
                    <button type="button">ארוחה מס' 2</button>
                    <button type="button">ארוחה מס' 3</button>
                </div>
    
                <button type="submit" style={{ marginTop: "10px", backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>
                    הוסף דיאטה
                </button>
    
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );    
}