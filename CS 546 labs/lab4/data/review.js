const mongoCollections = require('./../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const resto = require('./restaurants');
let { ObjectId } = require('mongodb');

let exportedMethods = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
        let reviewDate = new Date(dateOfReview);
        let todaysDate = new Date();
        let reviewMonth = reviewDate.getMonth();
        let thisMonth = todaysDate.getMonth();
        if( todaysDate.getDate() !== reviewDate.getDate() || reviewMonth !== thisMonth || todaysDate.getFullYear() !== reviewDate.getFullYear()) throw `enter today's date`
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
        

        const reviewAdded = await restaurantCollection.updateOne(
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
        let arrayOfReviews = [];
        const restaurantCollection = await restaurants();
        
        let parseId = ObjectId(restaurantId);
        const restaurant = await restaurantCollection.findOne({ _id: parseId});
        arrayOfReviews = restaurant.reviews;
        arrayOfReviews.forEach(obj => {
            obj._id = obj._id.toString();
        });
        return arrayOfReviews
    },
    async get(reviewId){
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
        const restaurantCollection = await restaurants();
        let parseId = ObjectId(reviewId);
        let restaurantUpdate = await restaurantCollection.findOne({reviews: { $elemMatch: {_id: parseId}}});
        let restaurantID = restaurantUpdate._id
        const removeReview = await restaurantCollection.updateOne(
            { _id: restaurantUpdate._id},
            { $pull: { reviews: {_id: parseId}}
        });
        if (removeReview.deletedCount === 0){
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
            { _id: parseId },
            { $set: {overallRating: average }}
        );
        return {reviewId: reviewId , deleted: true}
    }
}

module.exports = exportedMethods;