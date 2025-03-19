import React from 'react';
import './App.css';
import PATHS from "./../src/routes/paths";
import { HomePage } from './layouts/Home';
import { LoginPage } from './layouts/Login';
import { DietPage } from './layouts/Diet';
import { RegisterPage } from './layouts/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MealPage } from './layouts/Meal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diet" element={<DietPage />} />
        <Route path="/meal" element={<MealPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// alt + shift + f