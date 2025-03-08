import React from 'react';
import './App.css';
import PATHS from "./../src/routes/paths";
import { HomePage } from './layouts/Home';
import { LoginPage } from './layouts/Login';


function App() {
  return(       
    <div className="App">
      {/* <HomePage /> */}
      <LoginPage />
    </div>
  );
}

export default App;