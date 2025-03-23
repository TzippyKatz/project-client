import React, { useEffect, useState } from 'react';
import { getDiet, getDietByDietitianId } from '../../services/diets.service';
import { dietType } from "../../types/diet.type";
import { userType } from '../../types/user.type';
import { Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import '../../CSS/style.css'
import { getUsers } from '../../services/user.service';

interface GetDietsProps {
    showCreateFilters: boolean;
}

// export const GetDiets = () => {
export const GetDiets: React.FC<GetDietsProps> = ({ showCreateFilters }) => {
    const [diets, setDiets] = useState<dietType[]>([])
    const [dietitianInput, setDietitianInput] = useState("")
    const [goalInput, setGoalInput] = useState("")
    const [ageInput, setAgeInput] = useState("")
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [users, setUsers] = useState<userType[]>([])

    useEffect(() => {
        console.log("fkjfsih")
        const fetchDiets = async () => {
            const getDiets = await getDiet()
            console.log("Fetched diets:", getDiets)
            setDiets(getDiets)

            // const getAllUsers = await getUsers()
            // setUsers(getAllUsers)

            //להתיג רשימת תזונאים!! לפי מזהה דיאטן במשתמשים וב דיאטות
        };
        fetchDiets()
    }, []);

    const filteredDiets = diets.filter((diet) => {
        const filteredDiets = diets.filter((diet) => {
            const byDietitian = dietitianInput ? diet.DietitianId.toString().includes(dietitianInput) : true
            const byGoal = goalInput ? diet.descGoal.includes(goalInput) : true
            const byAge = ageInput ? diet.ageMinimum < Number(ageInput) && diet.ageMaximum > Number(ageInput) : true

            return byDietitian && byGoal && byAge
        });
    });

    const shouldShowFilters = () => isUserLoggedIn;

    return (
        <div className="container">
            {shouldShowFilters() && (
                <div className="filters">
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                        <InputLabel id="dietitian-select-label" shrink>שם תזונאי</InputLabel>
                        <Select
                            labelId="dietitian-select-label"
                            value={dietitianInput}
                            onChange={(e) => setDietitianInput(e.target.value)}
                        >
                            <MenuItem value=""><em>בחר</em></MenuItem>
                            {diets.map((diet) => (
                                <MenuItem key={diet.id} value={diet.DietitianId}>
                                    {diet.DietitianId}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                        <InputLabel id="goal-select-label" shrink>מטרה דיאטה</InputLabel>
                        <Select
                            labelId="goal-select-label"
                            value={goalInput}
                            onChange={(e) => setGoalInput(e.target.value)}
                        >
                            <MenuItem value=""><em>בחר</em></MenuItem>
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
                        onChange={(e) => setAgeInput(e.target.value)}
                        style={{ minWidth: 100 }}
                    />
                </div>
            )}

            {/* רשימת דיאטות */}
            <div className="diets-container">
                {diets.map((diet) => (
                    <div key={diet.id} className="diet-card">
                        <h3>{diet.descGoal}</h3>
                        <p>תזונאי: {diet.DietitianId}</p>
                        <p>דירוג: {diet.rate}</p>
                        <button>פרטים נוספים</button>
                        <button>בחירת דיאטה</button>
                    </div>
                ))}
            </div>
        </div>
    );
}