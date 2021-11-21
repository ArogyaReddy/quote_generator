const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // console.log(quote);

  // Check if author field is null then replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote lenth to determine the styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// Event Listerns
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// Get Quotes from API
// This function is not required now, as we are reading quotes from local file quotes.js
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
    newQuote();
  } catch (error) {}
}

// On Load
// getQuotes();
// This is not required now as we are reading quotes form local file quotes.js

newQuote();
