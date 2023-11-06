import todoRepository from "../entities/ToDoRepository";
import { counter } from "../entities/dom";

function updateCounter() {
    const count = todoRepository.tasks.reduce((total, task) => (task.done === true) ? total : total + 1, 0);
    const textCase = (count === 0 || count === 1) ? 'item' : 'items';
    counter.textContent = `${count} ${textCase} left`;
}

export default updateCounter