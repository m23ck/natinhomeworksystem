const {
    createRichting,
    getRichtingById,
    getRichtingen,
    updateRichting,
    deleteRichting
} = require("../controllers/richting.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createRichting);
router.get("/", checkToken, getRichtingen);
router.get("/:id", checkToken, getRichtingById);
router.put("/:id", checkToken, updateRichting);
router.delete("/:id", checkToken, deleteRichting);

module.exports = router;
