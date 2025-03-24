import React, { useEffect, useState } from 'react';
import { getDiet, getDietByDietitianId, getDietitianNameByDietitianId } from '../../services/diets.service';
import { dietType } from "../../types/diet.type";
import { userType } from '../../types/user.type';
import { Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import { getUsers } from '../../services/user.service';
import './GetDiets.css'

interface GetDietsProps {
    showCreateFilters: boolean;
}

// export const GetDiets = () => {
export const GetDiets: React.FC<GetDietsProps> = ({ showCreateFilters }) => {
    console.log("showCreateFilters:", showCreateFilters);

    const [diets, setDiets] = useState<dietType[]>([])
    const [dietitianInput, setDietitianInput] = useState("")
    const [goalInput, setGoalInput] = useState("")
    const [ageInput, setAgeInput] = useState("")
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [users, setUsers] = useState<userType[]>([])
    const [dietitianNames, setDietitianNames] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const fetchedDiets = await getDiet();
                console.log("Fetched diets:", fetchedDiets);
                setDiets(fetchedDiets);
            } catch (error) {
                console.error("Error fetching diets:", error);
            }
        };
        fetchDiets();
    }, []); // נטען רק פעם אחת כשהקומפוננטה עולה


    useEffect(() => {
        const fetchDietitianNames = async () => {
            const namesMap: { [key: number]: string } = {}; // יצירת מפת מזהה -> שם
            console.log(namesMap)
            for (const diet of diets) {
                if (!namesMap[diet.dietitianId]) { // אם השם לא נטען כבר
                    try {
                        console.log("id of dietitian: " + diet.dietitianId)
                        const name = await getDietitianNameByDietitianId(diet.dietitianId);
                        namesMap[diet.dietitianId] = name;
                    } catch (error) {
                        console.error("Error fetching dietitian name:", error);
                        namesMap[diet.dietitianId] = "לא נמצא"; // ערך ברירת מחדל
                    }
                }
            }

            setDietitianNames(namesMap);
        };

        if (diets.length > 0) {
            fetchDietitianNames();
        }
    }, [diets]); // רץ מחדש אם רשימת הדיאטות משתנה


    const getDietitianName = (dietitianId: number) => {
        return getDietitianNameByDietitianId(dietitianId)
    }

    const uniqueDietitians = Array.from(
        new Set(diets.map(diet => diet.dietitianId))
    ).map(dietitianId => ({
        id: dietitianId,
        name: dietitianNames[dietitianId]
    }));



    const filteredDiets = diets.filter((diet) => {
        const byDietitian = dietitianInput ? diet.dietitianId.toString().includes(dietitianInput) : true
        const byGoal = goalInput ? diet.descGoal.includes(goalInput) : true
        const byAge = ageInput ? diet.ageMinimum < Number(ageInput) && diet.ageMaximum > Number(ageInput) : true

        return byDietitian && byGoal && byAge
    });

    const inputStyles = {
        "& label": { color: "black" }, // צבע ברירת מחדל של התווית
        "& label.Mui-focused": { color: "green" }, // צבע ירוק כשהשדה בפוקוס
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" }, // צבע מסגרת רגילה
            "&:hover fieldset": { borderColor: "green" }, // צבע מסגרת בעת ריחוף
            "&.Mui-focused fieldset": { borderColor: "green" }, // צבע מסגרת בעת פוקוס
        },
        "& .MuiInput-underline:before": { borderBottom: "none" }, // הסרת הקו התחתון
        "& .MuiInput-underline:hover:before": { borderBottom: "none" }, // מניעת קו תחתון בעת ריחוף
        "& .MuiInput-underline:after": { borderBottom: "none" }, // מניעת קו תחתון בעת פוקוס
    };

    const shouldShowFilters = () => showCreateFilters;

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value

        // בדיקה שהוזן מספר תקין
        if (/^\d*$/.test(value)) {
            let num = Number(value);

            if (num >= 0 && num < 120) {
                setAgeInput(value)
            }
        }
    }

    return (
        <div className="container">
            {shouldShowFilters() && (
                <div className="filters">
                    <FormControl variant="outlined" style={{ minWidth: 150 }} sx={inputStyles}>
                        <InputLabel id="dietitian-select-label" shrink >שם תזונאי</InputLabel>
                        <Select
                            labelId="dietitian-select-label"
                            value={dietitianInput}
                            onChange={(e) => setDietitianInput(e.target.value)}
                        >
                            <MenuItem value=""><em>הכל</em></MenuItem>
                            {uniqueDietitians.map((dietitian) => (
                                <MenuItem key={dietitian.id} value={dietitian.id}>
                                    {dietitian.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" style={{ minWidth: 150 }} sx={inputStyles}>
                        <InputLabel id="goal-select-label" shrink>מטרה דיאטה</InputLabel>
                        <Select
                            labelId="goal-select-label"
                            value={goalInput}
                            onChange={(e) => setGoalInput(e.target.value)}
                        >
                            <MenuItem value=""><em>הכל</em></MenuItem>
                            {diets.map((diet) => (
                                <MenuItem key={diet.id} value={diet.descGoal}>
                                    {diet.descGoal}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="גיל"
                        variant="outlined"
                        type="number"
                        value={ageInput}
                        onChange={handleAgeChange}
                        style={{ minWidth: 100 }} sx={inputStyles}
                    />
                </div>
            )}

            {/* רשימת דיאטות */}
            <div className="diets-container">
                {filteredDiets.map((diet) => (
                    <div key={diet.id} className="diet-card">
                        <h3>{diet.descGoal}</h3>
                        <p>תזונאי: {dietitianNames[diet.dietitianId]}</p>
                        <p>דירוג: {diet.rate}</p>
                        <button onClick={() => { }}>פרטים נוספים</button>
                        <button>בחירת דיאטה</button>
                    </div>
                ))}
            </div>
        </div>
    );
}