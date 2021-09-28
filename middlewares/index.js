const validarCampos = require("./validar-campos");
const esAdminRole = require("./validar-roles");
const validarJWT = require("./validar-jwt");

module.exports = {
  ...validarCampos,
  ...esAdminRole,
  ...validarJWT,
};
