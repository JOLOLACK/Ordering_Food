import { menuArray } from './data.js'
let OrderListArray = []
let total = []

function getMenuElements(){
    let feedHtml = ``
}



document.addEventListener('click',function(e){
    if(e.target.dataset.pizza){
        renderOrder(getTargetTweetObj(e.target.dataset.pizza))
    }
    else if(e.target.dataset.hamburger){
        renderOrder(getTargetTweetObj(e.target.dataset.hamburger)) 
    }
    else if(e.target.dataset.beer){
        renderOrder(getTargetTweetObj(e.target.dataset.beer)) 
    }
    else if(e.target.id){
        deleteEl(e.target.id)
    }
    if(e.target.id === "CheckoutBtn"){
        document.getElementById('modal').classList.toggle('hiddenModle')
    }
    
})

//--------------------------//
function getTargetTweetObj(d) {
  const targetTweetObj = menuArray.filter(function (menu) {
    return menu.uuid === d;
  });

  if (targetTweetObj.length > 0) {
    return targetTweetObj[0];
  }

  return null; // Return null if no matching menu item is found
}


function deleteEl(d){

    OrderListArray = OrderListArray.filter(order => order.uuid !== d)

    let elementToRemove = getTargetTweetObj(d)
    total = total.filter(fruit => fruit !== elementToRemove.price);
    renderTotalPrice()
    renderListOrder()

}
//--------------------------//

// Function to render the menu items
function renderMenu() {
  const menuContainer = document.getElementById('menu');

  // Loop through the menuArray using forEach
  menuArray.forEach((menuItem) => {
    // Create the HTML elements for each menu item using template literals
    const menuItemHTML = `
      <div class="flexy">
        <div class="emopjis">
          <p>${menuItem.emoji}</p>
        </div>
        <div class="FoodDetails">
          <h3>${menuItem.name}</h3>
          <div style="width: 100%; color: #8B8B8B; font-size: 16px; font-family: Smythe; font-weight: 400; line-height: 24px; word-wrap: break-word">${menuItem.ingredients.join(', ')}</div>
          <p>$${menuItem.price}</p>
        </div>
        <button data-${menuItem.name}="${menuItem.uuid}" class="add">+</button>
      </div>
      <p class="divider"></p>
    `;

    // Append the menu item HTML to the menu container using innerHTML
    menuContainer.innerHTML += menuItemHTML;
  });
}

// Call the renderMenu function to populate the menu
renderMenu();


function renderOrder(object){
    
    
    
    OrderListArray.push({
        name: object.name,
        price: object.price,
        uuid: object.uuid,      
    })
    total.push(object.price)
    
    renderTotalPrice()

 
    //----------------------
    
    renderListOrder()
   
    
    
}
function renderTotalPrice(){
       let totalPrice = calculateTotalPrice()
    
        document.getElementById("order").innerHTML = 
    `
                
        <div class="title">Your Order</div> 
            <div id='orders'>

            </div>
                
            <p class="divider2"></p>
            
            <div class="list">
                <p>Total Price</p>
                <p>${totalPrice}</p>
            </div>
                
            <button class="orderButton" id="CheckoutBtn" >Order</button>
    
    `
}

function calculateTotalPrice(){
    
    let sum = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sum)

    return sum
}

function renderListOrder(){
    
    
    let OrderList = document.getElementById("orders")
    
    OrderList.innerHTML = ``
    OrderListArray.forEach(function(list){
        OrderList.innerHTML += 
        `
        <ul class="list hoverlist"  id="${list.uuid}">
            <li>${list.name}</p>
                <li>${list.price}</p> 
        </ul>
        `    
    })
    
   
 
    
}