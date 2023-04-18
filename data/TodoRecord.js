class TodoRecord {
    constructor(obj) {
        this.id=obj.id;
        this.title=obj.title;
        this.completed=obj.completed;
        this.deadline=obj.deadline;
        this._validate();
    }

    _validate(){
        if(this.title.trim()<3){
            throw "Tresc jest za krotka";
        }
        if(this.title.trim()>100){
            throw "Tresc jest za dluga(ponad 100 znakow)";
        }
    }
}

module.exports = {
    TodoRecord,
}