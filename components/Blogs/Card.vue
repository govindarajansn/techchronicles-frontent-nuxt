<template>
  <div class="blog-container">
    <div class="card">
      <div @click="addToFavorites(blog)" class="favorite-icon">
        <heartFilled v-if="isFavorited" class="favorited" />
        <heartOutline v-else class="not-favorited" />
      </div>
      <div class="blog-img-container">
        <img class="blog-img" :src="blog.image" :alt="blog.name" />
      </div>
      <a :href="blog.blogurl" class="custom-link" target="_blank"
        ><div class="blog-card">{{ blog.name }}</div></a
      >
      <div class="icons-container">
        <div class="icon">
          <Star></Star>
          {{
            blog && blog.ratings && blog.ratings.length > 0
              ? blog.ratings[0].rating
              : "0.0"
          }}
        </div>
        <div class="icon" @click="share">
          <Share></Share>
        </div>
        <div class="icon">
          <a :href="blog.blogurl" target="_blank"
            ><ExternalLink></ExternalLink
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import heartOutline from "../icons/heartOutline.vue";
import heartFilled from "../icons/heartFill.vue";
import openlink from "../icons/openlink.vue";
import Share from "../icons/Share.vue";
import Star from "../icons/Star.vue";
import ExternalLink from "../icons/ExternalLink.vue";

const props = defineProps({
  blog: Object,
  isFavorite: Boolean
});

const share = () => {
  window.navigator.share();
};
const isFavorited = ref(props.isFavorite);

const addToFavorites = async (blog) => {
  const { auth } = useSupabaseClient();
  const sessionToken = await auth.getSession();
  const authToken = sessionToken.data.session.access_token;
  const url = `${config.public.apiUrl}/v1/favorites`;
  const payload = {
    companyBlogId: blog.id
  };

  console.log(authToken);
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "tc-user-token": `${authToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    isFavorited.value = !isFavorited.value; // Change the icon's color to red if the request was successful
  } catch (error) {
    console.error("Error adding to favorites:", error);
    // Handle the error accordingly
  }
};
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

.custom-link {
  text-decoration: none;
  color: black;
  cursor: pointer;
}

.card {
  background: #fff;
  min-width: 180px;
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

.blog-card {
  margin: 0;
  font-size: 20px;
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
