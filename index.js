const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7njjpna.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const client = new MongoClient(uri);
const productsCollection = client.db("teeStore").collection("products");

// JWT Verification
// function verifyJWT(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).send({ message: 'Unauthorized Access :(' });
//   }
//   const token = authHeader.split(' ')[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
//     if (err) {
//       return res.status(403).send({ message: 'Forbidden access :@' });
//     }
//     req.decoded = decoded;
//     next()
//   })
// }

async function run() {

  try {


    // get all products
    app.get('/all-products', async (req, res) => {
      const query = {};
      const options = {};
      const allProducts = productsCollection.find(query, options)
      const result = await allProducts.toArray();
      res.send(result);
    })

    // get product by id
    app.get('/product/:id', async (req, res) => {
      const pid = req.params.id;
      const query = { _id: new ObjectId(pid) }
      const options = {};
      const result = await productsCollection.findOne(query, options);
      res.send(result);
    })


    // post new product
    app.post('/add-product', async (req, res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct)
      // console.log(newProduct);
      res.send(result)
    })


    // delete a product
    app.delete('/delete-product/:id', async (req, res) => {
      const pid = req.params.id;
      // console.log(pid);
      const query = { _id: new ObjectId(pid) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    })



  }

  finally {

  }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! working fine for Tee Store')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})