/* CART & MENU LOGIC */

const menu = [
  // Beef - 5 items
  { name:"Enoki", price:380, img:"beef enoki.png", category:"beef" },
  { name:"Bulgogi", price:330, img:"beef bulgogi.png", category:"beef" },
  { name:"Gochujang", price:330, img:"beef gochujang.png", category:"beef" },
  { name:"Yangnyeom", price:330, img:"beef yangnyeom.png", category:"beef" },
  { name:"Salt and Pepper", price:330, img:"beef.jpg", category:"beef" },

  // Pork - 5 items
  { name:"Enoki", price:340, img:"pork enoki.png", category:"pork" },
  { name:"Yangnyeom", price:330, img:"pork yangnyeom.png", category:"pork" },
  { name:"Bulgogi", price:290, img:"pork bulgogi.png", category:"pork" },
  { name:"Gochujang", price:290, img:"pork gochujang.png", category:"pork" },
  { name:"Salt and Pepper", price:290, img:"sandp pork.png", category:"pork" },

  // Side Dish - 7 items
  { name:"Kimchi", price:180, img:"kimchi.jpg", category:"side" },
  { name:"Potato Marble", price:99, img:"potato marble.jpg", category:"side" },
  { name:"Fishcake", price:99, img:"fishcake.jpg", category:"side" },
  { name:"Cucumber Kimchi", price:99, img:"cucumber.jpg", category:"side" },
  { name:"Pickled Radish", price:99, img:"radish.jpg", category:"side" },
  { name:"Pickled Onion", price:99, img:"onion.jpg", category:"side" },

  // Bundle - 7 items
  { name:"Sulit Package", price:699, img:"sulit pack.jpg", category:"bundle" },
  { name:"Beef Package", price:799, img:"beef pack.jpg", category:"bundle" },
  { name:"Student Package 1", price:999, img:"student pack 1.jpg", category:"bundle" },
  { name:"Student Package 2", price:1299, img:"student pack 2.jpg", category:"bundle" },
  { name:"Seafood and Beef Package", price:1499, img:"sbeef pack.jpg", category:"bundle" },
  { name:"Big Group Package 1", price:1599, img:"bg pack 1.jpg", category:"bundle" },
  { name:"Big Group Package 2", price:1999, img:"bg pack 2.jpg", category:"bundle" },
];

const basketCount = document.getElementById("basket-count");
const cartPopup = document.getElementById("cart-popup");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElem = document.getElementById("cart-total");

let cart=[];

// Auto-render menu by category
["beef","pork","plain","side","bundle"].forEach(cat=>{
  const container = document.getElementById(cat);
  if(container){
    const items = menu.filter(item=>item.category===cat);
    items.forEach((item,index)=>{
      const div = document.createElement("div");
      div.className="menu-item";
      div.innerHTML=`
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₱${item.price}</p>
        <button onclick="addToCart(${menu.indexOf(item)})"><i class="fas fa-cart-plus"></i></button>
      `;
      container.appendChild(div);
    });
  }
});

// CART FUNCTIONS
function addToCart(index){
  const item = menu[index];
  const existing = cart.find(i=>i.name===item.name);
  if(existing) existing.quantity++;
  else cart.push({...item, quantity:1});
  updateCart();
}

function updateCart(){
  basketCount.textContent = cart.reduce((acc,i)=>acc+i.quantity,0);
  cartItemsContainer.innerHTML="";
  let total=0;
  cart.forEach(item=>{
    total+=item.price*item.quantity;
    const p = document.createElement("p");
    p.innerHTML=`${item.name} x ${item.quantity} <span>₱${item.price*item.quantity}</span>`;
    cartItemsContainer.appendChild(p);
  });
  cartTotalElem.textContent=total;
}

function toggleCart(){
  if(cartPopup.style.display==="block") cartPopup.style.display="none";
  else cartPopup.style.display="block";
}

function checkout(){
  if(cart.length===0){ alert("Cart is empty!"); return; }
  alert("Already checked out!");
  cart=[];
  updateCart();
  toggleCart();
}
