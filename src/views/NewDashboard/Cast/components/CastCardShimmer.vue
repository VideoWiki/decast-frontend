<template>
    <div class="child-options">
        <div class="cast-shimmer-upper">
            <div class="csu-loader-1 animate-custom-pulse"></div>
            <div class="csu-loader-2 animate-custom-pulse"></div>
        </div>
        <div class="cast-shimmer-lower">
            <div class="csu-loader-3 animate-custom-pulse"></div>
            <div class="csu-loader-4 animate-custom-pulse"></div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'CastCardShimmer',
};
</script>

<style scoped>
*:not(i) {
    font-family: 'Karla', sans-serif;
}

.child-options {
    max-width: 480px;
    width: 97%;
    height: 140px;
    display: flex;
    flex-direction: column;
    border: 1px solid #31394e;
    background-color: #1f272f;
    color: #a6a6a8;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 20px;
    position: relative;
}
.cast-shimmer-lower, .cast-shimmer-upper {
    display: flex;
    justify-content: space-between;
}

.csu-loader-1, .csu-loader-2, .csu-loader-3, .csu-loader-4 {
    background-color: #31394e85;
    border-radius: 5px;
}
.csu-loader-1 {
    width: 40%;
    height: 45px;
}
.csu-loader-2 {
    width: 4%;
    height: 45px;
}

.csu-loader-3 {
    flex: 0.35;
    height: 28px;
}

.csu-loader-4 {
    flex: 0.4;
    height: 34px;
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

@media (min-width: 500px) {
}
</style>
  