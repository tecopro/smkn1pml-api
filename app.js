require('dotenv').config()

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./routes')
routes(app)

app.listen(port, () => {
    console.log(`Listen to requests on http://localhost:${port}`)
})