import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from "@mui/material";
import { mealType } from "../../types/meal.type";
import { getMealsByDiet } from "../../services/meal.service";
import { useLocation, useNavigate } from "react-router-dom";

interface MealModalProps {
  dietId: number;
  isOpen: boolean;
  onClose: () => void;
}

// export const GetMeals: React.FC<MealModalProps> = ({ dietId, isOpen, onClose }) => {
export const GetMeals: React.FC = () => {
  const location = useLocation();
  const { dietId: dietIdFromState, isOpen: isOpenFromState } = location.state || {};

  const [isOpen, setIsOpen] = useState(isOpenFromState || false);
  const [dietId, setDietId] = useState(dietIdFromState || null);

  const [meals, setMeals] = useState<mealType[]>([])


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const fetchedMeals = await getMealsByDiet(dietId)
        setMeals(fetchedMeals)
      } catch (err) {
        console.error("Failed to fetch food");
      };
    };
    fetchMeals();
  }, []);

  const navigate = useNavigate()

  const handleNavigate = (mealId: number) => {
    console.log("mealId: " + mealId)
    const customValues = { mealIdProps: mealId, isOpen: true };
    console.log("customValues: " + JSON.stringify(customValues))
    navigate("/recipe", { state: customValues });
  };

  return (
    <Dialog open={isOpen} fullWidth maxWidth="md">
      <DialogTitle>פרטי הארוחות</DialogTitle>
      <DialogContent>
        {meals.map((meal, mealIndex) => (
          <Card key={mealIndex} variant="outlined" style={{ marginBottom: 16, padding: 8 }}>
            <CardContent>
              <Typography variant="h6">ארוחה {mealIndex + 1}</Typography>
              <List>
                {[
                  { label: "קלוריות", value: `${meal.calories}` },
                  { label: "פחמימות", value: `${meal.carbohydrates} גרם` },
                  { label: "חלבונים", value: `${meal.proteins} גרם` },
                  { label: "כולסטרול", value: `${meal.cholesterol} מ"ג` },
                  { label: "סוכר", value: `${meal.sugars} גרם` },
                  { label: "נתרן", value: `${meal.sodium} מ"ג` },
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${item.label}: ${item.value}`} />
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText primary="מרכיבי הארוחה:" />
                </ListItem>
                {meal.foods.map((food, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${food.name}: ${food.calories} קלוריות`} />
                  </ListItem>
                ))}
              </List>
              <DialogActions>
                <Button color="primary" variant="contained" onClick={() => handleNavigate(meal.id)}>חפש מתכון</Button>
                <Button color="secondary" variant="contained">ארוחה מותאמת אישית</Button>
              </DialogActions>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={onClose} color="primary">
          סגור
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}


// קומפוננטה שמציגה את כפתור פתיחת המודאל
const MealCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mealData: mealType = {
    id: 1,
    calories: 500,
    carbohydrates: 60,
    proteins: 30,
    cholesterol: 50,
    sugars: 10,
    sodium: 200,
    foods: [],
    typeMealId: 0,
    dietId: 1
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        הצג פרטי הארוחה
      </Button>
      {/* <GetMeal dietId={mealData} isOpen={isOpen} onClose={handleClose} /> */}
    </div>
  );
};

export default MealCard;
