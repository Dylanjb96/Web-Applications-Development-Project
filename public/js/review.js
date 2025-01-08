window.addEventListener("load", function() {
    // Page loaded event listener
    console.log("Page loaded!");

    // Preloader handling
    var loader = document.getElementById("preloader");
    setTimeout(function() {
        loader.classList.add("disappear");
    }, 3900); // Disappear after 3.9 seconds (3900 milliseconds)

    // Elements selection
    var stars = document.getElementsByClassName('fas');
    var emoji = document.getElementById('emoji');
    var slider = document.getElementById('slider');
    var commentInput = document.getElementById('comment-box');
    var submitButton = document.getElementById('submit-button');

    // Event listener for slider input
    slider.addEventListener('input', function() {
        var value = parseInt(this.value);
        updateStars(value);
    });

    // Function to update stars based on slider value
    function updateStars(value) {
        // Reset all stars color to default
        for (var i = 0; i < stars.length; i++) {
            stars[i].style.color = "#e4e4e4";
        }
        // Set color for stars up to the selected value
        for (var i = 0; i < value; i++) {
            stars[i].style.color = "#ffd93b";
        }
        // Adjust emoji position based on slider value
        emoji.style.transform = "translateX(" + (-100 * value) + "px)";
    }
    // Select the review form element
    var reviewForm = document.querySelector('.feedback');

    // Event listener for form submission
    submitButton.addEventListener('click', function() {
        var ratingValue = slider.value; // Renamed to ratingValue
        var commentValue = commentInput.value;

        // Debugging: Log the rating value to the console
        console.log('Rating value:', ratingValue);

        // Send review data to the server
        fetch('/submit-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: ratingValue, comment: commentValue })
        })
        .then(response => {
            if (response.ok) {
                // Review submitted successfully, redirect to thank-you-review page
                window.location.href = "/thank-you-review?rating=" + ratingValue;

            } else {
                // Error handling
                console.error('Error submitting review');
                // Show error message to the user
            }
        })
        .catch(error => {
            // Error handling
            console.error('Error submitting review:', error);
            // Show error message to the user
        });
    });
});

