// @babel/preset-env @babel/preset-react @babel/register ingore-styles
require('ignore-styles')
require('@babel/register')({
    ignore:[/(nodu_modules)/],
    presets:[
        '@babel/preset-env','@babel/preset-react'
    ]
})
require('./server.js')