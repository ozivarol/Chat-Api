const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
})


module.exports = mongoose.model("chat", ChatSchema)