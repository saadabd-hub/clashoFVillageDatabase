const bodyParser = require('body-parser');
const express = require('express');
const mongooseConnection = require('./config/mongooseUrl')
const route = require('./route/index');

const app = express();
const port = process.env.PORT || 3000;

mongooseConnection()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(route);

app.get('/', (req, res)=>{
    res.status(200).json({success: true, msg:'App is working'})
})
app.listen(port, () => {
    console.log(`App running on localhost:${port}`);
})