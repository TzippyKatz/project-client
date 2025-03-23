import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavBar from './sections/nav/NavBar';
import { restoreSession } from './auth/auth.utils';
import './App.css';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // בדיקה אם יש טוקן בלוקל סטורג' בטעינה הראשונית
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(restoreSession(token));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};


// export default App;
export default AppContent;

// alt + shift + f