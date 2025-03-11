import React from 'react';
import './App.css';
import PATHS from "./../src/routes/paths";
import { HomePage } from './layouts/Home';
import { LoginPage } from './layouts/Login';
import { DietPage } from './layouts/Diet';
import { RegisterPage } from './layouts/Register';


function App() {
  return(       
    <div className="App">
      {/* <HomePage /> */}
      {/* <LoginPage /> */}
      {/* <DietPage /> */}
      <RegisterPage />
        </div>
  );
}

export default App;