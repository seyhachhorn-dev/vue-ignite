<script setup>
import { ref, onMounted, watch } from "vue";
import TodoList from "./TodoList.vue";

// parent data
const todos = ref([]);
const newTodo = ref("");
const dailyQuote = ref("Loading inspiration...");

// fetch api
const getQuote = async () => {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");

    if (!res.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await res.json();
    dailyQuote.value = data.slip.advice;
  } catch (error) {
    console.error(error);
    dailyQuote.value = "Stay focused and keep coding!";
  }
};

console.log(dailyQuote.value);

// delete todo
const deleteItems = (index) => {
  todos.value.splice(index, 1);
};

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


// toggle complete todo

const toggleComplete = (index) =>{
  const todo = todos.value[index];
  todo.completed = !todo.completed;
}


// save into local storage

onMounted(() => {
      getQuote();

  try {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);
    }
  } catch (e) {
    console.error("Error loading todos from localStorage", e);
    localStorage.removeItem('todos');
  }
})

watch(todos, (newValue) => {

  localStorage.setItem('todos', JSON.stringify(newValue))

}, { deep: true })


</script>

<template>
  <div class="max-w-md w-full mx-auto mt-10 px-4">
    <p class="text-sm italic text-gray-500 mb-4 text-center">"{{ dailyQuote }}"</p>
    <!-- Title -->
    <h1 class="text-3xl font-bold text-blue-600 text-center mb-6">
      My Todo App 🚀
    </h1>

    <!-- Input + Add Button -->
    <form class="flex gap-2 mb-6" @submit.prevent="addItems">
      <input type="text" v-model="newTodo" placeholder="Add a new task..."
        class="flex-1 border-none rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <button type="submit" v-if="newTodo.length > 0"
        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        Add
      </button>
    </form>

    <!-- Todo List -->
    <div>
      <TodoList :todos="todos" @deleteItems="deleteItems" @toggleComplete="toggleComplete" />
    </div>
  </div>
</template>
