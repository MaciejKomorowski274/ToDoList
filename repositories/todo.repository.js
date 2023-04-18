const {TodoRecord} = require("../data/TodoRecord");
const {v4: uuid} = require("uuid");
const {pool} = require("../data/dbConnection");


class TodoRepository {
    static _checkRecord(record) {
        if(!(record instanceof TodoRecord)) {
            throw new Error("Rekord nie jest instancja klasy");
        }
    }

    static async insert(record){

        TodoRepository._checkRecord(record);
        record.completed = record.completed ?? 0;

        record.id = record.id ?? uuid();
        record.deadline = record.deadline ?? new Date();

        await pool.execute('INSERT INTO `todos` VALUES (:id, :title, :deadline,:completed)',{
            id:record.id,
            title: record.title,
            completed: record.completed,
            deadline:record.deadline,
        });

        return record.id;
    }

    static async update(record){
        TodoRepository._checkRecord(record);
        record._validate();
        await pool.execute('UPDATE `todos` SET `title`=:title,`deadline`=:deadline,`completed`=:completed WHERE `id`=:id',{
            id:record.id,
            title: record.title,
            completed: record.completed,
            deadline:record.deadline,
        });
        return record.id;
    }

    static async findAll(){
        const [results]= await pool.execute('SELECT * FROM `todos`');
        return results.map(results=>new TodoRecord(results));
    }

    static async findOne(id){
        const [results]= await pool.execute('SELECT * FROM `todos` Where `id`=:id',{
            id: id,
        });
        return results.map(results=>new TodoRecord(results));
    }

    static async findCompleted(){
        const [results]= await pool.execute('SELECT * FROM `todos` Where `completed`>0');
        return results.map(results=>new TodoRecord(results));
    }
    static async findNoCompleted(){
        const [results]= await pool.execute('SELECT * FROM `todos` Where `completed`=0');
        return results.map(results=>new TodoRecord(results));
    }
    static async DeleteCompleted(){
        const [results]= await pool.execute('DELETE FROM `todos` Where `completed`>0');
    }
    static async DeleteOne(id){
      await pool.execute('DELETE FROM `todos` Where `id`=:id',{
            id: id,
        });
    }
    static async updateChecked(id){
        await pool.execute('UPDATE `todos` SET `completed`=:completed WHERE `id`=:id',{
            id:record.id,
            title: record.title,
            completed: record.completed,
            deadline:record.deadline,
        });
    }
}

module.exports = {
    TodoRepository,
}