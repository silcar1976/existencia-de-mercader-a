document.addEventListener("DOMContentLoaded", function () {
    updateProductTable();
});
function validateDescription(input) {  
    input.value = input.value.replace(/[^a-zA-Z\s]/g, ''); }

function addProduct() {
    const description = document.getElementById("product-description").value;
    const quantity = parseInt(document.getElementById("product-quantity").value);

    if (description && quantity > 0) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const existingProduct = products.find(p => p.description === description);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            products.push({ description, quantity });
        }

        localStorage.setItem("products", JSON.stringify(products));
        updateProductTable();
    } else {
        alert("Por favor, ingrese una descripción y cantidad válidas.");
    }
}

function updateProductTable() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const table = document.getElementById("product-table").getElementsByTagName('tbody')[0];
    
    table.innerHTML = "";

    products.forEach(product => {
        const newRow = table.insertRow();

        const descriptionCell = newRow.insertCell(0);
        const quantityCell = newRow.insertCell(1);
        const actionsCell = newRow.insertCell(2);

        descriptionCell.textContent = product.description;
        quantityCell.textContent = product.quantity;

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.className = "edit-button";
        editButton.onclick = function() {
            editProduct(newRow);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function() {
            deleteProduct(product.description);
            updateProductTable();
        };

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

function editProduct(row) {
    const descriptionCell = row.cells[0];
    const quantityCell = row.cells[1];

    const newDescription = prompt("Editar descripción del producto:", descriptionCell.textContent);
    const newQuantity = parseInt(prompt("Editar cantidad del producto:", quantityCell.textContent));

    if (newDescription && newQuantity > 0) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const product = products.find(p => p.description === descriptionCell.textContent);

        if (product) {
            product.description = newDescription;
            product.quantity = newQuantity;
            localStorage.setItem("products", JSON.stringify(products));
            updateProductTable();
        }
    } else {
        alert("Por favor, ingrese valores válidos para la descripción y cantidad.");
    }
}

function deleteProduct(description) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.description !== description);
    localStorage.setItem("products", JSON.stringify(products));
}

