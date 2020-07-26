console.log("client js loaded")


// fetch the value of form and others
const weatherform = document.querySelector("form")
const search = document.querySelector("input")
const m1 = document.querySelector("#message1")
const m2 = document.querySelector("#message2")
const m3 = document.querySelector("#message3")
const m4 = document.querySelector("#message4")
const m5 = document.querySelector("#message5")
const m6 = document.querySelector("#message6")
const m7 = document.querySelector("#message7")
const m8 = document.querySelector("#message8")
const m9 = document.querySelector("#message9")
const loading = document.querySelector(".loading")

// wait for submit event for the form and handle it
weatherform.addEventListener("submit", (e) => {

    // prevent the default refresh
    e.preventDefault()

    const location = search.value

    m1.textContent = ""
    m2.textContent = ""

    loading.style.display = "block"


    // fetch the weather for the given location
    fetch("/weather?address=" + location).then((response) => {

    response.json().then((data) => {
        setTimeout(() => {
            if (data.error){
                loading.style.display = "none"
                m1.textContent = data.error
                m2.textContent = ""

            } else {
                loading.style.display = "none"
                document.querySelector(".weather-info").style.display = 'initial'
                m1.textContent = data.weather_descriptions
                m2.textContent = "feels like " + data.feelslike
                m3.textContent = "temperature " + data.temperature
                m4.textContent = "wind speed " + data.wind_speed
                m5.textContent = "wind degree " + data.wind_degree
                m6.textContent = "wind direction " + data.wind_dir
                m7.textContent = "Precipitaion " + data.precip
                m8.textContent = "humidity " + data.humidity
                m9.textContent = "visibility " + data.visibility

            }
        }, 3000)

    })

})


})

