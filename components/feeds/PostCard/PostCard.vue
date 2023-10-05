<template>
  <div class="post-card">
    <div class="user-info">
      <img
        :src="post.profile.image_url"
        alt="User Image"
        class="user-image"
        v-if="post.profile.image_url"
      />
      <div class="user-details">
        <span>{{ post.profile.first_name }} {{ post.profile.last_name }}</span>
      </div>
    </div>
    <div class="post-content">
      <a :href="post.content">{{ post.content }}</a>
    </div>
    <div class="like-container">
      <div @click="toggleLike" class="like-icon"><likeFilled></likeFilled></div>
      <div class="like-count">{{ post.likes.length }}</div>
    </div>
  </div>
</template>

<script setup>
import likeFilled from "~/components/icons/likeFilled.vue";
const { post } = defineProps(["post"]);
const toggleLike = async () => {
  try {
    const { auth } = useSupabaseClient();
    const sessionToken = await auth.getSession();
    const authToken = sessionToken.data.session.access_token;
    const bodyData = {
      postId: post.id,
      likeType: "HEART" // Modify this as per your requirements (maybe based on some UI interaction)
    };
    const config = useRuntimeConfig()
    const response = await fetch(`${config.public.apiUrl}/v1/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "tc-user-token": `${authToken}`
      },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      throw new Error("Failed to toggle like");
    }

    const updatedPost = await response.json();

    // Update the post.likes with the new data. This will automatically update the UI.
    post.likes = updatedPost.likes;
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};
</script>

<style scoped>
.post-card {
  background: white;
  margin: 16px;
  padding: 16px;
  border: 1px solid black;
}
.post-content {
  margin: 8px 8px 16px 48px;
}

.user-info {
  display: flex;
  align-items: center;
}
.like-icon {
  margin-right: 8px;
}

.like-count {
  font-weight: bold;
  font-size: 10;
}

.like-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-left: 48px;
}

.user-image {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin-right: 16px;
}
</style>
