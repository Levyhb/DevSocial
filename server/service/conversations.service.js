const Conversation = require("../models/Conversation");

const createConversation = async (senderId, receiverId) => {
  try {
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = await newConversation.save();
    return { type: 201, response: savedConversation };
  } catch (error) {
    return { type: 400, response: error };
  }
};

const getConversations = async (userId) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    return { type: 200, response: conversation };
  } catch (error) {
    return { type: 400, response: error };
  }
};

const getConversationWithTwoUserId = async (firstUserId, secondUserId) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    return { type: 201, response: conversation };
  } catch (err) {
    return { type: 400, response: err };
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversationWithTwoUserId,
};
