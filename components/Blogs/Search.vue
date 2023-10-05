<template>
  <div class="search-container">
    <div class="input-container">
      <input
        v-model="searchTerm"
        placeholder="Search Companies !!!"
        class="search-input"
        @input="checkSearchTerm"
      />
      <div class="search-button" @click="performSearch"><glass /></div>
      <div v-if="searchTerm && searchResults.length" class="results-container">
        <ul>
          <li v-for="blog in searchResults" :key="blog.id">
            <a :href="blog.blogurl" target="_blank" class="search-result-item">
              <img :src="blog.image" alt="Blog logo" class="blog-image" />
              {{ blog.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="tags-container">
    <div class="suggest-search-description">Suggested Searches</div>
    <div class="suggested-search-items">
      <div class="search-item">Google</div>
      <div class="search-item">Figma</div>
      <div class="search-item">LinkedIn</div>
      <div class="search-item">Meta</div>
      <div class="search-item">Airbnb</div>
    </div>
  </div>
</template>

<script setup>
import glass from "../icons/glass.vue";
const searchTerm = ref("");
const searchResults = ref([]);

const checkSearchTerm = () => {
  if (!searchTerm.value.trim()) {
    searchResults.value = []; // Clears the search results when search term is empty
  }
};

const performSearch = async () => {
  if (searchTerm.value.trim()) {
    try {
      const config = useRuntimeConfig()
      const response = await fetch(
        `${config.public.apiUrl}/v1/blogs/search?search=${searchTerm.value}`
      );
      if (response.ok) {
        searchResults.value = await response.json();
      } else {
        console.error("Error fetching search results:", await response.text());
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  }
};
</script>

<style scoped>
.blog-image {
  width: 30px; /* or any other size you prefer */
  height: 30px;
  margin-right: 8px;
}

.results-container {
  position: absolute;
  background-color: white;
  top: 50px;
  border: 1px solid black;
  border-top: 1px solid lightgray;
  width: 100%;
}

.search-result-item {
  padding: 16px;
  display: flex;
  align-items: center;
}
.search-container {
  margin: 16px 0 16px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.suggested-search-items {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dotted black;
}

.search-item {
  background-color: #000;
  color: white;
  min-width: 60px;
  text-align: center;
  font-weight: bold;
  padding: 8px;
  margin: 16px 16px 16px 16px;
}
.suggest-search-description {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.search-input {
  padding: 4px 10px;
  border: none;
  outline: none;
  background: white;
  display: flex;
  min-width: 350px;
}

.input-container {
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 1px;
  border: 1px solid var(--000000-solid, #000);
  box-shadow: 4px 4px 0px 0px #000;
  position: relative;
}

.search-button {
  background-color: #ae7aff;
  border-radius: 2px;
  border: 1px solid #000;
  padding: 5px;
}
</style>
