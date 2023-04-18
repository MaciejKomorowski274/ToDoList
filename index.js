const express = require('express');
const {filterRouter} = require("./routes/filtres");
const {taskRouter} = require("./routes/task");
const {TodoRepository} = require("./repositories/todo.repository");

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/filter', filterRouter);
app.use('/task', taskRouter);

app.get('/render', async (req, res) => {
    const all=JSON.stringify(await TodoRepository.findAll());
    const data = JSON.parse(all);
    res.json(data);
});

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});
