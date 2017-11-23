var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("view : index page");
  res.render('index', { title: 'Express' });
});

router.get('/sign_in',function(req,res){
  res.render('sign_in',{title: 'sign_in'});
});

router.post('/sign_in', function(req, res){
  id = ""
  pw = ""
  var id = req.body.user_id;
  var pw = req.body.user_pw;
  connection.query('SELECT * from users where user_id=?',id, function(err, rows) {
    try{
    if(err){
      console.log("id error");
      res.redirect('sign_in');
    }
    if(pw == rows[0].user_pw){
      console.log("login succes");
      res.redirect('ds');
    }else{
      console.log("login fail");
      res.redirect('sign_in');
    }
  }catch(exception){
    console.log("id error");
    res.redirect('sign_in');
  }
  });
});

router.get('/sign_up',function(req,res){
  res.render('sign_up');
});

router.post('/sign_up', function(req, res){
  var id = "";
  var pw = "";
  var email = "";
  id = req.body.user_id;
  pw = req.body.user_pw;
  email = req.body.user_email;
  console.log("-------------------sign up-----------------");
  var data = [id,pw,email];

  connection.query('insert into users (user_id,user_pw,user_email) values (?,?,?)', data, function(err, rows) {
    res.redirect('/');
  });
});

router.get('/ds',function(req,res){
  res.render('ds',{title: 'DashBoard'});
});

router.post('/ds',function(req,res){
  res.render('ds',{title: 'DashBoard'});
});

router.get('/users', function(req, res){
  connection.query('SELECT * from users', function(err, rows) {
    if(err) throw err;
    console.log('The solution is: ', rows);
    res.send(rows);
  });
});

router.get('/index',function(req,res){
  res.render('index',{title: 'DashBoard'});
});

router.get('/index.html',function(req,res){
  res.render('ds',{title: 'DashBoard'});
});

module.exports = router;
