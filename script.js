const reviewForm = document.getElementById("reviewForm");
const submittedReviews = document.getElementById("submittedReviews");
const noReviews = document.getElementById("noReviews");
const successMessage = document.getElementById("successMessage");

let reviews = JSON.parse(localStorage.getItem("cinescopeReviews")) || [];

function displayReviews() {
    submittedReviews.innerHTML = "";

    if (reviews.length === 0) {
        submittedReviews.appendChild(noReviews);
        return;
    }

    reviews.forEach(function(review) {
        const reviewCard = document.createElement("article");
        reviewCard.className = "review-card";

        const title = document.createElement("h3");
        title.textContent = review.name;

        const meta = document.createElement("p");
        meta.className = "review-meta";
        meta.textContent = review.movie;

        const stars = document.createElement("div");
        stars.className = "review-stars";
        stars.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

        const text = document.createElement("p");
        text.className = "review-text";
        text.textContent = review.text;

        reviewCard.appendChild(title);
        reviewCard.appendChild(meta);
        reviewCard.appendChild(stars);
        reviewCard.appendChild(text);

        submittedReviews.prepend(reviewCard);
    });
}

reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const movie = document.getElementById("movie").value;
    const rating = Number(document.getElementById("rating").value);
    const text = document.getElementById("review").value.trim();

    const newReview = {
        name: name,
        movie: movie,
        rating: rating,
        text: text
    };

    reviews.push(newReview);

    localStorage.setItem("cinescopeReviews", JSON.stringify(reviews));

    displayReviews();
    reviewForm.reset();

    successMessage.textContent = "Review submitted successfully!";

    setTimeout(function() {
        successMessage.textContent = "";
    }, 3000);
});

displayReviews();
