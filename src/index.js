import API_KEY from "./config.js";

const displayQuote = (response) => {
  console.log(response);
  new Typewriter("#quote", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
};

const generateQuote = (event) => {
  event.preventDefault();

  let userInputElement = document.getElementById("user-input");
  let userInput = userInputElement.value.trim();

  if (!userInput) {
    alert("Please enter a topic for the quote.");
    return;
  }

  let context = `You are an expert in motivational speaking that loves to write random, short inspirational quotes that are always related to ${userInput}. Your mission is to generate no more than 4-lines of inspirational quote specific to the user instructions. Sign every quote you generate with <strong>'SheCodes AI'</strong> at the end of the quote. Make sure to follow the user instructions precisely. Make sure the quote is about ${userInput}. Avoid Lorem Ipsum text. Avoid using industry specific terms like input field or HTMLInputElement. Make sure the quote includes the word ${userInput}.`;

  let prompt = `User instructions: Generate an inspirational quote specifically about ${userInput}.`;

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${API_KEY}`;

  let quoteElement = document.getElementById("quote");
  quoteElement.classList.remove("hidden");
  quoteElement.innerHTML = `<div class="dot-pulse"></div>`;

  axios.get(apiURL).then(displayQuote);
};

let quoteFormElement = document.getElementById("quote-generator-form");
quoteFormElement.addEventListener("submit", generateQuote);
