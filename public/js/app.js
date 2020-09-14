const weatherForm = document.querySelector('form')
const locationQuery = document.querySelector('input')
const js_loc_err = document.querySelector('#js-loc-err')
const js_temp_humid = document.querySelector('#js-temp-humid')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    js_loc_err.textContent = 'Loading...'
    js_temp_humid.textContent = ''

    fetch('/weather?location=' + locationQuery.value).then((response) => {
        response.json().then((data) => {

            if (data.error){
                js_loc_err.textContent = data.error
            }
            else{
                js_loc_err.innerHTML = ("<br>Your selected location is : <b>" + locationQuery.value + '</b>')
                js_temp_humid.innerHTML = ("Temperature : <b>" + data.temprature + '°C</b><br>Humidity : <b>' + data.humidity + '%</b>')
            }
        })
    })
})