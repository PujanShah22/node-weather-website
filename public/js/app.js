const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "loading..."
    messageTwo.textContent = ""
    const address = locationInput.value;
    fetch('/weather?address=' + address).then(response => response.json()).then(res => {
        if (res.error) {
            messageOne.textContent = res.error
        } else {
            messageOne.textContent = res.place
            messageTwo.textContent = res.forecast
        }
    }).catch(err => {
        messageOne.textContent = "Unable to get the weather of location at the moment."
    })
})
