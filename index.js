const express = require('express')
const app = express()
const body_parser = require('body-parser')
const path = require('path')


app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public/'))

// routes
let location_routes = require('./routes/locations')

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/onePage/home.html'))
})

// routes options
app.use('/api/location', location_routes)

app.listen(3000)

