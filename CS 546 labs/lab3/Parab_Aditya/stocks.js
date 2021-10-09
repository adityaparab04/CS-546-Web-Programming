/* I pledge my honor that I have abided by the Stevens Honor System */
const axios = require('axios');
const getData = require("./people");

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data;
}

// list all shareholders
const listShareholders = async function listShareholders(){
    if(arguments.length >= 1){
        throw `ERROR!! argument should not be passed`
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

//topShareholder function
const topShareholder = async function topShareholder(stockName){
    
    if(typeof stockName !=='string'){
        throw `ERROR!! Input parameter not a string type`
    }
    if ( (!stockName.replace(/\s/g, "").length)){
        throw "ERROR!! Entered Stock name parameter only contains empty spaces";
    }
    
    let shareHolderData = await getStocks();
    let maxStock = 0;
    let maxStockUserId = 'Null';
    let test = []
    for (const a of shareHolderData){
        if(a.stock_name === stockName){
            test = stockName;
        }
    }
    if(test.length === 0){
        throw `Stock not found`
    }
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
    
    let result = "";
    if(maxStock > 0){
        const person = await getData.getPersonById(maxStockUserId);
        result = `With ${maxStock} shares in ${stockName}, ${person.first_name} ${person.last_name} is the top shareholder.`
    }
    else{
        result = `${stockName} currently has no shareholders.`
    }
    return result;
}

// list stocks of persons
const listStocks = async function listStocks(firstName, lastName){
    let result = [];
    let peopleData = await getData.getPeople()
    let userId = "0";
    if(arguments.length !== 2){
        throw `ERROR!! Enter two string parameter`
      }

    if(typeof firstName !== 'string'){
        throw `ERROR!! First name is not a string`
    }
    
    if(typeof lastName !== 'string'){
        throw `ERROR!! Last name is not a string`
    }
    
    if ( (!firstName.replace(/\s/g, "").length)){
        throw "ERROR!! Entered firstName parameter only contains empty spaces";
    }
    
    if ( (!lastName.replace(/\s/g, "").length)){
    throw "ERROR!! Entered lastName parameter only contains empty spaces";
    }
    
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
    if(result.length === 0){
        throw `ERROR!! Person does not have any shares in at least one company`
    }
    
    return result;
}

//Fetch stock by ID
const getStockById = async function getStockById(id){
    if(arguments.length !== 1){
        throw `ERROR!! Enter only one string input`
    }
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