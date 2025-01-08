// JavaScript Code for Streetwear Login Page

// DOM elements
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');

// Event listener for switching to sign-up form
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
})

// Event listener for switching to sign-in form
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
})

// Validation for sign-up form
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = signUpForm.querySelector('input[type="text"]');
    const emailInput = signUpForm.querySelector('input[type="email"]');
    const passwordInput = signUpForm.querySelector('input[type="password"]');

    // Debugging statements
    console.log(nameInput);
    console.log(emailInput);
    console.log(passwordInput);

    // Clear previous errors
    clearErrors(signUpForm);

    // Get form input values
    const name = nameInput.value.trim();
    console.log(name); // Check the value of the name input
    console.log(/[A-Z]/.test(name)); // Check if the regular expression matches

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate input fields
    if (!nameInput.value.trim()) {
        displayError(nameInput, "Please enter your name.");
        return;
    } else if (!emailInput.value.trim()) {
        displayError(emailInput, "Please enter your email.");
        return;
    } else if (!passwordInput.value.trim()) {
        displayError(passwordInput, "Please enter your password.");
        return;
    } else if (password.length < 4) {
        displayError(passwordInput, "Password must be 4 letters long or more.");
        return;
    } else if (name.length < 4) {
        displayError(nameInput, "Must be four characters long.");
        return;
    } else {
        const validDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];
        const emailDomain = email.split('@')[1];
        if (!validDomains.includes(emailDomain)) {
            displayError(emailInput, "Email must be from Gmail, Outlook, or Yahoo domains.");
            return;
        }
    }
});


// Validation for sign-up form
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = signUpForm.querySelector('input[type="text"]');
    const emailInput = signUpForm.querySelector('input[type="email"]');
    const passwordInput = signUpForm.querySelector('input[type="password"]');

    // Clear previous errors
    clearErrors(signUpForm);

    // Get form input values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Variable to track validation errors
    let hasErrors = false;

    // Validate input fields
    if (!name) {
        displayError(nameInput, "Please enter your name.");
        hasErrors = true;
    }

    if (!email) {
        displayError(emailInput, "Please enter your email.");
        hasErrors = true;
    } else {
        const validDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];
        const emailDomain = email.split('@')[1];
        if (!validDomains.includes(emailDomain)) {
            displayError(emailInput, "Email must be from Gmail, Outlook, or Yahoo domains.");
            hasErrors = true;
        }
    }

    if (!password) {
        displayError(passwordInput, "Please enter your password.");
        hasErrors = true;
    } else if (password.length < 4) {
        displayError(passwordInput, "Password must be 4 letters long or more.");
        hasErrors = true;
    }

    // If there are validation errors, halt the submission process
    if (hasErrors) {
        return;
    }

    // Send form data to server
    $.ajax({
        url: '/register',
        method: 'POST',
        data: $(signUpForm).serialize(),
        success: function(response) {
            console.log('Registration successful:', response);
            window.location.href = '/welcome';
        },
        error: function(xhr, status, error) {
            console.error('Registration failed:', error);
            $('#signUpError').text('Registration failed. Please try again later.');
        }
    });
});


// Function to display error messages
function displayError(inputElement, message) {
    inputElement.classList.add('input-error');
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    errorElement.classList.add('error-message');
    inputElement.parentNode.appendChild(errorElement);
}

// Function to clear error messages
function clearErrors(form) {
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.parentNode.removeChild(element);
    });

    const inputErrorElements = form.querySelectorAll('.input-error');
    inputErrorElements.forEach(element => {
        element.classList.remove('input-error');
    });
}


// Event listener for sign-in form submission
$('#signInForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = $(this).serialize(); // Serialize form data

    // Send form data to server
    $.ajax({
        url: '/login', // URL to send the form data
        method: 'POST', // HTTP method
        data: formData, // Form data to send
        success: function(response) {
            // Login successful
            console.log('Login successful:', response);
            // Redirect to another page or display a success message
            window.location.replace("/welcome-back");
        },
        error: function(xhr, status, error) {
            // Login failed
            console.error('Login failed:', error);
            // Display an error message to the user
        }
    });
});



// Loader animation
var loader = document.querySelector(".loader")
window.addEventListener("load", vanish);

function vanish() {
    loader.classList.add("disapper");
}