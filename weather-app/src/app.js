const express = require('express')
const path = require("path")
const hbs = require('hbs')
const utils = require("./utils")


// initialize the express app
app = express()
const port = process.env.PORT || 3000


// path configurations for express and hbs
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
// set view engine of express to hbs
app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)






// home route
app.get('', (req, res) => {

    res.render('index.hbs', {
        title: 'Home'
    })
})


//weather check
app.get("/weather", (req, res) => {
    
    // if the address is not provided
    if (!req.query.address) {
        return res.send({
            error: "an address is required to lookup query",
            code: 404
        })
    }

    // if address is provided
    userAddress = req.query.address

    // fetch the weather data for the user address
    utils.request_geocode(userAddress, (error, coodinates) => {

        // if error in fetching
        if (error) {
            return res.send(error)
        }
        
        //use the coordinates to fetch weather
        utils.request_weather(coodinates, (error, weather_data) => {

            if (error) {
                return res.send(error)
            }

            // send the data back to client
            res.send(weather_data)
        
        })

    })


    
})


// about route
app.get("/about", (req, res) => {
    res.render("about.hbs", {
        title: "About"
    })
})


// 404 page
app.get("*", (req, res) => {
    res.render("404.hbs", {
        title: "404"
    })
})


// listen on some port
app.listen(port, () => {
    console.log("App has been started and listening on port 3000")
})



