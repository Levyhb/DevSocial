const messageService = require("../service/messages.service");

const newMessage = async (req, res) => {
  try {
    const { type, response } = await messageService.newMessage(req.body);
    return res.status(type).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const { type, response } = await messageService.getMessages(conversationId);
    return res.status(type).json(response);
  } catch (error) {
    res.status(500).json(err);
  }
}

module.exports = {
  newMessage,
  getMessages
}