<script setup>
import { ref } from "vue";

const items = ref([
  {
    title: "What is Vue.js?",
    content:
      "Vue.js is a progressive JavaScript framework used to build user interfaces and single-page applications. It is easy to learn, flexible, and performant.",
    isOpen: false,
  },
  {
    title: "Why should I use Vue.js?",
    content:
      "Vue.js offers a simple syntax, reactive data binding, component-based architecture, and excellent performance, making it ideal for both small and large projects.",
    isOpen: false,
  },
  {
    title: "Is Vue.js easy to learn for beginners?",
    content:
      "Yes. Vue.js has a gentle learning curve, clear documentation, and uses familiar HTML, CSS, and JavaScript, which makes it beginner-friendly.",
    isOpen: false,
  },
  {
    title: "What is the difference between Vue and React?",
    content:
      "Vue focuses on simplicity and flexibility, while React emphasizes functional programming and JSX. Both are powerful, but Vue is often easier to start with.",
    isOpen: false,
  },
]);

const toggleAccordion = (index) => {
  items.value = items.value.map((item, i) => ({
    ...item,
    isOpen: i === index ? !item.isOpen : false,
  }));
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-14 px-4">
    <!-- Title -->
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">
      Frequently Asked Questions
    </h2>

    <div class="space-y-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <!-- Question -->
        <button
          @click="toggleAccordion(index)"
          class="w-full flex items-center justify-between p-5 
                 text-left font-medium text-gray-800 
                 hover:bg-gray-50 transition"
        >
          <span>{{ item.title }}</span>

          <!-- Arrow -->
          <svg
            class="w-5 h-5 text-gray-500 transform transition-transform duration-300"
            :class="{ 'rotate-180': item.isOpen }"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Answer -->
        <div
          v-show="item.isOpen"
          class="px-5 pb-5 text-gray-600 leading-relaxed"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
