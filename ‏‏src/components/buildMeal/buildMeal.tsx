import { useState } from "react"
import { Button, Checkbox, FormControlLabel, FormGroup, Card } from "@mui/material"
import { optimizeMeal } from "../../services/buildMeal.service";
import { useLocation } from "react-router-dom"
import { jsPDF } from "jspdf";
import "jspdf-autotable";
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

export const BuildMeal: React.FC = () => {
    const location = useLocation()
    const { mealId: mealIdFromState } = location.state || {}
    const mealId = mealIdFromState

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [error, setError] = useState<string>("");
    const [optimizedMeal, setOptimizedMeal] = useState<any>(null);

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
            setOptimizedMeal(result); // עדכון הסטייט עם התוצאה
        } catch (error) {
            setError("שגיאה באופטימיזציה של הארוחה.");
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("ארוחה מותאמת", 10, 10);
        const tableData: any[] = [];

        Object.entries(optimizedMeal || {}).forEach(([category, items]: any) => {
            items.forEach((item: any) => {
                tableData.push([item.food.name, item.quantity, item.food.imageUrl]);
            });
        });

        doc.autoTable({
            head: [["שם", "כמות", "תמונה"]],
            body: tableData,
        });

        // כאן אנחנו מוודאים שההורדה תתרחש
        doc.save("meal.pdf"); // שמירת קובץ PDF בשם "meal.pdf"
    };

    return (
        <div className="p-4" style={{ maxHeight: "100vh", overflowY: "auto" }}>
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
                בנה לי ארוחה
            </Button>
            {optimizedMeal && (
                <Card className="mt-4 p-3">
                    <h3 className="text-lg font-medium">תוצאות:</h3>
                    {Object.entries(optimizedMeal).map(([category, items]: any) => (
                        <div key={category} className="mt-2">
                            <h4 className="font-bold">{category}</h4>
                            {items.map((item: any) => (
                                <div key={item.food.id} className="flex items-center gap-4 border-b pb-2 mb-2">
                                    <img src={item.food.imageUrl} alt={item.food.name} className="w-16 h-16" />
                                    <p>{item.food.name} - כמות: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                    <Button className="mt-2" variant="contained" color="secondary" onClick={handleDownloadPDF}>
                        הורד🖨️
                    </Button>
                </Card>
            )}
        </div>
    );
};

///