export function buildCard(item) {     
    const div = document.createElement("div"); 
            div.dataset.id = item.id;   
            div.className = "product";
            const photoSaleBlock = document.createElement("div");
            photoSaleBlock.className ="photo-sale-block"
            const photo = document.createElement("img")
            photo.src = `/src/assets/img/${item.imageUrl}`
            photo.alt = item.name;
            photo.loading = "lazy"
            const nameTag = document.createElement("h6");
            nameTag.textContent = item.name;
            const priceTag = document.createElement("p")
            priceTag.className = "price";
            priceTag.textContent = `$${item.price}`
            photoSaleBlock.append(photo);
            div.append(photoSaleBlock)
            div.append(nameTag);
            div.append(priceTag)
            if (item.salesStatus) {
                const salesBtn = document.createElement("button");
                salesBtn.textContent = "Sale";
                salesBtn.className = "sale-button";
                photoSaleBlock.append(salesBtn)
    }
            return div
        }

export function createButton() {
            const addToCardBtn = document.createElement("button");
            addToCardBtn.className = "addToCard"
            return addToCardBtn
}