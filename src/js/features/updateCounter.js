import { todoRepository, counter } from "../entities";

export function updateCounter() {
  const count = todoRepository.tasks.reduce(
    (total, task) => (task.done === true ? total : total + 1),
    0,
  );
  const textCase = count === 0 || count === 1 ? "item" : "items";
  counter.textContent = `${count} ${textCase} left`;
};
