const pool = require("../../config/config");

module.exports = {
  createJaarKlas: (data, callBack) => {
    pool.query(
      'insert into jaar_klas(klas_id, richting_id, jaar) values(?,?,?)',
      [ 
          data.klas_id,
          data.richting_id,
          data.jaar
        ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getJaarKlassen: callBack => {
    pool.query(
      `select * from jaar_klas`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getJaarKlasById: (id, callBack) => {
    pool.query(
      `select * from jaar_klas where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateJaarKlas: (data, id, callBack) => {
    pool.query(
      'update jaar_klas set klas_id = ?, richting_id = ?, jaar = ? where id = ?',
      [
        data.klas_id,
        data.richting_id,
        data.jaar,
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
  deleteJaarKlas: (id, callBack) => {
    pool.query(
      `delete from klas where id = ?`,
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
