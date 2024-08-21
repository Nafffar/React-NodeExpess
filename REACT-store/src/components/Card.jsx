import React from 'react'
import '../css/Card.css'

export default function Card(props) {
  let dayNum = props.date.getDay()

  if(props.dish.days.includes(dayNum) && props.dish.price <= props.price){
    return (
      <div className='card'>
        <img src={props.dish.img}/>
        <p>{props.dish.title}</p>
        <span>{props.dish.desc}</span>
        <span>Цена: {props.dish.price}₽</span>

        {
          props.isEdit ?
            <div className='removeDish' onClick={()=>props.removeDish(props.dish)}>-</div>:
            <div className='addToCard' onClick={()=>props.addToCart(props.dish)}>+</div>
        }
      </div>
    )
  }
  else{
    return null;
  }
}
