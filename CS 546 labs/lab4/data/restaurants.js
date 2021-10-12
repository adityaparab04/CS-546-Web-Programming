const mongoCollections = require('./../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

//create a newRestaurant object with the given parameters
const create = async function create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions){    
    //arguments length check
    if (arguments.length !== 8) throw new Error ("Enter all the properties of a restaurant");

    //Error handling for name
    if(!name || typeof name !== 'string' || !name.replace(/\s/g, "").length) throw new Error ("Please enter a valid input name as a string");
    
    //Error handling for location
    if(!location || typeof location !== 'string' || !location.replace(/\s/g, "").length){
        throw new Error ("Please enter a valid input location as a string");
    }
    
    //Error handling for phoneNumber
    if(!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.replace(/\s/g, "").length){
        throw new Error ("Please enter a valid input phoneNumber as a string")
    }
    if(phoneNumber.match(/^\d{3}[-]\d{3}[-]\d{4}$/) === null){
        throw new Error ("Please enter a valid phone number")
    }
    //Error handling for website
    if(!website || typeof website !== 'string' || !website.replace(/\s/g, "").length){
        throw new Error ("Please enter a valid URL in string format")
    }
    if(website.match(/^(http:\/\/www\.|https:\/\/www\.)[a-zA-z0-9\_-]{5,}(\.com)$/g) === null){
        throw new Error ("Please enter a valid URL in string format")
    }

    //Error handling for priceRange
    if(!priceRange || typeof priceRange !== 'string' || !priceRange.replace(/\s/g, "").length){
        throw new Error ("Please enter a valid input priceRange as a string")
    }
    if(priceRange.match(/^[$]{1,4}$/g) === null){
        throw new Error("Enter valid price range between $ to $$$$")
    }

    //Error handling for cuisines
    if(!cuisines || Array.isArray(cuisines) !== true || cuisines.length === 0 ){
        throw new Error ("Please enter cuisines as an array of atleast length 1 with valid input string")
    }
    cuisines.forEach(cuisine => {
        if(typeof cuisine != 'string' || !cuisine.replace(/\s/g, "").length) throw new Error ("enter valid string for cuisine")
    });

    //Error handling for overallRating
    if(!overallRating || typeof overallRating !== 'number'){
        throw new Error ("Please enter a valid input name as a string")
    }
    if(overallRating < 0 || overallRating > 5){
        throw new Error ("Rating should be in between 0 - 5")
    }

    //Error handling for serviceOptions
    if(!serviceOptions || typeof serviceOptions !== 'object' || Object.keys(serviceOptions).length !== 3){
        throw new Error ("Please enter a valid serviceOption")
    }
    if(serviceOptions.hasOwnProperty('dineIn', 'takeOut', 'delivery') !== true) {
        throw new Error ("Please enter right service options with boolean values")
    }
    if (typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean') {
        throw new Error ("enter valid key and value for serviceOptions")
    }
    let newRestaurant ={
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: overallRating,
        serviceOptions: serviceOptions
    };
    const restaurantCollection = await restaurants();
    
    let arrayOfRestaurants = [];
    arrayOfRestaurants = await restaurantCollection.find({}).toArray();
    for (let i = 0; i < arrayOfRestaurants.length; i++){
        if(arrayOfRestaurants[i].name.toLowerCase() === newRestaurant.name.toLowerCase() && arrayOfRestaurants[i].location.toLowerCase() === newRestaurant.location.toLowerCase() && arrayOfRestaurants[i].phoneNumber === newRestaurant.phoneNumber){
            throw new Error ("Same Restaurant already added")
        }
    }
    const insertNewRestaurant = await restaurantCollection.insertOne(newRestaurant);
    if (insertNewRestaurant.insertedCount === 0){
        throw new Error ("Could not add restaurant")
    }
    const newId = insertNewRestaurant.insertedId;
    newIdStringFormat = newId.toString()
    const restaurant = await this.get(newIdStringFormat);
    return restaurant;
}

//Show all restaurants
const getAll = async function getAll(){

    let arrayOfRestaurants = [];
    
    const restaurantCollection = await restaurants();
    arrayOfRestaurants = await restaurantCollection.find({}).toArray();
    
    let allRestaurant = [];
    let i = 0;
    arrayOfRestaurants.forEach(obj => {
        obj._id = obj._id.toString();
        allRestaurant[i] = obj;
        i+=1
    });
    if(allRestaurant.length === 0){
        console.log("No restaurants in Database")
    }
    return allRestaurant;
}


//Find restaurant by ID
const get = async function get(id){
    if(!id){
        throw new Error ("Please enter an id in string format")
    }
    if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
        throw new Error ("Entered id not in string format or contains blank spaces only")
    }
    if(ObjectId.isValid(id) === false){
        throw new Error ("Entered Id is not a valid object Id")
    }
    const restaurantCollection = await restaurants();
    let parseId = ObjectId(id)
    const restaurant = await restaurantCollection.findOne({ _id: parseId});
    if (restaurant === null){
        throw new Error ("No restaurant with that id")
    }
    restaurant._id = restaurant._id.toString();
    return restaurant;
}

//remove restaurant by id
const remove = async function remove(id){
    if(!id){
        throw new Error ("Please enter an id in string format")
    }
    if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
        throw new Error ("Entered id not in string format or contains blank spaces only")
    }
    if(ObjectId.isValid(id) === false){
        throw new Error ("Entered Id is not a valid object Id")
    }
    
    const restaurantCollection = await restaurants();
    let parseId = ObjectId(id);
    const deleteRestaurant = await restaurantCollection.deleteOne({_id: parseId})
    if (deleteRestaurant.deletedCount === 0){
        throw new Error ("Couldn't delete the id because it is not present in DB")
    }
}

//update the website of the restaurant
const rename = async function rename(id, newWebsite){
    if(!id){
        throw new Error ("Please enter an id in string format")
    }
    if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
        throw new Error ("Entered id not in string format or contains blank spaces only")
    }
    if(ObjectId.isValid(id) === false){
        throw new Error ("Entered Id is not a valid object Id")
    }

    if(!newWebsite){
        throw new Error ("new website is not provided")
    }
    if(typeof newWebsite !== 'string' || !newWebsite.replace(/\s/g, "").length){
        throw new Error ("Entered id not in string format or contains blank spaces only")
    }
    if(newWebsite.match(/^(http:\/\/www\.|https:\/\/www\.)[a-zA-z0-9\_-]{5,}(\.com)$/g) === null){
        throw new Error ("Please enter a valid URL in string format")
    }

    const restaurantCollection = await restaurants();
    
    let arrayOfRestaurants = [];
    arrayOfRestaurants = await restaurantCollection.find({}).toArray();
    for (let i = 0; i < arrayOfRestaurants.length; i++){
        if(arrayOfRestaurants[i]._id.toString() === id){
            if(arrayOfRestaurants[i].website.toLowerCase() === newWebsite.toLowerCase()){
                throw new Error ("Same website link entered")
            }
        }
    }
    let parseId = ObjectId(id);
    let updateWebsite = {
        website: newWebsite
    };
    const renamedWebsite = await restaurantCollection.updateOne(
        { _id: parseId },
        { $set: updateWebsite }
    );
    if (renamedWebsite.modifiedCount === 0){
        throw new Error ("Couldn't update website of the restaurant, Id not found")
    }
    return await this.get(id);
}


module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
}