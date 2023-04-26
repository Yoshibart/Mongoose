import product from './products.json' assert { type: "json" };
import express from "express"
import body_parser from "body-parser"
import path from 'path';
import cors from "cors"
import mongoose from "mongoose"

// Create an instance of Express app
const app = express();
app.use(body_parser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Description of the product state
const productSchema = new mongoose.Schema({
  id: String,title: String,
  description: String,price: Number,
  discountPercentage: Number,rating: Number,stock: Number,
  brand: String,category: String,thumbnail: String,images: Array
});

const Product = mongoose.model('Product', productSchema);

//Populate the database
let products = product["products"];

// Seed the database with some sample books
Product.deleteMany().then(() => {
  Product.insertMany(products);
  })
  .then(() => console.log('Database Populated'))
  .catch(err => {
    console.log(err);
  });

// Configure middleware
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));

// Configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Start the server
app.listen(3030, () => {
  console.log('Server listening on port 3030');
});