const getData = require("./people");
const getData2 = require("./stocks");

async function main(){
    // console.log(await getData.getPeople());
    // console.log(await getData2.getStocks());


    //Get person by Id
    
    // try{
    //   console.log(await getData.getPersonById("20035a09-3820-4f49-bb8f-d947cebee537"));
    // }catch(e){
    //     console.error(e);
    // }
    
    
    //Same Street
    
    // try{
    //   console.log(await getData.sameStreet("Sutherland", "Point"));
    // }catch(e){
    //     console.error(e);
    // }
    
    
    //manipulate ssn    

    // try{
    //   console.log(await getData.manipulateSsn('aditya'));
    // }catch(e){
    //     console.error(e);
    // }
    
    // !!!!-----Stocks questions-----!!!!
   
    //get stock by ID
    
    // try{
    //   console.log(await getData2.getStockById({}));
    // }catch(e){
    //   console.error(e);
    //     }
    //   }
   
    //get stock by ID
    
    // try{
    //   console.log(await getData2.getStockById({}));
    // }catch(e){
    //   console.error(e);
    //     }

    //get stakeholder data
    
    try{
      console.log(await getData2.listShareholders());
    }catch(e){
      console.error(e);
    }
}

main();