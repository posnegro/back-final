const Producto = require("../models/producto");
const { response } = require("express");
const Carrito = require("../models/carrito");
const usuario = require("../models/usuario");



const obtenerCarritos = async(req, res=reponse) =>{


    const [total, producto] = await Promise.all([
        Carrito.countDocuments({ estado: true }),
        Carrito.find({ estado: true })
          .sort("items")
          .populate("usuario", "nombre email")
          .populate("items", "nombre"),
      ]);

      res.json({
        Total: total,
        producto
      });
}

const obtenerCarrito = async(req, res=reponse) =>{
    const { id } = req.params;

    const CarritoListo = await Carrito.findById(id)
    .sort("items")
    .populate("usuario", "nombre email")
    .populate("items", "nombre")
      
    
      res.json({
        CarritoListo,
      });
}

const crearCarrito = async (req, res = response) =>{

    const {usuario, item, items , estados} = req.body
    
    const productoRP = await Producto.findById(Carrito.item)

    
    // productoRP.push()
        const data = {
            usuario: req.usuario._id,
            items,
            estados : "PROCESANDO"
        }
    
    const carrito = new Carrito(data)
    
        await carrito.save()
    
        res.json({
        msg: "carrito creado",
        carrito,
        })
    
}

const incrementarCarrito = async(req, res = response) => {
  const { id } = req.params;   
 
  const { _id, ...resto } = req.body

  resto.estados = resto.estados
  resto.usuario = req.usuario._id

  const actualizar = await Carrito.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    msg: "Estado actualizada",
    actualizar,
  });
}



const borrarCarrito = async (req, res = response) => {
  const { id } = req.params;   
 
  const { _id, ...resto } = req.body

  const CarritoListo = await Carrito.findById(id)
  .sort("items")

 
  const cargar = CarritoListo.items
  const restar = resto.item
  const numero  = cargar.indexOf(restar)
  if(numero == -1){
    return res.status(400).json({
      msg: `El producto ${restar} No esta`,
    });
  }
  else{
  const restado = cargar.splice(cargar.indexOf(restar),1)
  
  resto.item =  restar
  resto.items = cargar
  resto.usuario = req.usuario._id;
 
  const carrito = await Carrito.findByIdAndUpdate(id, resto, {
    new:true,
  })
  res.json({
    msg: "Producto Agregado",
    carrito,
    cargar,
    restado,
    numero
  })}

  };



module.exports = {crearCarrito,
  borrarCarrito,
  obtenerCarritos,
  obtenerCarrito,
  incrementarCarrito};


// const crearCarrito = async (req, res = response) => {

//     const {usuario, items} = req.body;
    
//     const productoRP = await Producto.findById(Carrito)
    
    
//         const data = {
//             usuario: req.usuario._id,
//             items
//         }
//         const carrito = new Carrito(data)
    
//         await carrito.save()
    
//         res.status(201).json(carrito)
//     }
    

// module.exports = {crearCarrito,};
