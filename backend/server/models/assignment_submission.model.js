const pool = require("../../config/config");

module.exports = {
  createAssignmentSubmission: (data, callBack) => {
    pool.query(
      'insert into assignment_submission(assignment_id, student_id, status) values(?,?,?)',
      [
          data.assignment_id,
        data.student_id,
        data.status
    ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssignmentSubmissions: callBack => {
    pool.query(
      `select * from assignment_submission`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssignmentSubmissionById: (assignment_submission_id, callBack) => {
    pool.query(
      `select * from assignment_submission INNER JOIN assignment ON assignment_submission.assignment_id = assignment.id INNER JOIN gebruiker ON assignment_submission.student_id = gebruiker.id where assignment_submission.id = ?`,
      [assignment_submission_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAssignmentSubmissionByAssignmentId: (assignment_id, callBack) => {
    pool.query(
        `select * from assignment_submission INNER JOIN assignment ON assignment_submission.assignment_id = assignment.id INNER JOIN gebruiker ON assignment_submission.student_id = gebruiker.id where assignment_id = ?`,
      [assignment_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAssignmentSubmissionByStudentId: (student_id, callBack) => {
    pool.query(
        `select * from assignment_submission INNER JOIN assignment ON assignment_submission.assignment_id = assignment.id INNER JOIN gebruiker ON assignment_submission.student_id = gebruiker.id where student_id = ?`,
      [student_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSpecificAssignmentSubmissions: (jaar_klas_id, roadmap_id, status, callBack) => {
    pool.query(
        `SELECT
        assignment_submission.id, assignment_submission.status, assignment.assignment_naam, roadmap.roadmap_naam, gebruiker.naam, gebruiker.voornaam, klas.klas_naam
             FROM assignment_submission 
               LEFT JOIN assignment ON assignment_submission.assignment_id = assignment.id           
               LEFT JOIN roadmap ON assignment.roadmap_id = roadmap.id 
               LEFT JOIN gebruiker ON assignment_submission.student_id = gebruiker.id 
               LEFT JOIN student_klas ON student_klas.student_id = gebruiker.id          
               LEFT JOIN jaar_klas ON student_klas.jaar_klas_id = jaar_klas.id          
               LEFT JOIN klas ON jaar_klas.klas_id = klas.id
         WHERE
         assignment_submission.id NOT IN (
         SELECT resultaat.assignment_submission_id from resultaat WHERE resultaat.assignment_submission_id = assignment_submission.id)
         And
            student_klas.jaar_klas_id = ?
        And
            assignment.roadmap_id = ?
        And assignment_submission.status = ?`,
      [
        jaar_klas_id,
        roadmap_id,
        status
      ],
      (error, results, fields) => {
        
        if (error) {
          return callBack(error);
          return results
        }
        
        return callBack(null, results);
        
      }
    );
  },
  getProgressDetails: (student_id, roadmap_id, callBack) => {
    pool.query(
        `(SELECT
          COUNT(*) as progress
      FROM
          assignment_submission
          LEFT JOIN gebruiker on assignment_submission.student_id = gebruiker.id
          LEFT JOIN assignment on assignment_submission.assignment_id = assignment.id
          LEFT JOIN roadmap on assignment.roadmap_id = roadmap.id
          WHERE assignment_submission.student_id = ${student_id} and roadmap.id = ${roadmap_id}) 
         
           UNION ALL
          
          (SELECT
          COUNT(*) as progress
      FROM
          assignment_submission
          LEFT JOIN gebruiker on assignment_submission.student_id = gebruiker.id
          LEFT JOIN assignment on assignment_submission.assignment_id = assignment.id
          LEFT JOIN roadmap on assignment.roadmap_id = roadmap.id
          WHERE assignment_submission.status = 'approved' and assignment_submission.student_id = ${student_id} and roadmap.id = ${roadmap_id}) 
          
          UNION ALL
          
          (SELECT
          COUNT(*) as progress
      FROM
          assignment_submission
          LEFT JOIN gebruiker on assignment_submission.student_id = gebruiker.id
          LEFT JOIN assignment on assignment_submission.assignment_id = assignment.id
          LEFT JOIN roadmap on assignment.roadmap_id = roadmap.id
          WHERE assignment_submission.status = 'submitted' and assignment_submission.student_id = ${student_id} and roadmap.id = ${roadmap_id}) 
        `,
      [
        student_id,
        roadmap_id
      ],
      (error, results, fields) => {
        
        if (error) {
          return callBack(error);
          return results
        }
        
        return callBack(null, results);
        
      }
    );
  },

  changeAssignmentSubmissionStatus: (data, assignment_submission_id, callBack) => {
    // check if the submission was approved and then create a record for it
    if(data.status == "approved"){
      // Await the ID for the assignment
        pool.query(
        "update assignment_submission set status = ? where id = ?",
        [data.status, assignment_submission_id],
        (error, results, fields) => {
          if (error) {
            reject(error);
            return callBack(error);
          }
          return(results.insertId);
          // return callBack(null, results[0]);
        }
      );
     

      pool.query(
        "insert into resultaat(assignment_submission_id) values(?)",
        [assignment_submission_id],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    } 
    else{
          pool.query(
            "update assignment_submission set status = ? where id = ?",
            [data.status, assignment_submission_id],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
              return callBack(null, results[0]);
            });
    }


    
  },

  deleteAssignmentSubmission: (assignment_submission_id, callBack) => {
    pool.query(
      `delete from assignment_submission where id = ?`,
      [assignment_submission_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
