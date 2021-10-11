const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection');

async function main(){
    
    try{
        console.log(await restaurants.create(" The docks", "Mumbai City, Maharashtra", "123-456-7890", "http://www.saffronlounge.com", " ", ["Indian", "Desi"], 3, {dineIn: true, takeOut: true, delivery: false}))
    }catch(e){
        console.log("Got an error!");
        console.log(e);
    }

    // try{
    //     console.log(await restaurants.get("61636fcf00fa72816a25ae07"))
    // }catch(e){
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     const allResturants = await restaurants.getAll();
    //     console.log(allResturants);
    // }catch(error){
    //     console.log("Got an error!");
    //     console.log(error);
    // }
    
    // try{
    //     await restaurants.remove("61637610258456c5967b941b");
    //     console.log("removed restaurant successfully")
    // }catch(error){
    //     console.log("Got an error!");
    //     console.log(error);
    // }

//    try{
//         console.log(await restaurants.rename("6163586dab8c77da9452b254", "http://www.thesaffronlounge.com"));
//     }catch(error){
//         console.log("Got an error!");
//         console.log(error);
//     } 
    

    
    const db = await connection.connectToDb();
    await connection.closeConnection();
}



main()