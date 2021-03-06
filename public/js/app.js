const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); // disables refreshing after form submit
    const location = search.value; // gets the value in the input field

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error){
                messageOne.textContent = data.error;
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
});