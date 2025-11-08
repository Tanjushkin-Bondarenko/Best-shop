import { createPath } from "../homepage/loadHtml.js";
import { showProductDetail } from "./showProductDetail.js";

export async function viewProduct(id){
  
   let prodCartPage = document.querySelector("#main-content")
    document.querySelector("#home").style.display = "none";
    prodCartPage.style.display="block"
  await createPath("components","product-card", prodCartPage)
   
    showProductDetail(id)
    const addBtn = document.querySelector("#add");
    const subBtn = document.querySelector("#subtract");
    const quantity = document.querySelector("#quantity");
    const AddToCartBtn = document.querySelector("#add-to-cart")

    addBtn.addEventListener("click", ()=>{
      quantity.textContent = Number(quantity.textContent) +1
    });
    subBtn.addEventListener("click", ()=>{
      if(quantity.textContent == 1)return
      quantity.textContent = Number(quantity.textContent) -1
    })

    

}
