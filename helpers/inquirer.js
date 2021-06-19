'use strict';

const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.cyan} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.cyan} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.cyan} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.cyan} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.cyan} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.cyan} Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.cyan} Salir`
            },

        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('###########################'.cyan);
    console.log('#  Seleccione una opción  #'.cyan);
    console.log('###########################\n'.cyan);

    const {option} = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {
    const localQuestion = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.cyan} para continuar`
        }
    ];
    
    console.log();
    await inquirer.prompt(localQuestion);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const deleteTaskList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.cyan;

        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    });

    choices.push({
        value: '0',
        name: '0.'.cyan + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showListCheckList = async (tasks = [], marked = false) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.cyan;

        return {
            value: task.id,
            name: ` ${idx} ${task.description}`,
            checked: task.completeIn && marked ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskList,
    confirm,
    showListCheckList
}