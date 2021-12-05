const express = require("express");
const app = express();
const static = express.static(__dirname + '/public');

app.use(static);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const configRoutes = require('./routes');
configRoutes(app);

app.listen(3000, () => {
    console.log("Server starting")
    console.log("Routes now running on http://localhost:3000")
});