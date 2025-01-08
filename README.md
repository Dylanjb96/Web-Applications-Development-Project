# Web Application Development Project Submission 2024

## Author Information
- **Name**: Dylan Boyle  
- **Student ID**: G00438786  
- **Submission Date**: 19/05/2024  

---

## Project Overview
This project is a **Clothing Website** specializing in **Streetwear**. It is an improved version of a previous project from my repository called "Streetwear-Web", with enhanced functionalities and the integration of Node.js. It allows users to browse products, register accounts, manage shopping carts, and complete purchases with discounts applied for larger orders.

### **Home Page**
The website starts with the **Index Page (Home Page)**, featuring a logo, navigation bar, profile icon, and shopping cart icon. Users can navigate to sections like About, Menu, Products, Review, Contact, and Blogs through a single-page interface.

---

## Key Features
1. **User Authentication**:
   - Registration and login functionality.
   - Profile management with secure handling of user credentials.

2. **Shopping Cart and Checkout**:
   - Add, remove, and manage item quantities in the shopping cart.
   - Discounts:
     - 20% off orders over £100.
     - 30% off orders over £200.
   - Checkout process includes delivery address, item quantity, and payment method inputs.

3. **Reviews Section**:
   - Users can provide ratings and comments.
   - Feedback is displayed dynamically on the site.

4. **Dynamic Content**:
   - Menu items and products are fetched from a database.
   - Dynamic routing and content rendering using **EJS templates**.

5. **Responsive Design**:
   - Styled using **Bootstrap 5** for compatibility across devices.

6. **Slideshow**:
   - Automated slideshow on the homepage to display images dynamically.

---

## Technologies Used
### **Frontend**:
- HTML, CSS, JavaScript
- Bootstrap 5 (via CDN)

### **Backend**:
- Node.js
- Express.js
- MySQL database (Name: G00348786)

### **Features**:
- **Form Validation**: Ensures all fields (e.g., email, password, and address) are correctly filled.
- **Dynamic EJS Templates**: Used for pages like Checkout, Reviews, and Thank You.
- **Database Integration**: Handles product, user, order, and review data.

---

## Implementation Details
### **Functional Requirements**:
1. **User Login & Registration**:
   - Register with a username, email, and password.
   - Secure password handling using bcrypt.

2. **Form Validation**:
   - JavaScript validations for empty fields, valid email addresses, and password length.

3. **Slideshow**:
   - Automated slideshow implemented using JavaScript.

4. **Shopping Cart**:
   - Quantity adjustment and dynamic total price calculation with discount application.

5. **Order Submission**:
   - Form validation and secure data submission using Fetch API.

6. **Reviews**:
   - Star ratings and user comments stored in the database.

7. **Database Integration**:
   - MySQL tables for users, products, orders, and reviews.

---

## How to Use
1. Open the **Index Page** to start exploring.
2. **Register or Sign In** to access personalized features.
3. Add items to the **Shopping Cart**, adjust quantities, and proceed to checkout.
4. Fill in the delivery address and payment method to place an order.
5. Submit ratings and comments in the **Review Section**.

---

## Limitations
Due to time constraints:
- User authentication before purchase is incomplete.
- Further refinements could be made for additional functionality and optimization.

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Dylanjb96/Web-Applications-Development-Project.git
   ```

2. Install dependencies
   ```bash
   npm install
```
3. Start the Server:
   ```bash
   npm start
```
4. Open http://localhost:3000 in your browser
