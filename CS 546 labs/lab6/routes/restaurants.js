const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData = data.restaurants;
let { ObjectId } = require('mongodb');

//get a restaurant by id
router.get('/:id', async (req, res) => {
  if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) {
    res.status(400).json({ error: 'you must provide Id as string' });
    return;
  }
  if (ObjectId.isValid(req.params.id) === false) {
    res.status(400).json({ error: 'not a valid object ID' });
    return;
  }
  
  try {
    let restaurant = await restaurantData.get(req.params.id);
    res.json(restaurant);
  } catch (e) {
    res.status(404).json(e);
  }
});

//get all the restaurants
router.get('/', async (req, res) => {
  try {
    let restaurant = await restaurantData.getAll();
    res.json(restaurant);
  } catch (e) {
    res.status(404).json(e);;
  }
});


//create a restaurant
router.post("/", async (req, res) => {
  let restaurantInfo = req.body;
  if (!restaurantInfo) {
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  if(!restaurantInfo.name || typeof restaurantInfo.name !== 'string' || !restaurantInfo.name.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide name as a valid string' });
    return;
  }
  if(!restaurantInfo.location || typeof restaurantInfo.location !== 'string' || !restaurantInfo.location.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide location as a valid string' });
    return;
  }
  if(!restaurantInfo.phoneNumber || typeof restaurantInfo.phoneNumber !== 'string' || !restaurantInfo.phoneNumber.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide phoneNumber as a valid string' });
    return;
  }
  if(!restaurantInfo.phoneNumber.match(/^\d{3}[-]\d{3}[-]\d{4}$/)){
    res.status(400).json({ error: 'Please enter a valid phone number' });
    return;
  }
  if(!restaurantInfo.website || typeof restaurantInfo.website !== 'string' || !restaurantInfo.website.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide website as a valid string' });
    return;
  }
  if(restaurantInfo.website.match(/^(http:\/\/www\.|https:\/\/www\.)[a-zA-z0-9\_-]{5,}(\.com)$/g) === null){
    res.status(400).json({ error: 'You must provide website as a valid string' });
    return;
  }
  if(!restaurantInfo.priceRange || typeof restaurantInfo.priceRange !== 'string' || !restaurantInfo.priceRange.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide price range to create a restaurant' });
    return;
  }
  if(restaurantInfo.priceRange.match(/^[$]{1,4}$/g) === null){
    res.status(400).json({ error: 'You must provide correct price range to create a restaurant' });
    return;
  }
  restaurantInfo.cuisines.forEach(cuisine => {
    if(typeof cuisine != 'string' || !cuisine.replace(/\s/g, "").length) {
      res.status(400).json({ error: 'Please enter valid string for cuisine' });
    return;
    }
  });
  if(!restaurantInfo.cuisines || Array.isArray(restaurantInfo.cuisines) !== true || !restaurantInfo.cuisines.length === 0){
    res.status(400).json({ error: 'Please enter cuisines as an array of atleast length 1 with valid input string' });
    return;
  }
  if(!restaurantInfo.serviceOptions || typeof restaurantInfo.serviceOptions !== 'object' || Object.keys(restaurantInfo.serviceOptions).length !== 3){
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  if(restaurantInfo.serviceOptions.hasOwnProperty('dineIn', 'takeOut', 'delivery') !== true) {
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  if (typeof restaurantInfo.serviceOptions.dineIn !== 'boolean' || typeof restaurantInfo.serviceOptions.takeOut !== 'boolean' || typeof restaurantInfo.serviceOptions.delivery !== 'boolean') {
    res.status(400).json({ error: 'enter valid key and value for serviceOptions' });
    return;
  }
  try {
    const newRestaurant = await restaurantData.create(
      restaurantInfo.name,
      restaurantInfo.location,
      restaurantInfo.phoneNumber,
      restaurantInfo.website,
      restaurantInfo.priceRange,
      restaurantInfo.cuisines,
      restaurantInfo.serviceOptions
    );
    res.json(newRestaurant);
  } catch (e) {
    res.status(404).json(e);
  }
});

//delete a restaurant
router.delete('/:id', async (req, res) =>{
  if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) {
    res.status(400).json({ error: 'you must provide Id as string' });
    return;
  }
  if (ObjectId.isValid(req.params.id) === false) {
    res.status(400).json({ error: 'not a valid object ID' });
    return;
  }
  try {
    let restaurantsData = await restaurantData.remove(req.params.id);
    res.json(restaurantsData);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.put('/:id', async (req,res) => {
  let restaurantInfo = req.body;
  if (!restaurantInfo) {
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  if(!restaurantInfo.name || typeof restaurantInfo.name !== 'string' || !restaurantInfo.name.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide name as a valid string' });
    return;
  }
  if(!restaurantInfo.location || typeof restaurantInfo.location !== 'string' || !restaurantInfo.location.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide location as a valid string' });
    return;
  }
  if(!restaurantInfo.phoneNumber || typeof restaurantInfo.phoneNumber !== 'string' || !restaurantInfo.phoneNumber.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide phoneNumber as a valid string' });
    return;
  }
  if(!restaurantInfo.phoneNumber.match(/^\d{3}[-]\d{3}[-]\d{4}$/)){
    res.status(400).json({ error: 'Please enter a valid phone number' });
    return;
  }
  if(!restaurantInfo.website || typeof restaurantInfo.website !== 'string' || !restaurantInfo.website.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide website as a valid string' });
    return;
  }
  if(restaurantInfo.website.match(/^(http:\/\/www\.|https:\/\/www\.)[a-zA-z0-9\_-]{5,}(\.com)$/g) === null){
    res.status(400).json({ error: 'You must provide website as a valid string' });
    return;
  }
  if(!restaurantInfo.priceRange || typeof restaurantInfo.priceRange !== 'string' || !restaurantInfo.priceRange.replace(/\s/g, "").length){
    res.status(400).json({ error: 'You must provide price range to create a restaurant' });
    return;
  }
  if(restaurantInfo.priceRange.match(/^[$]{1,4}$/g) === null){
    res.status(400).json({ error: 'You must provide correct price range to create a restaurant' });
    return;
  }
  restaurantInfo.cuisines.forEach(cuisine => {
    if(typeof cuisine != 'string' || !cuisine.replace(/\s/g, "").length) {
      res.status(400).json({ error: 'Please enter valid string for cuisine' });
    return;
    }
  });
  if(!restaurantInfo.cuisines || Array.isArray(restaurantInfo.cuisines) !== true || !restaurantInfo.cuisines.length === 0){
    res.status(400).json({ error: 'Please enter cuisines as an array of atleast length 1 with valid input string' });
    return;
  }
  if(!restaurantInfo.serviceOptions || typeof restaurantInfo.serviceOptions !== 'object' || Object.keys(restaurantInfo.serviceOptions).length !== 3){
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  if(restaurantInfo.serviceOptions.hasOwnProperty('dineIn', 'takeOut', 'delivery') !== true) {
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  if (typeof restaurantInfo.serviceOptions.dineIn !== 'boolean' || typeof restaurantInfo.serviceOptions.takeOut !== 'boolean' || typeof restaurantInfo.serviceOptions.delivery !== 'boolean') {
    res.status(400).json({ error: 'enter valid key and value for serviceOptions' });
    return;
  }
  try {
    const updateRestaurant = await restaurantData.update(req.params.id, restaurantInfo);
    res.json(updateRestaurant);
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;