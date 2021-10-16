const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/', async (req, res) => {
    try{
        res.json(await data.stocks.getStocks());
    }catch(e){
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try{
        res.json(await data.stocks.getStocksById(req.params.id))
    }catch(e){
        res.status(404).json(e)
    }
});

module.exports = router;