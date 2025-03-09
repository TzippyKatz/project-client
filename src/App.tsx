import React from 'react';
import './App.css';
import PATHS from "./../src/routes/paths";
import { HomePage } from './layouts/Home';
import Register from './layouts/Register';
import { LoginPage } from './layouts/Login';
import { DietPage } from './layouts/Diet';


function App() {
  return(       
    <div className="App">
      {/* <HomePage /> */}
      {/* <LoginPage /> */}
      <DietPage />
      {/* <Register/> */}
    </div>
  );
}

export default App;