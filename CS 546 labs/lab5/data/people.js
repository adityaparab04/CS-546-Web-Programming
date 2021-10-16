const axios = require('axios')

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}
async function getPeopleById(id){ 
    if(arguments.length !== 1){
        throw `ERROR!! Enter only one string parameter`;
    }
    if (typeof id !== "string"){
        throw `ERROR!! The entered parameter is not of type string`;
    }
    if(id.match(/^[a-z\d]{8}[-][a-z\d]{4}[-][a-z\d]{4}[-][a-z\d]{4}[-][a-z\d]{12}$/g) === null){
        throw `ERROR!! Not a valid Id type`
    }
    let peopleData = await getPeople();
    let returnData = {};
    peopleData.forEach(fetchData => {
        if(fetchData.id === id){
          returnData = fetchData;
        }
    });
    if (Object.keys(returnData).length === 0){
        throw `ERROR!! Entered Id did not match with any of the people's Id`;
    }
    return returnData;
}

module.exports = {
    getPeople,
    getPeopleById
}