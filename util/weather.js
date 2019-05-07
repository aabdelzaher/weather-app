const request = require('request')
API_KEY = "a23f0884a5afafa8c9a050856e52c3d5"
const get_url = (lat, lng) => "https://api.darksky.net/forecast/"+API_KEY+"/"+lat+","+lng +'?units=si'

const get_stat = (lat, lng, callback) => {
    const url = get_url(lat, lng)
    request({url, json: true}, (error, response, body) => {
        if(error){
            callback(error, response, body)
        }else {
            callback(error, response, body)
        }
    })
}

module.exports = get_stat
