<template>
  <header class="app-header">
    <nav class="top-navbar">
      <div class="title-section">
        <logo></logo>
        <h1 class="title">Tech Chronicles</h1>
      </div>
      <ul class="nav-links">
        <li class="nav-item">
          <nuxt-link to="/">Blogs</nuxt-link>
        </li>
        <li v-if="user && user.value" class="nav-item">
          <nuxt-link to="/favorites">Favorites</nuxt-link>
        </li>
        <li v-if="user && user.value" class="nav-item">
          <nuxt-link to="/feeds">Feeds</nuxt-link>
        </li>
        <li v-if="user && user.value" class="nav-item">
          <nuxt-link to="/profile">Profile</nuxt-link>
          <button class="logout-button" @click="userLogout">Logout</button>
        </li>
        <li v-else class="nav-item">
          <nuxt-link to="/login">
            <button class="logout-button">Login / Signup</button>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import logo from "./icons/logo.vue"; // Ensure you import from the correct location
const { auth } = useSupabaseClient();
const user = ref(null);
user.value = useSupabaseUser();

const userLogout = async () => {
  await auth.signOut();
  navigateTo("/login"); // Ensure navigateTo is imported or replace with appropriate method
};
</script>

<style scoped>
.app-header {
  background: #faf4f0;
  color: #000000;
  border-bottom: 1px dotted black;
  margin: 0 16px;
}
.title-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
h1.title {
  padding: 16px;
  font-size: 24px;
  cursor: pointer;
}
.top-navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
}

.nav-item {
  font-weight: bold;
  font-size: 14px;
  margin: 0 16px;
  cursor: pointer;
}
.logout-button {
  padding: 8px;
  border-radius: 2px;
  background-color: #ae7aff;
  font-weight: bold;
  border-radius: 2px;
  margin-left: 16px;
  border: 1px solid #000;
  padding: 8px;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
}
</style>
