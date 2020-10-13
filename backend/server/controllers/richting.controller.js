const {
    createRichting,
    getRichtingById,
    getRichtingen,
    updateRichting,
    deleteRichting
} = require("../models/richting.model");

module.exports = {
    createRichting: (req, res) => {
        const body = req.body;

        createRichting(body, (err, results) => {
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
    getRichtingById: (req, res) => {
        const richting_id = req.params.id;
        getRichtingById(richting_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Richting Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getRichtingen: (req, res) => {
        getRichtingen((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: "Er bestaan op dit moment geen richtingen! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateRichting: (req, res) => {
        const body = req.body;
        const richting_id = req.params.id;
        getRichtingById(richting_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "richting bestaat niet!"
                });
            } else {
                updateRichting(body, richting_id, (err) => {
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
    deleteRichting: (req, res) => {
        const richting_id = req.params.id;
        getRichtingById(richting_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Richting bestaat niet!"
                });
            } else {
                deleteRichting(richting_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Richting succesvol verwijderd"
                    });
                });
            }
        });
    }
}