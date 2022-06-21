const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000

//innitialize the dependancies
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Connected to db");
})

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})


const todo = mongoose.model('todo', todoSchema)

app.get('/view-todo', (req, res)=>{
    todo.find({},(error, result)=>{
        if (error) {
            console.log(error);
            res.send(error)
        }else{
            res.send(result)
        }
    })
})

app.post('/delete-todo', (req, res)=>{
    todo.findOneAndDelete({title: req.body.title},(error)=>{
        if (error){
            res.send(error)
        }else{
            res.status(200).send("Data deleted")
        }
    })
})

app.post('/add-todo', async (req, res)=>{
    const data = req.body

    const newTodo = new todo({
        title : data.title,
        time : data.time
    })
    

    try {
        const savedTodo = await newTodo.save()
        res.status(200).send("New Todo Added")
        console.log("new todo addded");
        
    } catch (error) {
        res.send(error).status(500)
    }
   
})

app.listen(port, (error)=>{
    if(error){
        return error;
    }
    console.log("Running on port " + port);
})