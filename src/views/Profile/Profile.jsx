import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";


export default function Profile(){
    // забираємо з AppContext те, що він провайдить
    const {user, setUser} = useContext(AppContext);
    
    return user == null ? <AnonView/> : <AuthView/>;
}

function AuthView(){
    const {user, setUser, request, setAccessToken, accessToken} = useContext(AppContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [birthday, setBirthday] = useState(user.birthday);
    // const [birthday, setBirthday] = useState(() => 
    //     new Date(user.birthday).toLocaleDateString('uk-UA')
    // );

    const saveChanges = () => {
        request('/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                "userId": user.userId, 
                name,
                //"email": user.email,
                email,
                phone,
                address,
                birthday
            })
        }).then(data => {
            console.log(data);
            setUser(data);  // тут оновлюємо юзера з отриманими даними
        }).catch(err => console.log(err));

        console.log(user.userId, name, email, phone, address, birthday);
    };
    const deleteProfile = () => {
        if(confirm("Такі да?")){
                request('/user?id=' + user.userId, {
                method: 'DELETE',
            }).then(data => {
                console.log(data);
                setUser(null);
                setAccessToken(null);
            }).catch(err => console.log(err));
        }
        console.log(user.userId, 'DEL');
    };
    console.log(user); 

    return(
    <>
        
        <i>{JSON.stringify(accessToken)}</i>
        <p>Справжнє ім'я: </p>
        <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
        />
            
        <p>Email: </p>
        <input
            type="text"
            value={email}
            onChange={ e => setEmail(e.target.value) }
        />

        <p>Телефон: </p>
        <input 
            type="text" 
            value={phone}
            onChange={e => setPhone(e.target.value)}
        /> 

        <p>Дата народження: {new Date(user.birthday).toLocaleDateString()} </p>
        <p>Встановити іншу: </p>
        <input
            type="date"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}   
        />


        <p>Адреса: </p>
        <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}   
        />


        <br/>
        <button onClick={saveChanges}>Зберегти</button>

        <br/>
        <button onClick={deleteProfile}>Видалити обліковий запис</button>

        <br/>
        <Link to="/">Home</Link>
        
    </>
    );
}

function AnonView(){
    return<>
        <p>Авторизуйтесь для перегляду профіля</p>
        <br/>
        <Link to="/">Home</Link>
    </>
}