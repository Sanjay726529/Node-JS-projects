const yargs = require('yargs')
const chalk = require('chalk')
const utils = require("../utils")



yargs.command({
    command: "ln",
    description: "commands to fetch weather by location name",
    builder: {
        name:{
            description: "location name",
            demandOption: true,
            type: String
        }
    },
    handler: (argv) => {

        utils.request_geocode(argv.name, (lat, long) => {

            geo_co = lat + "," + long
            
            utils.request_weather(geo_co, (weather) => {
            
            console.log("weather for the '" + argv.name + "': ")
            console.log(weather.weather_descriptions[0])
            console.log("Current Temp(c):" + weather.temperature)
            console.log("Feels like(c):" + weather.feelslike)

            })

        })


    }
})


yargs.command({
    command: "geo",
    description: "commands to fetch weather by geo-cordinates",
    builder: {
        cordinates:{
            description: "'lat,long' in string format" ,
            demandOption: true,
            type: String
        }
    },
    handler: (argv) => {
        utils.request_weather(argv.cordinates, (weather_object) => {
            console.log("weather for the '" + argv.cordinates + "': ")
            console.log(weather_object.weather_descriptions[0])
            console.log("Current Temp(c):" + weather_object.temperature)
            console.log("Feels like(c):" + weather_object.feelslike)
        })
    }
})


if (process.argv.length > 2) {
    yargs.parse()
} else {
    console.log(chalk.bgRed("app has to be run with commands"))
    console.log()
    console.log(chalk.yellowBright("node app.js ln|geo [arguments]"))
}




