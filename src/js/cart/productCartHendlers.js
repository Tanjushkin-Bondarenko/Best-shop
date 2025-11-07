import { getCurrenElmentInLocalStorige, updateLocalStorige } from "./updateLocalStorige.js";
import { showSumToPay } from "./openCart.js";

export function deleteItem(cart, item,array, node){
        cart.textContent = cart.textContent - item.quantity;
        if(cart.textContent == 0)cart.style.display = "none"
        let element = getCurrenElmentInLocalStorige(item, array)
        let deleteElement = array.indexOf(element)
        array.splice(deleteElement, 1)
        localStorage.setItem("product", JSON.stringify(array))
        node.remove()
        
        if(document.querySelector("#product-in-cart").childNodes.length == 0){
                const p = document.createElement("p");
               document.querySelector("#empty-cart-isnfo").style.display = "flex";
                document.querySelector("#product-in-cart").append(p)
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