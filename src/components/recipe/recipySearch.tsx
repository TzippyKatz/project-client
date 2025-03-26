import { useState } from "react";
import { searchRecipes, getRecipeUrl } from "../../services/recipe.service";
import { Button, TextField, Card } from "@mui/material";

interface MealRecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MealRecipeModal: React.FC<MealRecipeModalProps> = ({ isOpen, onClose }) => {
    const [mealId, setMealId] = useState<string>("");
    const [recipes, setRecipes] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    const handleSearch = async () => {
        if (!mealId) {
            setError("נא להזין מזהה ארוחה.");
            return;
        }
        setError("");
        try {
            const result = await searchRecipes(Number(mealId));
            setRecipes(result);
        } catch (error) {
            setError("שגיאה בחיפוש מתכונים.");
        }
    };

    const handleGetRecipeUrl = async (recipeId: number) => {
        try {
            const url = await getRecipeUrl(recipeId);
            window.open(url, "_blank");
        } catch (error) {
            setError("שגיאה בקבלת כתובת מתכון.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-3">חיפוש מתכונים לארוחה</h2>
                {error && <p className="text-red-500">{error}</p>}
                <TextField
                    type="number"
                    placeholder="מזהה ארוחה"
                    value={mealId}
                    onChange={(e) => setMealId(e.target.value)}
                    fullWidth
                />
                <Button className="mt-2 w-full" variant="contained" color="primary" onClick={handleSearch}>חפש מתכונים</Button>
                <Button className="mt-2 w-full" variant="outlined" color="secondary" onClick={onClose}>סגור</Button>
                <div className="mt-4">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <Card key={recipe.id} className="mb-2 p-3">
                                <p>{recipe.name}</p>
                                <Button variant="contained" color="success" onClick={() => handleGetRecipeUrl(recipe.id)}>פתח מתכון</Button>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">אין מתכונים זמינים.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
