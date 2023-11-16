import { todoRepository } from "../entities";

export const localStorageHandler = {
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(todoRepository.tasks));
  },

  getTasks() {
    if (localStorage.getItem("tasks")) {
      todoRepository.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  },
};
