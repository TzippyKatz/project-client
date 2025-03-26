import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { jwtDecode } from '../../auth/auth.utils';
import { getUserById, updateUser } from '../../services/user.service';
import { data, useNavigate } from 'react-router-dom';
import { dietType } from '../../types/diet.type';
import { getDietById } from '../../services/diets.service';
import { getMeals } from '../../services/meal.service';
import './UserProfile.css'
import { GetMeals } from '../meals/GetMeals';


export const UserProfile = () => {

    const [weightArr, setWeightArr] = useState<{ index: number, weight: number }[]>([])
    const [dietProfile, setDietProfile] = useState<dietType>()
    const [newWeight, setNewWeight] = useState<string>('');
    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchWeights = async () => {
            const userString = localStorage.getItem("user");
            if (userString) {
                const userData = JSON.parse(userString);
                const decodedToken = jwtDecode(userData.token);
                const userId = parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                setUserId(userId)
                const user = await getUserById(userId);
                setUserName(user.userName)
                const weights = user.weight.split(",").map((w: string) => parseFloat(w));
                const weightsForGraph = weights.map((weight: number, index: number) => ({
                    index: index + 1,
                    weight: weight
                }));
                setWeightArr(weightsForGraph)

                const diet = await getDietById(user.dietId)
                setDietProfile(diet)
            } else {
                console.error("המתשמש לא מחובר למערכת - התחבר מחדש");
            }
        };
        fetchWeights()
    }, []);

    //יוזאפקט להדפסת מערך המשקלים
    useEffect(() => {
        console.table(weightArr);
    }, [weightArr]);

    useEffect(() => {
        console.table("dietProfile: " + JSON.stringify(dietProfile))
    }, [dietProfile]);

    //עדכון גרף אחרי שמוסיף משקל
    const updateWeightGraph = (weightsString: string) => {
        const weights = weightsString.split(",").map((w: string) => parseFloat(w));
        const weightsForGraph = weights.map((weight: number, index: number) => ({
            index: index + 1,
            weight: weight
        }));
        setWeightArr(weightsForGraph);
    };

    const handleAddWeight = async () => {
        if (!newWeight.trim()) return
        if (userId !== null) {
            const user = await getUserById(userId)
            const updatedWeights = user.weight ? `${user.weight},${newWeight}` : newWeight;
            const updatedUser = { ...user, weight: updatedWeights };
            await updateUser(updatedUser)
            updateWeightGraph(updatedWeights)
            setNewWeight('')
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    // פונקציה לסגירת המודאל
    const onClose = () => {
        setIsOpen(false); // סוגרת את המודאל
    };

    const navigate = useNavigate()

    const handleNavigate = () => {
        const customValues = { dietId: dietProfile?.id, isOpen: true };
        navigate("/getMeals", { state: customValues });
    };

    return (
        <div className="userProfile-container">
            <h2>האיזור האישי של {userName}</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightArr}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#4CAF50" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="add-weight-container">
                <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="הזן משקל חדש"
                />
                <button onClick={handleAddWeight}>הוסף משקל</button>
            </div>

            {dietProfile && (
                <div className="diet-container">
                    <h2>תוכנית דיאטה</h2>
                    <p><strong>מטרה:</strong> {dietProfile.descGoal}</p>
                    <p><strong>טווח גילאים:</strong> {dietProfile.ageMinimum} - {dietProfile.ageMaximum}</p>
                    <p><strong>דירוג:</strong> {dietProfile.rate}⭐</p>
                    <button onClick={handleNavigate}>ארוחות</button>
                </div>
            )}
        </div>
    )
};