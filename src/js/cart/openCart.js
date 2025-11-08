import { createPath } from "../homepage/loadHtml.js";
import { buildProductInCart } from "./buildProductInCart.js";
import { loadPage } from "../homepage/loadHtml.js";
import { clearCart } from "./productCartHendlers.js";

 export async function openCart(){

    const cart = document.querySelector("#main-content");
    document.querySelector("#home").style.display = "none";
    cart.style.display = "flex"
    await createPath("pages","cart", cart)
    const cartProducts = document.querySelector("#product-in-cart");
    const subTotal = document.querySelector("#sub-total-sum");
    document.querySelector("#continue-shopping").addEventListener("click",()=> loadPage("catalog"));
    let sum = 0

    let products = JSON.parse(localStorage.getItem("product"))
    const arrProd = products.map(prod=> buildProductInCart(prod));
    arrProd.forEach(p=>{cartProducts.append(p)})
    products.map(el=> sum+= el.total)
    showSumToPay(sum, subTotal)
  let container =  document.querySelectorAll(".prouct-container")
   
  document.querySelector("#clear-cart").addEventListener("click", ()=>{
      clearCart(container);
      document.querySelector("#empty-cart-isnfo").style.display = "block"
 })

 document.querySelector("#checkout").addEventListener("click", ()=>{
      clearCart(container)
      document.querySelector("#thanks").style.display="block"
})
}

export function showSumToPay(val, node){
  
const total = document.querySelector("#total-sum");
const sumDiscont = document.querySelector("#discont-sum"); 
const discont = document.querySelector("#discont");


 node.textContent = `$${val}`;
      let totalSum = 0
      let sumOfDiscont = (val*0.01).toFixed(2)
    if(val>3000){
        discont.style.display = "flex";
        sumDiscont.textContent = `$${sumOfDiscont}`
        totalSum = val + 30 - sumOfDiscont;
    }else{
        discont.style.display = "none";
        totalSum = val + 30
    }
        total.textContent = `$${totalSum}`
        if(val==0){
        total.textContent =""
        document.querySelector("#ship-sum").textContent = ""
       document.querySelector("#sub-total-sum").textContent = ""
      }
}

