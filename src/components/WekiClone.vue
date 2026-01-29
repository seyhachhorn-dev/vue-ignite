<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const results = ref([]);
const error = ref(null);
const isLoading = ref(false);

const performSearch = async (query) => {
    const encodedQuery = encodeURIComponent(query);
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`;

    try {
        isLoading.value = true;
        const res = await fetch(endpoint);
        const data = await res.json();

        if (data.query && data.query.search) {
            results.value = data.query.search;
            error.value = null;
        } else {
            results.value = [];
            error.value = 'No archives match your query.';
        }
    } catch (err) {
        results.value = [];
        error.value = 'The printing press has stalled. Please try again later.';
    } finally {
        isLoading.value = false;
    }
}

const submitSearch = () => {
    if (searchQuery.value.trim() !== '') {
        performSearch(searchQuery.value);
    } else {
        results.value = [];
        error.value = 'A valid headline is required.';
    }
}
</script>

<template>
  <div class="newspaper-container">
    <header class="masthead">
      <div class="edition-info">
        <span>Vol. I ... No. 1</span>
        <span>PHNOM PENH, JANUARY 2026</span>
        <span>Five Cents</span>
      </div>
      <h1 class="logo">The Wikipedia Gazette</h1>
      <div class="divider-double"></div>
    </header>

    <section class="search-section">
      <form @submit.prevent="submitSearch" class="search-form">
        <input type="text" v-model="searchQuery" placeholder="Search the archives..." />
        <button type="submit">Search</button>
      </form>
      <div v-if="isLoading" class="status-msg">Fetching latest dispatches...</div>
      <div v-if="error" class="error-msg">{{ error }}</div>
    </section>

    <main v-if="results.length > 0" class="articles-grid">
      <article v-for="(r, index) in results" :key="r.pageid" class="article-item">
        <h2 class="article-title">{{ r.title }}</h2>
        <div class="article-meta">Special to the Gazette</div>
        <p class="article-snippet" v-html="r.snippet + '...'"></p>
        <a 
          :href="`https://en.wikipedia.org/?curid=${r.pageid}`" 
          target="_blank" 
          class="read-more"
        >
          Continue Reading →
        </a>
      </article>
    </main>
  </div>
</template>

<style scoped>
/* Importing a Serif font to mimic the NYT feel */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Libre+Baskerville&display=swap');

.newspaper-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fcfaf2; /* Slightly yellowed paper color */
  color: #1a1a1a;
  font-family: 'Libre Baskerville', serif;
}

/* Masthead Styles */
.masthead { text-align: center; margin-bottom: 30px; }
.edition-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  text-transform: uppercase;
  border-bottom: 1px solid #1a1a1a;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.logo {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  margin: 10px 0;
  letter-spacing: -1px;
}
.divider-double {
  border-top: 4px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
  height: 3px;
}

/* Search UI */
.search-section { text-align: center; margin-bottom: 40px; padding: 20px; border-bottom: 1px solid #ddd; }
input {
  font-family: inherit;
  padding: 10px;
  border: 1px solid #1a1a1a;
  background: transparent;
  width: 250px;
}
button {
  background: #1a1a1a;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-left: 5px;
}

/* Grid Layout */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  column-rule: 1px solid #ddd; /* Visual column separation */
}

.article-item { border-bottom: 1px solid #eee; padding-bottom: 20px; }
.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  margin: 0 0 10px 0;
  line-height: 1.1;
}
.article-meta {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 10px;
  font-style: italic;
}
.article-snippet { font-size: 0.9rem; line-height: 1.6; margin-bottom: 15px; }
.read-more { font-size: 0.8rem; font-weight: bold; text-decoration: none; color: #1a1a1a; border-bottom: 1px solid #1a1a1a; }

.read-more:hover { color: #d73a49; border-color: #d73a49; }
</style>