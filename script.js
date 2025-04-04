document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const cartBtn = document.querySelector(".cart-btn"); 
    const closeBtn = document.querySelector(".x-btn"); 

    cartBtn.addEventListener("click", function () {
        sidebar.classList.add("sidebar-open"); 
    });

    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("sidebar-open"); 
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const cartBtn = document.querySelector(".cart-btn"); 
    const closeBtn = document.querySelector(".x-btn"); 
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    let cartItems = [];
    
    cartBtn.addEventListener("click", function () {
        sidebar.classList.add("sidebar-open");
        updateCartUI(); 
    });
    
    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("sidebar-open");
    });
    
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".product-card");
            const itemName = card.querySelector(".card-title").textContent.trim();
            const itemPrice = parseFloat(card.querySelector(".price").textContent.replace(/[^0-9.]/g, ""));
            
            const existingItem = cartItems.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }
            updateCartUI();
        });
    });
    
    function updateCartUI() {
        updateCartItemList();
        updateCartTotal();
    }
    
    function updateCartItemList() {
        cartItemList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItemList.appendChild(cartItemElement);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                removeItemFromCart(event.target.dataset.index);
            });
        });
    }
    
    function removeItemFromCart(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        } else {
            cartItems.splice(index, 1);
        }
        updateCartUI();
    }
    
    function updateCartTotal() {
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }
});