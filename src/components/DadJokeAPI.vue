<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const joke = ref('');
const isLoading = ref(false);

const fetchJoke = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' }
    });
    joke.value = res.data.joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    joke.value = 'Failed to load joke. Is your internet okay?';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchJoke();
});
</script>

<template>
  <div class="container">
    <div class="joke-card">
      <div class="icon-header">😂</div>
      <h2>Dad Joke</h2>
      
      <div class="content-area">
        <p v-if="joke" class="joke-text">{{ joke }}</p>
        <div v-else-if="isLoading" class="loader">Getting a good one...</div>
      </div>

      <button @click="fetchJoke" :disabled="isLoading" class="btn-primary">
        {{ isLoading ? 'Thinking...' : 'Tell me another' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Container to center everything on the screen */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 20px;
}

/* The Card */
.joke-card {
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  width: 100%;
  text-align: center;
  border: 1px solid #f0f0f0;
  transition: transform 0.2s ease;
}

.icon-header {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  color: #1a1a1a;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
}

.content-area {
  min-height: 100px; /* Prevents card from jumping size */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.joke-text {
  font-size: 1.15rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin: 0;
}

/* Modern Button */
.btn-primary {
  background: #6366f1; /* Indigo */
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-primary:hover:not(:disabled) {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  background: #c7d2fe;
  cursor: not-allowed;
}

.loader {
  color: #94a3b8;
  font-style: italic;
}
</style>