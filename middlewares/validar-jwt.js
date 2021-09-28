const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  //   console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer usuario
    const usuario = await Usuario.findById(uid);

    //si el usuario no existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe",
      });
    }

    //verificar si el uid tiene estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario inactivo",
      });
    }

    req.usuario = usuario;

    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
