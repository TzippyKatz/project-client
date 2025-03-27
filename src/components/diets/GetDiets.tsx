import React, { useEffect, useState } from 'react';
import { getDiet, getDietByDietitianId, getDietById, getDietitianNameByDietitianId } from '../../services/diets.service';
import { dietType } from "../../types/diet.type";
import { userType } from '../../types/user.type';
import { Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import './GetDiets.css'
import { getUserById, updateUser } from '../../services/user.service';
import { jwtDecode } from '../../auth/auth.utils';
import { useNavigate } from 'react-router-dom';

interface GetDietsProps {
    showCreateFilters: boolean;
}


export const GetDiets = () => {
    // export const GetDiets: React.FC<GetDietsProps> = ({ showCreateFilters }) => {
    // console.log("showCreateFiltes:", showCreateFilters);
    const [role, setRole] = useState("")
    const [diet, setDiet] = useState<dietType>()
    const [diets, setDiets] = useState<dietType[]>([])
    const [dietitianInput, setDietitianInput] = useState("")
    const [goalInput, setGoalInput] = useState("")
    const [ageInput, setAgeInput] = useState("")
    const [dietitianNames, setDietitianNames] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        let data = localStorage.getItem('user');
        let role1 = "";
        if (data) {
            const decodedToken = jwtDecode(data);
            role1 = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";
        }
        setRole(role1);
    }, []);

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
                        // namesMap[diet.dietitianId] = "לא נמצא"; // ערך ברירת מחדל
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
        const byDietitian = dietitianInput ? diet.dietitianId === Number(dietitianInput) : true;
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

    // const shouldShowFilters = () => showCreateFilters;

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

    const handleClickAddDiet = async (dietId: number) => {
        const userStorage = localStorage.getItem("user");
        let user;
        if (userStorage) {
            try {
                const userData = JSON.parse(userStorage);
                const decodedToken = jwtDecode(userData.token);
                const userId = parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                user = await getUserById(userId);
                console.log("handleClickAddDiet")
                alert(`הדיאטה נוספה לתכנית שלך, ${user.userName}`)
            } catch (error) {
                console.error("Failed to parse user from storage", error);
            }
        } else {
            console.error("User not found in storage");
        }
        if (!user) {
            console.error("User is undefined, cannot update diet.");
            return;
        }
        const newUser = { ...user, dietId: dietId }
        await updateUser(newUser)
        const response = await updateUser(newUser);
        console.log("Updated user response:", response);
        console.log(JSON.stringify(response))
    }


    // const handleClickDetails = async (dietId: number) => {
    // try {
    //     const fetchDiet = await getDietById(dietId);
    //     setDiet(fetchDiet);
    //     console.log("handleClickDetails")
    // } catch (error) {
    //     console.error("Error fetching diet details:", error);
    // }

    const navigate = useNavigate()
    const handleClickDetails = async (dietId: number) => {
        try {
            const fetchedDiet = await getDietById(dietId)
            const dietProps = { diet: fetchedDiet, isOpen: true }
            navigate("/getDiet", { state: dietProps });
        } catch (error) {
            console.error("Error fetching diet details:", error);
        }
    };


    return (
        <div className="container">
            {role && (
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
            {role && (
                <div className="diets-container">
                    {filteredDiets.map((diet) => (
                        <div key={diet.id} className="diet-card">
                            <h3>{diet.descGoal}</h3>
                            <p>תזונאי: {dietitianNames[diet.dietitianId]}</p>
                            <p>דירוג: {diet.rate}</p>
                            <button onClick={() => { handleClickDetails(diet.id) }}>פרטים נוספים</button>
                            <button onClick={() => { handleClickAddDiet(diet.id) }}>בחירת דיאטה</button>
                        </div>
                    ))}
                </div>
            )}

            {!role && (
                <div className="diets-container">
                    {filteredDiets.map((diet) => (
                        <div key={diet.id} className="diet-card">
                            <h3>{diet.descGoal}</h3>
                            <p>תזונאי: {dietitianNames[diet.dietitianId]}</p>
                            <p>דירוג: {diet.rate}</p>
                            <button disabled>פרטים נוספים</button>
                            <button disabled>בחירת דיאטה</button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}