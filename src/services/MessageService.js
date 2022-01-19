const Message = require("../models/Message")
const BaseService = require("./BaseService")

class MessageService extends BaseService {
    constructor() {
        super(Message)
    }
    list(where) {
        return Message.find(where || {}).populate({
            path: "messages",
            populate: {
                path: "sender_nickname"
            }

        })
    }
    findOne(where, expand) {
        console.log(where)
        if (!expand) return this.BaseModel.findOne(where);
        return this.BaseModel.findOne(where).populate([
            {


                path: "messages",
                populate: {
                    path: "user_id",
                    select: "message"

                }
            }
        ]);
    }
}

module.exports = new MessageService();