
export function getCurrenElmentInLocalStorige(item, data){
    let current =  data.filter(element => 
             element.id  ===item.id  &&
             element.size  === item.size  && 
             element.color  === item.color &&
            element.category  === item.category)
            
            return current
}

export function updateLocalStorige(item, newVal1, newVal2){
       let array = JSON.parse(localStorage.getItem("product")) || []
       let updateEl = getCurrenElmentInLocalStorige(item, array)[0]
       let index = array.findIndex(el=>
              el.id  ===item.id  &&
             el.size  === item.size  && 
             el.color  === item.color &&
            el.category  === item.category)
  
       if(index !== -1){
       updateEl.total = newVal2;
       updateEl.quantity = newVal1;
       // array.splice(index, 1, updateEl)
       localStorage.setItem("product", JSON.stringify(array))
       }
}