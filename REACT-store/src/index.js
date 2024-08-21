import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';

import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';


//Подключение к Firebase------------------
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import AuthContext from './AuthContext';

const app = initializeApp({
    apiKey: "AIzaSyB70pI_PXX6UPRdBzaFH599c8Fz9tyn1Bc",
    authDomain: "dinnerroom-4f8de.firebaseapp.com",
    projectId: "dinnerroom-4f8de",
    storageBucket: "dinnerroom-4f8de.appspot.com",
    messagingSenderId: "899676071526",
    appId: "1:899676071526:web:c7ecb2da9c6916fa27afa7",
    measurementId: "G-JS5PEKE4BJ"
  }
);
const analytics = getAnalytics(app)
const auth = getAuth()
const firestore = getFirestore()



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext.Provider value={{
      firebase,
      auth,
      firestore
    }}>
      <App />
    </AuthContext.Provider>
  </React.StrictMode>
);





// const time = ReactDOM.createRoot(document.getElementById('time'));
// function tick() {
//   time.render(
//     <div>
//       <h1>Сервис получения времени</h1>
//       <h2>Текущее время {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
// }
// setInterval(tick, 5000);

// function Hello(props) {
//   return <div>
//    <h1>Привет:{props.name}</h1>
//    <h1>Мне:{props.age}</h1>
//    </div>
// }
// Hello.defaultProps = {name: "Vit", age: 31};
// ReactDOM.createRoot(
//       document.getElementById("test")
//   )
//   .render(
//       <Hello/>
//   );



// function ClickButton(props){
  
//   function press(){
//     alert('Hello React!')
//   }
//   return <button onClick={press}>Click</button>
// }
// ReactDOM.createRoot(
//   document.getElementById('test')
// )
// .render(
//   <ClickButton/>
// )



// function PrintButton(props) {
              
//   function print(name, age){
//       console.log(`Name ${name}  Age: ${age}`);
//  }

//   return <div> 
//               <button onClick={() => print("Bob", 23)}>Print Bob</button>
//               <button onClick={() => print("Tom", 36)}>Print Tom</button>
//           </div>;
// }
// ReactDOM.createRoot(
//   document.getElementById("test")
// )
// .render(
//   <PrintButton />
// );



// class ClickButton extends React.Component {
             
//   constructor(props) {
//       super(props);
//       this.state = {class: "off", label: "Нажми"};
        
//       this.press = this.press.bind(this);
//   }
//   press(){
//       let className = (this.state.class==="off")?"on":"off";
//       this.setState({class: className});
//   }
//   render() {
//       return <button onClick={this.press} className={this.state.class}>{this.state.label}</button>;
//   }
// }
// ReactDOM.createRoot(
//    document.getElementById("test")
// )
// .render(
//    <ClickButton />
// );
