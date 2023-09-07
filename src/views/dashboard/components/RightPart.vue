<template>
  <div class="cast-section">
    <h2 class="cast-heading">Casts</h2>
    <div class="cast-content">
      Casts are social spaces for events and wide-range. Ideal for X Y Z.
      <span class="learn-more">Learn more about Casts.</span>
    </div>
    <div class="bottom">
      <div class="coming-soon">
        <h3>COMING SOON</h3>
      </div>
      <div class="cast-featurea">
        <p>Cast feature coming soon some more</p>
        <p>description goes here.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rightpart',
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.cast-section {
  height: auto;
  width: auto;
  height: 500px;
  /* border: 1px solid red; */
  /* position: relative; */
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-left: 37px;
  max-width: 400px;
}

.cast-heading {
  width: 63px;
  height: 28px;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0em;
  margin: 0;
  color: #a6a6a8;
}

.cast-content {
  width: 243px;
  height: 49px;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  color: #a6a6a8;
  margin-top: 8px;
}

.learn-more {
  font-weight: bold;
  color: #31a2f4;
  text-decoration: underline;
}
.bottom {
  margin: auto;
  width: 320px;
  margin-left: 20px;
  /* border: 1px solid yellow; */
}

.coming-soon {
  width: fit-content;
  height: 23px;
  margin: auto;
  /* border: 1px solid green; */
  font-family: Karla;
  font-size: 20px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0.76em;
  text-align: center;
  white-space: nowrap;
}
.coming-soon h3 {
  color: #365e8b;
  opacity: 28%;
}

.cast-featurea {
  width: 285px;
  font-size: 16px;
  margin: auto !important;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;  
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  padding-top: 10px;
  /* border: 1px solid red; */
}

.cast-featurea p {
  color: #6c6767;
  margin: auto;
}

.cast-featurea p:last-child {
  margin: auto;
}
</style>
