var express = require('express');
var User = require('../data/models/users')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).sort('lastName').sort('firstName').exec(function (err, docs) {
    console.log(docs);
    res.render('users/index', { title: 'Users overzicht', userlist: docs });
  })
});

router.get('/details/:id', function(req, res, next) {
    console.log(req.params.id);
    let userid = req.params.id
    User.findOne({'_id': userid}).exec(function (err, user) {
      if(err) 
      {
        console.error(err);
        res.render('users/', { title: 'Users overview', user: user });
        
      }
      else {
        console.log(user);
        res.render('users/details', { title: 'User details', user: user });
      }
      
    })
});


module.exports = router;
