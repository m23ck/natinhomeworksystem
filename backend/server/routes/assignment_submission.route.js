const {
    createAssignmentSubmission,
    getAssignmentSubmissionById,
    getAssignmentSubmissionByAssignmentId,
    getAssignmentSubmissionByStudentId,
    getSpecificAssignmentSubmissions,
    getProgressDetails,
    getAssignmentSubmissions,
    changeAssignmentSubmissionStatus,
    deleteAssignmentSubmission
} = require("../controllers/assignment_submission.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createAssignmentSubmission);
router.get("/", checkToken, getAssignmentSubmissions);
router.get("/assignment/:assignment_id", checkToken, getAssignmentSubmissionByAssignmentId);
router.get("/student/:student_id", checkToken, getAssignmentSubmissionByStudentId);
router.get("/specific/", checkToken, getSpecificAssignmentSubmissions);
router.get("/progress/", checkToken, getProgressDetails);
// don't put the get by ID before getspecific  fsr it ruins it
router.get("/:id", checkToken, getAssignmentSubmissionById);
router.put("/:id", checkToken, changeAssignmentSubmissionStatus);
router.delete("/:id", checkToken, deleteAssignmentSubmission);

module.exports = router;
