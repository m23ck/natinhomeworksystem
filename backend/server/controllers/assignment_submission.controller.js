const {
    createAssignmentSubmission,
    getAssignmentSubmissionById,
    getAssignmentSubmissionByAssignmentId,
    getAssignmentSubmissionByStudentId,
    getSpecificAssignmentSubmissions,
    getProgressDetails,
    changeAssignmentSubmissionStatus,
    deleteAssignmentSubmission
} = require("../models/assignment_submission.model");

module.exports = {
    createAssignmentSubmission: (req, res) => {
        const body = req.body;

        createAssignmentSubmission(body, (err, results) => {
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
    getAssignmentSubmissionById: (req, res) => {
        const assignment_submission_id = req.params.id;
        getAssignmentSubmissionById(assignment_submission_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "AssignmentSubmission bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAssignmentSubmissionByAssignmentId: (req, res) => {
        const assignment_id = req.params.assignment_id;
        getAssignmentSubmissionByAssignmentId(assignment_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "AssignmentSubmission bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getSpecificAssignmentSubmissions: (req, res) => {
        const jaar_klas_id = req.query.jaar_klas_id;
        const roadmap_id = req.query.roadmap_id;
        const status = req.query.status;
        getSpecificAssignmentSubmissions(jaar_klas_id, roadmap_id, status, (err, results) => {
            
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "AssignmentSubmission bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getProgressDetails: (req, res) => {
        const student_id = req.query.student_id;
        const roadmap_id = req.query.roadmap_id;
        getProgressDetails(student_id, roadmap_id, (err, results) => {
            
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "AssignmentSubmission bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAssignmentSubmissionByStudentId: (req, res) => {
        const student_id = req.params.student_id;
        getAssignmentSubmissionByStudentId(student_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "AssignmentSubmission bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAssignmentSubmissions: (req, res) => {
        getAssignmentSubmissions((err, results) => {
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
    changeAssignmentSubmissionStatus: (req, res) => {
        const body = req.body;
        const assignment_submission_id = req.params.id;
        getAssignmentSubmissionById(assignment_submission_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "assignmentsubmission bestaat niet!"
                });
            } else {
                changeAssignmentSubmissionStatus(body, assignment_submission_id, (err) => {
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
    deleteAssignmentSubmission: (req, res) => {
        const assignment_submission_id = req.params.id;
        getAssignmentSubmissionById(assignment_submission_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "AssignmentSubmission bestaat niet!"
                });
            } else {
                deleteAssignmentSubmission(assignment_submission_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "AssignmentSubmission succesvol verwijderd!"
                    });
                });
            }
        });
    }
}