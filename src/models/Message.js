const moongose = require("mongoose");
const logger = require("../scripts/logger/message")
const MessageSchema = new moongose.Schema({
    user_id: {
        type: moongose.Types.ObjectId,
        ref: "user",

    },
    reciver_username: {
        type: String,
        ref: "user"
    },


    messages: [
        {
            message: String,
            message_at: Date,
            user_id: {
                type: moongose.Types.ObjectId,
                ref: "user",
            },

        }
    ],


},
    { timestamps: true, versionKey: false })
MessageSchema.post("save", (doc) => {
    logger.log({
        level: "info",
        message: doc,
    });
});


module.exports = moongose.model("message", MessageSchema);