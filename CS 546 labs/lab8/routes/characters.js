const express = require('express');
const router = express.Router();
const data = require('../data')

router.get('/', async(req, res) => {
    try{
        res.render('characters/about', {flag: false, mainTitle: 'Character Finder'});
    }catch(e){
        res.status(404).json("page not found");
    }
});

router.post('/search', async(req, res) =>{
    let searchChar = req.body.searchTerm;
    if(!searchChar || typeof searchChar !== 'string' || searchChar === null || !searchChar.replace(/\s/g, "").length){
        res.status(400).render('characters/error', {error: `search term not in correct format`, mainTitle: 'Character Not Found'})
        return;
    }
    try {
        const allChar = await data.characters.getCharacters(searchChar);
        res.status(200).render('characters/characters', {char:allChar, searchTerm: searchChar, mainTitle: 'Characters Found', flag: true});
      } catch (e) {
        res.status(400).render('characters/error', {error: `We're sorry, but no results were found for ${req.body.searchTerm}`, mainTitle: 'Character Not Found'});
      }
})

router.get('/characters/:id', async (req, res) => {
    let charId = req.params.id;
    if(!charId || typeof charId !== 'string' || charId === null){
        res.status(404).render('characters/error', {error: `Id not in correct format`, mainTitle: 'Character Not Found'})
        return;
    }
    try{
        const marvelChar = await data.characters.getById(charId)
        res.status(200).render('characters/search', { hero: marvelChar, image:marvelChar.thumbnail.path+"/portrait_xlarge.jpg", mainTitle: marvelChar.name, flag: true});
    }catch(e){
        res.status(404).render('characters/error', {error: `Invalid Id`, mainTitle: 'Character Not Found'})
    }
});


module.exports = router;
