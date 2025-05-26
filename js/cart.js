class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.cartIcon = document.querySelector('.cart-icon');
        this.cartCount = document.querySelector('.cart-count');
        this.cartDropdown = document.querySelector('.cart-dropdown');
        this.cartItems = document.querySelector('.cart-items');
        this.cartTotal = document.querySelector('.cart-total');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Toggle cart dropdown when clicking cart icon
        this.cartIcon.addEventListener('click', () => {
            this.cartDropdown.classList.toggle('active');
        });

        // Close cart dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.cartIcon.contains(e.target) && !this.cartDropdown.contains(e.target)) {
                this.cartDropdown.classList.remove('active');
            }
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.id;
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.dataset.price);
                
                this.addItem({
                    id: productId,
                    name: productName,
                    price: productPrice
                });
            });
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.updateCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId);
            }
        }
        this.updateCart();
    }

    updateCart() {
        // Update cart count
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;

        // Update cart items display
        this.cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <div class="item-quantity">
                    <button class="quantity-btn minus" onclick="window.shoppingCart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="window.shoppingCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <span class="item-price">€${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" onclick="window.shoppingCart.removeItem('${item.id}')">×</button>
            </div>
        `).join('');

        // Update total
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotal.textContent = `€${this.total.toFixed(2)}`;
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Je winkelwagen is leeg!');
            return;
        }

        // Redirect to checkout page
        const currentPath = window.location.pathname;
        const isInPagesDirectory = currentPath.includes('/pages/');
        
        // Adjust the path based on current location
        const checkoutPath = isInPagesDirectory ? 'checkout.html' : 'pages/checkout.html';
        window.location.href = checkoutPath;
    }
}

// Initialize shopping cart
window.shoppingCart = new ShoppingCart(); 