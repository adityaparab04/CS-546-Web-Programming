const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
let { ObjectId } = require('mongodb');

//get review of a particular restaurant
router.get('/:restaurantId', async (req, res) => {
  if (!req.params.restaurantId || typeof req.params.restaurantId !== 'string' || !req.params.restaurantId.replace(/\s/g, "").length) {
    res.status(400).json({ error: 'you must provide Id as string' });
    return;
  }
  if (ObjectId.isValid(req.params.restaurantId) === false) {
    res.status(400).json({ error: 'not a valid object ID' });
    return;
  }
  try {
    let getRestaurantreviews = await reviewData.getAll(req.params.restaurantId);
    res.json(getRestaurantreviews);
  } catch (e) {
    res.status(404).json(e);
  }
});

//create a review router
  router.post("/:restaurantId", async (req, res) => {
    const reviewInfo = req.body;
    if (!reviewInfo) {
      res.status(400).json({ error: 'You must provide data to create a review' });
      return;
    }
    if(!reviewInfo.title || typeof reviewInfo.title !== 'string' || !reviewInfo.title.replace(/\s/g, "").length){
      res.status(400).json({ error: 'You must provide title as a valid string' });
      return;
    }
    if(!reviewInfo.reviewer || typeof reviewInfo.reviewer !== 'string' || !reviewInfo.reviewer.replace(/\s/g, "").length){
      res.status(400).json({ error: 'You must provide reviewer as a valid string' });
      return;
    }
    if(!reviewInfo.rating || typeof reviewInfo.rating !== 'number' || reviewInfo.rating < 1 || reviewInfo.rating > 5){
      res.status(400).json({ error: 'You must provide rating as a valid number bewteen 1 to 5' });
      return;
    }
    if(!reviewInfo.dateOfReview || typeof reviewInfo.dateOfReview !== 'string' || !reviewInfo.dateOfReview.replace(/\s/g, "").length) {
      res.status(400).json({ error: 'You must provide rating as a valid number bewteen 1 to 5' });
      return;
    }
    let reviewDate = new Date(reviewInfo.dateOfReview);
    let todaysDate = new Date();
    let reviewMonth = reviewDate.getMonth();
    let thisMonth = todaysDate.getMonth();
    if( todaysDate.getDate() !== reviewDate.getDate() || reviewMonth !== thisMonth || todaysDate.getFullYear() !== reviewDate.getFullYear()) {
      res.status(400).json({ error: 'You must todays date' });
      return;
    }
    if(!reviewInfo.review || typeof reviewInfo.review !== 'string' || !reviewInfo.review.replace(/\s/g, "").length) {
      res.status(400).json({ error: 'You must enter valid review as a string' });
      return;
  }
    try {
      const newReview = await reviewData.create(req.params.restaurantId,
        reviewInfo.title,
        reviewInfo.reviewer,
        reviewInfo.rating,
        reviewInfo.dateOfReview,
        reviewInfo.review,
      );
      res.json(newReview);
    } catch (e) {
      res.status(404).json(e);
    }
  });
  
  //get by review id router
  router.get('/review/:reviewId', async (req, res) => {
    if (!req.params.reviewId || typeof req.params.reviewId !== 'string' || !req.params.reviewId.replace(/\s/g, "").length) {
      res.status(400).json({ error: 'you must provide Id as string' });
      return;
    }
    if (ObjectId.isValid(req.params.reviewId) === false) {
      res.status(400).json({ error: 'not a valid object ID' });
      return;
    }
    try {
      let getThatreview = await reviewData.get(req.params.reviewId);
      res.json(getThatreview);
    } catch (e) {
      res.json(e);;
    }
  });
  
  //delete review router
  router.delete('/:reviewId', async (req, res) =>{
    if (!req.params.reviewId || typeof req.params.reviewId !== 'string' || !req.params.reviewId.replace(/\s/g, "").length) {
      res.status(400).json({ error: 'you must provide Id as string' });
      return;
    }
    if (ObjectId.isValid(req.params.reviewId) === false) {
      res.status(400).json({ error: 'not a valid object ID' });
      return;
    }
    try {
      let removeReview = await reviewData.remove(req.params.reviewId);
      res.json(removeReview);
    } catch (e) {
      res.status(404).json({error: 'review Id not present in Db or already deleted'});
    }
  });

module.exports = router;