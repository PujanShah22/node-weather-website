const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "loading..."
    messageTwo.textContent = ""
    const address = locationInput.value;
    fetch('http://localhost:3000/weather?address=' + address).then(response => response.json()).then(res => {
        if (res.error) {
            messageOne.textContent = res.error
        } else {
            messageOne.textContent = res.place
            messageTwo.textContent = res.forecast
        }
    }).catch(err => {
        console.log("error", err);
    })
})
