require('dotenv').config();
//Importing and calling the mongodb connecting function :
const connectToMongo = require('./ConnectingToMongoDB');
connectToMongo();

const express = require('express');
const app = express();

app.use(express.json());
app.use("/api/article", require("./Routes/Article_Routes"));

app.listen(process.env.PORT, () => {
    console.log("Server running on PORT :" + process.env.PORT);
}
)