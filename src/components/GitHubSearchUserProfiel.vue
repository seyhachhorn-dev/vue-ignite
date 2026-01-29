<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const username = ref('');
const userProfile = ref(null);
const error = ref(null);
const message = ref(null)

const fetchUserProfile = async () => {
    if (!username.value) {
        userProfile.value = null;
        error.value = null;
        return;
    }
    try {
        const res = await axios.get(`https://api.github.com/users/${username.value}`, {
            headers: {
                Authorization:`token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                Accept: 'application/json'
            }
        })

        userProfile.value = res.data;
        message.value = 'User profile loaded successfully.';
        console.log(res.data);

    } catch (error) {
        console.error('Error fetching GitHub user profile:', error);
        userProfile.value = null;
        error.value = 'Failed to load user profile. Please check the username or your internet connection.';

    }
}



</script>
<template>
  <div class="github-search">
    <div class="search-box">
      <h1>GitHub Profile Finder</h1>
      <input 
        type="text" 
        v-model="username" 
        @keyup.enter="fetchUserProfile" 
        placeholder="Type a username and press Enter..."
      />
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>

    <div v-if="userProfile" class="profile-card">
      <div class="card-header">
        <img :src="userProfile.avatar_url" :alt="userProfile.login" />
        <div class="names">
          <h2>{{ userProfile.name || 'No Name Provided' }}</h2>
          <p class="login">@{{ userProfile.login }}</p>
        </div>
      </div>

      <div class="card-body">
        <p class="bio">{{ userProfile.bio || 'This user has no bio.' }}</p>
        
        <div class="stats">
          <div class="stat">
            <strong>{{ userProfile.public_repos }}</strong>
            <span>Repos</span>
          </div>
          <div class="stat">
            <strong>{{ userProfile.followers }}</strong>
            <span>Followers</span>
          </div>
          <div class="stat">
            <strong>{{ userProfile.following }}</strong>
            <span>Following</span>
          </div>
        </div>
      </div>

      <a :href="userProfile.html_url" target="_blank" class="view-btn">
        View Full Profile
      </a>
    </div>
  </div>
</template>

<style scoped>
.github-search { font-family: 'Segoe UI', sans-serif; max-width: 450px; margin: 40px auto; padding: 20px; }
.search-box h1 { font-size: 1.5rem; color: #24292e; text-align: center; }
input { width: 100%; padding: 12px; margin: 15px 0; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }

.error-msg { color: #d73a49; font-size: 0.9rem; text-align: center; }

/* Card Styling */
.profile-card { background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.card-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
.card-header img { width: 80px; height: 80px; border-radius: 50%; border: 2px solid #24292e; }
.names h2 { margin: 0; font-size: 1.25rem; }
.login { margin: 0; color: #586069; }

.bio { font-size: 0.95rem; line-height: 1.5; color: #24292e; margin-bottom: 20px; }

.stats { display: flex; justify-content: space-around; background: #f6f8fa; padding: 15px; border-radius: 8px; }
.stat { text-align: center; }
.stat strong { display: block; font-size: 1.1rem; }
.stat span { font-size: 0.8rem; color: #586069; }

.view-btn { display: block; text-align: center; background: #24292e; color: white; text-decoration: none; padding: 10px; border-radius: 6px; margin-top: 20px; font-weight: bold; }
.view-btn:hover { background: #444; }
</style>