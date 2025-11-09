import { createCourosel, caruselMove, move} from "./homepage/createCarousel.js"
import { loadHTML, loadPage, showActivePage } from "./homepage/loadHtml.js";


loadHTML('#header', "/src/components/header.html");
loadHTML("#footer", "/src/components/footer.html");


document.querySelector("#view-all").addEventListener("click", ()=>{
  loadPage("catalog");
  showActivePage("catalog")
});

createCourosel("/src/assets/data.json");

const newTrack = document.querySelector("#new-track");
const selectedTrack = document.querySelector("#selected-track");


document.querySelector("#new-next").addEventListener("click", 
  () => caruselMove(newTrack, true));
document.querySelector("#new-prev").addEventListener("click", 
  () => caruselMove(newTrack, false));

newTrack.addEventListener("wheel", (e) => {
  e.preventDefault()
  if (e.deltaY > 0) {
    e.currentTarget.scrollLeft += e.currentTarget.clientWidth
  } else {
    e.currentTarget.scrollLeft -= e.currentTarget.clientWidth
  }
  selectedTrack.scrollLeft += e.deltaY > 0 ? selectedTrack.clientWidth : -selectedTrack.clientWidth;
})

document.querySelector("#next").addEventListener("click", 
  () => move(selectedTrack, true));

document.querySelector("#prev").addEventListener("click", 
  () => move(selectedTrack, false));

selectedTrack.addEventListener("wheel", (e) => {
  e.preventDefault()
  if (e.deltaY > 0) {
    e.currentTarget.scrollLeft += e.currentTarget.clientWidth
  } else {
    e.currentTarget.scrollLeft -= e.currentTarget.clientWidth
  }
  selectedTrack.scrollLeft += e.deltaY > 0 ? selectedTrack.clientWidth : -selectedTrack.clientWidth;

})












