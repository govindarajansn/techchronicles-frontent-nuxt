<template>
  <div>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import PostCard from "./PostCard/PostCard.vue";
const props = defineProps(["posts"]);
</script>
