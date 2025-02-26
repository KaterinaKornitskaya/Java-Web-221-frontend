import { useState } from "react";

export default function Signin(){

    const [login, setLogin] = useState("kate");
    const [password, setPassword] = useState("49Osahag");
    
    const sendForm = () => {
        // rfc7617
        let data = login + ':' + password;
        // переганяємо в байти, і байти кодуємо в Base64
        let credentials = btoa(data);

        // в кінці /user - значить звертаємось в UserServlet
        // 'Basic ' з пробілом в кінці!!!
        fetch(
            "http://localhost:8081/Java_Web_221/user",{
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + credentials,
                },
            }
        )
        .then(r=>r.json())
        .then(j=>{
        console.log(j);
        })
        console.log(credentials);
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