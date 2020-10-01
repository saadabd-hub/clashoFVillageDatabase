const express = require('express');
const mongooseConnection = require('./config/mongooseUrl')
const route = require('./router/index');

const app = express();
const port = 3000;

mongooseConnection()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(route);

app.listen(port, () => {
    console.log(`App running on localhost:${port}`);
})