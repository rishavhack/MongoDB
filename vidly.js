const express = require("express");
const mongoose = require('mongoose');
const genres = require('./router/genres')
const app = express();


mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=> console.log("Not Connected",err))
app.use(express.json());

app.use('/api/genres',genres);

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening port number ${port}`))