import { useState } from 'react'

export default function Signup(){
    const [timestamp, setTimestamp] = useState("--");
  const loadTimestamp = () => {
    fetch("http://localhost:8081/Java-Web-221/Home")
    .then(r => r.json())
    .then(j => setTimestamp(j.message));
    // 1ий then - те що отримали переганяємо в json
    // 2ий then - із отриманого json витягаємо результат з поля message
  }
  

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  //const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
    email: "",
    address: "",
    //login: "",
    password: "",
    confirmPassword: "",
    general: ""
  })

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handlePhoneNumberChange = (index, value) => {
    const updatedNumbers = [...phoneNumbers];
    updatedNumbers[index] = value;
    setPhoneNumbers(updatedNumbers);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const sendForm = () =>{
    // валідація
    let isFormValid = true;
    let validErrors = {
      name: "",
      birthDate: "",
      //login: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      general: ""
    }

    if(!name || !email || !password || !confirmPassword){
      isFormValid = false;
      validErrors.general = "Потрібно заповнити ці поля: ім'я, логін, email, пароль з підтвердженням";
    }

    if(name.length < 2){
      isFormValid = false;
      validErrors.name = "Ім'я повинно містити не менше двох символів!";
    }

    // if(login.length < 2){
    //   isFormValid = false;
    //   validErrors.login = "Логін повинен містити не менше двох символів!";
    // }

    if(!emailRegex.test(email)){
      isFormValid = false;
      validErrors.email = "Невірний email!";
    }

    if(!passwordRegex.test(password)){
      isFormValid = false;
      validErrors.password = "Пароль має містити мінімум 6 символів, включаючи цифру, велику та маленьку літери!";
    }

    if(password !== confirmPassword){
      isFormValid = false;
      validErrors.confirmPassword = "Паролі не співпадають!";
    }

    setErrors(validErrors);

    if(!isFormValid) return;

    // отфильтруем пустые строки в номере телефона перед отправкой формы
    const validPhoneNumbers = phoneNumbers.filter(ph => ph.trim() !== "");


    // преобразуем дату в формат без времени (в YYYY-MM-DD)
    //const formattedBirthDate = birthDate ? new Date(birthDate).toISOString().split('T')[0] : null;

    const data = {
      name,
      birthDate,
      //birthDate: formattedBirthDate,
      email,
      address,
      //login,
      password,
      confirmPassword,
      phoneNumbers: validPhoneNumbers
    };

    // тут ми запаковуємо наші попередньо зібрані дані з форми(вище data)
    // в body і надіслали методом пост на бекенд на http://localhost:8080/Java_Web_221/Home
    // !!! метод GET не може мати body, тому в нашjму випадку
    // коли є тіло, то використовуємо метод POST
    fetch(
      "http://localhost:8081/Java_Web_221/home",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }
    )
    .then(r=>r.json())
    .then(j=>{
      console.log(j);
    })
    // 'Content-Type' формально є забороненим заголовкам,
    // тому на стороні бекенду нам треба переоприділити метод doOptions(),
    // в якому ми дозволяємо заголовок 'Content-Type'
  }

  return (
    <>
      {/* <button onClick={loadTimestamp}>loadTimestamp</button>
      <p>{timestamp}</p> */}

      <div className='myDiv1'>
      
      <input
        type = 'text' className="form-control"
        value = {name} 
        onChange = {e => setName(e.target.value)}
        placeholder="Введіть ім'я"
      />
      {errors.name && <p>{errors.name}</p>}
      {/* Если errors.name содержит текст ошибки, то параграф будет отображён. */}
      

      <br/>
      <input
        type='date' className="form-control"
        value = {birthDate}
        onChange = { e=> setBirthDate(e.target.value)}
        placeholder="Введіть дату народження"
      />

      <br/>
      <input
        type='email' className="form-control"
        value = {email}
        onChange = {e => setEmail(e.target.value)}
        placeholder="Введіть Email"
      />
      {errors.email && <p>{errors.email}</p>}

      <br/>
      <input
        type='text' className="form-control"
        value = {address}
        onChange = {e => setAddress(e.target.value)}
        placeholder="Введіть адресу"
      />

      {/* <br/>
      <input
        type='text' className="form-control"
        value={login}
        onChange = {e=>setLogin(e.target.value)}
        placeholder='Введіть логін'
      />
      {errors.login && <p>{errors.login}</p>} */}

      <br/>
      <input
        type='password' className="form-control"
        value = {password}
        onChange = {e => setPassword(e.target.value)}
        placeholder="Введіть пароль"
      />
      {errors.password && <p>{errors.password}</p>}

      <br/>
      <input
        type='password' className="form-control"
        value = {confirmPassword}
        onChange = {e => setConfirmPassword(e.target.value)}
        placeholder="Введіть пароль ще раз"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <br/>
      {phoneNumbers.map((phone, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
            placeholder={`Номер телефону ${index + 1}`}
          />
        </div>
      ))}

      <button onClick={addPhoneNumber} className="btn btn-secondary my-2">Додати ще один номер телефону</button>

      {errors.general && <p>{errors.general}</p>}

      <br/>
      <button onClick={sendForm} className="btn btn-success">Реєстрація</button>
      </div>
    </>
  )
}