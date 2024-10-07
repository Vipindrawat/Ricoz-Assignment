
const mongoose = require('mongoose');
const connectToMongo = () => {

    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to mongodb");
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connectToMongo;