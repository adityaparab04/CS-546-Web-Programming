const mongoCollections = require('./../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

let exportedMethods = {
    async create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions){    
        // arguments length check
        if (arguments.length !== 7) throw `Enter all the properties of a restaurant`
    
        //Error handling for name
        if(!name || typeof name !== 'string' || !name.replace(/\s/g, "").length) {
            throw `Please enter a valid input name as a string`
        }

        //Error handling for location
        if(!location || typeof location !== 'string' || !location.replace(/\s/g, "").length){
            throw `Please enter a valid input location as a string`
        }
        
        //Error handling for phoneNumber
        if(!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.replace(/\s/g, "").length){
            throw `Please enter a valid input phoneNumber as a string`
        }
        if(phoneNumber.match(/^\d{3}[-]\d{3}[-]\d{4}$/) === null){
            throw `Please enter a valid phone number`
        }
        //Error handling for website
        if(!website || typeof website !== 'string' || !website.replace(/\s/g, "").length){
            throw `Please enter a valid URL in string format`
        }
        if(website.match(/^(http:\/\/www\.|https:\/\/www\.)[a-zA-z0-9\_-]{5,}(\.com)$/g) === null){
            throw `Please enter a valid URL in string format`
        }
    
        //Error handling for priceRange
        if(!priceRange || typeof priceRange !== 'string' || !priceRange.replace(/\s/g, "").length){
            throw `Please enter a valid input priceRange as a string`
        }
        if(priceRange.match(/^[$]{1,4}$/g) === null){
            throw `Enter valid price range between $ to $$$$`
        }
    
        //Error handling for cuisines
        if(!cuisines || Array.isArray(cuisines) !== true || cuisines.length === 0 ){
            throw `Please enter cuisines as an array of atleast length 1 with valid input string`
        }
        cuisines.forEach(cuisine => {
            if(typeof cuisine != 'string' || !cuisine.replace(/\s/g, "").length) throw `enter valid string for cuisine`
        });
    
        //Error handling for serviceOptions
        if(!serviceOptions || typeof serviceOptions !== 'object' || Object.keys(serviceOptions).length !== 3){
            throw `Please enter a valid serviceOption`
        }
        if(serviceOptions.hasOwnProperty('dineIn', 'takeOut', 'delivery') !== true) {
            throw `Please enter right service options with boolean values`
        }
        if (typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean') {
            throw `enter valid key and value for serviceOptions`
        }
        let newRestaurant ={
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: []
        };
        const restaurantCollection = await restaurants();
        
        let arrayOfRestaurants = [];
        arrayOfRestaurants = await restaurantCollection.find({}).toArray();
        for (let i = 0; i < arrayOfRestaurants.length; i++){
            if(arrayOfRestaurants[i].name.toLowerCase() === newRestaurant.name.toLowerCase() && arrayOfRestaurants[i].location.toLowerCase() === newRestaurant.location.toLowerCase() && arrayOfRestaurants[i].phoneNumber === newRestaurant.phoneNumber){
                throw `Same Restaurant already added`
            }
        }
        const insertNewRestaurant = await restaurantCollection.insertOne(newRestaurant);
        if (insertNewRestaurant.insertedCount === 0){
            throw `Could not add restaurant`
        }
        const newId = insertNewRestaurant.insertedId;
        newIdStringFormat = newId.toString()
        const restaurant = await this.get(newIdStringFormat);
        return restaurant;
    },
    
    async getAll(){
        let arrayOfRestaurants = [];
        
        const restaurantCollection = await restaurants();
        arrayOfRestaurants = await restaurantCollection.find({}).toArray();
        
        let allRestaurant = [];
        arrayOfRestaurants.forEach(obj => {
            obj._id = obj._id.toString();
        });
        arrayOfRestaurants.forEach(obj => {
            let newObj = {};
            newObj._id = obj._id.toString();
            newObj.name = obj.name;
            allRestaurant.push(newObj);
        });
        if(arrayOfRestaurants.length === 0){
            throw `No restaurants in Database`
        }
        return allRestaurant;
    },

    async get(id){
        if(!id){
            throw `Please enter an id in string format`
        }
        if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw new `Entered id not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(id) === false){
            throw `Entered Id is not a valid object Id`
        }
        const restaurantCollection = await restaurants();
        let parseId = ObjectId(id)
        const restaurant = await restaurantCollection.findOne({ _id: parseId});
        if (restaurant === null){
            throw `No restaurant with that id`
        }
        restaurant._id = restaurant._id.toString();
        return restaurant;
    },
    
    async remove(id){
        if(!id){
            throw `Please enter an id in string format`
        }
        if(typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw `Entered id not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(id) === false){
            throw `Entered Id is not a valid object Id`
        }
        const restaurantCollection = await restaurants();
        let parseId = ObjectId(id);
        const deleteRestaurant = await restaurantCollection.deleteOne({_id: parseId})
        if (deleteRestaurant.deletedCount === 0){
            throw `Couldn't delete the id because it is not present in DB`
        }
        return {restaurantId: id, deleted:true};
    },
    
    async update(id, updateRestaurant){
    
        // error handling for Id
        if(!id || typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw `Please enter valid inout id as a string`
        }
        
        //Error handling for name
        if(!updateRestaurant.name || typeof updateRestaurant.name !== 'string' || !updateRestaurant.name.replace(/\s/g, "").length){
            throw `Please enter a valid input name as a string`
        } 
        
        //Error handling for location
        if(!updateRestaurant.location || typeof updateRestaurant.location !== 'string' || !updateRestaurant.location.replace(/\s/g, "").length){
            throw `Please enter a valid input location as a string`;
        }
        
        //Error handling for phoneNumber
        if(!updateRestaurant.phoneNumber || typeof updateRestaurant.phoneNumber !== 'string' || !updateRestaurant.phoneNumber.replace(/\s/g, "").length){
            throw `Please enter a valid input phoneNumber as a string`
        }
        if(updateRestaurant.phoneNumber.match(/^\d{3}[-]\d{3}[-]\d{4}$/) === null){
            throw `Please enter a valid phone number`
        }
        //Error handling for website
        if(!updateRestaurant.website || typeof updateRestaurant.website !== 'string' || !updateRestaurant.website.replace(/\s/g, "").length){
            throw `Please enter a valid URL in string format`
        }
        if(updateRestaurant.website.match(/^(http:\/\/www\.|https:\/\/www\.)[a-zA-z0-9\_-]{5,}(\.com)$/g) === null){
            throw `Please enter a valid URL in string format`
        }
    
        //Error handling for priceRange
        if(!updateRestaurant.priceRange || typeof updateRestaurant.priceRange !== 'string' || !updateRestaurant.priceRange.replace(/\s/g, "").length){
            throw `Please enter a valid input priceRange as a string`
        }
        if(updateRestaurant.priceRange.match(/^[$]{1,4}$/g) === null){
            throw `Enter valid price range between $ to $$$$`
        }
    
        //Error handling for cuisines
        if(!updateRestaurant.cuisines || Array.isArray(updateRestaurant.cuisines) !== true || updateRestaurant.cuisines.length === 0 ){
            throw `Please enter cuisines as an array of atleast length 1 with valid input string`
        }
        updateRestaurant.cuisines.forEach(cuisine => {
            if(typeof cuisine != 'string' || !cuisine.replace(/\s/g, "").length) {
                throw `enter valid a cuisine as a string`
            }
        });
    
        //Error handling for serviceOptions
        if(!updateRestaurant.serviceOptions || typeof updateRestaurant.serviceOptions !== 'object' || Object.keys(updateRestaurant.serviceOptions).length !== 3){
            throw `Please enter a valid serviceOption`
        }
        if(updateRestaurant.serviceOptions.hasOwnProperty('dineIn', 'takeOut', 'delivery') !== true) {
            throw `Please enter right service options with boolean values`
        }
        if (typeof updateRestaurant.serviceOptions.dineIn !== 'boolean' || typeof updateRestaurant.serviceOptions.takeOut !== 'boolean' || typeof updateRestaurant.serviceOptions.delivery !== 'boolean') {
            throw `enter valid key and value for serviceOptions`
        }
        const restaurantCollection = await restaurants();
        let parseId = ObjectId(id);
        let newRestaurant = {
            name: updateRestaurant.name, 
            location: updateRestaurant.location, 
            phoneNumber: updateRestaurant.phoneNumber, 
            website: updateRestaurant.website,
            priceRange: updateRestaurant.priceRange, 
            cuisines: updateRestaurant.cuisines, 
            serviceOptions: updateRestaurant.serviceOptions
        };
        const updatedRestaurant = await restaurantCollection.updateOne(
            { _id: parseId },
            { $set: newRestaurant }
        );
        if (updatedRestaurant.modifiedCount === 0){
            throw `Couldn't update the restaurant with same content`
        }
        return await this.get(id);
    }
}


module.exports = exportedMethods;