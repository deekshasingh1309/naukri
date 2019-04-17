const App = require('../model/app.model.js');

const enums = require('../enum');

// Create and Save a new field
exports.create = (req, res) => {
    // Validate request
    if (!!req.body.content) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }
    // Create a fields object
    const fields = new App.first({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        roles: enums
    });

    // Save fields in database
    fields.save((err, response) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(response)
        }
    })

};


// Retrieve and return all fields from database.
exports.findAll = (_req, res) => {
    App.first.find()
        .then(test => {
            res.send(test);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error occurred"
            });
        });
};



//update
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find id and update it 
    App.first.findOneAndUpdate({ 'id': req.params.id }, { $set: req.body }, { new: true })
        .then(fields => {
            if (!fields) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(fields);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.id
            });
        });
};

// Delete user
exports.delete = (req, res) => {
    App.first.findByIdAndRemove(req.params.id)
    .then(fields => {
    if(!fields) {
    return res.status(404).send({
    message: "Data not found with id " + req.params.id
    });
    }
    res.send({message: "deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
    return res.status(404).send({
    message: "Note not found with id " + req.params.id
    });
    }
    return res.status(500).send({
    message: "Could not delete note with id " + req.params.id
    });
    });
    };


