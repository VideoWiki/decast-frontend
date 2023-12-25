<template>
    <div class="shim-room-card flex justify-between items-center mb-4">
        <div class="animate-custom-pulse left-effect shim-content">
        </div>
        <div class="animate-custom-pulse right-effect shim-content">
        </div>
    </div>
</template>

<script>

export default {
    name: 'RoomCardShimmer',
};
</script>
  
<style scoped>
*:not(i) {
    font-family: 'Karla', sans-serif;
}

.shim-room-card {
    height: 63px;
    padding: 10px 15px 10px 15px;
    border: 1px solid #31394e;
    border-radius: 10px;
}

.left-effect {
    flex: 0.4;
    height: 28px;
    width: 100px;
}

.right-effect {
    flex: 0.37;
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
  