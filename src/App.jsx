import { useState } from 'react'

// import { Router } from 'react-router-dom';
// import { Routes } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// эти три строки не работает, вместо них строка ниже:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from './views/SignUp/Signup';
import Home from './views/Home/Home';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signin from './views/Signin/Signin';

// щоб працював fetch, треба налаштувати CORS
function App() {
  {/* инсталируем npm i react-router-dom чтобы можно было использовать Routes*/}
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  ); 
}

export default App
