 function compare(a, b){
        if(a>b) return 1
        if(a==b) return 0
         if(a<b)return -1
    }
export function compareProductsByPrice(a, b){
return compare(a.price, b.price)
};

export function compareProductsByPopularity(a,b){
    return compare(a.popularity, b.popularity)
}

export function compareProductsByRating(a, b){
     return compare(a.rating, b.rating)
}
