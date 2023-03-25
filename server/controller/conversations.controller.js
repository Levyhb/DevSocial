const conversationsService = require("../service/conversations.service");

const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const { type, response } = await conversationsService.createConversation(
      senderId,
      receiverId
    );
    return res.status(type).json(response);
  } catch (error) {
    return res.status(400).json(response);
  }
};

const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const { type, response } = await conversationsService.getConversations(
      userId
    );
    return res.status(type).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getConversationWithTwoUserId = async (req, res) => {
  const { firstUserId, secondUserId } = req.params;
  try {
    const { type, response } =
      await conversationsService.getConversationWithTwoUserId(
        firstUserId,
        secondUserId
      );
    return res.status(type).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversationWithTwoUserId,
};
