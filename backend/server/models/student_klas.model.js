const pool = require("../../config/config");

module.exports = {
  createStudentKlasAssociation: (data, callBack) => {
    pool.query(
      'insert into student_klas(student_id, jaar_klas_id) values(?,?)',
      [
          data.student_id,
        data.jaar_klas_id
    ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getStudentKlasAssociations: callBack => {
    pool.query(
      `select * from student_klas`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getStudentKlasAssociationById: (student_klas_id, callBack) => {
    pool.query(
      `select * from student_klas INNER JOIN jaar_klas ON student_klas.jaar_klas_id = jaar_klas.id INNER JOIN gebruiker ON student_klas.student_id = gebruiker.id where student_klas_id = ?`,
      [student_klas_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getStudentKlasAssociationByStudentId: (student_id, callBack) => {
    pool.query(
        `select * from student_klas INNER JOIN jaar_klas ON student_klas.jaar_klas_id = jaar_klas.id INNER JOIN gebruiker ON student_klas.student_id = gebruiker.id where student_id = ?`,
      [student_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getStudentKlasAssociationByKlasId: (jaar_klas_id, callBack) => {
    pool.query(
        `select * from student_klas INNER JOIN jaar_klas ON student_klas.jaar_klas_id = jaar_klas.id INNER JOIN gebruiker ON student_klas.student_id = gebruiker.id where jaar_klas_id = ?`,
      [jaar_klas_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteStudentKlasAssociation: (student_klas_id, callBack) => {
    pool.query(
      `delete from student_klas where id = ?`,
      [student_klas_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
