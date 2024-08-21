import React, {useState, useContext} from "react";
import { Link } from 'react-router-dom' 

import { IsAdminContext } from "../App";
import AuthContext from "../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";


export default function NavigList(props) {
    const {auth} = useContext(AuthContext)
    const [user] = useAuthState(auth)// обьект фаирбейса подтягивает данные авторизации
    const isAdmin = useContext(IsAdminContext)
    
    //ПОМЕНЯТЬ ЗНАЧЕНИЕ isAdmin
    function showInfo(auth, user){
        return(
            <div className="userInfo">
                <span>{user.displayName}</span>
                <span>{user.email}</span>
                <a onClick={()=> {
                    auth.signOut()
                    localStorage.clear()
                }} href="/Login">Выйти</a>
    
            </div>
        )
    }
    let [infoOpen, setInfoOpen] = useState(false)

    
    console.log(`isAdmin = ${isAdmin}`)


    return (
        <ul className='navigList'>
            <li><Link to='/'>Главная</Link></li>
            {isAdmin && <li><Link to='/editor'>Редактор</Link></li>}
            {user ? 
            (<li>
                {
                    user.photoURL ? 
                        <img className='userIco' 
                    onClick={()=>setInfoOpen(!infoOpen)} src={user.photoURL}/> 
                    :
                    <p onClick={()=>setInfoOpen(!infoOpen)} className='userIco'>{user.email[0]}</p>
                }
                { infoOpen && showInfo(auth, user)}
            </li>) : 
            (<li><Link to='/Login'>Войти</Link></li>) }

        </ul>
    )
}

