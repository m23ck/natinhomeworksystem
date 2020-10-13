const {
    createVak,
    getVakById,
    getVakken,
    updateVak,
    deleteVak
} = require("../controllers/vak.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createVak);
router.get("/", checkToken, getVakken);
router.get("/:id", checkToken, getVakById);
router.put("/:id", checkToken, updateVak);
router.delete("/:id", checkToken, deleteVak);

module.exports = router;
