const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  if (!data.nombre || !data.email || !data.password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error("El usuario ya existe");

  return await User.create(data);
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios");
  }

  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuario no encontrado");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  return {
    token,
    user: {
      _id: user._id,
      nombre: user.nombre,
      email: user.email
    }
  };
};

module.exports = { registerUser, loginUser };