<template>
  <div class="blog-container">
    <div class="card">
      <div class="favorite-icon">
        <heartFilled class="favorited" />
      </div>
      <div class="blog-img-container" v-if="blog && blog.image">
        <img class="blog-img" :src="blog.image" :alt="blog.name" />
      </div>

      <h1 class="blog-card-h1" v-if="blog && blog.name">{{ blog.name }}</h1>
    </div>
  </div>
</template>

<script setup>
import heartOutline from "../icons/heartOutline.vue";
import heartFilled from "../icons/heartFill.vue";
defineProps(["blog"]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@600&display=swap");

.blog-container {
  margin: 16px;
}

.blog-img {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  margin: auto;
}

.blog-img-container {
  padding: 10px;
}

.card {
  background: #fff;
  min-width: 150px;
  border: 1px solid var(--000000-solid, #000);
  box-shadow: 2px 2px 0px 0px #000;
  position: relative;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.blog-card-h1 {
  margin: 0;
  font-size: 16px;
  display: flex;
  justify-content: center;
  letter-spacing: 1px;
  padding: 10px;
}

.icons-container {
  display: flex;
  justify-content: space-around;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50px;
  flex: 1;
  border: 1px solid #000;
  padding: 10px;
}
</style>
