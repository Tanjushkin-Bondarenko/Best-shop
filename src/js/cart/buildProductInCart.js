import { createSvgIcon } from "../product-cart/showProductDetail.js";
import { deleteItem, increase, decrease } from "./productCartHendlers.js";
   
    
export function buildProductInCart(productData){
  let products = JSON.parse(localStorage.getItem("product"))
  const productContainer = document.createElement("div");
  let currentTotalPrice = +((productData.quantity * Number(productData.price)).toFixed(2))
  let quantityInCard = document.querySelector("#quantity-in-card")

  productContainer.classList.add("prouct-container");
  const productImg = document.createElement("img")
  productImg.src = `/src/assets/img/${productData.img}`;
  productImg.alt = productData.name;
  productImg.loading = "lazy"
  const productNameInfo = document.createElement("div")
  const productName = document.createElement("p");
  productNameInfo.classList.add("product-name")
  productName.textContent = productData.name;
  const productInfo = document.createElement("span");
  productInfo.textContent = `(${productData.size}, ${productData.color})`
  productNameInfo.appendChild(productName)
  productNameInfo.appendChild(productInfo)
  const productPrice = document.createElement("p");
  productPrice.textContent = `$${productData.price}`;
  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("quantity-block")
  const productQuantity = document.createElement("span");
  productQuantity.textContent = productData.quantity;
  const buttonAdd = document.createElement("button");
  const total = document.createElement("span");
  total.classList.add("current-total-price")
  buttonAdd.textContent = "+";

  buttonAdd.addEventListener("click", ()=>{
    increase(productQuantity, total, quantityInCard, productData, products)}) 

  const buttonSub = document.createElement("button");
  buttonSub.textContent="-";
  buttonSub.addEventListener("click", ()=>{
    decrease(productQuantity, total, quantityInCard, productData, products)})
        
  quantityDiv.append(buttonSub);
  quantityDiv.append(productQuantity);
  quantityDiv.append(buttonAdd);
        
  total.textContent = `$${currentTotalPrice}`
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn")
  deleteBtn.innerHTML = createSvgIcon("trash-can");
       
  deleteBtn.addEventListener("click", ()=>{
    deleteItem(quantityInCard, productData,products, productContainer) })

  productContainer.appendChild(productImg)
  productContainer.appendChild(productNameInfo)
  productContainer.appendChild(productPrice)
  productContainer.appendChild(quantityDiv)
  productContainer.appendChild(total)
  productContainer.appendChild(deleteBtn)
  return productContainer
}




