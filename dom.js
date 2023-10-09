const cartItems = [
    { id: 1, name: "Item 1", price: 10.00, quantity: 1, liked: false },
    { id: 2, name: "Item 2", price: 15.00, quantity: 1, liked: false },
    { id: 3, name: "Item 3", price: 20.00, quantity: 1, liked: false },
];

const cartList = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.name} - DT${item.price.toFixed(2)}
            <button class="like-button" data-id="${item.id}">&#10084;</button>
            <span>Quantity: ${item.quantity}</span>
            <button class="minus-button" data-id="${item.id}">-</button>
            <button class="plus-button" data-id="${item.id}">+</button>
            <button class="delete-button" data-id="${item.id}">Delete</button>
        `;

        listItem.querySelector(".like-button").style.color = item.liked ? "red" : "black";

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        listItem.querySelector(".minus-button").addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                renderCart();
            }
        });

        listItem.querySelector(".plus-button").addEventListener("click", () => {
            item.quantity++;
            renderCart();
        });

        listItem.querySelector(".delete-button").addEventListener("click", () => {
            const index = cartItems.findIndex((i) => i.id === item.id);
            if (index !== -1) {
                cartItems.splice(index, 1);
                renderCart();
            }
        });

        listItem.querySelector(".like-button").addEventListener("click", () => {
            item.liked = !item.liked;
            renderCart();
        });

        cartList.appendChild(listItem);
    });

    totalPrice.textContent = total.toFixed(2);
}

renderCart();