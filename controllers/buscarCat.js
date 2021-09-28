const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Categoria = require("../models/categoria")

const catporPadre = async(req = request, res = response) => {
    const { categoriaP_id } = req.params;
    const esMongoId = ObjectId.isValid(categoriaP_id);
    if (!esMongoId) {
      return res.status(400).json({
        msg: "Id inválido",
      });
    }

    const categoria = await Categoria.find({
        categoriaP: categoriaP_id,
        estado: true,
      }).populate("categoriaP", "nombre");
      const total = await Categoria.countDocuments({
        categoriaP: categoriaP_id,
        estado: true,
      });

      return res.json({
          results : {
              Total : total,
              categoria,
          }
      })
}

module.exports = {
    catporPadre
}
