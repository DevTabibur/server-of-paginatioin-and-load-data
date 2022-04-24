// @ts-nocheck
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json());


// mongodb 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hc4xz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect()
        const productCollection = client.db("emaJohn").collection("product");
        console.log(productCollection);

        app.get('/product', async(req, res)=>{
            //we are searching all products that why query is a empty object
            const query ={};
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally{}
}

run().catch(console.dir)


app.get('/', (req, res)=>{
    res.send("LIVE SITE")
})

app.listen(port, ()=>{
    console.log('server is running on 5000');
})