

const header = document.querySelector("#header")
const footer = document.querySelector("#footer")
const selectedGoods = document.querySelector("#selected");


function loadHTML(element, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("File not found", file);
            return response.text()
        })

        .then(data => {
            document.getElementById(element).innerHTML = data
            setNavigation()
        })
        .catch(error => console.log(error));
}

loadHTML("header", "/project-template-ua/src/components/header.html");
loadHTML("footer", "/project-template-ua/src/components/footer.html");


function loadPage(page) {
    let path = page === "home" ? "index.html" : `/project-template-ua/src/pages/${page}.html`
    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error("Page not found")
            return response.text()
        })
        .then(html => {
            document.querySelector("#main").innerHTML = html
        })
        .catch(error => {
            document.querySelector("#main").innerHTML = `<p>Error: ${error.message}</p>`
        })
}
function setNavigation() {
    document.querySelector("#header-menu").addEventListener("click", (e) => {
        document.querySelectorAll("a[data-page]").forEach(item =>{
            item.style.color = "black"
        })
        e.target.style.color = "#B92770"
        if (e.target.matches("a[data-page]")) e.preventDefault();
        let page = e.target.getAttribute("data-page");
        window.location.hash = page;
        loadPage(page)

    })

}



     



fetch("/project-template-ua/src/assets/data.json")
    .then(res => res.json())
    .then(result => { 
     result.data.map(item => {
         if (item.blocks.includes("Selected Products")) {
             
             const addToCardBtn = createButton()
             addToCardBtn.textContent = "Add to card";
             let productCard = buildCard(item)
             productCard.append(addToCardBtn)
             document.querySelector("#selected-track").append(productCard);
          
         }
         if (item.blocks.includes("New Products Arrival")) {
             const addToCardBtn = createButton()
             addToCardBtn.textContent = "View Product";
             let productCard = buildCard(item)
             productCard.append(addToCardBtn)
             document.querySelector("#new-track").append(productCard);
         }
        });  
    })
        function createButton() {
            const addToCardBtn = document.createElement("button");
            addToCardBtn.className = "addToCard"
            return addToCardBtn
}
function buildCard(item) {     
    const div = document.createElement("div");    
            div.className = "product";
            const photo = document.createElement("img")
            photo.src = `/project-template-ua/src/assets/img/${item.imageUrl}`
            const nameTag = document.createElement("h6");
            nameTag.textContent = item.name;
            const priceTag = document.createElement("p")
            priceTag.className = "price";
            priceTag.textContent = `$${item.price}`;
  
    
            div.append(photo);
            div.append(nameTag);
            div.append(priceTag)
            if (item.salesStatus) {
                const salesBtn = document.createElement("button");
                salesBtn.textContent = "Sale";
                salesBtn.className = "saleBtn";
                photo.append(salesBtn)
    }
            return div
        }

let selectedTrack = document.querySelector("#selected-track")
document.querySelector("#next").addEventListener("click", () => move(true))
document.querySelector("#prev").addEventListener("click", () => move(false))

function move(positive = true){
    let slide = document.querySelector(".product")
    if (!slide) return
    const slideWidth = slide.clientWidth;
    selectedTrack.scrollLeft = positive ? selectedTrack.scrollLeft + slideWidth : selectedTrack.scrollLeft - slideWidth 
}

selectedTrack.addEventListener("wheel", (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
        e.currentTarget.scrollLeft += e.currentTarget.clientWidth
    } else {
        e.currentTarget.scrollLeft -= e.currentTarget.clientWidth
    }
    selectedTrack.scrollLeft += e.deltaY > 0 ? selectedTrack.clientWidth : -selectedTrack.clientWidth;

})

let newTrack = document.querySelector("#new-track")
document.querySelector("#new-next").addEventListener("click", () => caruselMove(true))
document.querySelector("#new-prev").addEventListener("click", () => caruselMove(false))

function caruselMove(positive = true) {
    let slide = document.querySelector("#new-track > :nth-child(1)")
    if (!slide) return
    const slideWidth = slide.clientWidth;
    newTrack.scrollLeft = positive ? newTrack.scrollLeft + slideWidth : newTrack.scrollLeft - slideWidth
}

newTrack.addEventListener("wheel", (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
        e.currentTarget.scrollLeft += e.currentTarget.clientWidth
    } else {
        e.currentTarget.scrollLeft -= e.currentTarget.clientWidth
    }
    selectedTrack.scrollLeft += e.deltaY > 0 ? selectedTrack.clientWidth : -selectedTrack.clientWidth;
})


// fetch("/project-template-ua/src/assets/data.json")
//     .then(res => res.json())
//     .then(data => renderProducts(data))

let products = [];
let filters = {
    category: null,
    color: null,
    size: null,
    salesStatus: null
};

// Load JSON data (local file)
fetch("/project-template-ua/src/assets/data.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProducts(products);
    });

// Handle filter clicks
document.querySelectorAll(".dropdown li").forEach(item => {
    item.addEventListener("click", (e) => {
        const parent = e.target.closest(".filter");
        const filterType = parent.dataset.filter;
        const value = e.target.dataset.value;

        filters[filterType] = value;
        document.querySelectorAll(".filter").forEach(f => f.classList.remove("active"));
        parent.classList.add("active");
        applyFilters();
    });
});

// Apply filters
function applyFilters() {
    let filtered = products.filter(prod => {
        return (!filters.category || prod.category === filters.category) &&
            (!filters.color || prod.color === filters.color) &&
            (!filters.size || prod.size === filters.size) &&
            (filters.salesStatus === null || String(prod.salesStatus) === filters.salesStatus);
    });
    renderProducts(filtered);
}

// Reset button
document.getElementById("reset-btn").addEventListener("click", () => {
    filters = { category: null, color: null, size: null, salesStatus: null };
    document.querySelectorAll(".filter").forEach(f => f.classList.remove("active"));
    renderProducts(products);
});
console.log(document.querySelector("#list"), "lisr")
// Render products
function renderProducts(list) {
    const container = document.querySelector("#list");

    container.innerHTML = "";
    if (list.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }
    list.forEach(prod => {
        const item = document.createElement("div");
        item.className = "product-card";
        item.innerHTML = `
        <img src="/project-template-ua/src/assets/img${prod.imageUrl}">
        <h3>${prod.name}</h3>
        <p>$${prod.price}</p>
        // <p>Category: ${prod.category}</p>
        // <p>Color: ${prod.color}</p>
        // <p>Size: ${prod.size}</p>
        <p class="sale">${prod.salesStatus ? "SALE" : ""}</p>
      `;
        container.appendChild(item);
    });
}

