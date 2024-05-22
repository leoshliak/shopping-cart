const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.close-shopping'); // Corrected typo: closeSopping to closeShopping
const list = document.querySelector('.list');
const listCard = document.querySelector('.list-card');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const clearCart = document.querySelector('.fa-trash-can');
 
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => { 
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Samsung Galaxy S24 Ultra',
        image: '1.jpg',
        price: 1576
    },
    {
        id: 2,
        name: 'Apple iPhone 15 Pro',
        image: '2.jpg',
        price: 1372
    },
    {
        id: 3,
        name: 'Redmi Note 13 Pro',
        image: '3.jpg',
        price: 330
    },
    {
        id: 4,
        name: 'Samsung Galaxy A55',
        image: '4.jpg',
        price: 534
    },
    {
        id: 5,
        name: 'POCO X6 Pro',
        image: '5.jpg',
        price: 356
    },
    {
        id: 6,
        name: 'Apple iPhone 14',
        image: '6.jpg',
        price: 840
    }
];

let listCards = [];

function innitApp(){
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
          <img src='imgs/${value.image}'>
          <div class='item-info'>
          <div class='title'>${value.name}</div>
          <div class='price'>${value.price.toLocaleString()}$</div>
          <button onclick='addToCard(${key})'>Add To Card</button>
          </div>
        `;
        list.appendChild(newDiv);
    });
}

innitApp();

function addToCard(key){
    if(listCards[key] == null){
       listCards[key] = { ...products[key], quantity: 1 };
    }
    reloadCard();
}



function reloadCard(){
    listCard.innerHTML = '';
   let count = 0; 
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if(value != null){
            let newLi = document.createElement('li');
            listCard.appendChild(newLi);
            newLi.innerHTML = `
             <div><img src='imgs/${value.image}'></div>
             <div class='li-name'>${value.name}</div>
             <div class='li-price'>${(value.price * value.quantity).toLocaleString()}$</div>
             <div>
             <button onclick='changeQuantity(${key}, ${value.quantity - 1})'>-</button>
             <div class='count'>${value.quantity}</div>
             <button onclick='changeQuantity(${key}, ${value.quantity + 1})'>+</button>
             </div>
            `;
            count += value.quantity;
            totalPrice += value.price * value.quantity;

           
        }
    });
    total.innerText = `${totalPrice.toLocaleString()}$`;
    quantity.textContent = count;
    
    populateStorage();
}

function changeQuantity(key, quantity){
  if(quantity == 0){
    delete listCards[key];
  }else{
    listCards[key].quantity = quantity;
  }
  reloadCard();
}

clearCart.addEventListener('click', () =>{
     listCards = [];
    listCard.innerHTML = '';
     count = 0; 
     totalPrice = 0;
     total.textContent = '0';
     quantity.textContent = '0';
     populateStorage();
});

if(!localStorage.getItem('listCards')){
    populateStorage();
  }else{
    getStorage();
    
  }

function populateStorage(){
    localStorage.setItem('listCards',  JSON.stringify(listCards));
    //localStorage.setItem('count', count);
    localStorage.setItem('total', total.textContent);
    localStorage.setItem('quantity', quantity.textContent);
    getStorage
}

  function  getStorage(){
    var currentListCards = JSON.parse(localStorage.getItem('listCards'));
  //  var currentCount = localStorage.getItem('count');
    var currentTotal = localStorage.getItem('total');
    var currentQuantity = localStorage.getItem('quantity');
   
    listCards = currentListCards;
    total.textContent = currentTotal;
    quantity.textContent = currentQuantity;
   
  }


  listCards.forEach((value, key) => {
    if(value != null){
        let newLi = document.createElement('li');
        listCard.appendChild(newLi);
        newLi.innerHTML = `
         <div><img src='imgs/${value.image}'></div>
         <div class='li-name'>${value.name}</div>
         <div class='li-price'>${(value.price * value.quantity).toLocaleString()}$</div>
         <div>
         <button onclick='changeQuantity(${key}, ${value.quantity - 1})'>-</button>
         <div class='count'>${value.quantity}</div>
         <button onclick='changeQuantity(${key}, ${value.quantity + 1})'>+</button>
         </div>
        `;
    }
});