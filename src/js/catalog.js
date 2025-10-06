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

// Render products
function renderProducts(list) {
    const container = document.getElementById("list");
    console.log(container)
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
