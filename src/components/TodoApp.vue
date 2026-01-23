<script setup>
import { ref, onMounted, watch, computed } from "vue";
import TodoList from "./TodoList.vue";
import { useTodoStore } from "../../stores/todosStored";


const store = useTodoStore();

// parent data
const todos = ref([]);
const newTodo = ref("");
const dailyQuote = ref("Loading inspiration...");
const filter = ref('all');

// filtered todos

const filteredTodos = computed(() => {
  if (filter.value === 'done') {
    return todos.value.filter(t => t.completed);
  }
  if (filter.value === 'active') {
    return todos.value.filter(t => !t.completed);
  }
  else {
    return todos.value;
  }

})

// count not completed todos


// function (t) {
//   return !t.completed;
// }


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
const deleteItems = (id) => {
  todos.value = todos.value.filter(t => t.id !== id);
};




// toggle complete todo

const toggleComplete = (id) => {
  const todo = todos.value.find(t => t.id === id);
  if (todo) todo.completed = !todo.completed;
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
    <div class="flex justify-between items-center mb-4 text-sm text-gray-600">
      <span>{{ store.remainingTodos }} items left to do</span>
      <button v-if="todos.some(t => t.completed)" @click = "todos = todos.filter(t => !t.completed)"
        class="hover:text-red-500 underline"
        >
        Clear Completed
      </button>

    </div>
    <p class="text-sm italic text-gray-500 mb-4 text-center">"{{ dailyQuote }}"</p>
    <!-- Title -->
    <h1 class="text-3xl font-bold text-blue-600 text-center mb-6">
      My Todo App 🚀
    </h1>

    <!-- Input + Add Button -->
    <form class="flex gap-2 mb-6" @submit.prevent="store.addItems">
      <input type="text" v-model="newTodo" placeholder="Add a new task..."
        class="flex-1 border-none rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <button type="submit" v-if="newTodo.length > 0"
        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        Add
      </button>
    </form>

    <!-- Todo List -->
    <div>
      <TodoList :todos="filteredTodos" @deleteItems="deleteItems" @toggleComplete="toggleComplete"
        @changeFilter="(val) => filter = val" />

      <!-- you are saying: "When the child emits 'changeFilter', 
        take the value it sent (val) and immediately update my filter variable." -->
    </div>
  </div>
</template>
