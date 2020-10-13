const pool = require("../../config/config");


module.exports = {
    createGebruiker: (data, callBack) => {
        pool.query(
            'insert into gebruiker(gebruiker_type_id, naam, voornaam, email, cohort, telefoon, adres, wachtwoord, status) values(?,?,?,?,?,?,?,?,?)',
            [
                data.gebruiker_type_id,
                data.naam,
                data.voornaam,
                data.email,
                data.cohort,
                data.telefoon,
                data.adres,
                data.wachtwoord,
                data.status
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getGebruikers: callBack => {
        pool.query(
            `select * from gebruiker inner join type on gebruiker.gebruiker_type_id=type.type_id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getGebruikerById: (id, callBack) => {
        pool.query(`select * from gebruiker inner join type on gebruiker.gebruiker_type_id=type.type_id where gebruiker.id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateGebruiker: (data, id, callBack) => {
        pool.query('update gebruiker set naam = ?, voornaam = ?, email = ?,  telefoon = ?, adres = ?, status = ? where id = ?',
            [
                data.naam,
                data.voornaam,
                data.email,
                data.cohort,
                data.telefoon,
                data.adres,
                data.status,
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
    deleteGebruiker: (id, callBack) => {
        pool.query(
            `delete from gebruiker where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getGebruikerByEmail: (email, callBack) => {
        pool.query(
            'select * from gebruiker inner join type on gebruiker.gebruiker_type_id=type.type_id where email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );

    },
    getGebruikersByCohort: (email, callBack) => {
        pool.query(
            'select * from gebruiker where cohort = ?',
            [cohort],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    getGebruikersByType: (type, callBack) => {
        pool.query(
            'select * from gebruiker inner join type on gebruiker.gebruiker_type_id=type.type_id where type = ?',
            [type],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },
    getGebruikersByStatus: (status, callBack) => {
        pool.query(
            'select * from gebruiker where status = ?',
            [status],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    }
};