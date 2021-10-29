const connection = require('../config/mongoConnection');
const data = require('../data/');
const restaurants = data.restaurants;
const reviews = data.reviews;

async function main() {
    const db = await connection.connectToDb();
    await db.dropDatabase();

    const restaurant1 = await restaurants.create("Curry On", "Jersey City, New Jersey", "123-768-0870", "https://www.curryOnmyPlate.com", "$$$$", ["Indian", "Continental"], {dineIn: true, takeOut: true, delivery: false});
    const restaurant2 = await restaurants.create("Republic Pizza", "Jersey City, New Jersey", "123-768-0871", "https://www.republicPizza.com", "$$$", ["Indian", "Continental"], {dineIn: true, takeOut: true, delivery: false});
    const restaurant3 = await restaurants.create("The Subway", "Jersey City, New Jersey", "123-768-0872", "https://www.SubwaySurf.com", "$$", ["Indian", "Continental"], {dineIn: true, takeOut: true, delivery: false});
    await reviews.create(restaurant1._id, "bad", "anon", 2, "10/28/2021", "seating is bad at this restaurant")
    await reviews.create(restaurant1._id, "average", "anonymous", 3, "10/28/2021", "seating is bad at this restaurant")
    await reviews.create(restaurant2._id, "great", "aditya", 4, "10/28/2021", "seating is good at this restaurant")
    await reviews.create(restaurant2._id, "good", "scardyCat", 3, "10/28/2021", "seating is good at this restaurant")
    await reviews.create(restaurant2._id, "average", "prashant", 5, "10/28/2021", "seating is good at this restaurant")
    await reviews.create(restaurant3._id, "below average", "ziyang", 5, "10/28/2021", "great restaurant loved the food")
    await reviews.create(restaurant3._id, "not great", "ziyang", 4, "10/28/2021", "great restaurant loved the food")
    await connection.closeConnection();
}

main()