/* I pledge my honor that I have abided by the Stevens Honor System */
const { mashUp } = require("./stringUtils");

//Compute Object
const computeObjects = function computeObjects(objects, func) {
    let resultObj = {};
    if (Array.isArray(objects) !== true) {
        throw "Input is not an array";
      }
      objects.forEach((obj) => {
        if (typeof obj !== "object") {
          throw " Input is not an object";
        }
        if (Object.keys(objects).length == 0) {
          throw "Object is empty";
        }
        if (objects.length == 0) {
          throw " Its an empty array";
        }
        for (x in obj) {
          if (typeof obj[x] !== "number") {
            throw " Input value of object is not a Number";
          }
        }
      });
    if (typeof func != "function") throw " Its not a function";
  
    objects.forEach((x) => {
      for (obj in x) {
        if (resultObj.hasOwnProperty(obj)) {
          resultObj[obj] = resultObj[obj] + func(x[obj]);
        } else {
          resultObj[obj] = func(x[obj]);
        }
      }
    });
    return resultObj;
  }

//common keys
const commonKeys = function commonKeys(obj1, obj2) {
    if (obj1 === undefined || obj2 === undefined){
        throw `Required parameters are not passed`;
    }
    if (typeof obj1 !== "object") {
      throw `Parameter 1 is not an Object `;
    }
    
    if (typeof obj2 !== "object") {
      throw `Parameter 2 is not an object`;
    }
    for (i = 0; i < obj1.length; i++) {
      if (Object.keys(obj1[i]).length === 0) {
        console.log(0);
      }
    }
    for (i = 0; i < obj2.length; i++) {
      if (Object.keys(obj2[i]).length === 0) {
        console.log(0);
      }
    }
    let newObj = {};
    for (let [key, value] of Object.entries(obj1)){
        if (key in obj2){
            if(typeof value == "object"){
                if(typeof obj2[key] == "object"){
                    let sub_result = {}
                    sub_obj1 = obj1[key]
                    sub_obj2 = obj2[key];
                    for (let [sub_key, sub_value] of Object.entries(sub_obj1)){
                        if(sub_key in sub_obj2){
                            if (sub_obj2[sub_key] === sub_obj1[sub_key]){
                                sub_result[sub_key] = sub_value;
                            }
                        }
                    }
                    if(sub_result !== {}){
                        newObj[key] = sub_result;
                    }
                }
            }
            else{ 
                if (obj2[key] === obj1[key]){
                    newObj[key] = value;
                }
            }
        }
    }
    return newObj
}

//Flip object
const flipObject = function flipObject(object) {
    if (typeof object !== "object") {
      throw 'not an object';
    }
    // if (object === null){
    //   throw `invalid argument`
    // }
    if (Object.keys(object).length === null || Object.values(object).length === null) {
      throw `Object has no keys or values`;
    }
    let result = {};
    for (let [key, value] of Object.entries(object)) {
      if (typeof value != "object") {
        result[value] = key;
      }
      else if(typeof value == "object"){
        let sub_obj = {};
        for (let [sub_key, sub_value] of Object.entries(value)) {
          sub_obj[sub_value] = sub_key;
        }
        result[key] = sub_obj;
      }
    }
    return result;
  }
module.exports = {
    computeObjects,
    commonKeys,
    flipObject
}