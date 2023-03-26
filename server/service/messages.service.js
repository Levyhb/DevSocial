const Message = require("../models/Message");

const newMessage = async (body) => {
  const message = new Message(body);
  try {
    const savedMessage = await message.save();
    return { type: 200, response: savedMessage };
  } catch (err) {
    console.log(err);
    return { type: 400, response: err };
  }
};

const getMessages = async (conversationId) => {
  try {
    const messages = await Message.find({
      conversationId,
    });
    return { type: 200, response: messages } 
  } catch (err) {
    console.log(err);
    return { type: 500, response: err } 
  }
}

module.exports = {
  newMessage,
  getMessages
};
