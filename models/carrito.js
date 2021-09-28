const { Schema, model } = require("mongoose");

const CarritoSchema = new Schema ({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
      },
    estado: {
       type: Boolean,
       default: true,
       required: true,
      },
      estados :{
         type:String,
         require: true,
         enum: ["PROCESANDO", "PAUSA", "CANCELADO", "CUMPLIDO"],
      },
      items: [Schema.Types.ObjectId],
    item: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
   },
});

module.exports = model("Carrito", CarritoSchema)