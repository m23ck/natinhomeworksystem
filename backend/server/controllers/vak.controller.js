const {
    createVak,
    getVakById,
    getVakken,
    updateVak,
    deleteVak
} = require("../models/vak.model");

module.exports = {
    createVak: (req, res) => {
        const body = req.body;

        createVak(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Kan geen verbinding maken met het database!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getVakById: (req, res) => {
        const vak_id = req.params.id;
        getVakById(vak_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Vak Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getVakken: (req, res) => {
        getVakken((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: "Er bestaan op dit moment geen vakken! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateVak: (req, res) => {
        const body = req.body;
        const vak_id = req.params.id;
        getVakById(vak_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "vak bestaat niet!"
                });
            } else {
                updateVak(body, vak_id, (err) => {
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
    deleteVak: (req, res) => {
        const vak_id = req.params.id;
        getVakById(vak_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Vak bestaat niet!"
                });
            } else {
                deleteVak(vak_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Vak succesvol verwijderd"
                    });
                });
            }
        });
    }
}