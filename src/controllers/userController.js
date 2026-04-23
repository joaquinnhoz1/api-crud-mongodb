const { registerUser, loginUser } = require("../services/userService");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };