const router = require("express").Router();
const Conversation = require("../models/Conversation");
const conversationController = require("../controller/conversations.controller");

//new conv
router.post("/", conversationController.createConversation);

//get conv of a user
router.get("/:userId", conversationController.getConversations);

// get conv includes two userId
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getConversationWithTwoUserId
);

module.exports = router;
