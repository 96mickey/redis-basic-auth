//importing basic dependencies for controllers
const logDb = require('../model/logs')
const userDb = require('../model/user')
const uuidv3 = require('uuid/v3');
//including redis to maintain cache
const client = require('../config/redis')

//routes
var register = function(req, res){
	req.checkBody('email', 'Invalid Email').exists().isEmail();
    req.checkBody('password', 'Invalid Password').exists().isLength({ min: 3 });

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).failure('Errors', { 'errors': errors })
    }

    var user = {}
    user['email'] = req.body.email.trim()
    user['password'] = req.body.password
    //uuid for unique id to every email. (Not overirding the default _id because this is my first time using uuid)
    user['id'] = uuidv3(req.body.email, uuidv3.DNS);

    userDb.findOne({'email': req.body.email}).exec((err, data) => {
    	console.log(data)
                if (err){ 
                    res.failure('Errors', 'Please try again');}
                else if (data) {
                    return res.status(400).failure('Errors', 'Email Address Already In Use')
                }
                else {
                    userDb(user).save()
                    return res.status(200).success('Employee added successfully.')
                }
            })
}

var login = function(req, res){
	req.checkBody('email', 'Invalid Email or Phone Number').exists();
    req.checkBody('password', 'Invalid Password').exists().isLength({ min: 3 });
    console.log(req.body)
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).failure('Errors', { 'errors': errors })
    }

    var user = {}
    user['email'] = req.body.email.trim()
    user['password'] = req.body.password
    console.log(user)
    client.get(req.body.email, function(err ,data){
    	if(data && data === req.body.password){
    		return res.status(200).success({}, 'Employee Logged In successfully through redis')
    	}else{
    		userDb.findOne({'email': req.body.email, 'password': req.body.password}).exec((err, userData) => {
    			console.log(userData)
		        if (err) res.failure('Errors', 'Please try again');
		        else if (!userData) return res.status(400).failure('Errors', 'Invalid Username or Password')
		        else{
		        client.set(req.body.email, req.body.password)
		        return res.status(200).success({}, 'Employee Logged In successfully through database')
				}
			})
    	}
    })
}

//exporting defaults
module.exports = {
	'register' : register,
	'login' : login
}