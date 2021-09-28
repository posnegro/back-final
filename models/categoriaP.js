const { Schema, model } = require("mongoose");

const CategoriaPschema = new Schema({
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      unique: true,
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  });

  CategoriaPschema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
  
    return data;
  };

module.exports = model("CategoriaP", CategoriaPschema)