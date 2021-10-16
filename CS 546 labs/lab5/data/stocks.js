const axios = require('axios');

async function getStocks(){
    const { data } = await axios ('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data;
}
async function getStocksById(id){
    if(arguments.length !== 1){
        throw `ERROR!! Enter only one string parameter`
    }
    if (typeof id !== "string"){
        throw `ERROR!! The entered parameter is not of type string`;
    }
    if(id.match(/^[a-z\d]{8}[-][a-z\d]{4}[-][a-z\d]{4}[-][a-z\d]{4}[-][a-z\d]{12}$/g) === null){
        throw `ERROR!! Not a valid Id type`
    }
    let stocksData = await getStocks();
    let returnData = {};
    stocksData.forEach(fetchData => {
        if(fetchData.id === id){
            returnData = fetchData;
        }
    });
    if (Object.keys(returnData).length === 0){
        throw `ERROR!! Entered Id did not match with any of the stocks's Id`
    }
    return returnData;
}

module.exports = {
    getStocks,
    getStocksById
}