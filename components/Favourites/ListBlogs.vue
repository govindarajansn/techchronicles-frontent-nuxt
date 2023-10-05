<template>
  <div class="fav-container">
    <div class="fav-grid">
      <div v-if="favorites.length > 0">
        <div v-for="favorite in favorites" :key="favorite.id">
          <FavouritesFavBlogs :blog="favorite.blog" />
        </div>
      </div>
      <div v-else class="no-favorites">
        Add Favorites in Blog page
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["favorites"]);
</script>

<style scoped>

.no-favorites {
  margin-left: 8px;
}
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
