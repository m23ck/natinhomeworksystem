const pool = require("../../config/config");

module.exports = {
  createType: (data, callBack) => {
    pool.query(
      'insert into type(type) values(?)',
      [data.type],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getTypes: callBack => {
    pool.query(
      `select * from type`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getTypeById: (type_id, callBack) => {
    pool.query(
      `select * from type where type_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateType: (data, type_id, callBack) => {
    pool.query(
      'update type set type = ? where type_id = ?',
      [
        data.type,
        type_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteType: (id, callBack) => {
    pool.query(
      `delete from type where type_id = ?`,
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
