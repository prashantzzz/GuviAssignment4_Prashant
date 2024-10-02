const mainImage = document.getElementById("mainImage");
const quantityElement = document.getElementById("quantity");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let quantity = 0;
let currentImageIndex = 0;
let cartContents = [];

const images = ["shoe1.webp", "shoe2.jpg", "shoe3.jpg", "shoe4.jpg"];

const product = {
    name: "Fall Limited Edition Sneakers",
    price: 125,
    originalPrice: 250,
    discount: 50
};

function changeImage(index) {
    if (index === 'prev') {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    } else if (index === 'next') {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    } else {
        currentImageIndex = index;
    }
    mainImage.src = images[currentImageIndex];
    if (lightbox.style.display === "block") {
        lightboxImage.src = images[currentImageIndex];
    }
}

function openLightbox(index) {
    lightbox.style.display = "block";
    lightboxImage.src = images[index];
    currentImageIndex = index;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function incrementQuantity() {
    quantity++;
    updateQuantityDisplay();
}

function decrementQuantity() {
    if (quantity > 0) {
        quantity--;
        updateQuantityDisplay();
    }
}

function updateQuantityDisplay() {
    quantityElement.textContent = quantity;
}

function addToCart() {
    if (quantity > 0) {
        const existingItemIndex = cartContents.findIndex(item => item.name === product.name);
        if (existingItemIndex !== -1) {
            cartContents[existingItemIndex].quantity += quantity;
        } else {
            cartContents.push({
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        }
        updateCart();
        quantity = 0;
        updateQuantityDisplay();
    }
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cartContents.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${images[0]}" alt="${item.name}" width="50">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price.toFixed(2)} x ${item.quantity} <strong>$${itemTotal.toFixed(2)}</strong></p>
                </div>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    
    // Update cart icon to show number of items
    const cartIcon = document.querySelector('.cart-icon');
    const totalItems = cartContents.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.setAttribute('data-items', totalItems);
}

function removeFromCart(index) {
    cartContents.splice(index, 1);
    updateCart();
}

function toggleCart() {
    cart.style.display = cart.style.display === "block" ? "none" : "block";
}

function checkout() {
    alert("Thank you for your purchase!");
    cartContents = [];
    updateCart();
    toggleCart();
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Initial cart update
updateCart();