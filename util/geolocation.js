const request = require('request')
const API_KEY = ''	// add your google API_KEY here

const get_url = (url) => "https://maps.googleapis.com/maps/api/geocode/json?address="+url+"&key="+API_KEY

const send_request = (location, get_weather, callback) => {
    const url = get_url(location)
    request({url, json: true}, (error, response, body) => {
        if(error){
            callback("Cannot connect to network", undefined, undefined)
        }else if(body.status === "ZERO_RESULTS"){
            callback("Could not find location!!", undefined, undefined)
        }else{
	    const {lat, lng} = body.results[0].geometry.location 
            get_weather(lat, lng, 
                (error, response, body) => {
					const {summary, temperature, precipProbability} = body.currently
					result = {
						summary,
						temperature,
						precipProbability
					}
                    callback(error, response, result)
                })
        }
    })
}

module.exports = send_request
