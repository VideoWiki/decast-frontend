<template>
  <div class="parent-1">
    <Navbar />
    <div class="parent-2">
      <div>
        <h1>Video conferencing with no monthly fees</h1>
        <p>
          A collaborative platform for learners and educators to secure learning
          continuity in times of restrictions and beyond. A simple tool for
          teachers to create teaching content without any advance knowledge of a
          tool or code. They create by using various media and graphics from the
          open stock libraries and merging it with their own content to keep it
          engaging and diverse.
        </p>
      </div>
      <img src="@/assets/images/girls.svg" />
    </div>

    <div class="parent-3">
      <div class="img-par">
        <img src="@/assets/images/conf1.svg" />
        <img src="@/assets/images/conf2.png" />
      </div>
      <div>
        <h1>Helping millions of Students to grow better</h1>
        <p>
          Theoretical knowledge online is what most universities have achieved,
          but practical training online so far seems unique. We are building
          tools to auto-generate (convert) text-based content to video-based
          online content with an extension towards gamification and immersive
          techniques for advanced pieces of training. Vision to ensure learning
          continuity for all. Standardized education and access to all with
          equal opportunities to educational processes.
        </p>
      </div>
    </div>

    <div class="parent-2">
      <div>
        <h1>Video conferencing shouldn’t cost you money</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          risus blandit, iaculis magna et, viverra odio. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Etiam et risus blandit, iaculis
          magna et, viverra odio. Pellentesque imperdiet dui vitae ligula porta,
          sit amet sollicitudin sapien ornare. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus
        </p>
      </div>
      <img src="@/assets/images/free.svg" />
    </div>

    <div class="parent-3">
      <div class="img-par">
        <img src="@/assets/images/sec1.svg" />
        <img src="@/assets/images/sec2.svg" />
      </div>
      <div>
        <h1>We take security seriously</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
          risus blandit, iaculis magna et, viverra odio. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Etiam et risus blandit, iaculis
          magna et, viverra odio. Pellentesque imperdiet dui vitae ligula porta,
          sit amet sollicitudin sapien ornare. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.parent-1 {
  background-image: linear-gradient(180deg, #000, #111, #222);
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding-bottom: 5rem;
  justify-content: center;
}

.parent-2,
.parent-3 {
  width: 80vw;
  display: flex;
  margin: auto;
  justify-content: space-between;
  text-align: left;
  color: white;
}

.parent-2 img {
  max-width: 400px;
  max-height: 380px;
  height: auto;
  width: auto;
}

.parent-3 img {
  max-width: 400px;
  max-height: 380px;
  height: auto;
  width: auto;
}

.parent-2 div {
  width: 50%;
  max-width: 500px;
  color: #ffffff;
}

.parent-3 div:nth-child(2) {
  width: 50%;
  max-width: 500px;
  color: #ffffff;
}

.parent-2 div h1 {
  color: #ffffff;
  font-weight: 700;
  font-size: xx-large;
}

.parent-2 div p {
  margin-top: 4rem;
  line-height: 30px;
  font-size: medium;
  font-weight: 500;
  color: #a6a6a8;
}

.parent-3 div p {
  margin-top: 4rem;
  line-height: 30px;
  font-size: medium;
  font-weight: 500;
  color: #a6a6a8;
}

.parent-3 div h1 {
  color: #ffffff;
  font-weight: 700;
  font-size: xx-large;
}

.img-par {
  position: relative;
}

.img-par img:nth-child(1) {
  position: absolute;
  z-index: 5;
}
</style>
