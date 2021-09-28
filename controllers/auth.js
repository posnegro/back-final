const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si el mail existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    //Si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos - estado: false",
      });
    }

    //Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hablar con el admin",
    });
  }
};

module.exports = {
  login,
};
