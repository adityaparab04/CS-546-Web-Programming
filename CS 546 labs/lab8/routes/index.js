const characterRoutes = require('./characters')
const path = require('path');

const constructorMethod = (app) => {
    app.use('/', characterRoutes);
    
    app.use('*', (req, res) => {
        res.status(404).send('ERROR 404: Page Not Found');
    });
};

module.exports = constructorMethod;