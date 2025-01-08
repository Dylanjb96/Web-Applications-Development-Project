document.addEventListener("DOMContentLoaded", function() {
    const checkoutForm = document.querySelector('.form');
    const alertBox = document.querySelector('.alert-box');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    let formData; // Declare formData variable outside the event listener

    // Attach event listener to all quantity inputs
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const newValue = parseInt(this.value);
            if (isNaN(newValue) || newValue < 0) {
                this.value = '0'; // Set value to 0 if it's negative or not a number
            }
            
            // Recalculate total price
            calculateTotalPrice();
        });
    });

    placeOrderBtn.addEventListener('click', function() {
        const address = document.getElementById('address').value.trim();
        const street = document.getElementById('street').value.trim();
        const city = document.getElementById('city').value.trim();
        const county = document.getElementById('county').value.trim();
        const eircode = document.getElementById('eircode').value.trim();
        const country = document.getElementById('country').value.trim();

        // Perform client-side validation
        if (address === '' || street === '' || city === '' || county === '' || eircode === '' || country === '') {
            displayError('Please fill in all fields.');
        } else {
            // If validation passes, submit form data
            formData = {
                address: address,
                street: street,
                city: city,
                county: county,
                eircode: eircode,
                country: country,
                cartItems: [] // Initialize cartItems as an empty array
            };
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach(item => {
                const name = item.querySelector('.item-name').textContent;
                const price = parseFloat(item.querySelector('.item-price').textContent.split(':')[1].trim());
                const quantity = parseInt(item.querySelector('.item-quantity').value);
                const productId = item.querySelector('.product-id').textContent; // Extract product_id from the DOM
                formData.cartItems.push({ name: name, price: price, quantity: quantity, product_id: productId });
            })

            submitFormData(formData);
        }
    });

    function submitFormData(formData) {
        const paymentMethod = document.getElementById('payment').value;
        // Calculate total price and quantity
        const totalPrice = calculateTotalPrice();
        const totalQuantity = calculateTotalQuantity();

        // Include only the selected payment method in the form data
        formData.paymentMethod = paymentMethod;
        // Include total price and quantity in the formData object
        formData.totalPrice = totalPrice;
        formData.totalQuantity = totalQuantity;

        // Send form data to server
        fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/thank-you'; // Redirect to thank you page on successful submission
            } else {
                displayAlert('Error placing order. Please try again later.');
            }
        })
        .catch(error => {
            displayAlert('Error placing order. Please try again later.');
        });
    }

    function displayError(message) {
        // Display error message
        document.getElementById('error-message').textContent = message;
    }

    function clearError() {
        // Clear error message
        document.getElementById('error-message').textContent = '';
    }
    
    function displayAlert(message) {
        // Display alert message to the user
        alert(message);
    }

    function calculateTotalQuantity() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalQuantity = 0;
        cartItems.forEach(item => {
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            if (!isNaN(quantity)) {
                totalQuantity += quantity;
            }
        });
        return totalQuantity;
    }
    
    function calculateTotalPrice() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;
        cartItems.forEach(item => {
            const priceString = item.querySelector('.item-price').textContent.split(':')[1].trim();
            const price = parseFloat(priceString.replace('£', '').trim());
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            console.log('Price:', price, 'Quantity:', quantity);
            if (!isNaN(price) && !isNaN(quantity)) {
                totalPrice += price * quantity;
            }
        });
        
        // Check if total price is £200 or above
        if (totalPrice >= 200) {
            // Apply 30% discount
            totalPrice *= 0.7; // Equivalent to multiplying by (1 - 0.30)
        } else if (totalPrice >= 100) {
            // Apply 20% discount
            totalPrice *= 0.8; // Equivalent to multiplying by (1 - 0.20)
        }
        console.log('Total Price:', totalPrice);
        document.querySelector('.bill').textContent = '£' + totalPrice.toFixed(2);
        return totalPrice;
    }
});
