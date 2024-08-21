import React, { useContext } from 'react'
import Menu from '../components/Menu'
import { Navigate } from 'react-router-dom'

import { IsAdminContext } from '../App'


export default function MenuEditor(props) {
const isAdmin = useContext(IsAdminContext)
    return (
        <main>
            {!isAdmin && <Navigate to="/"/>}
            <Menu dishes = {props.dishes} addToCart={props.addToCart} isEdit={true}/>
        </main>
    )
}
