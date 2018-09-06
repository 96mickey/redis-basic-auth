var database = require('../config/database');
var Schema = database.mongoose.Schema

var logSchema = new Schema({
    ip_address: { type: String, required: true },
    api: { type: String, required: true, default: false },
    time: {type: Date, default: Date}    
}, { 'collection': 'logs' })

module.exports = database.mongoose.model('log', logSchema)