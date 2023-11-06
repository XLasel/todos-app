import { toggleAll } from "../entities/dom";
import todoRepository from "../entities/todoRepository";
import updateCounter from "../features/updateCounter";
import localStorageHandler from "../features/localStorageHandler";

function handleToggleAll() {
    const isChecked = toggleAll.checked;

    todoRepository.tasks.forEach(function (task) {
        task.done = isChecked;
        const taskElement = document.getElementById(task.id);
        taskElement.classList.toggle('task_completed', isChecked);
        taskElement.querySelector('.task__toggle').checked = isChecked;
    });

    localStorageHandler.saveTasks();
    updateCounter();
}

export default handleToggleAll;