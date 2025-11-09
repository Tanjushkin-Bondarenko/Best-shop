import { openCart } from "./openCart.js";

export function showQuantityInCart(){
  let quantityProductsInCart = document.querySelector("#quantity-in-card");
  let saveProducts = JSON.parse(localStorage.getItem("product")) || [];
  let sum = 0
  saveProducts.map(item=>{
    return sum += Number(item.quantity)
  })
  if(quantityProductsInCart.style.display == "none" && sum>0){
    quantityProductsInCart.style.display = "inline-block"
    quantityProductsInCart.textContent = sum;
    document.querySelector("#open-cart").addEventListener("click", ()=>openCart())
  } 
   
}