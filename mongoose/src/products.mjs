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
  id: Number,title: String,
  description: String,price: Number,
  discountPercentage: Number,rating: Number,stock: Number,
  brand: String,category: String,thumbnail: String,images: Array
});

const Product = mongoose.model('Product', productSchema);

//Populate the database
let products = product["products"];

Product.deleteMany().then(() => {
  Product.insertMany(products);
  })
  .then(() => console.log('Database Populated'))
  .catch(err => {
    console.log(err);
  });

//Server API implementations

app.get('/', (req, res) => {
  res.send('Products Catalogue');
});

//Retrieve all products
app.get('/products', (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      console.log(err);
    });
});

//Create a new product
app.post('/products', (req, res) => {
  const product = new Product({
    id: req.body.id,title: req.body.title,
    description: req.body.description,price: req.body.price,
    discountPercentage: req.body.discountPercentage,rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,category: req.body.category,thumbnail: req.body.thumbnail,
    images: req.body.images
  });

  product.save()
    .catch(err => {
      console.log(err);
    });
  return res.send({'create':'Updated Successfully'});
});

//Retrieve an Element By ID 
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  Product.findOne({ id })
    .then(product => {
      console.log(product)
      res.send(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error finding product');
    });
});


/// Modify Existing Product
app.post('/products/:id/edit', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  const id = Number(req.params.id);
  console.log(id);
  if (!Number.isInteger(id)) {
    return res.status(400).send('Invalid id format');
  }
  Product.findOneAndUpdate({id: id}, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images
  }).then(() => {
      return res.send({'update':'Updated Successfully'});
    })
    .catch(err => {
      console.log(err);
    });
});


// Delete a Product
app.get('/products/:id/delete', (req, res) => {
  const id = req.params.id;
  Product.findOneAndDelete({id})
    .then(() => {
      return res.send({'delete':`Product Removed`});
    })
    .catch(err => {
      console.log(err);
    });
});


// Configure middleware
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(3030, () => {
  console.log('Server listening on port 3030');
});