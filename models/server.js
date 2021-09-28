const express = require("express");
const cors = require("cors"); //Para evitar restricciones desde peticiones externas
const { dbConnection } = require("../database/config");
//crear clase para el servidor
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //ruta autenticacion para token
    this.authPath = "/api/auth";
    //ruta categorias
    this.categoriasPath = "/api/categorias";
    //rutas usuarios
    this.usuariosPath = "/api/usuarios";
    //rutas producto
    this.productosPath = "/api/productos";
    //Buscar cosas
    this.buscarPath = "/api/buscar";
    //Buscar cproductos por categoria
    this.buscarProdPath = "/api/buscarprod";
    //Buscar categoria por categoria padre
    this.buscarcatPath = "/api/buscarcat";
    //ruta categorias de la categorias Padre
    this.categoriaPadrePath = "/api/categoriasPadre"
    // ruta carrito
    this.carrito = "/api/carrito"

    //conexion DB
    this.conectarDB();
    //middleware
    this.middlewares();
    //rutas
    this.routes();
  }

  //conexion DB
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //directorio público
    this.app.use(express.static("public"));

    //CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
  }

  //funcion para rutas
  routes() {
    //ruta de autenticacion
    this.app.use(this.authPath, require("../routes/auth"));
    //ruta de usuarios
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    //ruta categorias
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    //ruta de productos
    this.app.use(this.productosPath, require("../routes/productos"));
    //ruta de buscar
    this.app.use(this.buscarPath, require("../routes/buscar"));
    //ruta de buscar productos por categoria
    this.app.use(this.buscarProdPath, require("../routes/buscarprod"));
    //ruta de  categoria 2
    this.app.use(this.categoriaPadrePath, require("../routes/categoriaP"));
    //ruta de buscar categoria por categoria padre
    this.app.use(this.buscarcatPath , require("../routes/buscarCategoria"))
    // ruta carrito
    this.app.use(this.carrito, require("../routes/carrito"));
  }
  //funcion para escuchar el puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor online", this.port);
    });
  }
}

module.exports = Server;
