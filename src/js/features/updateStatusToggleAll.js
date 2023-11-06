import todoRepository from "../entities/todoRepository";
import { toggleAll } from "../entities/dom";

function updateStatusToggleAll() {
    if (todoRepository.tasks.length === 0) {
        return toggleAll.checked = false;
    }
    todoRepository.tasks.every((task) => task.done ? toggleAll.checked = true : toggleAll.checked = false);
}

export default updateStatusToggleAll;