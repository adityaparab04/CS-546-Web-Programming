const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const saltRounds = 16;
let { objectId } = require('mongodb');

let exportedMethods = {
    async createUser(username, password){
        
        //convert username to lowercase
        username = username.toLowerCase();
        
        //error handling for username
        if(!username){
            throw `please enter a username`
        };
        if(typeof username !== 'string'){
            throw `username must be a string`
        };
        if(!username.replace(/\s/g, "").length || username.indexOf(' ') >= 0){
            throw `username cannot be empty spaces or contain empty spaces`
        };
        if(username.replace(/[^0-9a-z]/g, "").length !== username.length){
            throw `username should only be a alpha numeric string`
        };
        if(username.length < 4){
            throw `length of username should atleast be 4 characters`
        };

        //error handling for password
        if(!password ){
            throw `please enter a password`
        };
        if(typeof password !== 'string'){
            throw `password must be a string`
        }
        if(!password.replace(/\s/g, "").length || password.indexOf(' ') >= 0){
            throw `password should not contain empty spaces`
        }
        if(password.length < 6){
            throw `password should be atleast 6 characters long`
        };
       
        //hash the password
        const hash = await bcrypt.hash(password, saltRounds);
        
        //create a new user in DB with username and hashed password
        let newUser = {
            username: username,
            password: hash
        };
        
        const userCollection = await users();
        
        let arrayOfUsers = [];
        arrayOfUsers = await userCollection.find({}).toArray();
        
        //error checking if the user already exists
        for (let i = 0; i < arrayOfUsers.length; i++){
            if(arrayOfUsers[i].username === newUser.username){
                throw `Same Username already taken`
            }
        }
        //insert user in the DB
        const insertedNewUser = await userCollection.insertOne(newUser);
        if(insertedNewUser.insertedCount === 0){
            throw `Could not insert the user`
        }

        return {userInserted: true};
    },

    async checkUser(username, password){
        
        //convert username to lowercase
        username = username.toLowerCase();
        
        //error handling for username
        if(!username){
            throw `please enter a username`
        };
        if(typeof username !== 'string'){
            throw `username must be a string`
        };
        if(!username.replace(/\s/g, "").length || username.indexOf(' ') >= 0){
            throw `username cannot be empty spaces or contain empty spaces`
        };
        if(username.replace(/[^0-9a-z]/g, "").length !== username.length){
            throw `username should only be a alpha numeric string`
        };
        if(username.length < 4){
            throw `length of username should atleast be 4 characters`
        };
        //error handling for password
        if(!password ){
            throw `please enter a password`
        };
        if(typeof password !== 'string'){
            throw `password must be a string`
        }
        if(!password.replace(/\s/g, "").length || password.indexOf(' ') >= 0){
            throw `password should not contain empty spaces`
        }
        if(password.length < 6){
            throw `password should be atleast 6 characters long`
        };
        const userCollection = await users();
        
        let arrayOfUsers = [];
        arrayOfUsers = await userCollection.find({}).toArray();
        let count = 0;
        for (let i = 0; i < arrayOfUsers.length; i++){
            if(arrayOfUsers[i].username === username){
                count = 1;
                const compare = await bcrypt.compare(password, arrayOfUsers[i].password)
                if(compare){
                    return {authenticated: true}
                }
                else{
                    throw `invalid password`
                }
            }
        }
        if(count === 0){
            throw `invalid username`
        }
    }
}

module.exports = exportedMethods;