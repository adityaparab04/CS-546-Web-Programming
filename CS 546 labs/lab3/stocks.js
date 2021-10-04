const axios = require('axios');
const getData = require("./people");

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data;
}
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
  }
// get list of share holders 
const getPersonById = async function getPersonById(id){
  if (typeof id !== "string")
  {
    throw `ERROR!! The entered parameter is not of type string`;
  }
  if ( (!id.replace(/\s/g, "").length)){
    throw `ERROR!! The entered parameter only contains empty spaces`;
  }
  let data = await getPeople();

  let returnData = "False";
  
  //main logic
  data.forEach(fetchData => {
    if(fetchData.id === id){
      returnData = fetchData;
    }
  });
  if (returnData === 'False'){
    throw `ERROR!! Entered Id did not match with any of the person's Id`
  }
  return returnData;
}

const listShareholders = async function listShareholders(){
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
        // console.log(userDataStake);

        for(const shareHolderUserData of userDataStake ){ 
            // console.log(shareHolderUserData.userId);
            let userData = {};
            const data = await getPersonById(shareHolderUserData.userId);
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
    listShareholders
}