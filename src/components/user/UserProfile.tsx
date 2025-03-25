import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { jwtDecode } from '../../auth/auth.utils';
import { getUserById } from '../../services/user.service';
import { data } from 'react-router-dom';


export const UserProfile = () => {

    const[weightArr, setWeightArr] = useState<{ x: number, y: number }[]>([])

    useEffect(() => {
        const fetchWeights = async () => {
            const userString = localStorage.getItem("user");
            if (userString) {
                const userData = JSON.parse(userString);
                const decodedToken = jwtDecode(userData.token);
                const userId = parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                const user = await getUserById(userId);
                console.log(JSON.stringify(user, null, 2))
                console.log(user.weight)
                const weights = user.weight.split(",").map((w: string) => parseFloat(w));
                const weightsForGraph = weights.map((weight: number, index: number) => ({
                    x: index + 1,
                    y: weight
                }));
                setWeightArr(weightsForGraph)
            } else {
                console.error("המתשמש לא מחובר למערכת - התחבר מחדש");
            }
        };
        fetchWeights()
    }, []);


    return (
        <div>פרופיל אישי
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightArr}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}