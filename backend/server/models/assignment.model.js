const pool = require("../../config/config");

module.exports = {
  createAssignment: (data, callBack) => {
    pool.query(
      'insert into assignment(assignment_naam, omschrijving, start_datum, inlever_datum, vak_id, punten, herkansingspunten, roadmap_id) values(?,?,?,?,?,?,?,?)',
      [
        data.assignment_naam,
        data.omschrijving,
        data.start_datum,
        data.inlever_datum,
        data.vak_id,
        data.punten,
        data.herkansingspunten,
        data.roadmap_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssignments: callBack => {
    pool.query(
      `select * from assignment`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssignmentById: (id, callBack) => {
    pool.query(
      `select * from assignment where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAssigmentStats: (student_id, callBack) => {
    pool.query(
      `(SELECT COUNT(*) as stats FROM assignment LEFT JOIN roadmap on assignment.roadmap_id = roadmap.id LEFT JOIN klas_roadmaps ON roadmap.id = klas_roadmaps.roadmap_id LEFT JOIN student_klas ON klas_roadmaps.jaar_klas_id = student_klas.jaar_klas_id LEFT JOIN jaar_klas ON klas_roadmaps.jaar_klas_id = jaar_klas.id LEFT JOIN klas ON jaar_klas.klas_id = klas.id WHERE assignment.id NOT IN (SELECT assignment_id from assignment_submission) AND student_klas.student_id = '${student_id}')
UNION ALL
(SELECT COUNT(*) as stats FROM assignment LEFT JOIN roadmap on assignment.roadmap_id = roadmap.id LEFT JOIN klas_roadmaps ON roadmap.id = klas_roadmaps.roadmap_id LEFT JOIN student_klas ON klas_roadmaps.jaar_klas_id = student_klas.jaar_klas_id LEFT JOIN jaar_klas ON klas_roadmaps.jaar_klas_id = jaar_klas.id LEFT JOIN klas ON jaar_klas.klas_id = klas.id WHERE assignment.id IN (SELECT assignment_id from assignment_submission where STATUS = "approved") AND student_klas.student_id = '${student_id}')
UNION ALL
(SELECT COUNT(*) as stats FROM assignment LEFT JOIN roadmap on assignment.roadmap_id = roadmap.id LEFT JOIN klas_roadmaps ON roadmap.id = klas_roadmaps.roadmap_id LEFT JOIN student_klas ON klas_roadmaps.jaar_klas_id = student_klas.jaar_klas_id LEFT JOIN jaar_klas ON klas_roadmaps.jaar_klas_id = jaar_klas.id LEFT JOIN klas ON jaar_klas.klas_id = klas.id WHERE assignment.id IN (SELECT assignment_id from assignment_submission where STATUS = "submitted") AND student_klas.student_id = '${student_id}')`,
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssignmentsByRoadmapId: (roadmap_id, callBack) => {
    pool.query(
      `select assignment.id as id, assignment.assignment_naam, assignment.omschrijving, assignment.start_datum, assignment.inlever_datum, assignment.punten, assignment.herkansingspunten, assignment.roadmap_id, roadmap.roadmap_naam from assignment LEFT JOIN vak ON vak.id = vak_id LEFT JOIN roadmap ON roadmap_id = roadmap.id where assignment.roadmap_id = ? `,
      [roadmap_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateAssignment: (data, id, callBack) => {
    pool.query(
      'update assignment set assignment_naam = ?, omschrijving = ?, start_datum = ?, inlever_datum = ?, vak_id = ?, punten = ?, herkansingspunten = ?, roadmap_id = ? where id = ?',
      [
        data.assignment_naam,
        data.omschrijving,
        data.start_datum,
        data.inlever_datum,
        data.vak_id,
        data.punten,
        data.herkansingspunten,
        data.roadmap_id,
        id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteAssignment: (id, callBack) => {
    pool.query(
      `delete from assignment where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
