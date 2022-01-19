const MessageService = require("../services/MessageService");
const ApiError = require("../errors/ApiError");
const hs = require("http-status");
const eventEmitter = require("../scripts/events/eventEmitter")

class MessageController {
    index(req, res, next) {
        console.log(req.user._doc)
        MessageService.findOne({ sender_username: req.user._doc.username }, true).then((message) => {
            if (!message) {
                return res.status(hs.NOT_FOUND).send({
                    message: "Mesaj kaydı bulunamadı."
                })
            }
            res.status(hs.OK).send(message);

        })
            .catch(e => {
                next(new ApiError(e?.message));
            })


    }
    newMessage(req, res, next) {
        req.body.user_id = req.user
        MessageService.create(req.body)
            .then(message => {
                res.status(hs.OK).send(message)
            })
            .catch(e => {
                next(new ApiError(e?.message))
            })
    }
    makeMessage = (req, res) => {
        console.log(req.params)
        MessageService.findOne({ _id: req.params.id })
            .then((mainMessage) => {
                if (!mainMessage) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır.." });
                console.log(req.user._doc.username)
                const message = {
                    ...req.body,


                    message_at: new Date(),
                    user_id: req.user,
                    username: req.user._doc.username,
                };
                console.log(message)
                mainMessage.messages.push(message);
                mainMessage
                    .save()
                    .then((updatedDoc) => {
                        return res.status(hs.OK).send(updatedDoc);
                    })
                    .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Kayıt sırasında bir problem oluştu." }));
            })
            .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Kayıt sırasında bir problem oluştu." }));
    };
    fetchTask = (req, res) => {

        if (!req.params.id) return res.status(hs.BAD_REQUEST).send({ message: "ID bilgisi gerekli." });
        console.log(req.params)
        MessageService.findOne({ _id: req.params.id })
            .then((task) => {

                if (!task) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır.." });
                res.status(hs.OK).send(task);
            })
            .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
    };

}

module.exports = new MessageController();