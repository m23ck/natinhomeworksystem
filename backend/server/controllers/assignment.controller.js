const {
    createAssignment,
    getAssignmentById,
    getAssigmentStats,
    getAssignmentsByRoadmapId,
    getAssignments,
    updateAssignment,
    deleteAssignment
} = require("../models/assignment.model");

module.exports = {
    createAssignment: (req, res) => {
        const body = req.body;

        createAssignment(body, (err, results) => {
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
    getAssignmentById: (req, res) => {
        const assignment_id = req.params.id;
        getAssignmentById(assignment_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Assignment bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAssigmentStats: (req, res) => {
        const student_id = req.params.student_id;
        getAssigmentStats(student_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Assignment bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAssignmentsByRoadmapId: (req, res) => {
        const roadmap_id = req.params.roadmap_id;
        getAssignmentsByRoadmapId(roadmap_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Assignment bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAssignments: (req, res) => {
        getAssignments((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: " Er bestaan op dit moment nog geen assignments! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateAssignment: (req, res) => {
        const body = req.body;
        const assignment_id = req.params.id;
        getAssignmentById(assignment_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "assignment bestaat niet!"
                });
            } else {
                updateAssignment(body, assignment_id, (err) => {
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
    deleteAssignment: (req, res) => {
        const assignment_id = req.params.id;
        getAssignmentById(assignment_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Assignment bestaat niet!"
                });
            } else {
                deleteAssignment(assignment_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Assignment succesvol verwijderd!"
                    });
                });
            }
        });
    }
}