<script setup>
import { ref } from "vue";
import TodoList from "./TodoList.vue";

// parent data
const todos = ref(["Vue", "NestJS", "TypeScript"]);
const newTodo = ref("");

// delete todo
const deleteItems = (index) => {
  todos.value.splice(index, 1);
};

// add new todo
const addItems = () => {
  if (newTodo.value.trim() === "") return;
  todos.value.push(newTodo.value);
  newTodo.value = "";
};
</script>

<template>
  <div class="max-w-md w-full mx-auto mt-10 px-4">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-blue-600 text-center mb-6">
      My Todo App 🚀
    </h1>

    <!-- Input + Add Button -->
    <form class="flex gap-2 mb-6">
      <input
        type="text"
        v-model="newTodo"
        placeholder="Add a new task..."
        class="flex-1 border-none rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        v-if="newTodo.length > 0"
        @click="addItems"
        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add
      </button>
    </form>

    <!-- Todo List -->
    <div>
      <TodoList :todos="todos" @deleteItems="deleteItems" />
    </div>
  </div>
</template>
