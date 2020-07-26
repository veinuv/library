module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", books.create);
  
    // Retrieve all Book
    router.get("/", books.findAll);
  
   //  Retrieve a single book with id
    router.get("/:id", books.findOne);
  
    // Update a Book with id
    router.put("/:id", books.update);
  
    // Delete a Book with id
    router.delete("/:id", books.delete);

    router.delete("/", books.deleteAll);
   
    app.use('/api/books', router);
  };