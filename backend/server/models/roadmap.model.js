const pool = require("../../config/config");

module.exports = {
  createRoadmap: (data, callBack) => {
    pool.query(
      'insert into roadmap(roadmap_naam, start_datum, eind_datum, docent_id) values(?,?,?,?)',
      [
          data.roadmap_naam,
          data.start_datum,
          data.eind_datum,
          data.docent_id
        ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRoadmaps: callBack => {
    pool.query(
      `select * from roadmap`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRoadmapById: (id, callBack) => {
    pool.query(
      `select * from roadmap where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getRoadmapsByStudentId: (student_id, callBack) => {
    pool.query(
      `SELECT
      roadmap.id AS roadmap_id,
      roadmap.roadmap_naam,
      roadmap.start_datum,
      roadmap.eind_datum,
      klas.klas_naam
  FROM
      roadmap
  INNER JOIN klas_roadmaps ON roadmap.id = klas_roadmaps.roadmap_id
  INNER JOIN student_klas ON klas_roadmaps.jaar_klas_id = student_klas.jaar_klas_id
  INNER JOIN jaar_klas ON klas_roadmaps.jaar_klas_id = jaar_klas.id
  INNER JOIN klas ON jaar_klas.klas_id = klas.id
  WHERE
      student_klas.student_id = ?`,
      [student_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRoadmapsByDocentId: (docent_id, callBack) => {
    pool.query(
      `SELECT
      roadmap.id AS roadmap_id,
      roadmap.roadmap_naam,
      roadmap.start_datum,
      roadmap.eind_datum,
      klas.klas_naam,
      gebruiker.voornaam as docent_voornaam,
      gebruiker.naam as docent_naam
  FROM
      roadmap
  LEFT JOIN klas_roadmaps ON roadmap.id = klas_roadmaps.roadmap_id
  LEFT JOIN student_klas ON klas_roadmaps.jaar_klas_id = student_klas.jaar_klas_id
  LEFT JOIN jaar_klas ON klas_roadmaps.jaar_klas_id = jaar_klas.id
  LEFT JOIN klas ON jaar_klas.klas_id = klas.id
  LEFT JOIN gebruiker on roadmap.docent_id = gebruiker.id
  WHERE
      roadmap.docent_id = ?`,
      [docent_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateRoadmap: (data, id, callBack) => {
    pool.query(
      'update roadmap set roadmap_naam = ?, start_datum = ?, eind_datum = ? where id = ?',
      [
        data.naam,
        data.start_datum,
        data.eind_datum,
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
  deleteRoadmap: (id, callBack) => {
    pool.query(
      `delete from roadmap where id = ?`,
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
