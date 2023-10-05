<template>
  <div class="register-container">
    <div class="register-form">
      <h2 class="register-title">Sign up</h2>
      <div class="register-description">
        Before we start, please enter your current location.
      </div>
      <form @submit.prevent="register">
        <div class="input-container">
          <label class="form-label">Email</label>
          <input
            class="input-field"
            type="text"
            placeholder="Email address"
            v-model="email"
          />

          <label class="form-label">Password</label>
          <input
            class="input-field"
            type="password"
            placeholder="Password"
            v-model="password"
          />

          <label class="form-label">Confirm Password</label>
          <input
            class="input-field"
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
          />

          <div class="error-message" v-if="errorMessage">
            {{ errorMessage }}
          </div>
        </div>

        <div class="button-container">
          <button type="submit" :disabled="loading" class="signup-button">
            Sign up
          </button>
        </div>
      </form>

      <div class="signin-link-container">
        Already registered?
        <NuxtLink to="/login">Sign in to your account</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);
const supabase = useSupabaseClient();

const register = async () => {
  if (email.value && password.value && confirmPassword.value) {
    if (password.value === confirmPassword.value) {
      loading.value = true;
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      });
      console.log(data);
      if (error) {
        loading.value = false;
        errorMessage.value = "Registration failed";
        setTimeout(() => {
          errorMessage.value = "";
        }, 5000);
      }
    } else {
      errorMessage.value = "Passwords do not match!";
    }
  } else {
    errorMessage.value = "Please fill all the fields!";
  }
};
</script>
<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.register-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.register-description {
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

.signup-button {
  background-color: #ae7aff;
  font-weight: bold;
  border-radius: 2px;
  border: 1px solid #000;
  width: 100%;
  padding: 16px;
  box-shadow: 4px 4px 0px 0px #000;
  cursor: pointer;
}

.signin-link-container {
  margin: 16px;
}

.error-message {
  color: red;
  margin: 10px 0;
}
</style>
