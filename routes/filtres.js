const express = require('express');
const {TodoRepository} = require("../repositories/todo.repository");
const filterRouter = express.Router();


filterRouter
    .get('/active', async (req, res) => {
        res.json(JSON.parse(JSON.stringify(await TodoRepository.findNoCompleted())));
    })
    .get('/completed', async (req, res) => {
        res.json(JSON.parse(JSON.stringify(await TodoRepository.findCompleted())));
    })
    .post('/clear-completed', async (req, res) => {
        await TodoRepository.DeleteCompleted();
        res.send('OK');
    });

module.exports = {
    filterRouter,
};
