const request = require('request')
const chalk = require('chalk')
const BASE_URL = 'http://api.weatherstack.com/current?access_key='
const WEATHERSTACK_API_KEY = '49a9ca670978f4011149a20e9e728e70'

const fetchWeather = (coordinates, callback) => {
    const url = BASE_URL + WEATHERSTACK_API_KEY + '&query=' + coordinates
    request({url: url, json: true}, (error, response) => {
        if (error === 'CANNOT CONNECT'){
            return ('Unable to connect to Weather Service :', error)
        }
        else{
            const temp = response.body.current.temperature
            const humidity = response.body.current.humidity
            callback(temp, humidity)
        }
    })
}

module.exports = {
    fetchWeather: fetchWeather
}