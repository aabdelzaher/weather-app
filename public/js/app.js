const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = weatherInput.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                errorDisplay = document.querySelector('#message-1')
                errorDisplay.textContent = data.error
            }
            else{
                document.querySelector('#message-1').textContent = data.forecast
            }
        })
    })
})