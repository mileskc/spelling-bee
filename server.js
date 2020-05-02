const express = require('express')
const routes = require('./routes')
const db = require('./db')
const bodyParser = require('body-parser')
const logger = require('morgan')

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use('/api', routes)

app.use(logger('dev'))



db.on('error', console.error.bind(console, "MongoDB connection error:"))

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))