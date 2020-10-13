const {
    createKlas,
    getKlasById,
    getKlassen,
    updateKlas,
    deleteKlas
} = require("../controllers/klas.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createKlas);
router.get("/", checkToken, getKlassen);
router.get("/:id", checkToken, getKlasById);
router.put("/:id", checkToken, updateKlas);
router.delete("/:id", checkToken, deleteKlas);

module.exports = router;
