const { Router } = require("express");
const { check } = require("express-validator");


const { validarCampos } = require("../middlewares/validar-campos");
const {  validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { existeCategoriaP } = require("../helpers/db-validators");

const {
    crearCategoriasP,
    obtenerCategoriasP,
    obtenerCategoriaP,
    actualizarCategoriaP,
    borrarCategoriaP,
} = require("../controllers/categoriaP");

  const router = Router();

router.get("/", obtenerCategoriasP);

router.get(
    "/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      // check("nombre").custom(existeCategoriaP),
      validarCampos,
    ],
    obtenerCategoriaP
);

router.post(
    "/",
    [ 
      validarJWT,
      esAdminRole,
      check("nombre", "El nombre es obligatorio").not().isEmpty(), 
      validarCampos,
    ],
    crearCategoriasP
);

router.put(
    "/:id",
    [
      validarJWT,
      check("id", "No es un ID válido").isMongoId(),
      // check("nombre").custom(existeCategoriaP),
      validarCampos,
    ],
    actualizarCategoriaP
);

router.delete(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "No es un ID válido").isMongoId(),
      // check("id").custom(existeCategoriaP),
      validarCampos,
    ],
    borrarCategoriaP
  );
  
  module.exports = router;
  