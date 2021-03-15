require('dotenv').config({ path: __dirname + '/../.env' })

const express = require('express')
const app = express()
const { urlencoded, json } = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(cors())
app.use(urlencoded({
    extended: true
}))
app.use(json())

app.use(routes)

app.listen(port, () => {
    console.log(`Listen to requests on http://localhost:${port}`)
})