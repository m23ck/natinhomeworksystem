const {
    createStudentKlasAssociation,
    getStudentKlasAssociationById,
    getStudentKlasAssociations,
    getStudentKlasAssociationByKlasId,
    getStudentKlasAssociationByStudentId,
    deleteStudentKlasAssociation
} = require("../models/student_klas.model");

module.exports = {
    createStudentKlasAssociation: (req, res) => {
        const body = req.body;

        createStudentKlasAssociation(body, (err, results) => {
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
    getStudentKlasAssociationById: (req, res) => {
        const student_klas_id = req.params.student_klas_id;
        getStudentKlasAssociationById(student_klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "StudentKlasAssociation Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getStudentKlasAssociationByKlasId: (req, res) => {
        const jaar_klas_id = req.params.jaar_klas_id;
        getStudentKlasAssociationByKlasId(jaar_klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "StudentKlasAssociation Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getStudentKlasAssociationByStudentId: (req, res) => {
        const student_id = req.params.student_id;
        getStudentKlasAssociationByStudentId(student_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "StudentKlasAssociation Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getStudentKlasAssociations: (req, res) => {
        getStudentKlasAssociations((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: "Er bestaan op dit moment geen StudentKlasAssociations! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteStudentKlasAssociation: (req, res) => {
        const student_klas_id = req.params.student_klas_id;
        getStudentKlasAssociationById(student_klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "StudentKlasAssociation bestaat niet!"
                });
            } else {
                deleteStudentKlasAssociation(student_klas_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "StudentKlasAssociation succesvol verwijderd"
                    });
                });
            }
        });
    }
}