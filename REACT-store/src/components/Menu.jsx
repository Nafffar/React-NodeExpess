import React, {useState} from 'react'
import Card from './Card'
import Calendar from 'react-calendar'
import '../css/Menu.css'
import CardCreator from './CardCreator'
import 'react-calendar/dist/Calendar.css'
import NumericInput from 'react-numeric-input';

export default function Menu(props) {
let [date, setData] = useState(new Date())
let [price, setPrice] = useState(1000);
let [dishes, setDishes] = useState(props.dishes)
let [popupActive, setPopupActive] = useState(false)


async function updateDishes(){
  
  fetch("http://localhost:4444/dishes")
  .then(response => response.json())
  .then(res => {res.length > 0 ? setDishes(res) : dishes.length === 0 && setDishes([
    {
      "id": "f29b3b2c-9d0a-44f7-bc81-d71aeecd5a64",
      "title": "Неизвестный товар",
      "img": "https://i.ibb.co/1sygjwC/image.jpg",
      "desc": "???",
      "price": 0,
      "category": "???",
      "days": [1,2,3,4,5,6,0]
    }
  ])});
}

function removeDish(dish){
  let dishId = {"id" : dish.id}
  // dishes.filter((d)=>d.id !== dish.id)
  fetch(`http://localhost:4444/removeDish`, {
    method: 'POST',
    headers:{
      "Content-Type": "application/json;charset=utf-8"
    },
    body:JSON.stringify(dishId)

  }).then(()=>{
    updateDishes()})
}

function showPopup(){
  return(
    <div className='calendarPopup'>
      <Calendar onChange={setData} value={date}/>
      <div onClick={() =>{setPopupActive(false)}} className='closeBtn'>&#10799;</div>
    </div>
  )
}


if(dishes.length === 0){
  updateDishes()
}

  return (
    <div className='menu'>
      <div className='filter'>
        <span>Максимальная цена:</span>
      <NumericInput min={0} max={1000} value={price} onChange={setPrice}/>;
        <div onClick={() => {setPopupActive(true)}} className='calendarBtn'></div>
      </div>
      {popupActive && showPopup()}
      <div className='cardsCont'>
        {
          dishes.map
          (el => (<Card key={el.id} dish={el} isEdit={props.isEdit}
            addToCart={props.addToCart} removeDish={removeDish}
            date={date} price={price}/>
          ))
        }
        {props.isEdit && <CardCreator updateDishes = {updateDishes}/>}
      </div>
    </div>
  )
}
