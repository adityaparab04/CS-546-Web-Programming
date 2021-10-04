const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
  }
// Find person by ID  
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

//Find person by same Street Function
const sameStreet = async function sameStreet(streetName, streetSuffix){
  let data = await getPeople();
  
  if(typeof streetName !== 'string'){
    throw  `ERROR!! Entered streetName parameter is not a string input`
  }
  
  if(typeof streetSuffix !== 'string'){
    throw `ERROR!! Entered streetSuffix parameter is not string input`
  }
  
  if(streetName === undefined || streetName === null){
    throw  `ERROR!! Only streeSuffix parameter is entered but streetName missing`
  }
  
  if(streetSuffix === undefined || streetSuffix === null){
    throw `ERROR!! Only streeName parameter is entered but streetSuffix missing`
  }
  
  if ( (!streetName.replace(/\s/g, "").length)){
    throw "ERROR!! Entered streetName parameter only contains empty spaces";
  }

  if ( (!streetSuffix.replace(/\s/g, "").length)){
    throw "ERROR!! Entered streetSuffix parameter only contains empty spaces";
  }


  let peopleWithCommonStreetName = [];
  let i=0;
  data.forEach(fetchData => {

    if(fetchData.address.home.street_name.toLowerCase() === streetName.toLowerCase() && fetchData.address.home.street_suffix.toLowerCase() === streetSuffix.toLowerCase()){
      peopleWithCommonStreetName[i] = fetchData;
      i=i+1;
    }
    if(fetchData.address.work.street_name.toLowerCase() === streetName.toLowerCase() && fetchData.address.work.street_suffix.toLowerCase() === streetSuffix.toLowerCase()){
      peopleWithCommonStreetName[i] = fetchData;
      i=i+1;
    }
    
  });
  if (peopleWithCommonStreetName.length === 0){
    throw `ERROR!! Invalid streetName and streetSuffix`
  }
  if (peopleWithCommonStreetName.length === 1){
    throw `ERROR!! Only one person lives or works there... `
  }
  return peopleWithCommonStreetName;
}

//manipulate ssn
const manipulateSsn = async function manipulateSsn(){

  if(arguments.length === 1){
    throw `argument should not be passed`
  }
  
  let data = await getPeople();
  let newSSN = '';
  let arrSSN = [];
  let highestSSN = {};
  let lowestSSN = {};
  let highSSN=0;
  let lowSSN=0;
  let avg = 0;
  let i = 0;
  let output={};
  data.forEach(convertSSN => {
    newSSN = convertSSN.ssn.replace("-","");
    newSSN = newSSN.replace('-', "");
    arrSSN = newSSN.split('');
    arrSSN.sort();
    // console.log(i);
    convertSSN.ssn = arrSSN.join('');
    if(i === 0){
      highestSSN.firstName = convertSSN.first_name;
      highestSSN.lastName = convertSSN.last_name;
      lowestSSN.firstName = convertSSN.first_name;
      lowestSSN.lastName = convertSSN.last_name;
      highSSN=convertSSN.ssn;
      lowSSN=convertSSN.ssn;
    }
    if(lowSSN>convertSSN.ssn){
      lowestSSN.firstName = convertSSN.first_name;
      lowestSSN.lastName = convertSSN.last_name;
      lowSSN=convertSSN.ssn
    }
    if(highSSN<convertSSN.ssn){
      highestSSN.firstName = convertSSN.first_name;
      highestSSN.lastName = convertSSN.last_name;
      highSSN=convertSSN.ssn;
    }
    avg=avg+Number(convertSSN.ssn);
    i=i+1;
    
  });
  avg=avg/i;
  output.highest=highestSSN;
  output.lowest=lowestSSN;
  output.average=Math.floor(avg);
  return output;
}

//sameBirthday(month, day)

const sameBirthday = async function sameBirthday(month, day){
  let result = [];
  let i =0;
  if(typeof month === 'object' || typeof month === 'array'){
    throw `Input type invalid`
  }
  if(typeof day === 'object' || typeof day === 'array'){
    throw `Input type invalid`
  }
  if(typeof month === 'string'){
    month = parseInt(month);
    if(typeof month === NaN){
      throw `Month cannot be parsed into a number`
    }
  }
  if(typeof day === 'string'){
    day = parseInt(day);
    if(typeof day !== NaN){
      throw `Day cannot be parsed into a number`
    }
  }
  if(month>0 && month<13){
    if(month === 2 && day>28){
      throw `February cannot have more than 28 days`
    }
    else if((month === 4 || month === 6 || month === 9 || month === 11)&& day>30){
      throw `invalid day`
    }
    else{
      let data = await getPeople();
      data.forEach(peopleData => {
        let date = [];
        date = peopleData.date_of_birth.split("/");
        // console.log(date);
        if(parseInt(date[0]) === month && parseInt(date[1]) === day){
          let userName= peopleData.first_name+" "+peopleData.last_name;
          result[i]=userName;
          i=i+1;
        }
      });
    }
  }
  else{
    throw `invalid month`
  }
  return result;
}


module.exports = {
    getPeople,
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
}
