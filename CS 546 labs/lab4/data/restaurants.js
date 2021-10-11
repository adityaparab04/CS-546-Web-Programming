const mongoCollections = require('./../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

//create a newRestaurant object with the given parameters
const create = async function create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions){    
    if(!name || typeof name !== 'string' || !name.replace(/\s/g, "").length){
        throw `Please enter a valid input name as a string`
    }
    if(!location || typeof location !== 'string' || !location.replace(/\s/g, "").length){
        throw `Please enter a valid input location as a string`
    }
    if(!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.replace(/\s/g, "").length){
        throw `Please enter a valid input phoneNumber as a string`
    }
    if(!website || typeof website !== 'string' || !website.replace(/\s/g, "").length){
        throw `Please enter a valid input website as a string`
    }
    if(!priceRange || typeof priceRange !== 'string' || !priceRange.replace(/\s/g, "").length){
        throw `Please enter a valid input priceRange as a string`
    }
    if(!cuisines || Array.isArray(cuisines) !== true || cuisines.length === 0){
        throw `Please enter cuisines as an array`
    }
    if(!overallRating || typeof overallRating !== 'number'){
        throw `Please enter a valid input name as a string`
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
    const restaurantsCollection = await restaurants();
    const insertNewRestaurant = await restaurantsCollection.insertOne(newRestaurant);
    if (insertNewRestaurant.insertedCount === 0){
        throw `Could not add restaurant`
    }
    const newId = insertNewRestaurant.insertedId;
    const restaurant = await this.get(newId);
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
    return allRestaurant
}


//Find restaurant by ID
const get = async function get(id){
    const restaurantCollection = await restaurants();
    let parseId = ObjectId(id)
    const restaurant = await restaurantCollection.findOne({ _id: parseId});
    if (restaurant === null){
        throw `No restaurant with that id`
    }
    restaurant._id = restaurant._id.toString();
    return restaurant;
}

//remove restaurant by id
const remove = async function remove(id){
    const restaurantCollection = await restaurants();
    let parseId = ObjectId(id);
    const deleteRestaurant = await restaurantCollection.deleteOne({_id: parseId})
    if (deleteRestaurant.deleteCount === 0){
        throw `Couldn't delete the id`
    }
}

//update the website of the restaurant
const rename = async function rename(id, newWebsite){
    const restaurantCollection = await restaurants();
    let updateWebsite = {
        website: newWebsite
    };
    let parseId = ObjectId(id);
    const renamedWebsite = await restaurantCollection.updateOne(
        { _id: parseId },
        { $set: updateWebsite }
    );
    if (renamedWebsite.modifiedCount === 0){
        throw `Couldn't update restaurant successfully`
    }
    return await this.get(parseId);
}




module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
}