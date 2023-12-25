<template>
    <div class="cast-recordings flex justify-between items-center mb-4">
        <div class="animate-custom-pulse left-effect shim-content">
        </div>
        <div class="animate-custom-pulse right-effect shim-content">
        </div>
    </div>
</template>

<script>

export default {
    name: 'RecordingCardCastShimmer',
};
</script>
  
<style scoped>
*:not(i) {
    font-family: 'Karla', sans-serif;
}

.cast-recordings {
    position: relative;
    padding: 8px;
    border: 1px solid #31394e;
    border-radius: 6px;
    width: 100%;
    height: 54px;
    font-weight: 600;

    p {
        font-weight: 400;
    }
}

.left-effect {
    flex: 0.2;
    height: 28px;
    width: 100px;
}

.right-effect {
    flex: 0.45;
    height: 28px;
    width: 100%;
}

.shim-content {
    background-color: #1F272F;
    border-radius: 5px;
}

@keyframes custom-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-custom-pulse {
  animation: custom-pulse 1s infinite;
}

@media (max-width: 499px) {}
</style>
  