import { buildCard } from "../catalog/buildCard.js";
import { createButton } from "../catalog/buildCard.js";
import { addProductToCart} from "../cart/addProductToCart.js";
import { viewProduct } from "./viewProduct.js";

export function showProductDetail(id){
    
  const prodDetailsBtns = document.querySelectorAll("#product-detais-btns > button");
  const prodDetailsInfo = document.querySelectorAll(".prod-info");
  const rating = document.querySelector("#stars-rating")
  const sizeOption = document.querySelectorAll("#size > option")
  const addToCart = document.querySelector("#add-to-cart");
  const img = document.querySelector("#main-img")

  addToCart.addEventListener("click", (event)=>{
   
    addProductToCart(event.target.parentElement)
  })

  fetch("/docs/assets/data.json")
    .then(res => res.json())
    .then(response =>{
      let prod = response.data
      let current = prod.find(item=>{
        return item.id == id
      })

 
      if(current.size.length == 1){
        sizeOption.forEach(i => 
        {i.value !== current.size ? i.disabled=true : i.disabled =false }
        )
      }
      img.src=`/docs/assets/img/${current.imageUrl}`
      img.dataset.info = current.imageUrl
      document.querySelector("#title").textContent = current.name;
      document.querySelector("#product").dataset.id = current.id
      
      for(let i=0;i<current.rating; i++){
        let span = document.createElement("span")
        span.innerHTML = createSvgIcon("ful-star")
        rating.append(span)
         
      }
      if(current.rating<5){
        for(let i = current.rating; i<=5;i++){
          let span = document.createElement("span");
          span.innerHTML = createSvgIcon("empty-star")
          rating.append(span)
        }
      }
      document.querySelector("#clients-review").textContent = `(${current.popularity} clients reviw)`
      document.querySelector("#price").textContent = `$${current.price}`

      for(let i =0; i<4; i++){
        let randomId = Math.floor(Math.random()* prod.length);
        let product =  buildCard(prod[randomId]);
        let button = createButton();
        button.textContent = "Add To Card";
        button.addEventListener("click", (e)=>viewProduct(e.target.parentElement.dataset.id))
     
        product.append(button)
        document.querySelector("#also-like-products").append(product)
      }
    });  


  prodDetailsBtns.forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      if(e.target.classList.value == "active-button")return
      prodDetailsBtns.forEach(item=>item.classList.remove("active-button"));
      prodDetailsInfo.forEach(item => item.style.display="none")
      e.target.classList.add("active-button")
      document.querySelector(`#${e.target.id}-block`).style.display = "flex"  
    })
  })    
}

export function createSvgIcon(val){
  return `<svg height="20" width="20">
<use href='/docs/assets/sprite.svg#${val}'>
</use></svg>`   
}