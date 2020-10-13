const {
    createKlasRoadmapAssociation,
    getKlasRoadmapAssociationById,
    getKlasRoadmapAssociations,
    getKlasRoadmapAssociationByKlasId,
    getKlasRoadmapAssociationByRoadmapId,
    deleteKlasRoadmapAssociation
} = require("../models/klas_roadmaps.model");

module.exports = {
    createKlasRoadmapAssociation: (req, res) => {
        const body = req.body;

        createKlasRoadmapAssociation(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Kan geen verbinding maken met het database!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getKlasRoadmapAssociationById: (req, res) => {
        const klas_roadmap_id = req.params.klas_roadmap_id;
        getKlasRoadmapAssociationById(klas_roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "KlasRoadmapAssociation Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getKlasRoadmapAssociationByKlasId: (req, res) => {
        const klas_id = req.params.klas_id;
        getKlasRoadmapAssociationByKlasId(klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "KlasRoadmapAssociation Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getKlasRoadmapAssociationByRoadmapId: (req, res) => {
        const roadmap_id = req.params.roadmap_id;
        getKlasRoadmapAssociationByRoadmapId(roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "KlasRoadmapAssociation Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getKlasRoadmapAssociations: (req, res) => {
        getKlasRoadmapAssociations((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: "Er bestaan op dit moment geen KlasRoadmapAssociations! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteKlasRoadmapAssociation: (req, res) => {
        const klas_roadmap_id = req.params.klas_roadmap_id;
        getKlasRoadmapAssociationById(klas_roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "KlasRoadmapAssociation bestaat niet!"
                });
            } else {
                deleteKlasRoadmapAssociation(klas_roadmap_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "KlasRoadmapAssociation succesvol verwijderd"
                    });
                });
            }
        });
    }
}