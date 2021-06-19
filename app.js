"use strict";

require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showListCheckList,
} = require("./helpers/inquirer");

const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/Tasks");

const main = async () => {
  let option = "";
  const tasks = new Tasks();
  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    option = await inquirerMenu();

    switch (option) {
        case "1":
            const desc = await readInput("Descripción:");
            tasks.createTask(desc);
            break;
        case "2":
            tasks.getAllList();
            break;
        case "3":
            tasks.getCompletedList(true);
            break;
        case "4":
            tasks.getCompletedList(false);
            break;
        case "5":
			if (!tasks.arrList.length) {
				console.log('  No hay tareas'.cyan);
				break;
            }
            const ids = await showListCheckList(tasks.arrList, true);
            tasks.toggleCompleted(ids);
            break;
        case "6":
            if (!tasks.arrList.length) {
				console.log('  No hay tareas'.cyan);
				break;
            }
            const ids2 = await showListCheckList(tasks.arrList, false);
			if (ids2.length === 0) {
				console.log('  No seleccionó ninguna tarea'.cyan);
				break;
			}
            const ok = await confirm("¿Está seguro?");
            if (ok) {
				tasks.deleteTasks(ids2);
				console.log("\n  Tareas borradas correctamente".cyan);
            }
            break;
    }

    saveDB(tasks.arrList);
    if (option !== "0") await pause();
    else console.log("  Que tenga un buen día".cyan);
  } while (option !== "0");
};

main();
