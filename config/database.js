const config = require('./config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database + '');
var db = mongoose.connection;
module.exports.mongoose = mongoose;
module.exports.db = db;