import React , { createContext } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Login from './components/Login'
import Reg from './components/Reg'
import MenuEditor from './components/MenuEditor'
import './css/Wrap.css'

import AuthContext from './AuthContext'
import { useAuthState } from "react-firebase-hooks/auth"

import { BrowserRouter, Routes, Route} from 'react-router-dom';

export const IsAdminContext = createContext(null)
export class App extends React.Component {
  static contextType = AuthContext

  constructor(){
    super()


    let cartFromStorage = JSON.parse(localStorage.getItem("cart"))
    if(cartFromStorage === null || cartFromStorage.constructor != Array){
      cartFromStorage = []
    }

    
    this.state = {
      isAdmin : true,
      cart : cartFromStorage,
      dishes: []
    }
    this.addToCart = this.addToCart.bind(this)
    this.deliteFromCart = this.deliteFromCart.bind(this)
  }

  async addToCart(dish){
    let hasInCart = false
    this.state.cart.forEach(el=>{
      if(el.id === dish.id){
        hasInCart = true
      }
    })

    if(!hasInCart){
      await this.setState({cart: [...this.state.cart, dish]})
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
      console.log(this.state.cart)

    }
  }

  async deliteFromCart(dish){
    await this.setState({cart: this.state.cart.filter(el=> el.id !== dish.id)})
    localStorage.setItem('cart', JSON.stringify(this.state.cart))
  }

  render(){
    setTimeout(() => {
      const {auth} = this.context
      const user = auth.currentUser
      user &&
        fetch("http://localhost:4444/isAdmin", 
          {
            method : "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            body :  `{ "email" : "${user.email}" }`
          })
        .then(response => response.json())
        .then(bIsAdmin => {
          if(this.state.isAdmin != bIsAdmin){
            this.setState({isAdmin : bIsAdmin}) // напомнить для чего эта часть кода
          }
        });
    }, 1000)      

    return (
      <div className='wrap'>
        <IsAdminContext.Provider value={this.state.isAdmin}>
          <BrowserRouter>
            <Header cart={this.state.cart} deliteFromCart={this.deliteFromCart}/>
            <Routes>
              <Route path="/" element={<Main dishes ={this.state.dishes} addToCart={this.addToCart}/>}/>
              <Route path="/reg" element={<Reg/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/editor" element={<MenuEditor dishes ={this.state.dishes} addToCart={this.addToCart}/>}/>
            </Routes>
          </BrowserRouter>
          <Footer />
        </IsAdminContext.Provider>
      </div>
    )
  }
}

export default App
