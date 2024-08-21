import React from 'react'
import '../css/CartCard.css'

export default function CartCard(props) {
  return (
    <div className='cartCard'>
      <div className='deliteFromCart' onClick={()=> props.deliteFromCart(props.dish)}>-</div>
      <img src={props.dish.img}/>
      <span>{props.dish.title}</span>
      <span>{'Цена: ' + props.dish.price}</span>
    </div>
  )
}
