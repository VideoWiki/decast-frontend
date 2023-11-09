<template>
  <div class="fallbox-container">
    <div
      v-for="(box, index) in boxes"
      :key="index"
      class="fallbox"
      :style="box.style"
    >
      {{ box.text }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boxes: [
        {
          text: 'my superpowers',
        },
        {
          text: 'Awesome!',
        },
        {
          text: 'Perfect!',
        },
        {
          text: 'Super!',
        },
        {
          text: 'Unreal',
        },
        {
          text: 'Super!',
        },
        {
          text: 'Next-level',
        },
        {
          text: 'mind-blowingly',
        },
        {
          text: 'Insane',
        },
        {
          text: 'Incredible',
        },
        {
          text: 'Fantastic',
        },
        {
          text: 'Whoa',
        },
      ],
    };
  },
  mounted() {
    this.createFallingBoxes();
  },
  methods: {
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    createFallingBoxes() {
      for (let i = 0; i < 12; i++) {
        const delay = Math.random() * 2 + 0.5;
        const duration = Math.random() * 2 + 1;
        const leftPosition = Math.random() * 90 + 5 + 'vw';
        const rotation = Math.random() * 20 - 10;

        const box = {
          style: {
            left: leftPosition,
            animationDuration: duration + 's',
            animationDelay: delay + 's',
            backgroundColor:`linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`,
            transform: `rotate(${rotation}deg)`,
          },
        };
        this.boxes.push(box);
      }
    },
  },
};
</script>

<style>
.fallbox-container {
  position: relative;
  width: 100%;
  height:60vh;
  /* background-color: #f0f0f0; */
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.fallbox {
  position: absolute;
  width: fit-content;
  height: fit-content;
  padding: 20px 30px;
  border-radius: 35px;
  display: block;
  /* align-items: center; */
  /* justify-content: center; */
  color: white;
  font-size: xl;
  font-weight: bold;
  animation: fallbox-fall linear both;
  transform-origin: center bottom;
}

@keyframes fallbox-fall {
  0% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(20vh);
  }
  85% {
    transform: translateY(30vh);
  }
  100% {
    transform: translateY(50vh);  
  }
}
</style>