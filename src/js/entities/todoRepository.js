export let todoRepository = {
  tasks: [],

  addTask(taskText) {
    let newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  },

  doneTask(id) {
    const task = this.tasks.find((task) => task.id === id);
    task.done = !task.done;
  },

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  },

  getTask(id) {
    return this.tasks.find((task) => task.id === id) || null;
  },
};
