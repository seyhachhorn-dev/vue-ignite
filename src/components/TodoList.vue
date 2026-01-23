<script setup>
const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(["deleteItems","toggleComplete", "changeFilter"])
</script>

<template>
  <ul class="space-y-3">
    <div class="flex justify-center gap-2 mb-4 pointer-cursor">
      <button
      v-for="f in ['all','active','done']"
      :key="f"
      @click="emit('changeFilter',f)"
      :class="{'text-blue-600 font-bold border-b-2 border-blue-600': activeFilter === f}"
      class="capitalize px-2 pb-1"
      >
      {{ f }}

      </button>
      
    </div>
    <li
      v-for="todo in todos"
      :key="todo.id"
      class="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition"
    >
      <span 
      :class="{ 'line-through text-gray-500': todo.completed }"
      class="text-gray-800 text-sm cursor-pointer select-none" 
      @click="emit('toggleComplete',todo.id)">
      {{ todo.content }}
    </span>
      <button
        @click="emit('deleteItems', todo.id)"
        class="text-red-500 hover:text-red-700 font-medium text-sm"
      >
        Delete
      </button>
    </li>
  </ul>

  <p v-if="todos.length === 0" class="text-center text-gray-500 mt-4">
    No todo items yet.
  </p>
</template>
