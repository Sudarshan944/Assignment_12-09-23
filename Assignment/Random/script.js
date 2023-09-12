// Get references to HTML elements
const quote = document.querySelector(".quote p");
const quoteButton = document.getElementById("new-quote-btn");

// Function to fetch a random quote from the API
async function fetchRandomQuote() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }
    const data = await response.json();

    // Pick a random quote from the array
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuote = data[randomIndex];

    // Update the HTML with the random quote
    quote.textContent = `"${randomQuote.text}" - ${
      randomQuote.author.slice(0, -10) || "Unknown"
    }`;
  } catch (error) {
    console.error(error);
    quote.textContent = "Failed to fetch a quote.";
  }
}

// Event listener for the "New Quote" button
quoteButton.addEventListener("click", fetchRandomQuote);

// Initial fetch of a random quote when the page loads
fetchRandomQuote();
