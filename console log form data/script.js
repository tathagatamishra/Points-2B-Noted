// Get the form and submit button elements
const form = document.querySelector("#myForm");
const submitBtn = document.querySelector("#button");


// Add an event listener to the submit button
submitBtn.addEventListener("click", (event) => {

    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the value of the input field
    const userData = form.elements.data.value;

    // Log the value to the console
    console.log(userData);
});
