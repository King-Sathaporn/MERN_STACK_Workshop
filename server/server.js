const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require("dotenv").config();

const blogRoute = require('./route/blogs');
const authenRoute = require('./route/authen');

const app = express();

//connect to database
mongoose.connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
})
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes from route folder
app.use("/api/v1",blogRoute)
app.use("/api/v1",authenRoute)

const port = process.env.PORT || 8080;
app.listen(port,()=>console.log("Server is running on port "+port));