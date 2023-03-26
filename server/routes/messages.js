const router = require("express").Router();
const messageController = require("../controller/messages.controller")

//add
router.post("/", messageController.newMessage);

//get 
router.get("/:conversationId", messageController.getMessages);



module.exports = router;