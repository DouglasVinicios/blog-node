const express = require('express')
const router = express.Router()
const prefix = '/admin'

router.get('/', (req, res) => {
    res.send('pagina do admin')
})

router.get('/posts', (req, res) => {
    res.send('pagina de posts')
})

router.get('/categorias', (req, res) => {
    res.send('pagina de categorias')
})

module.exports = { prefix, router}