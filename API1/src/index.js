const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const trabajadorRutes = require("./routes/trabajador")

//Initiliazations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(express.json());
app.use('/api', trabajadorRutes)

//Routes
app.get("/", (req, res)=>{
    res.send("routes");
})

// Mongodb connection
mongoose.connect(`mongodb+srv://${process.env.BDUSERNAME}:${process.env.BDPASSWORD}`
+ `@cluster0.vmx2tnb.mongodb.net/${process.env.BDNAME}?`
+ `retryWrites=true&w=majority`)
.then(()=> console.log('conectado a mongodb'))
.catch((er) => console.error(er))


//Server is listenning
app.listen(app.get('port'), ()=>{
    console.log('server corriendo',app.get('port'))
})