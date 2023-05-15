const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7njjpna.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const client = new MongoClient(uri);
const productsCollection = client.db("teeStore").collection("products");

app.get('/all-products',  async (req,res) => {
const query = {};
const options = {};
const allProducts = productsCollection.find(query, options)
const result = await allProducts.toArray();
res.send(result);
console.log(result);
})



app.get('/', (req, res) => {
  res.send('Hello World! working fine for Tee Store')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})