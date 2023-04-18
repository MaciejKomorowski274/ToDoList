const btnAdd = document.querySelector('.add');
const inputText = document.querySelector('.inputText');
const ul = document.querySelector('.todo-list');
const all = document.querySelector('.all');
const active = document.querySelector('.active2');
const completed = document.querySelector('.completed');
const clear = document.querySelector('.clear');

let i=0;

async function render() {
    let res;
    if(i===0){
        res = await fetch('/render', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    if(i===1){
        res = await fetch('/filter/active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    if(i===2){
        res = await fetch('/filter/completed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


    const tasks = await res.json();
    const ul = document.querySelector('.todo-list');
    ul.innerHTML = '';

    document.querySelector('.items-left span').textContent = tasks.length;

    for (const task of tasks) {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const btn = document.createElement('i');
        const btnEdit = document.createElement('button');
        const btnRemove = document.createElement('button');
        const iconEdit = document.createElement('i');
        const iconRemove = document.createElement('i');
        const p = document.createElement('p');
        const div = document.createElement('div');

        div.className="btn-group me-2";

        btnEdit.className = 'edit col btn btn-secondary"';
        iconEdit.className = 'fa-regular fa-pen-to-square';
        btnEdit.appendChild(iconEdit);

        btnRemove.className = 'delete col btn btn-secondary"';
        iconRemove.className = 'fa-regular fa-trash-can';
        btnRemove.appendChild(iconRemove);

        input.value = task.title;
        input.className="btn btn-secondary mt-1"
        input.disabled = true;

        p.appendChild(input);

        input.type = 'text';
        li.className="row m-2"
        p.className="btn-group col-8";

        li.append(btn, p, btnEdit,btnRemove);

        input.style.textDecoration = 'none';
        ul.appendChild(li);

        if (task.completed) {
            btn.className = 'on bi bi-check col-1';
            input.style.textDecoration = 'line-through';
        } else {
            btn.className = 'off bi-x-lg col-1';
            input.style.textDecoration = 'none';
        }

        btn.addEventListener('click', async () => {
            await complete(task);
            await render();
        });

        btnEdit.addEventListener('click', () => {
           edit(input, iconEdit, task);
        });

        btnRemove.addEventListener('click', async () => {
            await deleteTask(task.id);
            await render();
        });
    }
}


const complete = async (task) => {
    await fetch('/task/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: task.id,
            deadline: task.deadline,
            completed: task.completed,
            title: task.title,
        }),
    });
};


let flagForEdit = true;

const edit = async (input, iconEdit, task) => {

    if (iconEdit.className === 'fa-regular fa-pen-to-square' && flagForEdit) {
        iconEdit.className = 'fa-solid fa-check';
        input.disabled = false;
        input.addEventListener('keypress', (e) => (e.key === 'Enter' ? this.edit(input, iconEdit, task) : ''));
        flagForEdit = false;
    } else if (input.value !== '' && iconEdit.className === 'fa-solid fa-check') {
       console.log('tu');
        await fetch('/task/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: task.id,
                deadline: task.deadline,
                completed: task.completed,
                title: input.value,
            }),
        });
        flagForEdit = true;
        await render();
    }
};

const addTask = async () => {
    if (inputText.value.length > 0) {
        await fetch('/task/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: inputText.value,

            }),
        });
        inputText.value = '';
        await render();
    }
};

async function deleteTask(nr) {
    await fetch('/task/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: nr,
        }),
    });
}

btnAdd.addEventListener('click', async () => await addTask());
inputText.addEventListener('keypress', async (e) => (e.key === 'Enter' ? await addTask() : ''));

all.addEventListener('click', () => {
    i = 0;
    all.classList.add('on');
    active.classList.remove('on');
    completed.classList.remove('on');
    render();
});
active.addEventListener('click', () => {
    i = 1;
    all.classList.remove('on');
    active.classList.add('on');
    completed.classList.remove('on');
    render();
});
completed.addEventListener('click', () => {
    i = 2;
    all.classList.remove('on');
    active.classList.remove('on');
    completed.classList.add('on');
    render();
});
clear.addEventListener('click', async () => {
    await fetch('/filter/clear-completed', {
        method: 'POST',
    });
    i = 0;
    render();
});

render();