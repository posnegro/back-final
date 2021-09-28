//Validar los roles segun lo que tenga en la colección roles
const Role = require("../models/role");
const Usuario = require("../models/usuario");
const CategoriaP = require("../models/categoriaP");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está definido en la BD`);
  }
};

const emailExiste = async (email = "") => {
  //Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }
};

const usuarioIdExiste = async (id) => {
  //Verificar si el id existe
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeCategoria = async (id) => {
  const existeCat = await Categoria.findById(id);

  if (!existeCat) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeProducto = async (id) => {
  const existeProd = await Producto.findById(id);

  if (!existeProd) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeCategoriaP = async (nombre = "") => {
  const existeCat = await CategoriaP.findOne(nombre);

  if (existeCat) {
    throw new Error(`No ESTA REGISTRADO ${nombre} `);
  }
};


module.exports = {
  esRoleValido,
  emailExiste,
  usuarioIdExiste,
  existeCategoria,
  existeProducto,
  existeCategoriaP,
};
