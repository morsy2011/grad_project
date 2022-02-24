const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/books', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
.then(() => console.log('Connect to MongoDB.....'))
.catch(err => console.log('Error connecting to MongoDB', err));

const Author = mongoose.model('Author', 
  new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    age:{
      type: Number,
      required: true
    }
}));

const Book = mongoose.model('Book', 
  new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    price:{
      type: Number,
      required: true
    },
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
}));

async function createAuthor(name, age){
  const author = Author({ name, age });
  const result = await author.save();
  console.log(result);
}

async function createBook(name, price, author){
  const book = Book({ name, price, author });
  const result = await book.save();
  console.log(result);
}

async function getBooks(){
  const book = await Book.find().populate('author', 'name age -_id');
  console.log(book);
}

// createAuthor( 'Omar Tarek', 28);
// createBook( 'Cyber Security', 50, '62124225857f4e5198dbddaf');
getBooks();