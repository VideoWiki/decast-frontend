<template>
  <div class="shim-room-card flex justify-between items-center mb-4 w-full">
    <div class="animate-custom-pulse left-effect shim-content">
    </div>
    <div class="animate-custom-pulse right-effect shim-content">
    </div>
  </div>
</template>

<script>

export default {
  name: 'RecordingCardShimmer',
};
</script>
  
<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}

.shim-room-card {
  height: 58px;
  padding: 10px 15px 10px 15px;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  box-shadow: 3px 3px 0px 0px white;
}

.left-effect {
  flex: 0.4;
  height: 22px;
  width: 100px;
}

.right-effect {
  flex: 0.30;
  height: 22px;
  width: 100%;
}

.shim-content {
  background-color: #FFFFFF;
}

@keyframes custom-pulse {

  0%,
  100% {
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
  