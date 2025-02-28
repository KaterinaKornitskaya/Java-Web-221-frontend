import { createContext, useState } from 'react'

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
import Profile from './views/Profile/Profile';
import AppContext from './Appcontext';


// щоб працював fetch, треба налаштувати CORS на бекенді
function App() {
  const [user, setUser] = useState(null);

  {/* инсталируем npm i react-router-dom чтобы можно было использовать Routes*/}
  return(
    <AppContext.Provider value={{user, setUser, request}}>
      {/* інструкція вище закладе в увесь наш AppContext юзера і метод setUser
      тепер кожна сторінка може запитати діючого юзера*/}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={ <Profile/>}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  ); 
}

// ф-ія з шаблоном запиту, використовуємо по всьому проекту
// для цього додаємо її в вище контекст:
// AppContext.Provider value={{user, setUser, request}}
const request = (url, conf) => new Promise((resolve, reject) => {
  const backhost = "http://localhost:8081/Java_Web_221";

  fetch(backhost + url, conf)
  .then(r => r.json())
  .then(j => {
    // якщо статус успішний
    if(j.status < 300) {
      resolve(j.data);
    }
    else{
      reject(j);
    }
  })
  .catch(reject);
});

export default App
