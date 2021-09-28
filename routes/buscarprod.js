const { Router } = require("express");
const { productosPorCat } = require("../controllers/buscarprod");

const router = Router();

router.get("/:categoria_id", productosPorCat);

module.exports = router;
