const express = require('express')
const router = express.Router()
const prefix = '/admin'
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
    res.send('pagina de posts')
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/form-categorias')
})

router.post('/categorias/add', [
    check('nome')
        .notEmpty()
        .withMessage('Nome é necessário'),
    check('slug')
        .trim().notEmpty()
        .withMessage('Slug é necessario'),
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        req.flash('errors_validation', errors.array())
        return res.redirect('/admin/categorias/add')
    }
    const newCategoria = {
        nome: req.body.nome,
        slug: req.body.slug,
    }
    new Categoria(newCategoria).save()
        .then(() => {
            res.flash('success_msg', {msg: 'Categoria adicionada com sucess'})
        })
        .catch((err) => {
            req.flash('error_msg', {msg: 'Erro ao adiciona a categoria'})
            console.log('erro: ' + err.message)
        })
    res.redirect('/admin/categorias/add')
})

module.exports = { prefix, router}