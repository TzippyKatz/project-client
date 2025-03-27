// import { useState } from "react"
// import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { useNavigate } from "react-router-dom"
// import { dietType } from '../../types/diet.type'


// interface props {
//     diet: dietType;
//     isOpen: boolean;
//     // onClose: () => void;
//   }

//   export const GetDiet: React.FC<props> = ({ diet, isOpen }) => {
// // export const GetDiet = () => {
//     const [open, setOpen] = useState(false);

//     const navigate = useNavigate()

//     const handleNavigate = () => {
//         const customValues = { dietId: diet?.id, isOpen: true };
//         navigate("/getMeals", { state: customValues });
//     };


//     return (
//         <div>
//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>פרטי הדיאטה</DialogTitle>
//                     </DialogHeader>
//                     {diet ? (
//                         <div>
//                             <div className="diet-container">
//                                 <h2>תוכנית דיאטה</h2>
//                                 <p><strong>מטרה:</strong> {diet.descGoal}</p>
//                                 <p><strong>טווח גילאים:</strong> {diet.ageMinimum} - {diet.ageMaximum}</p>
//                                 <p><strong>דירוג:</strong> {diet.rate}⭐</p>
//                                 <button onClick={handleNavigate}>ארוחות</button>
//                             </div>
//                         </div>
//                     ) : (
//                         <p>טוען...</p>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";


export const GetDiet: React.FC = () => {
    const location = useLocation();
    const { diet: dietFromState, isOpen: isOpenFromState } = location.state || {};

    const [open, setOpen] = useState(isOpenFromState || false);
    const [diet, setDiet] = useState(dietFromState || null);

    useEffect(() => {
        console.log("diet: " + diet)
        console.log("open: " + open)
    }, [open][diet])

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button>פתח דיאטה</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                    <Dialog.Title>פרטי הדיאטה</Dialog.Title>
                    {diet ? (
                        <div className="diet-container">
                            <h2>תוכנית דיאטה</h2>
                            <p><strong>מטרה:</strong> {diet.descGoal}</p>
                            <p><strong>טווח גילאים:</strong> {diet.ageMinimum} - {diet.ageMaximum}</p>
                            <p><strong>דירוג:</strong> {diet.rate}⭐</p>
                        </div>
                    ) : (
                        <p>לא מציג דיאטה באסהההה...</p>
                    )}
                    <Dialog.Close asChild>
                        <button>סגור</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};