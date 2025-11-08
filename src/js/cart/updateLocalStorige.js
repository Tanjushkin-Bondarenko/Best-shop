
export function getCurrenElmentInLocalStorige(item, data){
    let current =  data.filter(element => 
             element.id  ===item.id  &&
             element.size  === item.size  && 
             element.color  === item.color &&
            element.category  === item.category)
            return current
}

export function updateLocalStorige(item, newVal1, newVal2){
       let saveProducts = JSON.parse(localStorage.getItem("product")) || []
       let updateEl = getCurrenElmentInLocalStorige(item, saveProducts)[0]
       let index = findIndexCurrentElem(saveProducts, item)
  
       if(index !== -1){
       updateEl.total = newVal2;
       updateEl.quantity = newVal1;
    
       localStorage.setItem("product", JSON.stringify(saveProducts))
       }
}

export function findIndexCurrentElem(array, item){
 let index= array.findIndex(el=>
              el.id  ===item.id  &&
             el.size  === item.size  && 
             el.color  === item.color &&
            el.category  === item.category)
            return index
}