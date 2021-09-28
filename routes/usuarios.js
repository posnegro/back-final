const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones

//llamo middlewares que valida campos
// const { validarCampos } = require("../middlewares/validar-campos");
// const { esAdminRole } = require("../middlewares/validar-roles");
// const { validarJWT } = require("../middlewares/validar-jwt");

const { validarCampos, esAdminRole, validarJWT } = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  usuarioIdExiste,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuarioGetId,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    // check("id").custom(existeCategoria),
    validarCampos,
  ],
  usuarioGetId
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(), //valida si el id enviado es válido de mongo
    check("id").custom(usuarioIdExiste), //chequeo si existe el id
    check("rol").custom(esRoleValido), //vara validar el rol
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(), //midlleware: guarda el error en caso de que no cumpla con ser un email
    check("email").custom(emailExiste),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // check("rol").custom(esRoleValido), //vara validar el rol
    validarCampos, //valido los campos
  ],

  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT, //valido token enviado en headers
    esAdminRole, //valido que el rol sea administrador
    check("id", "No es un ID válido").isMongoId(), //valida si el id enviado es válido de mongo
    check("id").custom(usuarioIdExiste), //chequeo si existe el id
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
