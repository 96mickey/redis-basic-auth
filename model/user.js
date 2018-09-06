var database = require('../config/database');
var Schema = database.mongoose.Schema

var userSchema = new Schema({
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    token: { type: String, required: true, default: false },
    id: {type: String, required: true}
}, { 'collection': 'users' })

userSchema.statics.findExistence = function (email) {
    return this.findOne(
        {
            'email': new RegExp(email, 'i') ,
            isDeleted:false
        }
    ).lean();
}

userSchema.statics.findByMail = function (ep, password) {
    return this.findOne(
        {
            $or: [
                { 'email': new RegExp(ep, 'i'), 'password': password },
                { 'phone': new RegExp(ep, 'i'), 'password': password }
            ],
            isDeleted:false
        }
    ).lean();
}

module.exports = database.mongoose.model('user', userSchema) 