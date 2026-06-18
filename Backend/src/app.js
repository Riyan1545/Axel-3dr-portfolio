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

const allowedOrigins = [
    "http://localhost:5173",
    "https://axel-3dr-portfolio.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.get('/', (req, res)=>{
    res.send('Success')
});

app.use('/api/auth', authRoutes);
app.use('/api/project', createRoutes);

module.exports = app;