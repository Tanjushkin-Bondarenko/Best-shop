import { findIndexCurrentElem, updateLocalStorige } from "./updateLocalStorige.js";
import { showSumToPay } from "./openCart.js";

export function deleteItem(cart, item,array, node){
        cart.textContent = cart.textContent - item.quantity;
        if(cart.textContent == 0)cart.style.display = "none"
        let curentIndex = findIndexCurrentElem(array, item)
        array.splice(curentIndex, 1)
        localStorage.setItem("product", JSON.stringify(array))
        const subTotal = document.querySelector("#sub-total-sum");
        let updateSum = Number((subTotal.textContent).substring(1)) - item.total;
        showSumToPay(updateSum, subTotal)
        node.remove()
        
        if(document.querySelectorAll("#product-container").length == 0){
               document.querySelector("#empty-cart-isnfo").style.display = "block";
        }
}

export function increase(nodeQuantity, nodeTotal, nodeCart, element){
         let updateQuantity = Number(nodeQuantity.textContent)+1
                nodeQuantity.textContent = updateQuantity;
                let updatePrice = updateQuantity*element.price
                nodeTotal.textContent = `$${updatePrice}`
                updateLocalStorige(element, updateQuantity, updatePrice)
                nodeCart.textContent = Number(nodeCart.textContent) +1

                const subTotal = document.querySelector("#sub-total-sum");
                let updateSum = Number((subTotal.textContent).substring(1)) + +element.price;
                showSumToPay(updateSum, subTotal)
}

export function decrease(nodeQuantity, nodeTotal, nodeCart, element){
        if(nodeQuantity.textContent == 1)return
        else{ let updateQuantity = nodeQuantity.textContent = nodeQuantity.textContent - 1;
              let updatePrice = updateQuantity * element.price
              nodeTotal.textContent = `$${updatePrice}`
              updateLocalStorige(element, updateQuantity, updatePrice)
              nodeCart.textContent = nodeCart.textContent -1
                const subTotal = document.querySelector("#sub-total-sum");
let updateSum = (subTotal.textContent).substring(1) - element.price;
showSumToPay(updateSum, subTotal)

}
}

export  function clearCart(element) {
   localStorage.removeItem("product");
   element.forEach(el=>el.remove())
   document.querySelector("#sub-total-sum").textContent = "";
   document.querySelector("#discont").style.display = "none"
   document.querySelector("#ship-sum").textContent = "";
   document.querySelector("#total-sum").textContent = ""
   document.querySelector("#quantity-in-card").style.display="none"
   if(document.querySelector("#thanks").style.display == "block"){
    document.querySelector("#thanks").style.display ="none"}
    
}