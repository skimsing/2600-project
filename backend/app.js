const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const connection = require('./connection.js');

connection.then(()=>{
    const server = app.listen(process.env.PORT, ()=>{
    console.log(`Connected and listening on PORT ${PORT}`);
    });
});

const usersRoutes = require('./routes/usersRoute');
const storiesRoutes = require('./routes/storiesRoute');

app.use('/users', usersRoutes);
app.use('/stories', storiesRoutes);



