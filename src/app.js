const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs")
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Pujan Shah"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Pujan Shah"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Desk",
        description: "For more information or help, please contact us on pujanshah22@gmail.com.",
        name: "Pujan Shah"
    })
})


// app.get('/weather', (req, res) => {
//     res.send([{
//         location: "Ahmebadabad",
//         temp: "43 degree"
//     }, {
//         location: "Ahmebadabad Gujarat",
//         temp: "45 degree"
//     }])
// })

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: "You must provide address."
        })
    }

    // res.send({
    //     location: "Ahmebadabad",
    //     temp: "43 degree",
    //     address: req.query.address
    // })

    geoCode(address, (error, { latitude = "", longitude = "", place = "" } = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (err, forecastData) => {
                if (err) {
                    return res.send({ error: err })
                } else {
                    return res.send({
                        place,
                        forecast: forecastData,
                        address: address
                    })
                }
            })

        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Weather App",
        name: "Pujan Shah",
        message: "Requested Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Weather App",
        name: "Pujan Shah",
        message: "Page not found"
    })
})

app.listen(3000, () => {
    // console.log("Server is up on port 3000.");

})