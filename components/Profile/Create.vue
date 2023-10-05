<template>
  <div class="neo-brutalism-profile">
    <img :src="data.image_url != null ? data.image_url : '/defaultProfile.jpeg'" alt="Profile Image"
      class="profile-image" />
    <h1>{{ fname }} {{ lname }}</h1>
    <!-- <div class="info-spec">{{ profile.role }} at {{ profile.company }}</div> -->
    <div class="dotted-line"></div>
    <div class="label-block">
      <h3 class="profile-heading-3">Short Bio</h3>
      <div class="profile-bio">{{ shortBio }}</div>
    </div>
    <div class="label-block">
      <h5 class="profile-heading-4">Email</h5>
      <div class="profile-bio">{{ email }}</div>
    </div>
    <div class="label-block">
      <h5 class="profile-heading-4">LinkedIn Url</h5>
      <div class="profile-bio">{{ linkedInUrl }}</div>
    </div>
    <div class="label-block">
      <h5 class="profile-heading-4">GitHub Url</h5>
      <div class="profile-bio">{{ gitHubUrl }}</div>
    </div>
  </div>
  <div class="vertical-dotted"></div>
  <div class="profile-main-container">
    <h1 class="profile-heading-1">Profile</h1>
    <div class="neo-brutalism-form">
      <label for="name">First Name:</label>
      <input type="text" class="profile-input-field" id="name" v-model="fname" />
      <label for="name">Last Name:</label>
      <input type="text" id="name" v-model="lname" />
      <label for="name">Short Bio:</label>
      <input type="text" id="name" v-model="shortBio" />
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" :disabled="true" class="email" />
      <label for="name">LinkedIn:</label>
      <input type="text" id="name" v-model="linkedInUrl" />
      <label for="name">GitHub:</label>
      <input type="text" id="name" v-model="gitHubUrl" />
      <div class="button-style">
        <button type="submit" @click="UpdateProfile">Update Settings</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const fname = ref("");
const lname = ref("");
const shortBio = ref("");
const email = ref("");
const linkedInUrl = ref("");
const gitHubUrl = ref("");

const { auth } = useSupabaseClient();
const sessionToken = await auth.getSession();

const authToken = sessionToken.data.session.access_token;
const url = `${config.apiUrl}/v1/profile`;

const { data } = await useFetch(url, {
  method: "GET",
  headers: {
    "tc-user-token": `${authToken}`,
    "Content-Type": "application/json"
  }
});

if (data) {
  fname.value = data.value.first_name;
  lname.value = data.value.last_name;
  shortBio.value = data.value.description;
  email.value = data.value.email; // Assuming the backend also returns an email.
  linkedInUrl.value = data.value.linkedin_url;
  gitHubUrl.value = data.value.github_url;
}
const UpdateProfile = async () => {
  const { auth } = useSupabaseClient();
  const sessionToken = await auth.getSession();
  const authToken = sessionToken.data.session.access_token;
  const url = `${config.apiUrl}/v1/profile`;
  const payload = {
    first_name: fname.value,
    last_name: lname.value,
    description: shortBio.value,
    linkedin_url: linkedInUrl.value,
    github_url: gitHubUrl.value
  };

  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "tc-user-token": `${authToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
};
</script>

<style scoped>
.dotted-line {
  margin-top: 15px;
  margin-bottom: 10px;
  border-bottom: 1px dotted #bbb7b4;
  width: 100%;
}

.vertical-dotted {
  border-left: 1px dotted #bbb7b4;
  margin-left: 10px;
  margin-right: 10px;
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

.profile-main-container {
  margin: 20px;
}

.email {
  opacity: 0.5;
}

.neo-brutalism-form {
  min-width: 400px;
  padding: 0 25px 25px 25px;
  background-color: #ffffff;
  border: 1px solid black;
}

.button-style {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.neo-brutalism-form input {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  color: black;
  margin-top: 5px;
  outline: none;
}

.profile-heading-1 {
  text-align: center;
  padding: 15px;
  margin: 0;
  background-color: #ae7aff;
  border: 1px solid black;
}

.neo-brutalism-form label {
  display: block;
  margin-top: 15px;

  color: black;
}

.neo-brutalism-form button {
  padding: 10px;
  color: black;
  background-color: #ae7aff;
  border: 1px solid black;
  cursor: pointer;
}

.neo-brutalism-form button:hover {
  background-color: rgb(226, 180, 233);
}
</style>
