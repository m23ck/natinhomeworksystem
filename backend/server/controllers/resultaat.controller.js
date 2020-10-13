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
} = require("../models/resultaat.model");

module.exports = {
    getResultaatById: (req, res) => {
        const resultaat_id = req.params.id;
        getResultaatById(resultaat_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Resultaat bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getResultatenByRoadmapId: (req, res) => {
        const roadmap_id = req.params.roadmap_id;
        getResultatenByRoadmapId(roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Resultaat bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getResultatenByKlasId: (req, res) => {
        const klas_id = req.params.klas_id;
        getResultatenByKlasId(klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Resultaat bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getResultatenByStudentId: (req, res) => {
        const student_id = req.params.student_id;
        getResultatenByStudentId(student_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Resultaat bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAveragePointsPerVak: (req, res) => {
        const student_id = req.params.student_id;
        getAveragePointsPerVak(student_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Resultaat bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAveragePointsPerVakAll: (req, res) => {
        getAveragePointsPerVakAll((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Resultaat bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getResultatenByVakId: (req, res) => {
        const vak_id = req.params.vak_id;
        getResultatenByVakId(vak_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Resultaat bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getResultaten: (req, res) => {
        getResultaten((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: " Er bestaan op dit moment nog geen resultaten! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getTopResultaten: (req, res) => {
        getTopResultaten((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: " Er bestaan op dit moment nog geen resultaten! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteResultaat: (req, res) => {
        const resultaat_id = req.params.id;
        getResultaatById(resultaat_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Resultaat bestaat niet!"
                });
            } else {
                deleteResultaat(resultaat_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Resultaat succesvol verwijderd!"
                    });
                });
            }
        });
    }
}