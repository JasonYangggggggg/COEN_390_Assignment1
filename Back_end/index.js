var Express = require("express");
const mongoose = require('mongoose');
var cors = require("cors");
const data_Model = require("./dataModel");
const bodyParser = require("body-parser");
mongoose.set('strictQuery', false);
var app = Express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/COEN_390_db", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Error connecting to MongoDB:', err));



//get database information route 
app.get('/getcollections', async(req,res)=>{
    const collec = await data_Model.find();
    console.log(collec);
    res.json(collec);
    
})

//add to data base (create)
app.post('/addcollection', async(req,res)=>{
    console.log(req.body);
    const {id, Event_A, Event_B, Event_C,Total} = req.body;
    try{
     
        const collec = new data_Model({
            _id: new mongoose.Types.ObjectId(),
            id,
            Event_A,
            Event_B,
            Event_C,
            Total
        });

        // Saving the document to the database
        await collec.save();

        console.log(collec);
        res.send(true);

    }catch(err){
        console.log(err);
        res.status(500).json({err:"save failed"});
    }
    
})

//update route
app.post('/updatecollection/:id', async(req,res)=>{
 const {Event_A, Event_B,Event_C,Total} = req.body;
 const id = req.params.id;
 try{
    let update = {};
    if(Event_A){
        update.Event_A = Event_A;
    }
    if(Event_B){
        update.Event_B = Event_B;
    }
    if(Event_C){
        update.Event_C = Event_C; 
    }
    if(Total){
        update.Total = Total;
    }
    const result = await data_Model.findOneAndUpdate(
        { _id: id },
        update, 
        { new: true } 
    );
    console.log(result);
    res.send(true);

    
 }catch(error){
    console.log(error);
    res.status(500).json({err:"update failed"});
 }
})

app.listen(3001, ()=>{
   console.log("app is running on local host 3001");
})