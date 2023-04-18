const express = require('express');
const {TodoRepository} = require("../repositories/todo.repository");
const {TodoRecord} = require("../data/TodoRecord");

const taskRouter = express.Router();

taskRouter
    .post('/add', async (req, res) => {
        if(req.body.title.length > 3) {
            const todos=new TodoRecord({
                title:req.body.title,
            })
            await TodoRepository.insert(todos);
            res.send('OK');
        }
    })
    .post('/check', async (req, res) => {

        const com = req.body.completed;
        const c = !com;
        const todos=new TodoRecord({
            id: req.body.id,
            deadline: req.body.deadline,
            completed: c,
            title:req.body.title,
        })

        await TodoRepository.update(todos);

        res.send('OK');
    })
    .post('/delete', async (req, res) => {
        await TodoRepository.DeleteOne(req.body.id)
        res.send('OK');
    })
    .post('/edit', async (req, res) => {

        const todos=new TodoRecord({
            id: req.body.id,
            deadline: req.body.deadline,
            completed: req.body.completed,
            title:req.body.title,

        })
        await TodoRepository.update(todos);
        res.send('OK');
    });

module.exports = {
    taskRouter,
};
