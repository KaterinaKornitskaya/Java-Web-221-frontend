import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import { useNavigate } from "react-router-dom";


export default function Signin(){

    const [login, setLogin] = useState("alex");
    const [password, setPassword] = useState("49Alex");
    // забираємо з AppContext те, що він провайдить
    const {user, setUser, request} = useContext(AppContext);
    const navigate = useNavigate();

    const sendForm = () => {
        // rfc7617
        let data = login + ':' + password;
        // переганяємо в байти, і байти кодуємо в Base64
        let credentials = btoa(data);

        // в кінці /user - значить звертаємось в UserServlet
        // 'Basic ' з пробілом в кінці!!!
        // fetch(
        //     "http://localhost:8081/Java_Web_221/user",{
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Basic ' + credentials,
        //         },
        //     }
        // )
        // .then(r=>r.json())
        // .then(j=>{
        //     // якщо логін успішний
        //     if(j.status == 200) {
        //         // встановлюємо поточного юзера
        //         // setUser запускає юзера, і вест наш DOM
        //         // на сторінці App.jsx перераховується вже з новим юзером
        //         // ми маємо перебудувати весь застосунок - щоб не 
        //         // залишилось якихось артефактів з попереднього юзера
        //         setUser(j.data);
        //         // перекидає на сторінку profile
        //         navigate('/profile');
        //     }
        //     console.log(j);
        // })
        //console.log(credentials);
        request('/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + credentials,
            },
        }).then(data => {
            setUser(data);
            navigate('/profile');
        }).catch(console.log);
    }

    return(
        <form>
            <input
                type='login' className="form-control"
                value = {login}
                onChange = {e => setLogin(e.target.value)}
                placeholder="Login"
            />
            <input
                type='password' className="form-control"
                value = {password}
                onChange = {e => setPassword(e.target.value)}
                placeholder="Пароль"
            />
            <button type="button"
                onClick={sendForm} 
                className="btn btn-success">
                    Вхід
            </button>
        </form>
    );
}