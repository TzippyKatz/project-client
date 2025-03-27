export type foodType = {
    id: number;
    name: string;
    calories: number;
    carbohydrates: number;
    proteins: number;
    cholesterol: number;
    sugars: number;
    sodium: number;
    pmd: Pmd;
    category: Categories;
    //חובה להעלות תמונה
    imageUrl: string;
    imageFile: File | null;
}

export enum Pmd {
    Parve = 0,
    Meaty = 1,
    Dairy = 2
}

export enum Categories {
    Dairy = 0,
    Vegetables = 1,
    Breads = 2,
    Meats = 3,
    Carbohydrates = 4,
    Nutrients = 5,
    Sweets = 6,
    Fruits = 7,
    Savories = 8,
    Fish = 9,
    Eggs = 10
}