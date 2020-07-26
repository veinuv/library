const db = require("../models");
const Book = db.books;

// Create and Save a new Book
exports.create = (req, res) => {
   // Validate request
   if (!req.body.author || !req.body.title || !req.body.isbn) {
    res.status(400).send({ message: "Title, author and ISBN are required fields!" });
    return;
  }

  // Create a Book
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    releaseDate : req.body.releaseDate ? req.body.published : null
  });

  // Save Book in the database
  book
    .save(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the book to the library"
      });
    });
};

exports.findAll = (req, res) => {
    
    Book.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };

// Find a single Book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Book with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Book with id=" + id });
    });
};


// Update a Book by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Book with id=${id}. Maybe Book was not found!`
          });
        } else res.send({ message: "Book info was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book info with id=" + id
        });
      });
  };

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Book.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
          });
        } else {
          res.send({
            message: "Book was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
  };


  exports.deleteAll = (req, res, next) => {
    Book.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Books were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all books."
        });
      });
  };


