const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
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
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  cod_Producto: {
    type: Number,
    // required: [true, "El codigo es obligatorio"],
    unique: true,
  },
  image:{
    type:String,
  },
  cod_Barras : {
    type: Number,
    // required: [true, "El codigo de barra es obligatorio"],
    unique: true,
  },
  Unidad:{
    type: Number,
    default: 1,
  },
  Alícuota_IVA : {
    type: String,
  },
  Costo : {
    type: Number
  },
  Precio_Lista1: {
    type: Number,
    default: 0,
  },
  Precio_Lista2: {
    type: Number,
    default: 0,
  },
  Precio_Lista3: {
    type: Number,
    default: 0,
  },
  Impuesto_Interno: {
    type: Number,
    default: 0,
  },
  Ganancia : {
    type: Number,
    default: 0,
  },
  Es_Pesable : {
    type: Boolean,
    default: true,
    required: true,
  },
  CantL2 : {
    type: Number,
    default: 0,
  },
  CantL3 : {
    type: Number,
    default: 0,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();

  return data;
};

module.exports = model("Producto", ProductoSchema);
