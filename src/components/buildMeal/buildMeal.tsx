import { useState } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, Card } from "@mui/material";
import { optimizeMeal } from "../../services/buildMeal.service"; // או הנתיב המתאים לפי המיקום


interface OptimizeMealComponentProps {
    mealId: number;
    onOptimizationComplete: (optimizedMeal: any) => void;
}

const categories = [
    "Dairy",
    "Vegetables",
    "Breads",
    "Meats",
    "Carbohydrates",
    "Nutrients",
    "Sweets",
    "Fruits",
    "Savories",
    "Fish",
    "Eggs"
];

export const OptimizeMealComponent: React.FC<OptimizeMealComponentProps> = ({ mealId, onOptimizationComplete }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const handleCategoryChange = (category: string) => {
        setError("");
        setSelectedCategories((prevCategories) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter((item) => item !== category);
            }
            if (prevCategories.length < 3) {
                return [...prevCategories, category];
            }
            return prevCategories;
        });
    };

    const handleOptimize = async () => {
        if (selectedCategories.length === 0) {
            setError("נא לבחור לפחות קטגוריה אחת.");
            return;
        }
        setError("");
        try {
            const result = await optimizeMeal({
                mealId,
                requestedCategories: selectedCategories
            });
            onOptimizationComplete(result);
        } catch (error) {
            setError("שגיאה באופטימיזציה של הארוחה.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-3">אופטימיזציה של ארוחה</h2>
            {error && <p className="text-red-500">{error}</p>}
            <FormGroup>
                {categories.map((category) => (
                    <FormControlLabel
                        key={category}
                        control={
                            <Checkbox
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                disabled={selectedCategories.length >= 3 && !selectedCategories.includes(category)}
                            />
                        }
                        label={category}
                    />
                ))}
            </FormGroup>
            <Button className="mt-2 w-full" variant="contained" color="primary" onClick={handleOptimize}>
                בצע אופטימיזציה
            </Button>
            {selectedCategories.length > 0 && (
                <Card className="mt-4 p-3">
                    <h3 className="text-lg font-medium">קטגוריות נבחרות:</h3>
                    <p>{selectedCategories.join(", ")}</p>
                </Card>
            )}
        </div>
    );
};
