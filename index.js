//import express from "express";
const express = require('express');
const bodyParser = require('body-parser');
const  todoList = require('./data');
const port = 4000; 
let id=4;


const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/hello',(req,res)=>{
    res.json(todoList);
    //res.send("Hello World")
});

app.post('/add-todo-item',(req,res)=>{
    //console.log(req.body);
    const todoItem = {
        id : id,
        name : req.body.name,
        description : req.body.description,
        state : req.body.state
    }
    todoList.push(todoItem);
    id++;
    res.send("to do List item added succesfully");
});

app.put('/update-todo-item',(req,res)=>{
    let task = todoList.find(item =>item.id === req.body.id);
    task.name = req.body.name;
    task.description = req.body.description;
    task.state = req.body.state;
    res.send(" Task updated successfully");
    //console.log(task);
});

app.delete('/delete-item',(req,res)=>{
    //console.log(req.body);
    const id = req.body.id;
    const index = todoList.findIndex(item =>item.id === id);
    todoList.splice(index,1);
    res.send("item deleted");
    
})

app.listen(port,()=>{
    console.log("Server is running");
});