module.exports = mongoose => {
    const Books = mongoose.model(
      "book",
      mongoose.Schema({  
        author: String,
        title: String,
        isbn: Number,
        releaseDate : String
      },
      { timestamps: true }
      )
    );
  
    return Books;
  };