<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">Sign in</h2>
      <div class="login-description">
        Enter your account details or Login Using Google or Github
      </div>
      <form @submit.prevent="login">
        <div class="input-container">
          <label class="form-label"> Email </label>
          <input
            class="input-field"
            type="text"
            placeholder="Email address"
            v-model="email"
          />
          <label class="form-label"> Password </label>
          <input
            class="input-field"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <div class="button-container">
          <button type="submit" :disabled="loading" class="login-button">
            Sign in
          </button>
        </div>
      </form>

      <div class="divider">
        <div class="line"></div>
        or
        <div class="line"></div>
      </div>

      <div class="external-login-container">
        <button @click="loginWithGoogle" class="third-party-button">
          Login with Google
        </button>
        <button @click="loginWithGithub" class="third-party-button">
          Login with GitHub
        </button>
      </div>

      <div class="register-link-container">
        You don’t have an account?
        <NuxtLink to="/signup"><b>Create an account</b></NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Login to Tech Chronicles"
});

const user = useSupabaseUser();
const loading = ref(false);
const authError = ref("");
const email = ref("");
const password = ref("");
const supabase = useSupabaseClient();

watchEffect(async () => {
  if (user.value) {
    const { auth } = useSupabaseClient();
    const sessionToken = await auth.getSession();

    if (sessionToken && sessionToken.data && sessionToken.data.session) {
      const authToken = sessionToken.data.session.access_token;

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ authToken })
      });

      // handle the response as necessary
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await navigateTo("/");
      } else {
        console.error("Failed to login:", await response.text());
      }
    }
  }
});

const login = async () => {
  loading.value = true;
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  if (error) {
    loading.value = false;
    authError.value = "Invalid login credentials";
    setTimeout(() => {
      authError.value = "";
    }, 5000);
  }
};

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google"
  });
  if (error) authError.value = error.message;
};

const loginWithGithub = async () => {
  const response = await supabase.auth.signInWithOAuth({
    provider: "github"
  });
  console.log(response.data);
};

const clearError = () => {
  authError.value = "";
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.login-description {
  font-size: 14px;
  margin-bottom: 16px;
  color: #5f646d;
}

.form-label {
  font-size: 12px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 16px;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 16px;
  padding: 16px;
  min-width: 300px;
}

.login-button {
  background-color: #ae7aff;
  font-weight: bold;
  border-radius: 2px;
  border: 1px solid #000;
  width: 100%;
  padding: 16px;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
}

.divider {
  display: flex;
  margin: 16px;
  align-items: center;
  justify-content: center;
}

.third-party-button {
  font-weight: bold;
  border-radius: 2px;
  border: 1px solid #000;
  min-width: 300px;
  padding: 16px;
  box-shadow: 4px 4px 0px 0px #000;
  margin-bottom: 16px;
  cursor: pointer;
}
.external-login-container {
  display: flex;
  flex-direction: column;
}

.register-link-container {
  margin: 16px;
}
</style>
