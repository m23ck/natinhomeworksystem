const {
    createKlas,
    getKlasById,
    getKlassen,
    updateKlas,
    deleteKlas
} = require("../models/klas.model");

const {
    createJaarKlas,
    getJaarKlasById,
    getJaarKlassen,
    updateJaarKlas,
    deleteJaarKlas
} = require("../models/jaar_klas.model");





module.exports = {
    createKlas: (req, res) => {
        const body = req.body;

        createKlas(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })

        // createJaarKlas(body, (err, results) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             success: 0,
        //             message: "Database connection error!"
        //         })
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         data: results
        //     })
        // })
    },
    getKlasById: (req, res) => {
        const klas_id = req.params.id;
        getKlasById(klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Klas bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getKlassen: (req, res) => {
        getKlassen((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: " Er bestaan op dit moment nog geen klassen! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateKlas: (req, res) => {
        const body = req.body;
        const klas_id = req.params.id;
        getKlasById(klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "klas bestaat niet!"
                });
            } else {
                updateKlas(body, klas_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "update Succesvol!"
                    });
                });
            }
        });


    },
    deleteKlas: (req, res) => {
        const klas_id = req.params.id;
        getKlasById(klas_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Klas bestaat niet!"
                });
            } else {
                deleteKlas(klas_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Klas succesvol verwijderd!"
                    });
                });
            }
        });
    }
}