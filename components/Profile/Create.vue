<template>
  <div class="profile-main-container">
    <h1 class="profile-heading-1">Profile</h1>
    <div class="neo-brutalism-form">
      <label for="name">First Name:</label>
      <input
        type="text"
        class="profile-input-field"
        id="name"
        v-model="fname"
      />
      <label for="name">Last Name:</label>
      <input type="text" id="name" v-model="lname" />
      <label for="name">Short Bio:</label>
      <input type="text" id="name" v-model="shortBio" />
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        :disabled="true"
        class="email"
      />
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
const url = "http://localhost:3001/v1/profile";

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
  const url = "http://localhost:3001/v1/profile";
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
