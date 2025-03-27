import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/login.slice";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // ניתוב לדף התחברות לאחר יציאה
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;