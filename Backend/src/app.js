// create server
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
const authRoutes = require('./routes/auth.route.js');
const createRoutes = require('./routes/create.route.js')

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get('/', (req, res)=>{
    res.send('Success')
});

app.use('/api/auth', authRoutes);
app.use('/api/project', createRoutes);

module.exports = app;