import React, {useState} from 'react'
import '../css/CardEditor.css'

export default function CardEditor(props) {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState(undefined)
    const [imgUrl, setImgurl] = useState(undefined)
  

    async function sendDushToServer(){
        const form = new FormData();
        form.append('image', img);


        fetch(`https://api.imgbb.com/1/upload?expiration=15552000&key=14e204e36c947a008933281228e70ff8&name=#${img.name}`, {
            method: 'POST',
            body: form
        })
        .then((response)=>response.json())
        .then((response)=>{
            if(response.status == 200){
                let body = {
                    "title": title,
                    "price": price,
                    "desc": desc,
                    "img": response.data.url
                }

                fetch("http://localhost:4444/addDish", {
                    method: 'POST',
                    headers: new Headers({'content-type': "application/json; charset=utf-8"}),
                    body: JSON.stringify(body)
                })
                .then(()=>{
                    props.updateDishes()
                })
            }
        });
        
    }

    return (
        <div className="cardEditor">
            <img src={imgUrl} className='imgPreview'/>
            <input className='editorImput' type='file' onChange={(e)=>{
                const file = e.target.files[0];
                setImg(file ? file : undefined);
                setImgurl(file ? URL.createObjectURL(file) : undefined);
                }
            }/>

            
            <input type='text' name="title" placeholder='Название блюда'
            value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type='text' name='price' placeholder='Цена'
            value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <input type='text' name='desc' placeholder='Описание'
            value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
            
            <div className='applyBtn'onClick={sendDushToServer}>
                &#10004;
            </div>
            
        </div>
    )
}


// fetch("http://localhost:4444/addDish", 
//     {
//     method : "POST",
//     headers: {
//         "Content-Type": "application/json;charset=utf-8"
//     },
//     body :  `{ "title" : "${title}" ,
//                 "price" : "${price}",
//                 "desc"  : "${desc}",                        
//                 "category" : "Food"
//                 }`
//     })