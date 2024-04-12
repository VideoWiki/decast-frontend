<template>
    <div class="cast_list flex flex-col justify-between items-center mb-4 w-full py-3 px-4 pb-3">
        <div class="cast-shimmer-upper">
            <div class="csu-loader-1 animate-custom-pulse"></div>
            <div class="csu-loader-2 animate-custom-pulse"></div>
        </div>
        <div class="cast-shimmer-lower">
            <div class="csu-loader-3 animate-custom-pulse"></div>
            <!-- <div class="csu-loader-4 animate-custom-pulse"></div> -->
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
.cast_list {
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  box-shadow: 3px 3px 0px 0px white;
  height: 90px;
}
.cast-shimmer-lower, .cast-shimmer-upper {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.csu-loader-1, .csu-loader-2, .csu-loader-3, .csu-loader-4 {
    background-color: #e1e1e1;
    border-radius: 0px;
}
.csu-loader-1 {
    width: 40%;
    height: 22px;
}
.csu-loader-2 {
    width: 35%;
    height: 22px;
}

.csu-loader-3 {
    flex: 0.35;
    height: 20px;
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
  