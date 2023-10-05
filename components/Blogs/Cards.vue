<template>
  <div class="blogs-container" v-if="nextBlogs.length">
    <div class="card-grid">
      <BlogsCard v-for="blog in nextBlogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
  <div class="pagination-container">
    <div class="pagination">
      <button
        :disabled="currentPage <= 1"
        @click="previousPage"
        class="pagination-button"
      >
        Prev
      </button>
      <span class="page-number"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <button
        :disabled="currentPage >= totalPages"
        @click="nextPage"
        class="pagination-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);
const config = useRuntimeConfig()

const { data } = await useFetch(
  `${config.public.apiUrl}/v1/blogs?page=${currentPage.value}`
);
const blogsData = ref(data.value);

const nextBlogs = computed(() => blogsData.value.blogs);

const totalPages = computed(() => {
  return Math.ceil(blogsData.value.totalBlogs / blogsData.value.limit);
});

const fetchBlogsDataClientSide = async (page: number) => {
  try {
    const config = useRuntimeConfig()
    const response = await fetch(`${config.public.apiUrl}/v1/blogs?page=${page}`);
    const data = await response.json();
    blogsData.value = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    await fetchBlogsDataClientSide(currentPage.value);
  }
};

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await fetchBlogsDataClientSide(currentPage.value);
  }
};
</script>

<style scoped>
.page-number {
  margin: 0 16px;
}
.pagination-button {
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  border: 1px solid black;
  background-color: #faf4f0;
}
.pagination-container {
  margin: 16px 24px 32px 16px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.card-grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 16px;
}

.blogs-container {
  margin: 16px 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button:hover {
  background-color: #eee;
}

.pagination button:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
