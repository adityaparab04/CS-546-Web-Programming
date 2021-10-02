/* I pledge my honor that I have abided by the Stevens Honor System */
//average function
const average = function average(arrays) {
    if (Array.isArray(arrays) !== true) { //throws error if an array is not an array
      throw "Input not in an array format";
    }
    if (arrays.length == 0) throw " Array is empty"; //throws error if an array is empty
    for (i in arrays) {
      if (arrays[i].length === 0 || typeof i == "undefined") throw "One of Array element is empty" //throws error if there are only one element in an array
    }
    if (!Array.isArray(arrays[0])) throw "Input is single dimension array and not array of arrays" //throws error if there is only single dimension array
  
    let arr = arrays.flat();
    for (i in arr) {
      if (typeof arr[i] == "string") throw "String should not be present in array" //throws error if string is present in an array
    }
    let sum = 0;
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      sum = sum + arr[i];
      count += 1
    }
    return Math.round(sum / count);
  }

//mode square function
const modeSquared = function modeSquared(array) {
    if (Array.isArray(array) !== true) {
      throw "Input is not an array";
    }
    if (array.length == 0 || typeof array === undefined) throw "Array is empty"
    for (i = 0; i <= array.length; i++) {
      if (typeof array[i] == "string") throw "Array contains String element"
    }
    let u = 0;
    for (i = 0; i <= array.length; i++) {
      for (j = i + 1; j <= array.length; j++) {
        if (array[i] == array[j]) {
          u++;
          break;
        }
      }
    }
    if (u == 0) return 0
    let mode = {};
    let max = 0;
    let count = 0;
    let newArray = [];
    array.forEach((element) => {
      if (mode[element]) {
        mode[element]++;
      } else {
        mode[element] = 1;
      }
      if (count < mode[element]) {
        max = element;
  
        count = mode[element];
      }
      if (array.length == 1) {
        return 0;
      }
    });

    for (element in mode) {
      if (mode[element] >= count) {
        newArray.push([element]);
      }
    }
    let sum = 0;
    newArray.forEach((e) => {
      sum = sum + Math.pow(e, 2);
    });
    return sum;
}

//medianElement function
const medianElement = function medianElement(array){
    if(Array.isArray(array) !== true) throw "Input not in an array format";
    if (array.length == 0) throw " Array does not contain any elements"
    for(i in array){
        if (typeof array[i] == 'string') throw "Input can only be in numbers not in string"
    }
        let objmedian = {};
        let arr = [];

        for (let i=0; i<=array.length; i++){
            arr[i] = array[i];
        }
        array = array.sort(function (a, b) {
          return a - b;
        });
      
        let length = array.length;
      
        if (length % 2 == 1) {
          let ans1 = array[array.length / 2 - 0.5];
          objmedian[ans1] = arr.indexOf(ans1);
          return objmedian;
        } else {
          let ans2 = (array[array.length / 2] + array[array.length / 2 - 1]) / 2;
          objmedian[ans2] = arr.indexOf(array[array.length / 2]);
          return objmedian;
        }
    }
//mergeArrays
const merge = function merge(arrayOne, arrayTwo) {
    //check if input is array
    // check if len is more than 0 
    // each ele is char or number 
    // sort -> characters lowercase to uppercase then numbers
    if (!Array.isArray(arrayOne) || (!Array.isArray(arrayTwo))) {
        throw "Input is not an array";
      }
      if (arrayOne.length === 0 || arrayTwo.length === 0) {
        throw " Array  is empty";
      }
    for (i = 0; i < arrayOne.length; i++) {
      if(typeof arrayOne[i]  === 'string'){
        if(arrayOne[i].length === 1){
            if((arrayOne[i] >= 'a' && arrayOne[i] <= 'z') || (arrayOne[i] >= 'A' && arrayOne[i] <= 'Z')){continue;}
        }else throw "Not a valid input"; 
      }else if(typeof arrayOne[i] === 'number'){
        {continue;}
      }else{
        throw "Not a valid input";
      }
    }

    for (i = 0; i < arrayTwo.length; i++) {
        if(typeof arrayTwo[i]  === 'string'){
            if(arrayTwo[i].length === 1){
                if((arrayTwo[i] >= 'a' && arrayTwo[i] <= 'z') || (arrayTwo[i] >= 'A' && arrayTwo[i] <= 'Z')){continue;}
            }else throw "Not a valid input"; 
        }else if(typeof arrayTwo[i] === 'number'){
            {continue;}
        }else{
            throw "Not a valid input";
        }
      }

    arr = arrayOne.concat(arrayTwo);
    let specialChars = ['<','>','@','!','#','$','%','^','&','*','(',')','_','+','[',']','{','}','?',':',';','|','/','~','`','-','=', '"', "'",'1','2','3','4','5','6','7','8','9','0' ];
    for(let j = 0; j<arr.length; j++){
      for(let k =0; k<specialChars.length; k++){
        if(specialChars[k] === arr[j]){
          throw 'array contains special character'
        }
      }
    }
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
  
    for (i in arr) {
      if (typeof arr[i] == "number") temp1.push(arr[i]);
      else if (arr[i] >= "a" && arr[i] <= "z") temp2.push(arr[i]);
      else temp3.push(arr[i]);
    }
    for (i = 0; i < temp2.length; i++) {
      for (j = i + 1; j < temp2.length; j++) {
        if (temp2[j] < temp2[i]) {
          temp = temp2[i];
          temp2[i] = temp2[j];
          temp2[j] = temp;
        }
      }
    }
    for (i = 0; i < temp3.length; i++) {
      for (j = i + 1; j < temp3.length; j++) {
        if (temp3[j] < temp3[i]) {
          temp = temp3[i];
          temp3[i] = temp3[j];
          temp3[j] = temp;
        }
      }
    }
    for (i = 0; i < temp1.length; i++) {
      for (j = i + 1; j < temp1.length; j++) {
        if (temp1[j] < temp1[i]) {
          temp = temp1[i];
          temp1[i] = temp1[j];
          temp1[j] = temp;
        }
      }
    }
    let result = temp2.concat(temp3, temp1);
    return result;
  }
module.exports={
    average,
    modeSquared,
    medianElement,
    merge
}
