const request = require('request')


const get_weather = (coordinates, callback) => {

    url = "http://api.weatherstack.com/current?access_key=65731b62f823f431f805a250757620ec&query=" + coordinates.lat +","+coordinates.long

    request({url: url, json: true}, (error, response) => {

        if (error) {
        
            console.log("unable to connect to weather service!!")
            callback({
                error: "unable to connect to weather service!!",
                code: "503"
            }, undefined)
        
        } else if (response.body.error) {

            console.log("Weather data for the given location isn't available.")
            callback({
                error: "The given location data is unavailable. Recheck the location name",
                code: "502"
            }, undefined)

        } else {
            
            const weather_data = response.body
            callback(undefined, weather_data.current)
        }

})}


const get_geocode = (loc_name, callback) => {

    if (!loc_name.trim()) {
        console.log("Please provide a location name")
        return
    }
    geocoding_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(loc_name) +".json?access_token=pk.eyJ1Ijoic2FuamF5YyIsImEiOiJjanljczkxajYwbGJjM2RuemJyZmJvdmMwIn0.zDQC0i_AGU35TmYB9JUW0w&autocomplete=true&-limit=2"

    
    request({url:geocoding_url, json:true}, (error, response) => {

        if (error) {
            
            console.log("Unable to connect to GeoCoding service")
            callback({
                error: "Unable to connect to GeoCoding service!!",
                code: "503"
            }, undefined)
    
        } else if (response.body.error){
    
            console.log('Unable to fetch the geocordinates of the location!!')
            callback({
                error: "Unable to fetch coodinates for the location. Recheck the location name",
                code: "502"
            }, undefined)
    
        } else if (response.body.features.length < 1) {
            console.log("No information found for the given location!!")
            callback({
                error: "The given location data is unavailable. Recheck the location name",
                code: "502"
            }, undefined)

        } else {

            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            callback(undefined, {
                lat, 
                long
            })
    
        }
    
    })

}


module.exports = {
    request_geocode: get_geocode,
    request_weather: get_weather
}