const {
    createStudentKlasAssociation,
    getStudentKlasAssociationById,
    getStudentKlasAssociations,
    getStudentKlasAssociationByKlasId,
    getStudentKlasAssociationByStudentId,
    deleteStudentKlasAssociation
} = require("../controllers/student_klas.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createStudentKlasAssociation);
router.get("/", checkToken, getStudentKlasAssociations);
router.get("/:id", checkToken, getStudentKlasAssociationById);
router.put("/klas/:id", checkToken, getStudentKlasAssociationByKlasId);
router.put("/student/:student_id", checkToken, getStudentKlasAssociationByStudentId);
router.delete("/:id", checkToken, deleteStudentKlasAssociation);

module.exports = router;
