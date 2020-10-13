const {
    getResultaatById,
    getResultatenByRoadmapId,
    getResultatenByKlasId,
    getResultatenByStudentId,
    getAveragePointsPerVak,
    getAveragePointsPerVakAll,
    getResultatenByVakId,
    getResultaten,
    getTopResultaten,
    deleteResultaat
} = require("../controllers/resultaat.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.get("/", checkToken, getResultaten);
router.get("/top/", checkToken, getTopResultaten);
router.get("/average_vak_all/", checkToken, getAveragePointsPerVakAll);
router.get("/:id", checkToken, getResultaatById);
router.get("/:roadmap_id", checkToken, getResultatenByRoadmapId);
router.get("/:klas_id", checkToken, getResultatenByKlasId);
router.get("/student/:student_id", checkToken, getResultatenByStudentId);
router.get("/average_vak/:student_id", checkToken, getAveragePointsPerVak);
router.get("/:vak_id", checkToken, getResultatenByVakId);
router.delete("/:id", checkToken, deleteResultaat);

module.exports = router;
