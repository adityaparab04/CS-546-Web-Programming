const express = require('express');
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require("express-handlebars");
const session = require('express-session');
const app = express();

app.use('/public', static);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true
}));

app.use("/private", (req, res, next) => {
    if(!req.session.user){
        res.status(403).render("auth/not_logged_in", {error: "You're not logged in"})
    }else{
        next();
    }
});

//logging middleware
app.use((req,res,next)=>{
    console.log('Current Timestamp:', new Date().toUTCString());
    console.log('Request Method:', req.method);
    console.log('Request Route:', req.originalUrl);
    console.log(`User is${req.session.user ?"" : " not"} authenticated`)
    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});

