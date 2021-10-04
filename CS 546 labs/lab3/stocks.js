const axios = require('axios');
const getData = require("./people");

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data;
}
// async function getPeople(){
//     const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
//     return data;
//   }

// // get list of share holders 

// const getPersonById = async function getPersonById(id){
//   if (typeof id !== "string")
//   {
//     throw `ERROR!! The entered parameter is not of type string`;
//   }
//   if ( (!id.replace(/\s/g, "").length)){
//     throw `ERROR!! The entered parameter only contains empty spaces`;
//   }
//   let data = await getPeople();

//   let returnData = "False";
  
//   //main logic
//   data.forEach(fetchData => {
//     if(fetchData.id === id){
//       returnData = fetchData;
//     }
//   });
//   if (returnData === 'False'){
//     throw `ERROR!! Entered Id did not match with any of the person's Id`
//   }
//   return returnData;
// }

const listShareholders = async function listShareholders(){
    if(arguments.length === 1){
        throw `argument should not be passed`
      }
    let shareHolderData = await getStocks()
    let result = [];
    let i = 0;
   
    for(const data of shareHolderData){
        let newStakeholderData = {};
        let peopleData = [];
        let j=0;
        newStakeholderData.id = data.id;
        newStakeholderData.stock_name = data.stock_name;
        let userDataStake = data.shareholders;

        for(const shareHolderUserData of userDataStake ){ 
            // console.log(shareHolderUserData.userId);
            let userData = {};
            const data = await getData.getPersonById(shareHolderUserData.userId);
            userData.first_name = data.first_name;

            userData.last_name = data.last_name;
        
            userData.number_of_shares = shareHolderUserData.number_of_shares;
            
            peopleData[j] = userData;
            j= j+1;
            console.log(userData);

        };

        newStakeholderData.shareholders = peopleData;
        result[i] = newStakeholderData;
        i = i+1;
    };
    return result;
}


//topShareholder(stockName)

const topShareholder = async function topShareholder(stockName){
    let shareHolderData = await getStocks();
    let maxStock = 0;
    let maxStockUserId = 'Null';
    for(const data of shareHolderData){
        if(data.stock_name === stockName){
            for(const stockHolder of data.shareholders){
                if(stockHolder.number_of_shares > maxStock){
                    maxStock = stockHolder.number_of_shares;
                    maxStockUserId = stockHolder.userId;
                }
            }
        }
    }
    const person = await getData.getPersonById(maxStockUserId);
    let result = "";
    if(maxStock > 0){
        result = `With ${maxStock} shares in ${stockName}, ${person.first_name} ${person.last_name} is the top shareholder.`
    }
    else{
        result = `${stockName} currently has no shareholders.`
    }
    return result;
}

// list stocks
const listStocks = async function listStocks(firstName, lastName){
    let result = [];
    let peopleData = await getData.getPeople()
    let userId = "0";
    peopleData.forEach(people => {
        if(people.first_name === firstName && people.last_name === lastName){
            userId = people.id;
        }
    });
    if(userId !== "0"){
        let shareHolderData = await getStocks();
        
        let i=0;
        shareHolderData.forEach(stockData => {

            stockData.shareholders.forEach(data => {
                if(data.userId === userId){
                    let subResult = {};
                    subResult.stock_name = stockData.stock_name;
                    subResult.number_of_shares = data.number_of_shares;
                    result[i]=subResult;
                    i=i+1;
                }
            });
        });
    }
    else{
        throw `user not found`
    }
    
    return result;
}

//get stock by ID

const getStockById = async function getStockById(id){
    if (typeof id !== "string")
    {
    throw `ERROR!! The entered parameter is not of type string`;
    }
    if ( (!id.replace(/\s/g, "").length)){
    throw `ERROR!! The entered parameter only contains empty spaces`;
     }
    let data = await getStocks();
    let fetchStockData = "False";
    
    //main logic
    data.forEach(stockId => {
    if(stockId.id === id){
        fetchStockData = stockId;
    }        
    });
    if (fetchStockData === 'False'){
        throw `ERROR!! Stock not found`
      }
      return fetchStockData;
}

module.exports = {
    getStocks,
    getStockById,
    listShareholders,
    topShareholder,
    listStocks
}