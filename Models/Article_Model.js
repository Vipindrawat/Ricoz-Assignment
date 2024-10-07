const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "xyz"
    },
    time: {
        type: String,
        default: () => new Date(Date.now()).toISOString(),
        immutable: true
    }
})

module.exports = mongoose.model("articles", ArticleSchema);