const express = require('express');
const router = express.Router();
var logDb = require('../model/logs')
const controller = require('../controllers/user')


//general mongodb entry for logging user details
router.use(function(req, res, next){
	var log = new logDb();
	log.ip_address = req.ip
	log.api = req.headers.host + req.url
	logDb(log).save()
	next()
})

/* general requests */
router.post('/register', controller.register);
router.post('/login', controller.login);

//foul route
router.get('*', function(req, res, next) {
	console.log(req.headers.host + req.url)
	console.log(req.ip)
  res.send('hi, no route here.');
});


module.exports = router;
