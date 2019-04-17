module.exports = (app) => {
    const test = require('../controller/app.controller.js');

    
    app.post('/naukriapp', test.create); // Create

     app.get('/user', test.findAll);  // Retrieve 

  
    app.put('/user/:id', test.update);  // Update 

   
    app.delete('/user/:id', test.delete);   // Delete
}