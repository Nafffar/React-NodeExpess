import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/LogReg.css'

import { emailFetch } from './Login'
import AuthContext from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'



export default function Reg() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [copyPassword, setCopyPassword] = useState("")
  const [regError, setRegError] = useState("")

  const {auth}= useContext(AuthContext)
  const navigate = useNavigate()


  async function rigister(e){
    e.preventDefault();
    if(password != copyPassword){
      setRegError('Пароли не совпадают')
      return
    }

    await createUserWithEmailAndPassword(auth, email, password).
      then((user)=>{
        setEmail("")
        setPassword("")
        setCopyPassword("")
        emailFetch(email, AuthContext)
        alert("Регистрация успешно выполнена!")
        navigate("/")
      }).
      catch((error)=>{setRegError(error.toString())})
  }


  return (
    <div className='formWrapper'>
        <form className="log-reg" onSubmit={rigister}>
            <input placeholder='Введите почту' type='email' name='email'
              value={email} onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input placeholder='Введите пароль' type='password'
              value={password} onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input placeholder='Повторите пароль' type='password'
              value={copyPassword} onChange={(e)=>{setCopyPassword(e.target.value)}}
            />
            <input type='submit'/>
            {regError ? <p style={{color: "red"}}>{regError}</p> : ""}
        </form>
        <Link to="/login">Уже есть аккаунт? Войдите!</Link>
    </div>
  )
}
