const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');

const homeController = require('./controllers/home')

mongoose.connect('mongodb://localhost/database', {useUnifiedTopology: true});


app.listen(4000, ()=>{
    console.log('App listening on port 4000 ...')
})


app.set('view engine', 'ejs');
app.use(express.static('public'))



app.get('/', homeController);