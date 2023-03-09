<p align="center">
<img src="https://user-images.githubusercontent.com/114053180/223191568-3135f04a-1c34-49fa-be1d-252de85dbc4f.png">
</p>
To get form data and console log it on clicking the submit button, you can add an event listener to the submit button that listens for the "click" event, and then retrieves the data from the form and logs it to the console.

```
userData = form.elements.data.value  // important line
```
`elements`  DO NOT FORGET ABOUT `S`  

```
<html>
  <head>
    <title>FORM</title>
  </head>

  <style>
    body {
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    form {
      border: solid Chocolate;
      padding: 15px;
      border-radius: 5px;
      background-color: PeachPuff;
    }
  </style>

  <body>
    <form id="myForm">
      <input type="text" id="data" />
      <input type="submit" id="button" />
    </form>

    <script>
      const form = document.querySelector("#myForm");
      const submitBtn = document.querySelector("#button");

      submitBtn.addEventListener("click", (event) => {

        event.preventDefault();

        const userData = form.elements.data.value;

        console.log(userData);
      });
    </script>

  </body>
</html>
```

In this code, we first get the form and submit button elements using their IDs. We then add an event listener to the submit button that listens for the "click" event. Inside the event listener function, we first prevent the form from submitting normally by calling the `preventDefault()` method on the event object.

We then retrieve the value of the input field using the value property using it's ID called `data`, and store it in a variable called `userData`. Finally, we log the value to the console using the `console.log()` method.
