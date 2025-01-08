// Cart functionality
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event fired");
    // Selecting DOM elements
    let cartBtn = document.getElementById("cart-btn");
    let closeBtn = document.querySelector(".cartTab .btn .close");
    let showCartBtn = document.querySelector(".showCart");

    // Event listeners for showing/hiding cart tab
    cartBtn.addEventListener("click", toggleCart);
    closeBtn.addEventListener("click", toggleCart);

    // Event listener for quantity adjustment and adding to cart
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('plus')) {
            incrementQuantity(event.target);
        } else if (event.target.classList.contains('minus')) {
            decrementQuantity(event.target);
        } else if (event.target.classList.contains('btn') && event.target.classList.contains('add-to-cart')) {
            event.preventDefault(); // Prevent default behavior of anchor element
            addToCart(event.target);
        }
    });

    // Event listeners for adding to cart from menu items
    document.querySelectorAll('.menu .btn').forEach((item, index) => {
        item.addEventListener('click', (event) => {
            addToCart(index, event);
        });
    });

    // Function to add to cart
    function addToCart(index, event) {
        event.preventDefault(); // Prevent default behavior of anchor element
        console.log("Add to Cart button clicked.");
        let box = document.querySelectorAll('.menu .box')[index];
        let productId = box.getAttribute('data-product-id');
        /*let quantityElement = document.querySelector('.menu .box:nth-child(' + (index + 1) + ') .quantityValue');*/
        let quantityElement = box.querySelector('.quantityValue');
        console.log("Quantity element:", quantityElement);
        if (quantityElement) {
            let currentQuantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQuantity + 1;
            /*updateTotalPrice(quantityElement);*/
            updateTotalPrice(box);
            updateTotalPrice1(box);
            updateTotalPrice2(box);
            updateCartQuantity(productId, currentQuantity + 1); // Update quantity in shopping cart
            updateProductQuantity(box, currentQuantity + 1);
            updateCartTotal(); // Update total price in CartTotal
            console.log("Quantity updated.");
        } else {
            console.error("Quantity element not found.");
        }
    }

    // Function to update quantity of items in cart
    function updateCartQuantity(productId, newQuantity) {
        let cartItems = document.querySelectorAll('.cartTab .item[data-product-id="' + productId + '"]');
        cartItems.forEach(cartItem => {
            cartItem.querySelector('.quantityValue').textContent = newQuantity;
        });
    }

    // Function to update total price in cart
    function updateTotalPrice() {
        console.log("Updating total prices.");
        let items = document.querySelectorAll('.cartTab .item');
        let totalPrice = 0;
        let discount = 0;
        let totalPriceElements;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            totalPrice += parseFloat(item.querySelector('.totalPrice').textContent.replace('£', ''));
        }
        if (totalPrice >= 100 && totalPrice < 200) {
            discount = totalPrice * 0.20; // Apply 20% discount
        }
        let discountedTotalPrice = totalPrice - discount;
        totalPriceElements = document.querySelectorAll('.cartTab .totalPrice, .cartTab .totalPrice-1, .cartTab .totalPrice-2');
        items.forEach(item => {
            let quantity = parseInt(item.querySelector('.quantity .quantityValue').textContent);
            let basePrice = 20.00; // Base price per quantity
            let totalPrice = calculateTotalPrice(quantity, basePrice);
            item.querySelector('.totalPrice').textContent = '£' + totalPrice.toFixed(2);
            let quantity1 = parseInt(item.querySelector('.quantity-1 .quantityValue').textContent);
            let basePrice1 = 15.00; // New base price per quantity for totalPrice-1
            let totalPrice1 = calculateTotalPrice(quantity1, basePrice1);
            item.querySelector('.totalPrice-1').textContent = '£' + totalPrice1.toFixed(2);
            let discountedTotalPrice1 = totalPrice1 - (discountedTotalPrice * (totalPrice1 / totalPrice));
            let totalPriceElements1 = document.querySelectorAll('.totalPrice-1');
            for (let i = 0; i < totalPriceElements1.length; i++) {
                let totalPriceElement1 = totalPriceElements1[i];
                totalPriceElement1.textContent = '£' + discountedTotalPrice1.toFixed(2);
            }
            let quantity2 = parseInt(item.querySelector('.quantity-2 .quantityValue').textContent);
            let basePrice2 = 72.00; // New base price per quantity for totalPrice-2
            let totalPrice2 = calculateTotalPrice(quantity2, basePrice2);
            item.querySelector('.totalPrice-2').textContent = '£' + totalPrice2.toFixed(2);
            let discountedTotalPrice2 = totalPrice2 - (discountedTotalPrice * (totalPrice2 / totalPrice));
            let totalPriceElements2 = document.querySelectorAll('.totalPrice-2');
            for (let i = 0; i < totalPriceElements2.length; i++) {
                let totalPriceElement2 = totalPriceElements2[i];
                totalPriceElement2.textContent = '£' + discountedTotalPrice2.toFixed(2);
            }
            console.log("Total price updated.");
        });
        document.getElementById('cart-total').textContent = `Total: £${discountedTotalPrice.toFixed(2)} (Discount: £${discount.toFixed(2)})`;
        console.log("Cart total updated.");
    }

    // Function to update total price for totalPrice-1 class
    function updateTotalPrice1(element) {
        console.log("Updating total prices.");
        let item = element.closest('.item'); // Find the parent item
        let quantity = parseInt(item.querySelector('.quantity-1 .quantityValue').textContent);
        let basePrice = 15.00; // New base price per quantity for totalPrice-1
        let totalPrice = calculateTotalPrice(quantity, basePrice);
        item.querySelector('.totalPrice-1').textContent = '£' + totalPrice.toFixed(2);
        console.log("Total price updated");
    }

    // Function to update total price for totalPrice-2 class
    function updateTotalPrice2(element) {
        console.log("Updating total prices.");
        let item = element.closest('.item'); // Find the parent item
        let quantity = parseInt(item.querySelector('.quantity-2 .quantityValue').textContent);
        let basePrice = 72.00; // New base price per quantity for totalPrice-2
        let totalPrice = calculateTotalPrice(quantity, basePrice);
        item.querySelector('.totalPrice-2').textContent = '£' + totalPrice.toFixed(2);
        console.log("Total price updated");
    }

    // Function to update cart total price/discount
    function updateCartTotal() {
        console.log("Updating cart total.");
        let totalPriceElements = document.querySelectorAll('.cartTab .totalPrice, .cartTab .totalPrice-1, .cartTab .totalPrice-2');
        let totalPrice = 0;
        totalPriceElements.forEach(element => {
            let price = parseFloat(element.textContent.replace('£', ''));
            totalPrice += price;
        });

        let cartTotal = 0;
        let discount = 0;
        if (totalPrice >= 100 && totalPrice < 200) {
            discount = totalPrice * 0.20;
        } else if (totalPrice >= 200) {
            discount = totalPrice * 0.30;
        }
        cartTotal = totalPrice - discount;

        document.getElementById('cart-total').textContent = `Total: £${cartTotal.toFixed(2)} (Discount: £${discount.toFixed(2)})`;
        console.log("Cart total updated.");
    }


    // Function to calculate total price
    function calculateTotalPrice(quantity, basePrice) {
        let totalPrice = quantity * basePrice;

        // Apply discounts based on total price range
        if (totalPrice >= 100 && totalPrice < 200) {
            let discountAmount = totalPrice * 0.20; // 20% discount for total price between £100 and £200
            totalPrice -= discountAmount;
        } else if (totalPrice >= 200) {
            let discountAmount = totalPrice * 0.30; // 30% discount for total price between £200 and £300
            totalPrice -= discountAmount;
        }

        return totalPrice;
    }

    // Function to toggle cart visibility
    function toggleCart() {
        document.body.classList.toggle("showCart");
    }

    // Function to increment quantity
    function incrementQuantity(target) {
        console.log("Incrementing quantity");
        let quantityElement = target.parentNode.querySelector('.quantityValue');
        console.log("Quantity element:", quantityElement);
        if (quantityElement) {
            let currentValue = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentValue + 1;
            updateTotalPrice(target); // Add this line to update the total price
            updateTotalPrice1(target); // Update the total price for totalPrice-1 class
            updateTotalPrice2(target);
            updateCartTotal(); // Update cart total
        }
    }

    // Function to decrement quantity
    function decrementQuantity(element) {
        let quantityElement = element.parentNode.querySelector('.quantityValue');
        if (quantityElement) {
            let currentValue = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentValue - 1;
            // Ensure the quantity doesn't go below zero
            if (parseInt(quantityElement.textContent) < 0) {
                quantityElement.textContent = 0;
            }
            updateTotalPrice(element); // Add this line to update the total price
            updateTotalPrice1(element); // Update the total price for totalPrice-1 class
            updateTotalPrice2(element);
            updateCartTotal(); // Update cart total
        }
    }



    //Function to update quantity
    function updateProductQuantity(element, newQuantity) {
        let index = getIndexFromCartItem(element);
        let productQuantityElement = document.querySelectorAll('.menu .box .quantityValue')[index];
        if (productQuantityElement) {
            productQuantityElement.textContent = newQuantity;
            updateTotalPrice(index);
            updateTotalPrice1(element); // Update the total price for totalPrice-1 class
            updateTotalPrice2(element);
            updateCartTotal(); // Update cart total
        }
    }
});


// Toggle menu functionality (Darkmode)
const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
toggle.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
}

// Toggle navbar functionality
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

// Redirect to profile page
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event triggered");
    var userBtn = document.getElementById("user-btn");
    console.log("userBtn:", userBtn);

    userBtn.addEventListener("click", function() {
        console.log("User icon clicked");
        // Redirect to the profile.html page
        window.location.href = "/profile";
    });
});

// Redirect to checkout page
document.addEventListener("DOMContentLoaded", function() {
    var checkoutBtn = document.getElementById("checkout-btn");

    checkoutBtn.addEventListener("click", function() {
        // Redirect to the checkout route
        window.location.href = "/checkout";
    });
});



// Redirect to review page
document.addEventListener("DOMContentLoaded", function() {
    var reviewBtn = document.getElementById("give-review-btn");

    reviewBtn.addEventListener("click", function() {
        // Redirect to the review.html page
        window.location.href = "review.ejs";
    });
});

// Slideshow function
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 10000); // Change image every 3 seconds
}

