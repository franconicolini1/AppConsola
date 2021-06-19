require('colors');

const mostrarMenu = () => {

    return new Promise(res => {
        console.clear();
        console.log('###########################'.cyan);
        console.log('   Seleccione una opción'.cyan);
        console.log('###########################\n'.cyan);

        console.log(`${'1.'.cyan} Crear Tarea`);
        console.log(`${'2.'.cyan} Listar Tareas`);
        console.log(`${'3.'.cyan} Listar Tareas Completadas`);
        console.log(`${'4.'.cyan} Listar Tareas Pendientes`);
        console.log(`${'5.'.cyan} Completar Tarea(s)`);
        console.log(`${'6.'.cyan} Borrar Tarea`);
        console.log(`${'0.'.cyan} Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout 
        });

        readline.question(`Seleccione una opción: `, (option) => {
            readline.close();
            res(option);
        });
    });    
}

const pausa = () => {
    return new Promise(res => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'Enter'.cyan} para continuar\n`, () => {
            readline.close();
            res();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}