'use strict';

const Task = require("./Task");

class Tasks {

    constructor() {
        this._list = {};
    }

    get arrList() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    createTask(desc = '') {
        const task = new Task(desc);

        this._list[task.id] = task;
    }

    getAllList() {
        console.log();
        if (!this.arrList.length) return console.log('  No hay tareas'.cyan);

        this.arrList.forEach((task, i) => {
            const id = `${i + 1}.`.cyan;
            const {description, completeIn} = task;
            const state = completeIn ? 'Completada'.green : 'Pendiente'.red;

            console.log(`  ${id} ${description}   ${state}`);
        });
    }

    getCompletedList(completed = true) {
        console.log();
        let count = 1;
        this.arrList.forEach((task, i) => {
            const {description} = task;
            const id = `${i + 1}`.green;

            if (completed && task.completeIn) {
                console.log(`  ${`${count}.`.cyan} ${description}  ${'Completada'.green}`);
                count++;
            
            } else if (!completed && !task.completeIn) {
                console.log(`  ${`${count}.`.cyan} ${description}  ${'Pendiente'.red}`);
                count++;
            }
        });

        if (count === 1) {
            console.log(completed ? '  No hay tareas completadas'.cyan : '  No hay tareas pendientes'.cyan);
        }
    }

    deleteTasks(ids = []) {
        ids.forEach(id => {
            if (this._list[id]) delete this._list[id];
        });
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completeIn) {
                task.completeIn = new Date().toISOString();
            }
        });

        this.arrList.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completeIn = null;
            }
        });
    }
}

module.exports = Tasks;