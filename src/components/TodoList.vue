<script setup>
const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(["deleteItems"])
</script>

<template>
  <ul class="space-y-3">
    <li
      v-for="(item, index) in todos"
      :key="index"
      class="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition"
    >
      <p class="text-gray-800 text-sm">{{ item }}</p>
      <button
        @click="$emit('deleteItems', index)"
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
