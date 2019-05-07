const request = require('request')
const get_weather = require("./util/weather.js")
const get_geoLoc = require('./util/geolocation.js')
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const util = require('util')
var app = express()


const publicPath = path.join(__dirname, '/public')
const viewPath = path.join(__dirname, '/views/layouts')
const partialsPath = path.join(__dirname, '/views/partials')

hbs.registerPartials(partialsPath);
app.use(express.static(publicPath))

app.set('views', viewPath)
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {name:'Abdelzaher'})
})

app.get('/about', (req, res) => {
    res.render('about', {name: 'Abdelzaher'})
})

app.get('/help', (req, res)=>{
    res.render('help', {name: 'Abdelzaher'})
})

app.get('/weather', (req, res)=>{
    const address = req.query.address
    get_geoLoc(address, get_weather, (error, response, {summary, temperature, precipProbability} = {}) => {
        msg = undefined
        if(!error){
            msg = util.format("It is %s, the temperature is now %f in %s, with %f chance of rain.", summary, temperature, address, precipProbability)
        }
        res.send({
            error,
            location: address,
            forecast: msg
        })
    })
})
app.get('*', (req, res)=>{
    res.render('404', {name: 'Abdelzaher', errorMessage: 'The page you requested is not found!'})
})


app.listen(3000, ()=>{console.log("Server started at port 3000!")})

