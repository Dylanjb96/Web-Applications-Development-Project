const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "g00438786"
});

con.connect((err) => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log('Database connected');
    }
});

// Set the views directory explicitly
app.set('views', path.join(__dirname, 'view'));

// Set EJS as the view engine
app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public'), { 
    // Specify MIME type for CSS files
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Parse JSON bodies for POST requests
app.use(bodyParser.json());

// Parse URL-encoded bodies for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the index page
app.get('/', (req, res) => {
    // Retrieve menu items from the database
    con.query('SELECT * FROM menu_items', (err, menuItems) => {
        if (err) {
            console.error('Error fetching menu items from the database:', err);
            res.status(500).send('Error fetching menu items. Please try again later.');
        } else {
            // Render index.ejs template and pass menuItems data to it
            res.render('index', { menu: menuItems });
        }
    });
});


// Route for the checkout page
app.get('/checkout', (req, res) => {
    // Retrieve menu items from the database
    con.query('SELECT * FROM menu_items', (err, menuItems) => {
        if (err) {
            console.error('Error fetching menu items from the database:', err);
            res.status(500).send('Error fetching menu items. Please try again later.');
        } else {
            // Render checkout.ejs template and pass menuItems data to it
            res.render('checkout', { menuItems: menuItems });
        }
    });
});


// Define route for review page
app.get('/review', (req, res) => {
    res.render('review'); // Render review.ejs template
});

// Define route for profile page
app.get('/profile', (req, res) => {
    res.render('profile'); // Render profile.ejs template
});

// Route for the checkout page
app.get('/', (req, res) => {
    // Render checkout.ejs template without passing any data
    res.render('index');
});



// Route to handle order submission
app.post('/order', (req, res) => {
    const orderData = req.body; // Get the order data from the request body
    // Convert cartItems to JSON string before inserting into the database
    orderData.cartItems = JSON.stringify(orderData.cartItems);

    // Insert the order data into the database
    con.query('INSERT INTO orders SET ?', orderData, (err, result) => {
        if (err) {
            console.error('Error inserting order into database:', err);
            res.status(500).send('Error placing order. Please try again later.');
        } else {
            console.log('Order placed successfully:', result);
            res.status(200).send('Order placed successfully!');
        }
    });
});

// Route for handling user registration
app.post('/register', (req, res) => {
    console.log('Registration route reached'); // Log to check if route is reached
    console.log('Received request body:', req.body); // Log entire request body

    const { username, email, password } = req.body;
    console.log('Received registration data:', username, email, password);

    // Insert user into the accounts table
    const sql = 'INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)';
    con.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting user into accounts table:', err);
            res.status(500).send('Error registering user');
            return;
        }
        console.log('User registered successfully:', result);

        // Set username and email in the session after successful registration
        req.session.username = username;
        req.session.email = email;

        res.redirect('/welcome'); // Redirect to the welcome page
    });
});


// Route for handling user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user with the provided email
    const sql = 'SELECT username, email FROM accounts WHERE email = ? AND password = ?';
    con.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Internal server error');
        }

        // Check if a user with the provided email and password exists
        if (results.length === 0) {
            // User authentication failed, send an error message
            return res.status(401).json({ error: 'Login failed. Invalid email or password.' });
        }

        // User authentication successful
        const user = results[0];

        // Store the username and email in the session
        req.session.username = user.username;
        req.session.email = user.email;

        // Send back the username and email in the response
        res.status(200).json({ username: user.username, email: user.email });
    });
});


// Route for rendering the welcome page
app.get('/welcome', (req, res) => {
    // Retrieve username and email from the session or database
    const username = req.session.username; // Assuming username is stored in session
    const email = req.session.email; // Assuming email is stored in session

    // Log the retrieved username and email
    console.log('Retrieved username:', username);
    console.log('Retrieved email:', email);

    // Render the welcome.ejs template and pass username and email to it
    res.render('welcome', { username: username, email: email });
});

// Route for rendering the "Welcome Back" page
app.get('/welcome-back', (req, res) => {
    // Retrieve username and email from the session
    const username = req.session.username;
    const email = req.session.email;
    
    // Render the welcome_back.ejs template and pass username and email to it
    res.render('welcome-back', { username: username, email: email });
});

// Route to handle review submission
app.post('/submit-review', (req, res) => {
    const { rating, comment } = req.body;

    // Insert review data into the database
    const sql = 'INSERT INTO reviews (rating, comment) VALUES (?, ?)';
    con.query(sql, [rating, comment], (err, result) => {
        if (err) {
            console.error('Error inserting review into database:', err);
            res.status(500).send('Error submitting review. Please try again later.');
        } else {
            console.log('Review submitted successfully:', result);
            res.sendStatus(200); // Send success response
        }
    });
});

// Route for the thank you page
app.get('/thank-you-review', (req, res) => {
    const rating = req.query.rating; // Retrieve the rating from the query parameters
    console.log("Rating:", rating); // Add this line to log the rating value

    res.render('thank-you-review', { rating: rating }); // Pass the rating to the view
});



app.post('/add-to-cart', (req, res) => {
    const itemId = req.body.itemId; // Assuming itemId is sent in the request body
    // Fetch item details from the database based on itemId
    // Add item details to cartData in the user's session
    if (!req.session.cartData) {
        req.session.cartData = [];
    }
    req.session.cartData.push(itemDetails);
    res.redirect('/'); // Redirect back to the homepage or wherever you want
});


// Route for the thank you page
app.get('/thank-you', (req, res) => {
    res.render('thank-you'); // Render thank-you.ejs template
});


// Start the server
app.listen(3030, () => {
    console.log('Server started on port 3030');
});


