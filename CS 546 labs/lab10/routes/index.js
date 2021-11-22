const userRoutes = require('./user');

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    
    app.use('*', (req, res) => {
        res.status(404).json("page not found");
    });
};


module.exports = constructorMethod;