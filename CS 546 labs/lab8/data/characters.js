const axios = require('axios');
const md5 = require('blueimp-md5');
const publickey = '340601f11a380a1d721cd0cb50cae0d0';
const privatekey = 'd8b916769806f64f3722b5b6f86eb79d6e5506db';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

// console.log(url);
let exportedMethods = {
    async getCharacters(searchTerm){
        if(arguments.length !==1){
            throw `Enter only one search term`
        }
        if(!searchTerm || typeof searchTerm !== 'string' || !searchTerm.replace(/\s/g, "").length){
            throw `Not a valid search term`
        }
        const url = baseUrl + '?nameStartsWith='+ searchTerm +'&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(url);
        let allChars = data;
        if(allChars.data.count === 0){
            throw `Error`;
        }
        return allChars.data.results.slice(0,20);
    },

    async getById(id){
        if(arguments.length !== 1){
            throw `Enter all the properties of a restaurant`;
        }
        if(!id || typeof id !== 'string' || !id.replace(/\s/g, "").length){
            throw `Enter a valid ID`
        }
        const url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(url);
        let result = data.data.results[0];
        if(result.length === 0){
            throw `character not found`
        }
        return result;
    }
}
module.exports = exportedMethods;