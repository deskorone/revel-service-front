
import { IHotel } from "./tyoes";

// url по которому можно полусить все отели 
const URLhotels : string = "http://localhost:8080/hotels" 


let requestGet = (url : string)=>{
    return fetch(url).then(response => response.json());
}




let list : HTMLElement  = document.getElementById("list")
let ws : WebSocket = new WebSocket("ws://localhost:8080/hotels/ws")


function init(){

    requestGet(URLhotels).then(b =>{
        let hotels = Array.from<IHotel>(b)

        hotels.forEach(hotel => {            
            addHotel(hotel)
        })
        

    })

    ws.onopen = () =>{
        console.log("Socket open");
    }

    ws.onmessage = (payload) => {
        console.log("Message");
        
        let hotel : IHotel = JSON.parse(payload.data)

        addHotel(hotel)
    }

    ws.onclose = () => {
        console.log("Socket close");
        
    }

}


init()




let addHotel = (hotel : IHotel) =>{
    let cell : HTMLDivElement = document.createElement('div')
    cell.classList.add('cell')

    let name : HTMLDivElement = document.createElement('div')
    name.classList.add('name')
    cell.appendChild(name)
    name.innerText = hotel.name

    let info : HTMLDivElement = document.createElement('div')
    info.classList.add('info')

    let price : HTMLDivElement = document.createElement('div')
    price.classList.add('price')
    price.innerText = hotel.price.toString()

    let rating : HTMLDivElement = document.createElement('div')
    rating.classList.add('rating')
    price.innerText = hotel.rating.toString()


    info.appendChild(price)
    info.appendChild(rating)

    cell.appendChild(info)

    list.appendChild(cell)
}



