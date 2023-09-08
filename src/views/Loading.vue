<template>
  <div class="container">
    <div class="loader">
      <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped>
.container {
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  animation: fade 2s ease-in-out infinite;
}

@keyframes fade {
  0% {
    opacity: 0; /* Start with full transparency (invisible) */
  }
  50% {
    opacity: 1; /* Fade in to fully visible */
  }
  100% {
    opacity: 0; /* Fade out to fully transparent again */
  }
}
</style>
