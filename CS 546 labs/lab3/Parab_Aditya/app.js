/* I pledge my honor that I have abided by the Stevens Honor System */
const getData = require("./people");
const getData2 = require("./stocks");

async function main(){

// !!!!-----people test cases-----!!!!
    //Get person by Id
    
    try{
      console.log(await getData.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
    }catch(e){
        console.error(e);
    }
    
    
    //Same Street
    
    try{
      console.log(await getData.sameStreet());
    }catch(e){
        console.error(e);
    }
    
    
    //manipulate ssn    

    try{
      console.log(await getData.manipulateSsn({}));
    }catch(e){
        console.error(e);
    }

    //Get person by date and month
    
    try{
      console.log(await getData.sameBirthday(9, 25));
    }catch(e){
        console.error(e);
    }
    
    // !!!!-----Stocks test cases-----!!!!
   
    //get stakeholder data
    
    try{
      console.log(await getData2.listShareholders());
    }catch(e){
      console.error(e);
    }

    //top shareholder
    
    try{
        console.log(await getData2.topShareholder('Aeglea BioTherapeutics, Inc.'));
      }catch(e){
        console.error(e);
    }
    

    //list stock
    
    try{
      console.log(await getData2.listStocks("Grenville", 'Pawelke'));
    }catch(e){
      console.error(e);
    }

    //get stock by ID
    
    try{
      console.log(await getData2.getStockById('b','a'));
    }catch(e){
      console.error(e);
    }

}

main();