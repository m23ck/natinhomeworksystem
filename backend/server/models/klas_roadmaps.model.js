const pool = require("../../config/config");

module.exports = {
  createKlasRoadmapAssociation: (data, callBack) => {
    pool.query(
      'insert into klas_roadmaps(jaar_klas_id, roadmap_id) values(?,?)',
      [
          data.jaar_klas_id,
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
  getKlasRoadmapAssociations: callBack => {
    pool.query(
      `select * from klas_roadmaps`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getKlasRoadmapAssociationById: (klas_roadmap_id, callBack) => {
    pool.query(
      `select * from klas_roadmaps INNER JOIN jaar_klas ON klas_roadmaps.klas_id = jaar_klas.id INNER JOIN roadmap ON klas_roadmaps.roadmap_id = roadmap.id where klas_roadmap_id = ?`,
      [klas_roadmap_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getKlasRoadmapAssociationByRoadmapId: (roadmap_id, callBack) => {
    pool.query(
      `select * from klas_roadmaps INNER JOIN jaar_klas ON klas_roadmaps.klas_id = jaar_klas.id INNER JOIN roadmap ON klas_roadmaps.roadmap_id = roadmap.id where roadmap_id = ?`,
      [roadmap_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getKlasRoadmapAssociationByKlasId: (klas_id, callBack) => {
    pool.query(
      `select * from klas_roadmaps INNER JOIN jaar_klas ON klas_roadmaps.klas_id = jaar_klas.id INNER JOIN roadmap ON klas_roadmaps.roadmap_id = roadmap.id where klas_id = ?`,
      [klas_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteKlasRoadmapAssociation: (klas_roadmap_id, callBack) => {
    pool.query(
      `delete from klas_roadmaps where klas_roadmap_id = ?`,
      [klas_roadmap_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
