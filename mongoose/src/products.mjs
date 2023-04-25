import product from './products.json' assert { type: "json" };
import express from "express"
import body_parser from "body-parser"
import path from 'path';
import cors from "cors"
import mongoose from "mongoose"

// Connect to MongoDB
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//set the products imported from products.json
let products = product["products"];

// Create an instance of Express app
const app = express();
app.use(body_parser.json());
app.use(cors());

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