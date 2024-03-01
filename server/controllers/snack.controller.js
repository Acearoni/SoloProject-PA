const Snack = require('../models/snack.model.js');

module.exports = {
    createSnack: (req, res) => {
        Snack.create(req.body)
            .then((newSnack) => {
                res.status(201).json(newSnack);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    findAllSnacks: (req, res) => {
        Snack.find()
            .then((allSnacks) => {
                res.status(200).json(allSnacks);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    findOneSnack: (req, res) => {
        Snack.findOne({ _id: req.params.id })
            .then((oneSnack) => {
                if (!oneSnack) {
                    return res.status(404).json({ error: 'Snack not found' });
                }
                res.status(200).json(oneSnack);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    updateSnack: (req, res) => {
        Snack.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((updatedSnack) => {
                if (!updatedSnack) {
                    return res.status(404).json({ error: 'Snack not found' });
                }
                res.json(updatedSnack);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    deleteSnack: (req, res) => {
        Snack.deleteOne({ _id: req.params.id })
            .then((result) => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: 'Snack not found' });
                }
                res.status(200).json({ message: 'Snack deleted successfully' });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    findSnackByCode: (req, res) => {
        Snack.findOne({ code: req.params.code })
            .then((foundSnack) => {
                if (!foundSnack) {
                    return res.status(404).json({ error: 'Snack not found' });
                }
                res.status(200).json(foundSnack);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
};
