const {
    createKlasRoadmapAssociation,
    getKlasRoadmapAssociationById,
    getKlasRoadmapAssociations,
    getKlasRoadmapAssociationByKlasId,
    getKlasRoadmapAssociationByRoadmapId,
    deleteKlasRoadmapAssociation
} = require("../controllers/klas_roadmaps.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createKlasRoadmapAssociation);
router.get("/", checkToken, getKlasRoadmapAssociations);
router.get("/:id", checkToken, getKlasRoadmapAssociationById);
router.put("/klas/:id", checkToken, getKlasRoadmapAssociationByKlasId);
router.put("/roadmap/:roadmap_id", checkToken, getKlasRoadmapAssociationByRoadmapId);
router.delete("/:id", checkToken, deleteKlasRoadmapAssociation);

module.exports = router;
