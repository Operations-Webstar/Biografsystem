const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/database', {useUnifiedTopology: true});


app.set('view engine', 'ejs');