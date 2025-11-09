import{buildCard, createButton} from "../catalog/buildCard.js"
import { viewProduct } from "../product-cart/viewProduct.js";

export function createCourosel(url){  

  fetch(url)
    .then(res => res.json())
    .then(result => {      
      result.data.map(item => {
        if (item.blocks.includes("Selected Products")) {
          const addToCardBtn = createButton()
          addToCardBtn.textContent = "Add to card";
          let productCard = buildCard(item)
          productCard.append(addToCardBtn)
          document.querySelector("#selected-track").append(productCard);
          addToCardBtn.addEventListener("click", (e)=>viewProduct(e.target.parentElement.dataset.id))
        }
        if (item.blocks.includes("New Products Arrival")) {
          const addToCardBtn = createButton()
          addToCardBtn.textContent = "View Product";
          addToCardBtn.classList.add("view");
          let productCard = buildCard(item)
          productCard.append(addToCardBtn)
          document.querySelector("#new-track").append(productCard);
          addToCardBtn.addEventListener("click", (e)=>viewProduct(e.target.parentElement.dataset.id))
        }
      });  
    })
}

export function caruselMove(positive = true, element) {
  let slide = document.querySelector("#new-track > :nth-child(1)")
  if (!slide) return
  const slideWidth = slide.clientWidth;
  element.scrollLeft = positive ? element.scrollLeft + slideWidth : element.scrollLeft - slideWidth
}

export function move(positive = true, element){
  let slide = document.querySelector(".product")
  if (!slide) return
  const slideWidth = slide.clientWidth;
  element.scrollLeft = positive ? element.scrollLeft + slideWidth : element.scrollLeft - slideWidth 
}
    

const slides = document.querySelector("#goods-block");

let position =0
let direction = 1
function showNextSlide() {
  position += direction * 10;
  if (position >= 90) direction = -1; 
  if (position <= -100) direction = 1;
  slides.style.transform = `translateX(${position}%)`;

  //   requestAnimationFrame(showNextSlide)
  
}

setInterval(showNextSlide, 1000)