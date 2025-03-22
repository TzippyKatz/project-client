import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth.slice";
import { AppDispatch } from "../../redux/store";

const Logout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload(); // ריענון הדף לאחר יציאה
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;