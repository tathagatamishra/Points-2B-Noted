// Get the form and submit button elements
const form = document.querySelector("#myForm");
const submitBtn = document.querySelector("#button");

let x 

// Add an event listener to the submit button
submitBtn.addEventListener("click", (event) => {

    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the value of the input field
    const userData = form.elements.gg.value;

    // Log the value to the console
    console.log("userData = ", userData);
    
    
    x = userData
    newFunc()
})


// to access the data in another function...

let newFunc = () => {

    console.log("x = ", x)

    return x
}

