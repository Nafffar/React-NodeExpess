import React, {useContext, useState} from 'react'
import '../css/Header.css'
import CartCard from './CartCard';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import AuthContext from '../AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth'
import NavigList from './NavigList';
import BurgerMenu from './BurgerMenu';

function showCart(cart, deliteFromCart){
  const len = cart.length;
  if(len > 0)
  {
    return(
      <div className='cartCont'>
        {cart.map(el=>(<CartCard deliteFromCart={deliteFromCart} key={el.id} dish={el}/>))}
    </div>)
  }
  else
  {
    return(
      <div className='cartCont'>
      <span className='emptyMsg'>Корзина пуста!</span>      
      </div>
    )
  }
}

// function showInfo(auth, user){
//   return(
//     <div className='userInfo'>
//       <span>{user.displayName}</span>
//       <span>{user.email}</span>
//       <a onClick={()=>{
//         auth.signOut()
//         localStorage.clear()
//       }} href='/Login'>Выйти</a>
//     </div>
//   )
// }




export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false);
  let [infoOpen, setInfoOpen] = useState(false)

  const {auth} = useContext(AuthContext)
  const [user] = useAuthState(auth)


  return (
    <header>
        <span className='title'>Столовая школы №7</span>
        <nav>
          <AiOutlineShoppingCart 
            className={`${cartOpen ? 'chartButtonActive' : 'chartButton'}`}
            onClick={()=>setCartOpen(!cartOpen)}
          />
          <NavigList />
          <BurgerMenu/>
        </nav>


        {cartOpen && showCart(props.cart, props.deliteFromCart)}
    </header>
  )
}
