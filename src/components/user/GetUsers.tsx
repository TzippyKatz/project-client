import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/user.service';
import { userType } from '../../types/user.type';
import default_profile from '../../images/default_profile.png'
import { UpdateUser } from './UpdateProfile';
import { X } from "lucide-react";


export const GetUsers: React.FC = () => {

    const [users, setUsers] = useState<userType[]>()
    const [inputSearch, setInputSearch] = useState("")
    const [selectedUser, setSelectedUser] = useState<userType | null>(null); // שולט בתצוגת העדכון


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers()
                console.log("Fetched Users: ", fetchedUsers)
                setUsers(fetchedUsers)
                if (fetchedUsers.length > 0) {
                    console.log("First user file: ", fetchedUsers[0].image);
                }
            }
            catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers()
    }, [selectedUser]);

    const handleDeleteUser = async (userId: number) => {
        try {
            alert("האם למחוק משתמש זה?")
            const deletedUser = await deleteUser(userId);  // הנח שהפונקציה קיימת בשירות
            console.log("Deleted User: ", deletedUser);
            setUsers((prev) => prev?.filter(user => user.id !== userId));  // מעדכן את הרשימה
        }
        catch (error) {
            console.error("Error deleting user:", error);
        }
    };



    const filteredUsers = users?.filter((user) =>
        user.userName.toLowerCase().includes(inputSearch.toLowerCase())
    );

    return (
        <div className="users-page">
            <input type="text" placeholder="חיפוש לפי שם..." className="search-input" onChange={(e) => { setInputSearch(e.target.value) }} value={inputSearch}></input>
            <div className="users-container">
                {filteredUsers?.map((user) => (
                    <div key={user.id} className="user-card">
                        <div className="user-image-container">
                            <img
                                src={user.image ? `data:image/jpeg;base64,${user.image}` : default_profile}
                                alt="User profile"
                                className="user-image"
                            />
                        </div>
                        <h3>{user.userName}</h3>
                        <p>ת.ז.: {user.id}</p>
                        <p>תפקיד: {user.role}</p>
                        <p>שם פרטי: {user.firstName}</p>
                        <p>שם משפחה: {user.lastName}</p>
                        <p>מייל: {user.email}</p>
                        <p>טלפון: {user.phone}</p>
                        <button type='submit' className="update-button" onClick={() => setSelectedUser(user)}>עדכן תפקיד</button>
                        <button type='submit' className="delete-button" onClick={() => handleDeleteUser(user.id)}>מחק משתמש</button>
                    </div>
                ))}
            </div>

            {/* הצגת `UpdateUser` על המסך במקרה שנבחר משתמש */}
            {
                selectedUser && (
                    <div className="update-user-modal">
                        <div className="modal-content">
                            <button className="close-button" onClick={() => setSelectedUser(null)}>✖</button>
                            {/* <UpdateUser showRole={true} /> */}
                            <UpdateUser showRole={true} user={selectedUser} />
                        </div>
                    </div>
                )
            }
        </div >
    );
};