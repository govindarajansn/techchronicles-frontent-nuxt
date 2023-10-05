<template>
  <div class="title-container">
    <h1 class="title">Favorties</h1>
    <FavouritesListBlogs :favorites="data" />
  </div>
</template>
;

<script setup>
const { auth } = useSupabaseClient();
const favoritesBlog = ref([]);

const sessionToken = await auth.getSession();
const authToken = sessionToken.data.session?.access_token;
const url = `${config.apiUrl}/v1/favorites`;

const { data } = await useFetch(url, {
  method: "GET",
  headers: {
    "tc-user-token": `${authToken}`,
    "Content-Type": "application/json"
  }
});
</script>

<style>
.title-container {
  background: #faf4f0;
  color: #000000;
  border-bottom: 1px dotted black;
  margin: 0 16px;
}

h1.title {
  padding: 16px;
  font-size: 24px;
}
</style>
