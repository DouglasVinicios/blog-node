const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const app = express()
const admin = require('./routes/admin')

// confis
    // body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // mongoose
    //breve

// routes
app.use(admin.prefix, admin.router)

// outhers
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando')
})
