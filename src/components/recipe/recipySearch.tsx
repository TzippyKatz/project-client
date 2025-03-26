import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // הוספת import
import { searchRecipes, getRecipeUrl } from "../../services/recipe.service";

interface MealRecipeModalProps {
    mealIdProps: number;
    isOpen: boolean;
    onClose: () => void;
}

export const MealRecipe: React.FC<MealRecipeModalProps> = ({ mealIdProps, isOpen, onClose }) => {
    const location = useLocation(); // שימוש ב-useLocation
    const { mealIdProps: mealIdFromState, isOpen: isOpenFromState } = location.state || {}; // קבלת הערכים מ-state
    const [recipes, setRecipes] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const[url, setUrl] = useState("")

    const mealId = mealIdFromState || mealIdProps;
    useEffect(() => {
        console.log("mealIdProps: " + mealId);
    }, [mealId]);

    useEffect(() => {
        const fetchURLs = async () => {
            if (!mealId) {
                setError("מזהה הארוחה לא זמין.");
                return;
            }
            try {
                const recipesList = await searchRecipes(mealId);
                setRecipes(recipesList);
            } catch (error) {
                setError("שגיאה בקבלת כתובת מתכון.");
            }
        };
        fetchURLs();
    }, [mealId]);

    useEffect(() => {
        console.log("recipes: " + JSON.stringify(recipes));
    }, [recipes]);

    const handleClick = async (recipeId: number) => {
        console.log("recipeId: " + recipeId);
        try {
            const urls = await getRecipeUrl(recipeId); // קבלת ה-URL מהשרת
            setUrl(urls); // עדכון ה-state עם ה-URL
            console.log(urls);
    
            // פתיחת ה-URL בכרטיסיה חדשה
            if (url) {
                const recipeUrl = url; // אם יש URL, השתמשו בו
                window.open(recipeUrl, "_blank"); // פותח את ה-URL בכרטיסיה חדשה
            } else {
                console.log("No URL found for recipe.");
            }
        } catch (error) {
            console.error("Error fetching recipe URL:", error);
        }
    };
    

    if (!isOpen) return null;

    return (
        <div>
            {error && <div>{error}</div>}
            <div>
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <button onClick={() => handleClick(recipe.id)}>
                            <div>
                                <img
                                    src={recipe.image}  // הצגת התמונה
                                    alt={recipe.title}   // תיאור של התמונה (לנגישות)
                                    style={{ width: "100px", height: "auto", marginRight: "10px" }}  // סגנון פשוט לתמונה
                                />
                                {recipe.title}
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};