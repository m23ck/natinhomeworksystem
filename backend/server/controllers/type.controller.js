const {
    createType,
    getTypeById,
    getTypes,
    updateType,
    deleteType
} = require("../models/type.model");

module.exports = {
    createType: (req, res) => {
        const body = req.body;

        createType(body, (err, results) => {
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
    getTypeById: (req, res) => {
        const type_id = req.params.type_id;
        getTypeById(type_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Type Bestaat niet!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getTypes: (req, res) => {
        getTypes((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: "Er bestaan op dit moment geen types! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateType: (req, res) => {
        const body = req.body;
        const type_id = req.params.type_id;
        getTypeById(type_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "type bestaat niet!"
                });
            } else {
                updateType(body, type_id, (err) => {
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
    deleteType: (req, res) => {
        const type_id = req.params.type_id;
        getTypeById(type_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Type bestaat niet!"
                });
            } else {
                deleteType(type_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Type succesvol verwijderd"
                    });
                });
            }
        });
    }
}