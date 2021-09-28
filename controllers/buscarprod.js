const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

// const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const productosPorCat = async (req = request, res = response) => {
  const { categoria_id } = req.params;
  const esMongoId = ObjectId.isValid(categoria_id);
  if (!esMongoId) {
    return res.status(400).json({
      msg: "Id inválido",
    });
  }

  const productos = await Producto.find({
    categoria: categoria_id,
    estado: true,
  }).populate("categoria", "nombre");
  const total = await Producto.countDocuments({
    categoria: categoria_id,
    estado: true,
  });

  return res.json({
    results: {
      Total: total,
      productos,
    },
  });
};

module.exports = {
  productosPorCat,
};
