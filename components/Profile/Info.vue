<template>
  <div class="neo-brutalism-profile">
    <img
      :src="data.image_url != null ? data.image_url : '/defaultProfile.jpeg'"
      alt="Profile Image"
      class="profile-image"
    />
    <h1>{{ data.first_name }} {{ data.last_name }}</h1>
    <!-- <div class="info-spec">{{ profile.role }} at {{ profile.company }}</div> -->
    <div class="dotted-line"></div>
    <div class="label-block">
      <h3 class="profile-heading-3">Short Bio</h3>
      <div class="profile-bio">{{ data.description }}</div>
    </div>
    <div class="label-block">
      <h5 class="profile-heading-4">Email</h5>
      <div class="profile-bio">{{ data.email }}</div>
    </div>
    <div class="label-block">
      <h5 class="profile-heading-4">LinkedIn Url</h5>
      <div class="profile-bio">{{ data.linkedin_url }}</div>
    </div>
    <div class="label-block">
      <h5 class="profile-heading-4">GitHub Url</h5>
      <div class="profile-bio">{{ data.github_url }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { auth } = useSupabaseClient();
const profile = ref([]);

const sessionToken = await auth.getSession();
const authToken = sessionToken.data.session?.access_token;
const url = "http://localhost:3001/v1/profile";

const { data } = await useFetch(url, {
  method: "GET",
  headers: {
    "tc-user-token": `${authToken}`,
    "Content-Type": "application/json"
  }
});
</script>

<style>
.dotted-line {
  margin-top: 15px;
  margin-bottom: 10px;
  border-bottom: 1px dotted #bbb7b4;
  width: 100%;
}

.neo-brutalism-profile {
  max-width: 250px;
  margin: 40px 10px 40px 40px;
  padding: 30px 0px 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* border: 1px solid black; */
  text-align: center;
}

.label-block {
  padding: 10px 10px 10px 0;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  /* This will make the image round */
  object-fit: cover;
  /* Ensures the image covers the dimensions without distortion */
  border: 1px solid black;
  margin-bottom: 20px;
}

.neo-brutalism-profile h1 {
  text-align: left;
  margin: 0;
}

.profile-heading-3 {
  text-align: left;
  margin: 0;
}
.profile-heading-4 {
  text-align: left;
  margin: 0;
}

.info-spec {
  text-align: left;
}

.profile-bio {
  color: black;
  text-align: left;
  font-size: 14px;
  margin-top: 16px;
}

.neo-brutalism-profile div[id] {
  color: black;
  border-bottom: 3px solid black;
  margin-top: 5px;
  padding-bottom: 10px;
}
</style>
