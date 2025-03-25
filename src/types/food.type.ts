export type foodType = {
    id: number;
    name: string;
    calories: number;
    carbohydrates: number;
    proteins: number;
    cholesterol: number;
    sugars: number;
    sodium: number;
    // pmd: Pmd;
    // category: Categories;
    imageUrl: string;
}


export enum Pmd {
    Parve = "Parve",
    Meaty = "Meaty",
    Dairy = "Dairy"
}

export enum Categories{
    Dairy = "Dairy",
    Vegetables = "Vegetables",
    Breads = "Breads",
    Meats = "Meats",
    Carbohydrates = "Carbohydrates",
    Nutrients = "Nutrients",
    Sweets = "Sweets",
    Fruits = "Fruits",
    Savories = "Savories",
    Fish = "Fish",
    Eggs = "Eggs"
}