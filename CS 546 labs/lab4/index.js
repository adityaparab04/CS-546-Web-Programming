const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection');

async function main(){
    // //create a restaurant and log
        const test1 = await restaurants.create("Robin", "Jersey City, New Jersey", "123-768-0870", "https://www.curryOnmyPlate.com", "$$$", ["Indian", "Continental"], 5, {dineIn: true, takeOut: true, delivery: false})
        const test2 = await restaurants.get(test1._id)
        console.log(test2)

    //create another restaurant
        const test3 = await restaurants.create("Chef Of India", "Jersey City, New Jersey", "123-786-9870", "https://www.ChefOfIndia.com", "$$$", ["Indian", "Desi"], 5, {dineIn: true, takeOut: true, delivery: true})

    //log all restaurants
        const test4 = await restaurants.getAll();
        console.log(test4)

    //create third restaurant and log
        const test5 = await restaurants.create("Republic Pizza", "Hoboken, New Jersey", "214-768-0870", "https://www.PizzaRepublic.com", "$$", ["Italian"], 5, {dineIn: true, takeOut: false, delivery: false})
        const test6 = await restaurants.get(test5._id)
        console.log(test6)

    //Rename the first restaurant website and log
        const test7 = await restaurants.rename(test1._id, "http://www.KurryOn.com");
        const test8 = await restaurants.get(test7._id)
        console.log(test8)
    
    //Remove 2nd restaurant
        const test9 = await restaurants.remove(test3._id);

    //query all restaurants and log them
        const test10 = await restaurants.getAll()
        console.log(test10)

    //Try to create a restaurant with bad input parameters to make sure it throws errors
    try {
        const test11 = await restaurants.create("Curry On", "Jersey heights, New Jersey", "123-768-0870", "htt://www.curryOnmyPlate.com", "$$$", ["Indian", "Continental"], 5, {dineIn: true, takeOut: true, delivery: false});
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //Try to remove a restaurant that does not exist to make sure it throws errors.
    try {
        const test12 = await restaurants.remove(test3._id);
    } catch(e) {
        console.log("Got another error!");
        console.log(e);
    }

    //Try to rename a restaurant that does not exist to make sure it throws errors.
    try {
        const test13 = await restaurants.remove(test3._id);
    } catch(e) {
        console.log("Got one more error!");
        console.log(e);
    }

    //Try to rename a restaurant passing in invalid data for the parameter to make sure it throws errors.
    try {
        const test14 = await restaurants.rename(test3._id, "http://www.testingtofail.com");
    } catch(e) {
        console.log("Got more errors!");
        console.log(e);
    }

    //Try getting a restaurant by ID that does not exist to make sure it throws errors.
    try {
        const test15 = await restaurants.get("8982398432");
    } catch(e) {
        console.log("Got many more errors!");
        console.log(e);
    }
    
    const db = await connection.connectToDb();
    await connection.closeConnection();
}



main()