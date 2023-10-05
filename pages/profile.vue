<template>
  <div>
    <!-- <BlogsCard/> -->
    <div class="main-profile">
      <ProfileCreate />
    </div>
  </div>
  <!-- {{ user.email }} -->
</template>

<script setup>
const { auth } = useSupabaseClient();
const user = useSupabaseUser();
console.log(user);
const userLogout = async () => {
  await auth.signOut();
};
watchEffect(() => {
  if (!user.value) {
    return navigateTo("/login");
  }
});
</script>

<style>
.main-profile {
  display: flex;
  justify-content: space-around;
}

.vertical-dotted {
  border-left: 1px dotted #bbb7b4;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
