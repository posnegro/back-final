const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario"); //Traer modelo de usuario

const usuariosGet = async (req = request, res = response) => {
  //usando query
  // const { q, apikey, limit, page = 1 } = req.query;

  let { limite = 5, desde = 0 } = req.query;

  //Valido que sean números
  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 5;
  }
  if (isNaN(desde)) {
    desde = 0;
  }
  //----------------------------

  //Forma separada de realizar ------------

  // const usuarios = await Usuario.find({ estado: true })
  //   .skip(desde)
  //   .limit(limite);

  // const total = await Usuario.countDocuments({ estado: true });

  // res.json({
  //   total,
  //   usuarios,

  // });
  //---------------------------------
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(desde).limit(limite),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const usuarioGetId = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  res.json({
    usuario,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, email, password, rol } = req.body; //desestructuro solo lo que necesito guardar obligatoriamente

  const usuario = new Usuario({ nombre, email, password, rol });
  //Encriptar contraseña
  const salt = bcrypt.genSaltSync(); //numero de veces que se aplicará encriptación
  usuario.password = bcrypt.hashSync(password, salt); //encriptación de contraseña

  //Guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;

  const { _id, password, email, google, ...resto } = req.body;

  //Validar datos
  if (password) {
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(); //numero de veces que se aplicará encriptación
    resto.password = bcrypt.hashSync(password, salt); //encriptación de contraseña
  }

  //Actualizar la data del usuario y guardar la respuesta en usuario
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    message: "Usuario actualizado",
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  //Borrar fisicamente

  // const usuario = await Usuario.findByIdAndDelete(id);

  //Inactivar usuario
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  // const usuarioAutenticado = req.usuario;

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuarioGetId,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
