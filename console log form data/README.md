To get form data and console log it on clicking the submit button, you can add an event listener to the submit button that listens for the "click" event, and then retrieves the data from the form and logs it to the console.

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