import React, {useContext, useState} from 'react'
import '../css/LogReg.css'
import googleIco from '../img/Google.jfif'

import AuthContext from '../AuthContext';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth"
import { useNavigate } from 'react-router-dom';


export function emailFetch(email, Context){

  fetch("http://localhost:4444/addUser", {
    method : "POST",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    body: `{"email": "${email}" }`
  })
  .then((response) => response.json())
  .then(() => {
    // let value = this.Context;
  });
}


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [regError, setRegError] = useState("")

  const {auth} = useContext(AuthContext)
  const navigate = useNavigate()



  const emailLogin = async (e)=>{
    e.preventDefault()

    await signInWithEmailAndPassword(auth, email, password).
      then(()=>{
        setEmail('')
        setPassword('')
        emailFetch(email, AuthContext);
        alert('Добро пожаловать!')


        navigate('/')
      }).
      catch((error)=>{setRegError(error.toString())})
  }


  const googleLogin = async () =>{
    try 
    {
      const provider = new GoogleAuthProvider();
      const{user} = await signInWithPopup(auth, provider)

      emailFetch(user.email, AuthContext);

      user && navigate('/')
    } 
    catch (error) 
    {
      console.log("Ошибка логина через Google pop-up!")
    }
  }

  


  return (
    <div className='formWrapper'>
    <form className="log-reg" onSubmit={emailLogin}>
        <input type='email' name='email' placeholder='Почтовый адрес'
        value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type='password'placeholder='Пароль'
        value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <input type='submit'/>
        <span>Или войдите через Google</span>
        <div className='googleLogin' onClick={googleLogin}>
            <img src={googleIco}/>
            <span>Войти</span>
        </div>
    </form>
    <a href="/reg">Нет аккаунта? Зарегистрируйтесь!</a>
</div>
  )
}
