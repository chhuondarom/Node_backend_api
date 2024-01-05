const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const UserRoute = require('./routes/User');
const cors = require("cors");
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());
app.use('/user',UserRoute);
app.use(bodyParser.urlencoded({ extended: true }));
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Databse Connected Successfully!!");    
// }).catch(err => {
//     console.log('Could not connect to the database', err);
//     process.exit();
// });
mongoose.connect('mongodb://127.0.0.1:27017/staffmanagement', {
    useUnifiedTopology : true, useNewUrlParser : true})
     .then(() => {
    console.log("Connection successfull");
     }).catch((e) => console.log("No connection"))
  
const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})
// app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});
// app.listen(process.env.PORT, () => {
//     console.log("Server is listening on port 3000");
// });