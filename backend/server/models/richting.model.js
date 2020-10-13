const pool = require("../../config/config");

module.exports = {
  createRichting: (data, callBack) => {
    pool.query(
      'insert into richting(richting_naam) values(?)',
      [data.richting_naam],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRichtingen: callBack => {
    pool.query(
      `select * from richting`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRichtingById: (id, callBack) => {
    pool.query(
      `select * from richting where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateRichting: (data, id, callBack) => {
    pool.query(
      'update richting set richting_naam = ? where id = ?',
      [
        data.richting_naam,
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
  deleteRichting: (id, callBack) => {
    pool.query(
      `delete from richting where id = ?`,
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
