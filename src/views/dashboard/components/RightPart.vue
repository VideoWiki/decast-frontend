<template>
  <div class="cast-section">
    <h2 class="cast-heading">Casts</h2>
    <div class="cast-content">
      Casts are social spaces for events and wide-range. Ideal for X Y Z.
      <span class="learn-more">Learn more about Casts.</span>
    </div>
    <div class="coming-soon">
      <h3>COMING SOON</h3>
    </div>
    <div class="cast-featurea">
      <p>Cast feature coming soon some more</p>
      <p>description goes here.</p>
    </div>
  </div>
</template>
  <script>
export default {
  name: 'rightpart',
};
</script>
  <style>
@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,400;1,300&family=Nunito:wght@600&display=swap');
*:not(i) {
  font-family: 'Karla', sans-serif;
}
* {
  background: #181a20;
}
.cast-section {
  width: 33.33%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  float: left;
  position: relative;
}

.cast-heading {
  width: 63px;
  height: 28px;
  font-family: Karla;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
  position: absolute;
  top: 282px;
  left: 41px;
  color: #a6a6a8;
}

.cast-content {
  width: 243px;
  height: 49px;
  font-family: Karla;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: #a6a6a8;
  margin-bottom: 10px;
  position: absolute;
  top: 317px;
  left: 41px;
}

.learn-more {
  font-weight: bold;
  color: #31a2f4;
  text-decoration: underline;
}

.coming-soon {
  width: 286px;
  height: 23px;
  font-family: Karla;
  font-size: 20px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0.76em;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
  position: absolute;
  top: 584px;
  left: 154px;
  white-space: nowrap;
}
.coming-soon h3 {
  color: #365e8b;
  opacity: 28%;
}

.cast-featurea {
  width: 281px;
  font-family: Karla;
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  position: absolute;
  top: 627px;
  left: 170px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  padding-top: 10px;
}

.cast-featurea p {
  color: #6c6767;
  margin: 0;
}

.cast-featurea p:last-child {
  margin: auto;
}
</style>
  