const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const path = require('path')
const hbs =require('hbs')

const app = express()
const port = process.env.PORT || 3000


//define paths for express config.
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlers and views location 
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'yash upadhyay'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'yash upadhyay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Happy to help anytime!",
        name: "yash upadhyay"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "the address must be provided"
        })
    }
    const address = req.query.address
    geocode(address, (error, { longitude, latitude, location} ={}) => {
        if(error) {
            return res.send({ error })
        }
    
        forecast(longitude, latitude, (error, forecastdata) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location: location
            })
        // console.log(location)
         //   console.log(forecastdata)
          })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: "HELP ARTICLE NOT FOUND"
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: "ERROR 404 PAGE NOT FOUND"
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})