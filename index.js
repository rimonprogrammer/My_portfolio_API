const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const UserRoute = require('./Routes/UserRoutes');
// const AdminRoutes = require('./Routes/AdminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', UserRoute);

app.get('/', (req, res)=>{
    res.send("Rimon Portfolio project's API")
})

// ========= mongoose connect ==========
const uri = process.env.MONGODB_URL;;

mongoose.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Mongoose connected successfully")
}).catch((error)=>{
    console.log(error.message)
})
// ========= mongoose connect ==========

// -------- mongodb connect code start -----------
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  
const DBConnect = async () =>{
    try {
        await client.connect();

        const db = await client.db("test");
        const projects = await db.collection("Projects");

        app.get('/Projects', async (req, res) =>{
            const project = await projects.find().toArray();
            res.send(project)
        });

 
        app.get('/Projects/:id', async(req, res) =>{
            let ids = req.params.id;

            const result = await projects.findOne({id : ids});
            res.send(result);
        });
        
    } catch (error) {
      
    }
}
DBConnect();
// -------- mongodb connect code end -----------
 


app.listen( process.env.PORT, ()=>{
    console.log("The server is running")
})
