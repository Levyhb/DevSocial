const loginService = require("../service/auth.service");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { type, response } = await loginService.register(username, email, password);
    return res.status(type).json(response);
  } catch (error) {
    return res.status(400).json(err);
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { type, response } = await loginService.login(email, password);

    return res.status(type).json(response);
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  login,
  register
}