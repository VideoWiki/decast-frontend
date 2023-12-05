<template>
  <div class="w-full parent-0">
    <Navbar />
    <div class="parent-1 flex flex-col justify-between items-center gap-5">
      <div class="max-w-5xl w-full flex items-center justify-between p-0 ga[-5] lg:px-16 md:px-6 px-4 py-6">
        <div>
          <h1>Video conferencing with no monthly fees</h1>
          <p>
            A collaborative platform for learners and educators to secure
            learning continuity in times of restrictions and beyond. A simple
            tool for teachers to create teaching content without any advance
            knowledge of a tool or code. They create by using various media and
            graphics from the open stock libraries and merging it with their own
            content to keep it engaging and diverse.
          </p>
        </div>
        <img src="@/assets/images/girls.svg" />
      </div>

      <div class="parent-3 max-w-5xl w-full flex items-center justify-between p-0 ga[-5] lg:px-16 md:px-6 px-4 py-6">
        <div class="img-par">
          <img src="@/assets/images/conf1.svg" />
          <img src="@/assets/images/conf2.png" />
        </div>
        <div>
          <h1>Helping millions of Students to grow better</h1>
          <p>
            Theoretical knowledge online is what most universities have
            achieved, but practical training online so far seems unique. We are
            building tools to auto-generate (convert) text-based content to
            video-based online content with an extension towards gamification
            and immersive techniques for advanced pieces of training. Vision to
            ensure learning continuity for all. Standardized education and
            access to all with equal opportunities to educational processes.
          </p>
        </div>
      </div>

      <div class="max-w-5xl w-full flex items-center justify-between ga[-5] lg:px-16 md:px-6 px-4 py-6">
        <div>
          <h1>Video conferencing shouldn’t cost you money</h1>
          <p>
            In a world where connections matter most, the ability to communicate
            seamlessly shouldn't come with a hefty price tag. Video conferencing
            shouldn't cost you money; it should enrich your collaborations,
            break down barriers, and foster connections without burdening your
            budget. Every conversation, every idea shared, shouldn't be hindered
            by financial constraints. It's about breaking free from limitations,
            empowering individuals and businesses.
          </p>
        </div>
        <img src="@/assets/images/free.svg" />
      </div>

      <div class="parent-3 max-w-5xl w-full flex items-center justify-between ga[-5] p-0 lg:px-16 md:px-6 px-4 py-6">
        <div class="img-par">
          <img src="@/assets/images/sec1.svg" />
          <img src="@/assets/images/sec2.svg" />
        </div>
        <div>
          <h1>We take security seriously</h1>
          <p>
            Taking security seriously isn’t just a motto—it’s a commitment woven
            into every fiber of our operations. From the moment data enters our
            systems to its storage and transmission, safeguarding your
            information is our top priority. We employ state-of-the-art
            encryption protocols, robust firewalls, and continuous monitoring to
            ensure that your data remains protected at every step.
          </p>
        </div>
      </div>
    </div>
    <FootSec />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import FootSec from './FootSec.vue';
export default {
  components: {
    Navbar,
    FootSec,
  },
};
</script>

<style scoped>
.parent-0 {
  background-image: linear-gradient(180deg, #000, #111, #222);
  height: 100%;
  width: 100%;
}
.parent-1 {
  background-image: url('../assets/images/leftPart.svg'),
    url('../assets/images/rightPart.svg');
    background-position: top left, top right;
  background-repeat: no-repeat, no-repeat;
  background-size: auto,auto;
  width: 100%;
}

.max-w-5xl,
.parent-3 {
  /* border: 1px solid yellow; */
  text-align: left;
  color: white;
  align-items: center;
}

.max-w-5xl {
  flex-wrap: wrap-reverse;
}

.parent-3 {
  flex-wrap: wrap;
}

.max-w-5xl img {
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

.max-w-5xl div {
  width: 50%;
  max-width: 500px;
  color: #ffffff;
}

.parent-3 div:nth-child(2) {
  width: 50%;
  max-width: 500px;
  color: #ffffff;
}

.max-w-5xl div h1 {
  color: #ffffff;
  font-weight: 700;
  font-size: xx-large;
}

.max-w-5xl div p {
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

@media (max-width: 768px) {
  .max-w-5xl img {
    max-width: 320px;
    max-height: 300px;
    height: auto;
    width: auto;
    margin: auto;
  }

  .parent-3 .img-par img {
    max-width: 320px;
    max-height: 300px;
    height: auto;
    width: auto;
    margin: auto;
  }

  .max-w-5xl div {
    width: 90%;
    max-width: 500px;
    color: #ffffff;
    margin: auto;
    margin-top: 1rem;
  }

  .parent-3 div:nth-child(2) {
    width: 90%;
    max-width: 500px;
    color: #ffffff;
    margin-top: 3rem;
  }
}
</style>
