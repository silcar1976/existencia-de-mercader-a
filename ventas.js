document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    updateInventory();
});

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const select = document.getElementById("sale-product-description");
    
    select.innerHTML = "";

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.description;
        option.text = product.description;
        select.appendChild(option);
    });
}

function addSale() {
    const productDescription = document.getElementById("sale-product-description").value;
    const saleQuantity = parseInt(document.getElementById("sale-quantity").value);

    if (productDescription && saleQuantity > 0) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const product = products.find(p => p.description === productDescription);

        if (product && product.quantity >= saleQuantity) {
            product.quantity -= saleQuantity;
            localStorage.setItem("products", JSON.stringify(products));
            updateInventory();

            const table = document.getElementById("sales-table").getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            const descriptionCell = newRow.insertCell(0);
            const quantityCell = newRow.insertCell(1);

            descriptionCell.textContent = productDescription;
            quantityCell.textContent = saleQuantity;
        } else {
            alert("Cantidad insuficiente en inventario.");
        }
    } else {
        alert("Por favor, ingrese una cantidad válida.");
    }
}

function updateInventory() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const inventoryTable = document.getElementById("inventory-table").getElementsByTagName('tbody')[0];
    
    inventoryTable.innerHTML = "";

    products.forEach(product => {
        const newRow = inventoryTable.insertRow();

        const descriptionCell = newRow.insertCell(0);
        const quantityCell = newRow.insertCell(1);

        descriptionCell.textContent = product.description;
        quantityCell.textContent = product.quantity;
    });
}
