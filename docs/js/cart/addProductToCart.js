import { openCart } from "./openCart.js";

export function addProductToCart(element){
  
  const price = element.querySelector("#price").textContent;
  const size = document.querySelector("#size");
  const color = document.querySelector("#color");
  const category = document.querySelector("#category");
  const priceNumber = price.slice(1)
  let quantity = Number(element.querySelector("#quantity").textContent)
  let quantityInCard = document.querySelector("#quantity-in-card")


  showError(element);
  if(size.value == ""||color.value == ""||category.value =="" || quantity == 0){
    return;
  }

  const product = {
    id: element.dataset.id,
    size: size.value,
    color: color.value,
    name: element.querySelector("#title").textContent,
    img: element.querySelector("#main-img").dataset.info,
    quantity: quantity,
    price: priceNumber,
    total: quantity * priceNumber,
    category: category.value,
  }
 
  const cartItems = JSON.parse(localStorage.getItem("product")) || [];
  const existingProductIndex = cartItems.findIndex(item=>
    item.id === product.id &&
  item.size === product.size && 
  item.color === product.color &&
  item.category === product.category
  ) 
  if(existingProductIndex > -1){
    let carentQuantity = Number(cartItems[existingProductIndex].quantity)
    cartItems[existingProductIndex].quantity = carentQuantity + quantity
  }else{
    cartItems.push(product)
  }

  localStorage.setItem("product", JSON.stringify(cartItems))
  changeQuantityInCardIcon(quantityInCard, quantity);
  document.querySelector("#open-cart").addEventListener("click", ()=>{
    openCart()
  })
}

function showError(element){
  element.querySelectorAll("select").forEach(el=>{
    if(el.value == ""){
      el.nextElementSibling.style.display = "block";
        
    }else{
      el.nextElementSibling.style.display = "none"
    }
  })
}

function changeQuantityInCardIcon(element, num){
  if(element.style.display == "none"){
    element.style.display = "inline-block"
    element.textContent= num  
  }else{
    let infoInCard = Number(element.textContent)
    element.textContent = infoInCard + +num
  }
}