const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
//let { ObjectId } = require('mongodb');

router.get('/', async (req, res) =>{
    try{
        if(req.session.user){
            res.redirect('/private');
            return;
        }
        res.render('auth/login', {title: 'Login Page'});
    }
    catch (e){
        res.render('auth/login');
    }
});

router.post('/login', async (req, res) =>{
    let userInfo =req.body;
    userInfo.username = userInfo.username.toLowerCase();
    //error handling for username
    if(!userInfo.username){
        res.status(400).render('auth/login', {flag: true, error: 'please enter a username'});
        return; 
    };
    if(typeof userInfo.username !== 'string'){
        res.status(400).render('auth/login', {flag: true, error: 'username must be a string'}) 
        return;
    };
    if(!userInfo.username.replace(/\s/g, "").length || userInfo.username.indexOf(' ') >= 0){
        res.status(400).render('auth/login', {flag: true, error: 'username cannot be empty spaces or contain empty spaces'}) 
        return;
    };
    if(userInfo.username.replace(/[^0-9a-z]/g, "").length !== userInfo.username.length){
        res.status(400).render('auth/login', {flag: true, error: 'username should only be a alpha numeric string'}) 
        return;
    };
    if(userInfo.username.length < 4){
        res.status(400).render('auth/login', {flag: true, error: 'length of username should atleast be 4 characters'}) 
        return;
    };

    //error handling for password
    if(!userInfo.password){
        res.status(400).render('auth/login', {flag: true, error: 'please enter a password'})
        return;
    };
    if(typeof userInfo.password !== 'string'){
        res.status(400).render('auth/login', {flag: true, error: 'password must be a string'}) 
        return;
    }
    if(!userInfo.password.replace(/\s/g, "").length || userInfo.password.indexOf(' ') >= 0){
        res.status(400).render('auth/login', {flag: true, error: 'password should not contain empty spaces'}) 
        return;
    }
    if(userInfo.password.length < 6){
        res.status(400).render('auth/login', {flag: true, error: 'password should be atleast 6 characters long'}) 
        return;
    };
    try{
        const getUser = await userData.checkUser(
            userInfo.username, 
            userInfo.password
        );
        
        if(getUser.authenticated){
            req.session.user = userInfo.username;
            res.status(200).redirect('/private');
        }  
    }
    catch (e){
        res.status(400).render('auth/login', {flag: true, title: "Error", error: 'Invalid username/password'});
    }
});

router.get('/signup', (req, res) => {
    if(req.session.user){
        res.redirect('/private')
        return;
    }
    res.render('auth/signup',{title: 'Signup Page'});
});

router.post('/signup', async (req, res) => {
    let userInfo = req.body;
    userInfo.username = userInfo.username.toLowerCase();
    //error handling for username
    if(!userInfo.username){
        res.status(400).render('auth/signup', {flag: true, error: 'please enter a username'})
        return;
    };
    if(typeof userInfo.username !== 'string'){
        res.status(400).render('auth/signup', {flag: true, error: 'username must be a string'})
        return;
    };
    if(!userInfo.username.replace(/\s/g, "").length || userInfo.username.indexOf(' ') >= 0){
        res.status(400).render('auth/signup', {flag: true, error: 'username cannot be empty spaces or contain empty spaces'})
        return;
    };
    if(userInfo.username.replace(/[^0-9a-z]/g, "").length !== userInfo.username.length){
        res.status(400).render('auth/signup', {flag: true, error:  'username should only be a alpha numeric string'})
        return;
    };
    if(userInfo.username.length < 4){
        res.status(400).render('auth/signup', {flag: true, error: 'length of username should atleast be 4 characters'})
        return;
    };

    //error handling for password
    if(!userInfo.password){
        res.status(400).render('auth/signup', {flag: true, error: 'please enter a password'})
        return;
    };
    if(typeof userInfo.password !== 'string'){
        res.status(400).render('auth/signup', {flag: true, error: 'password must be a string'})
        return;
    }
    if(!userInfo.password.replace(/\s/g, "").length || userInfo.password.indexOf(' ') >= 0){
        res.status(400).render('auth/signup', {flag: true, error: 'password should not contain empty spaces'})
        return;
    }
    if(userInfo.password.length < 6){
        res.status(400).render('auth/signup', {flag: true, error: 'password should be atleast 6 characters long'})
        return;
    };

    try{
        const newUser = await userData.createUser(
            userInfo.username,
            userInfo.password
        );
        if(newUser.userInserted){
            res.status(200).redirect('/');
        }
    }catch (e) {
        if(e ==='Same Username already taken'){
            res.status(400).render('auth/signup', {flag: true, error:'Same username already exists'})
            return
        }
        else{
            res.status(500).render('auth/error', {flag:true, error:'Internal Server Error', title: 'Error'});
            return;
        }
    }
});

router.get('/private',(req,res) => {
    res.render('auth/private', {username: req.session.user});
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('auth/logout')
});

module.exports = router;