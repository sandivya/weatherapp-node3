const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weatherstack = require('./utils/weatherstack')
const geo = require('./utils/geocode')

const html_path = path.join(__dirname, '../public') //path to static files
const hbs_views = path.join(__dirname, '../templates/views')
const hbs_partials = path.join(__dirname, '../templates/partials')

const app = express() //Instantiate express
const port = process.env.PORT || 3000

app.use(express.static(html_path)) //load static files
app.set('view engine', 'hbs') //Load handlebar engine
app.set('views', hbs_views) //Setup hbs file location
hbs.registerPartials(hbs_partials)


app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about', {
        text: 'This is a',
        app_name: 'Weather App'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'Please close the window'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help doc not found'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.location){
        return res.send({
            error: 'Please provide Location.'
        })
    }
    
    const location = req.query.location
    geo.geocode(location, (geoerror, coordinates) => {

        if(coordinates){
           weatherstack.fetchWeather(coordinates, (temp, humidity) => {
                //console.log('Today, the temprature is ' + temp + ' and humidity like ' + humidity + '.')
                res.send({
                    location : location,
                    temprature : temp,
                    humidity: humidity
                })
           })
        }
        else{
            return res.send({
                error: ('Location Not Found. Try another location.')
            })
        }
    })
    
})

app.get('*', (req, res) => {
    res.render('error', {
        error: '404 NOT FOUND'
    })
})

app.listen(port, () => {
    console.log('Server up on port :', port)
})


