import { createCourosel } from "./createCarousel.js";
import showProducts from '../catalog/showProducts.js'
import { showQuantityInCart } from "../cart/showQuantityInCart.js";
import { checkValidityEmail } from "../contact/checkValidity.js";


const mainContent = document.querySelector("#main-content");
const homePage = document.querySelector("#home");

export function loadHTML(element, file){
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("File not found", file);
      return response.text()
    })
    .then(data => {
      document.querySelector(element).innerHTML = data
      window.scrollTo(0, 0)
      setNavigation()
      showQuantityInCart()
      if(element == "#header"){
        document.querySelector("#logo").addEventListener("click", ()=>logohendler(mainContent, homePage))
        document.querySelector("#login").addEventListener("click", showLoginWindow)
      }
      if(element=="#footer"){
        document.querySelector("#about-us-from-footer").addEventListener("click", ()=>{
          loadPage("about")
          showActivePage("about")})
        document.querySelector("#contact-from-footer").addEventListener("click", ()=>{
          loadPage("contact")
          showActivePage("contact")})
      }
    })
    .catch(error => console.log(error));  
}

export async function loadPage(page) {
     
  if(page === "home"){
    mainContent.style.display = "none";
    homePage.style.display = "block";
    createCourosel("/assets/data.json")
  }else{
    mainContent.style.display = "block";
    homePage.style.display = "none";
    await createPath("pages",page, mainContent)
    
  }
  if(page=="catalog"){ showProducts();}
  if(page =="about"){
    document.querySelector("#see-all").addEventListener("click", ()=>{
      loadPage("catalog")
      showActivePage("catalog")
    }) }
  if(page=="contact"){checkValidityEmail()}
}

function setNavigation() {
  const pages = document.querySelectorAll("a[data-page]")
  const menu = document.querySelector("#header-menu")
  if(!menu.querySelector(".active-menu"))menu.querySelector("#home-page").classList.add("active-menu")
  pages.forEach(item =>{item.addEventListener("click", (e) => {
    pages.forEach(p=>p.classList.remove("active-menu"))
    e.target.classList.add("active-menu")
    if (e.target.matches("a[data-page]")) e.preventDefault();
    let page = e.target.getAttribute("data-page");
    window.location.hash = page;
    loadPage(page)
  })
  })
}



function router() {
  const hash = location.hash.replace("#", "");
  const hashPage = hash || "home";
  if(document.querySelectorAll("#header-menu > a")){
    document.querySelectorAll("#header-menu > a").forEach(item=>{
      item.classList.remove("active-menu");
      if(item.dataset.page == hashPage)item.classList.add("active-menu")
      
    })    }
  loadPage(hashPage);
}

 
window.addEventListener("hashchange", ()=>{
  router();
  window.scrollTo(0, 0);
}
);
// window.addEventListener("DOMContentLoaded", ()=>router());

  


export async function createPath(folder,pageName, element){
  const response = await fetch(`/${folder}/${pageName}.html`)
  const data = await response.text()
  element.innerHTML = data

}

function logohendler(elment1,element2 ){
      
  elment1.style.display = "none";
  element2.style.display = "block";
  showActivePage("home-page")
      
} 

export function showActivePage(val){
  document.querySelectorAll("#header-menu a").forEach(item=>item.classList.remove("active-menu"));
  document.querySelector(`#${val}`).classList.add("active-menu")
}

function showLoginWindow(){
  const popup = document.querySelector("#popup");
  popup.style.display == "none" ? popup.style.display = "block" : popup.style.display = "none";
  document.querySelector("#togle-password").addEventListener("click", toglePassword)
}

function toglePassword(){
  const passwordInput = document.querySelector("#password");
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text"
}
