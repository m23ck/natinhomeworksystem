const {
    createRoadmap,
    getRoadmapById,
    getRoadmapsByStudentId,
    getRoadmapsByDocentId,
    getRoadmaps,
    updateRoadmap,
    deleteRoadmap
} = require("../models/roadmap.model");

module.exports = {
    createRoadmap: (req, res) => {
        const body = req.body;

        createRoadmap(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getRoadmapById: (req, res) => {
        const roadmap_id = req.params.id;
        getRoadmapById(roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Roadmap bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getRoadmapsByStudentId: (req, res) => {
        const student_id = req.params.student_id;
        getRoadmapsByStudentId(student_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Roadmap bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getRoadmapsByDocentId: (req, res) => {
        const docent_id = req.params.docent_id;
        getRoadmapsByDocentId(docent_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Roadmap bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getRoadmaps: (req, res) => {
        getRoadmaps((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: " Er bestaan op dit moment nog geen roadmaps! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateRoadmap: (req, res) => {
        const body = req.body;
        const roadmap_id = req.params.id;
        getRoadmapById(roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "roadmap bestaat niet!"
                });
            } else {
                updateRoadmap(body, roadmap_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "update Succesvol!"
                    });
                });
            }
        });


    },
    deleteRoadmap: (req, res) => {
        const roadmap_id = req.params.id;
        getRoadmapById(roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Roadmap bestaat niet!"
                });
            } else {
                deleteRoadmap(roadmap_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Roadmap succesvol verwijderd!"
                    });
                });
            }
        });
    }
}