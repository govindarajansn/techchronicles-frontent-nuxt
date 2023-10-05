<template>
  <div class="fav-container">
    <div class="fav-grid">
      <div v-for="favorite in favorites" :key="favorite.id">
        <FavouritesFavBlogs :blog="favorite.blog" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["favorites"]);
</script>

<style scoped>
.fav-grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 16px;
}

.card-grid ::after {
  content: "";
  flex: auto;
}

.fav-container {
  margin: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
