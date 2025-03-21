import React from 'react';
import './App.css';
import PATHS from "./../src/routes/paths";
import { HomePageeee } from './layouts/Home';
import { LoginPage } from './layouts/Login';
import { DietPage } from './layouts/Diet';
import { RegisterPage } from './layouts/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MealPage } from './layouts/Meal';
import { DietsList } from './layouts/DietsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diet" element={<DietPage />} />
        <Route path="/meal" element={<MealPage />} />
        <Route path="/dietsList" element={<DietsList />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// alt + shift + f