/* I pledge my honor that I have abided by the Stevens Honor System */
//sort string
const sortString = function sortString(str){
    //check if string parameter exists
    if (typeof str !== "string") throw "Invalid input"
    
    // check if length of the string parameter is greater than 0
    if (str.length === 0) throw "String Empty"
    
    // check if the string parameter is of the proper type
    if(str.length === 1) throw "String only contains one element hence it's a character";
    
    // check if the string parameter is not just empty spaces
    if (!str.replace(/\s/g, "").length) throw "string only contains empty spaces"
    //variable declaration   
        let s = str.split('');      //string split into array
        len = str.length;           //length of string stored in variable
        let upperCase = [];         //arrays declared for storing uppercase, lower case, number, special characters and spaces
        let lowerCase = [];
        let num = [];
        let specialChars = [];
        let spaces = [];
        let sortedString = [];      //array created for storing final output as sorted string
        
        //main logic
        for (i = 0; i< len; i++){
            if (s[i] >= "A" && s[i] <= "Z") upperCase.push(s[i]); // upe
            else if (s[i] >= "a" && s[i] <= "z") lowerCase.push(s[i]); // 
            else if (s[i] !== undefined && s[i].match(/^[0-9]+$/g)) num.push(s[i]);
            else if (s[i] != undefined && s[i].match(/\s/g)) spaces.push(s[i]);
            else specialChars.push(s[i]);
        }
        upperCase = upperCase.sort();
        lowerCase = lowerCase.sort();
        num = num.sort();
    
        return sortedString = (sortedString.concat(upperCase, lowerCase, specialChars, num, spaces).join(''))
}

//replace character
const replaceChar = function replaceChar(string, idx){
    //1st argument is string and 2nd argument is number
    if(typeof string !== 'string' || typeof idx !== 'number'){
        throw 'Not a valid input';
    }
    //idx is greater than 0 and less than s.length -1
    if(idx <= 0 || idx >= string.length -1){
        throw 'Not a valid index input';
    }
    //string should be having more than 2 characters
    if(string.length <= 2){
        throw 'string length cannot be 2';
    }
    //main logic
    let char = string.charAt(idx);
    let chars = [string.charAt(idx-1), string.charAt(idx+1)];
    let index = 0;
    let result = '';
    for(let i = 0; i < string.length;i++){
        if(string.charAt(i) === char && i !== idx){
            result = result.concat(chars[index]);
            if(index === 0){
                index = 1;
            }else if(index === 1){
                index = 0;
            }
        }else{
            result = result.concat(string.charAt(i));
        }
    }
    return result;
}

//Mash up 2 strings
const mashUp = function mashUp(string1, string2, char){
    if (typeof string1 !== "string" || string1 === undefined) {
        throw "Input is not vaild";
    }
    if (typeof string2 !== "string" || string1 === undefined) {
        throw "Input is not vaild";
    }
    if (string1.length == 0) {
        throw "Input cannot be empty";
    }
    if (string2.length == 0) {
        throw "Input cannot be empty";
    }
    if (typeof char != "string" || char == undefined || char.length != 1) {
        throw " Not a valid charater value";
    }
    if ( (!string1.replace(/\s/g, "").length)){
        throw "string1 only contains empty spaces";
    }
    if (!string2.replace(/\s/g, "").length){
        throw "string2 only contains empty spaces";
    }
    if (!char.replace(/\s/g, "").length){
        throw "char only contains empty spaces";
    }
    let newString1 = ''
    let newString2 = ''

    if(string1.length > string2.length){
        newString2 = string2.padEnd(string1.length, char)
        newString1 = string1
    }
    else{
        newString1 = string1.padEnd(string2.length, char)
        newString2 = string2
    }
    str1 = newString1.split('')
    str2 = newString2.split('')
    let len = str1.length
    let mashupArr = []
    let index = 0
    for( let i = 0; i < len; i++){
        for(let j = i-1; j <= i; j++){
            if(index === 0){
                mashupArr.push(str1[i])
                index = 1;
            }
            else if(index === 1){
                mashupArr.push(str2[i])
                index = 0;
            }
        }
    }
    return(mashupArr.join(''))
}

module.exports = {
    sortString,
    replaceChar,
    mashUp
};