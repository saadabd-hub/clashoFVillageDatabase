const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/HappyStore', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', (err) => console.log(err));
    db.once('open', () => console.log('Database is connection'));
}