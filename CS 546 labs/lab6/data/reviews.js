const mongoCollections = require('./../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const resto = require('./restaurants');
let { ObjectId } = require('mongodb');

let exportedMethods = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
        if (arguments.length !== 6) throw `Enter all the properties of a restaurant`
        //error handling for title
        if(!title || typeof title !== 'string' || !title.replace(/\s/g, "").length) {
            throw `Please enter a valid input title as a string`
        }
        //error handling for reviewer
        if(!reviewer || typeof reviewer !== 'string' || !reviewer.replace(/\s/g, "").length) {
            throw `Please enter a valid input reviewer as a string`
        }
        //error handling for rating
        if(!rating || typeof rating !== 'number'|| rating < 1 || rating > 5) {
            throw `Please enter a valid input rating between 1 to 5`
        }
        //error handling for dateOfReview
        if(!dateOfReview || typeof dateOfReview !== 'string' || !dateOfReview.replace(/\s/g, "").length) {
            throw `Please enter a valid input dateOfReview as a string`
        }
        let reviewDate = new Date(dateOfReview);
        let todaysDate = new Date();
        let reviewMonth = reviewDate.getMonth();
        let thisMonth = todaysDate.getMonth();
        if( todaysDate.getDate() !== reviewDate.getDate() || reviewMonth !== thisMonth || todaysDate.getFullYear() !== reviewDate.getFullYear()) {
            throw `enter today's date`
        }
        //error handling for review
        if(!review || typeof review !== 'string' || !review.replace(/\s/g, "").length) {
            throw `Please enter a valid input review as a string`
        }
        const restaurantCollection = await restaurants();
        let parseId = ObjectId(restaurantId);
        let newReview = {
                _id: new ObjectId(),
                title: title, 
                reviewer: reviewer, 
                rating:rating, 
                dateOfReview: dateOfReview,
                review: review
        };
        let reviewAdded = await restaurantCollection.updateOne(
            { _id: parseId },
            { $push: {reviews: newReview }
        });
        if (reviewAdded.modifiedCount === 0){
            throw `Couldn't add the review restaurant, Id not found`
        }
        let thisRestaurant = await restaurantCollection.findOne({_id: parseId});
        let reviewArray = thisRestaurant.reviews;
        let ratingArray =[]
        let sum = 0;
        let average = 0;
        reviewArray.forEach(ratingVal => {
            ratingArray.push(ratingVal.rating);
        });
        for(i = 0; i < ratingArray.length; i++){
            sum += ratingArray[i]
            average = sum/ratingArray.length
        }
        await restaurantCollection.updateOne(
            { _id: parseId },
            { $set: {overallRating: average }}
        );
        return await resto.get(restaurantId)
    },
    
    async getAll(restaurantId){
        if(!restaurantId){
            throw `Please enter an id in string format`
        }
        if(typeof restaurantId !== 'string' || !restaurantId.replace(/\s/g, "").length){
            throw new `Entered id not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(restaurantId) === false){
            throw `Entered restaurantId is not a valid object Id`
        }
        let arrayOfReviews = [];
        const restaurantCollection = await restaurants();
        
        let parseId = ObjectId(restaurantId);
        const restaurant = await restaurantCollection.findOne({ _id: parseId});
        if (restaurant === null) throw `restaurant not present in DB`
        arrayOfReviews = restaurant.reviews;
        arrayOfReviews.forEach(obj => {
            obj._id = obj._id.toString();
        });
        return arrayOfReviews
    },
    async get(reviewId){
        if(!reviewId){
            throw `Please enter an reviewId in string format`
        }
        if(typeof reviewId !== 'string' || !reviewId.replace(/\s/g, "").length){
            throw `Entered reviewId not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(reviewId) === false){
            throw `Entered reviewId is not a valid object Id`
        }
        const restaurantCollection = await restaurants();
        let parseId = ObjectId(reviewId);
        let findReview = []
        let review = await restaurantCollection.findOne({reviews: { $elemMatch: {_id: parseId}}});
        if(review === null) throw `review not present`
        review = review.reviews;
        review.forEach(obj => {
            if(obj._id.toString() === reviewId ){    
                findReview = obj;
                findReview._id = findReview._id.toString();
            }   
        });
        return findReview;
    },
    async remove(reviewId){
        if(!reviewId){
            throw `Please enter an reviewId in string format`
        }
        if(typeof reviewId !== 'string' || !reviewId.replace(/\s/g, "").length){
            throw `Entered reviewId not in string format or contains blank spaces only`
        }
        if(ObjectId.isValid(reviewId) === false){
            throw `Entered reviewId is not a valid object Id`
        }
        const restaurantCollection = await restaurants();
        let parseId = ObjectId(reviewId);
        let restaurantUpdate = await restaurantCollection.findOne({reviews: { $elemMatch: {_id: parseId}}});
        let restaurantID = restaurantUpdate._id
        const removeReview = await restaurantCollection.updateOne(
            { _id: restaurantUpdate._id},
            { $pull: { reviews: {_id: parseId}}
        });
        if (removeReview.modifiedCount === 0){
            throw `Couldn't delete the id because it is not present in DB`
        }
        let thisRestaurant = await restaurantCollection.findOne({_id: restaurantID});
        let reviewArray = thisRestaurant.reviews;
        let ratingArray =[]
        let sum = 0;
        let average = 0;
        reviewArray.forEach(ratingVal => {
            ratingArray.push(ratingVal.rating);
        });
        for(i = 0; i < ratingArray.length; i++){
            sum += ratingArray[i]
            average = sum/ratingArray.length
        }
        await restaurantCollection.updateOne(
            { _id: restaurantID },
            { $set: {overallRating: average }}
        );
        return {reviewId: reviewId , deleted: true}
    }

}

module.exports = exportedMethods;