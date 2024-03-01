const SnackController = require('../controllers/snack.controller.js');

module.exports = (app) => {
    // Route to create a new snack item
    app.post('/api/createSnack', SnackController.createSnack);

    // Route to get all snack items
    app.get('/api/allSnacks', SnackController.findAllSnacks);

    // Route to get a single snack item by ID
    app.get('/api/findOneSnack/:id', SnackController.findOneSnack);

    // Route to update a snack item by ID
    app.put('/api/updateSnack/:id', SnackController.updateSnack);

    // Route to delete a snack item by ID
    app.delete('/api/deleteSnack/:id', SnackController.deleteSnack);

    // Route to get a single snack item by code
    app.get('/api/findSnackByCode/:code', SnackController.findSnackByCode);

}
