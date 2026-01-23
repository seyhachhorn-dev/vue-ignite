import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useTodoStore = defineStore('todos',() =>{
    const todos = ref([])
    
const remainingTodos = computed(() => {
  return todos.value.filter(t => !t.completed).length;
})

// add new todo
const addItems = () => {
  if (newTodo.value.trim() === "") return;
  todos.value.push({
    content: newTodo.value,
    completed: false,
    id: Date.now(),
  });
  newTodo.value = "";
};
return {todos, remainingTodos, addItems}
})