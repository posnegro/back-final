const { Router } = require("express");
const { catporPadre } = require("../controllers/buscarCat");


const router = Router();

router.get("/:categoriaP_id", catporPadre);

module.exports = router;