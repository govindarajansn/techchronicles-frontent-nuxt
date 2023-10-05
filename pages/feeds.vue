<template>
  <div class="feed-container">
    <div class="input-container">
      <input
        v-model="urlToPost"
        placeholder="share blog url"
        class="post-feed-input"
      />
      <button @click="postUrl" class="send-button">Post</button>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <div class="feeds-container">
      <Feed :posts="data" />
    </div>
  </div>
</template>

<script setup>
import Feed from "../components/feeds/Feed.vue";
import { ref } from "vue";

const { auth } = useSupabaseClient();

const urlToPost = ref("");
const errorMessage = ref("");

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const postUrl = async () => {
  if (!isValidUrl(urlToPost.value)) {
    errorMessage.value = "Please enter a valid URL.";
    return;
  }
  const sessionToken = await auth.getSession();
  const authToken = sessionToken.data.session.access_token;
  const response = await fetch(`${config.apiUrl}/v1/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "tc-user-token": `${authToken}`
    },
    body: JSON.stringify({ content: urlToPost.value })
  });

  if (response.ok) {
    const newPost = await response.json();
    console.log(newPost);
    data.value.unshift(newPost); // Assuming the server returns the created post.
    urlToPost.value = ""; // Clearing the input.
  } else {
    console.error("Failed to post the URL", await response.text());
  }
};

// Initial fetch to get existing posts
const { data } = await useFetch(`${config.apiUrl}/v1/post`);
</script>

<style scoped>
.feed-container {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-feed-input {
  padding: 4px 16px;
  border: none;
  outline: none;
  background: white;
  display: flex;
  min-width: 350px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.input-container {
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-shadow: 4px 4px 0px 0px #000;
  margin-bottom: 32px;
}

.feed {
  min-height: 200px;
}

.user-image {
  height: 32px;
  width: 32px;
  color: crimson;
  border: 1px solid crimson;
  border-radius: 50%;
}

.send-button {
  background-color: #ae7aff;
  font-weight: bold;
  border-radius: 2px;
  border: 1px solid #000;
  padding: 12px;
  margin-left: 8px;
}
</style>
