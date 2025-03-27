import { Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl text-center">
                <h1 className="text-2xl font-bold mb-4">דף בית למנהל</h1>
                <div className="space-y-4">
                    <Button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                        onClick={() => navigate("/getUsers")}
                    >
                        קבלת משתמשים
                    </Button>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                        הוספת מאכל
                    </Button>
                </div>
            </Card>
        </div>
    );
}