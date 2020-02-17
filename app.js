const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

// confis
    // session
    app.use(session({
        secret: "algo",
        resave: true,
        saveUninitialized: true,
    }))
    app.use(flash())
    // middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.errors_validation = req.flash('errors_validation')
        next()
    })
    // body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // mongoose
    mongoose.connect("mongodb://localhost:/blogapp", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { console.log('Conetou ao mongodb') })
        .catch((err) => { console.log('error: ' + err.message) })
    // public
    app.use(express.static(path.join(__dirname, 'public')))
// routes
app.use(admin.prefix, admin.router)

// outhers
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando')
})
