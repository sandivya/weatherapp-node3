const request = require('request')
const MAPBOX_BASE_URL = 'https://api.mapbox.com/geocoding/v5/'
const MAPBOX_API_KEY = 'pk.eyJ1Ijoic2FuZGl2eWEiLCJhIjoiY2tleG5jd2ZmMG5jYTJ6bWcwdjRwZDJqMyJ9.KW8Xl5i7WMFttLmmJw1lyQ'
const ENDPOINT = 'mapbox.places'
const chalk = require('chalk')


const geocode = (location, callback) => {

    const mapbox_url = MAPBOX_BASE_URL + ENDPOINT + '/' + location.replace(' ', '%20') + '.json?access_token=' + MAPBOX_API_KEY + '&limit=1'

    request({url: mapbox_url, json: true}, (error, response) => {

        if (error){
            //console.log(chalk.red.inverse('Unable to connect to Map Service MapBox :', error.code))
            callback('CANNOT CONNECT', undefined)
        }    
        else if(response.body.features.length === 0){
            //console.log(chalk.inverse.red('Mapbox cannot recognise given place :', location))
            callback('NOT FOUND', undefined)
        }
        else{
            const latitude = response.body.features[0].center[0]
            const longitude = response.body.features[0].center[1]
            coordinates = longitude + ',' + latitude
            if (coordinates){
                //console.log('Coordinates for', location +' : '+ chalk.inverse.blue(coordinates))
                callback(undefined, coordinates)
            }
        }
    })
}

module.exports = {
    geocode: geocode
}