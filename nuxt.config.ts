// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  css: ["@/assets/css/main.css"],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NODE_ENV === "production" ?  process.env.NUXT_PUBLIC_BACKEND_HOST : "http://localhost:3001"
    }
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
      }
    ]
  }
});
