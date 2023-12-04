<template>
  <div class="wrapper">
    <Navbar />
    <div class="header">
      <div class="max-w-5xl w-full last">
        <div class="left">
          <div class="heading">Get in touch</div>
          <div class="info">
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us...
          </div>
        </div>
        <div class="right">
          <img src="@/assets/images/lap.svg" />
        </div>
      </div>
    </div>
    <div class="middle max-w-5xl w-full">
      Connect with one of our global offices
    </div>
    <div class="buttom max-w-5xl w-full">
      <div class="img-part">
        <img src="@/assets/images/map.svg" />
      </div>
      <div class="text-part">
        <div class="head-part">Headquarters</div>
        <div class="info-part">463 Avenue Lalonde</div>
        <div class="info-part">State : Québec</div>
        <div class="info-part">City : Sainte-Bernadette</div>
        <div class="info-part">Post Code :D0W7D1</div>
        <div class="head-part">Phone</div>
        <div class="info-part">+185 254 698</div>
        <div class="head-part">Email</div>
        <div class="info-part">support@cast.com</div>
      </div>
    </div>
    <FootSec />
  </div>
</template>
<script>
import FootSec from './FootSec.vue';
import Navbar from './Navbar.vue';
export default {
  name: 'Contact',
  components: {
    Navbar,
    FootSec,
  },
};
</script>
<style>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper {
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  background-color: #181a20;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header {
  height: 420px;
  background-color: #d7df23;
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 100%;
}
.heading {
  font-weight: 700;
  font-size: 64px;
  color: #181a20;
}
.info {
  font-weight: 500;
  font-size: 20px;
  color: #181a20;
  line-height: 30px;
  margin-top: 30px;
}
.left {
  flex: 1;
  height: 100%;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right {
  flex: 1;
  height: 100%;
  /* margin-right: -15px; */
}
.right img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.middle {
  margin: 80px auto;
  font-size: 40px;
  font-weight: 700;
  color: #a6a6a8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttom {
  width: 80%;
  height: 520px;
  margin: auto;
  display: flex;
  justify-content: center;
}
.img-part {
  flex: 2;
  /* border: 1px solid green; */
}
.img-part img {
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  object-fit: cover;
}
.text-part {
  flex: 1;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #31394e;
}
.head-part {
  font-size: 32px;
  font-weight: 500;
  color: #a6a6a8;
  margin: 10px 0px;
}
.info-part {
  font-size: 22px;
  font-weight: 400;
  color: #a6a6a8;
}
.last {
  display: flex;
  justify-content: center;
  margin: auto;
}
@media screen and (max-device-width: 1050px) {
  .buttom {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
  }
  header {
    height: auto;
  }
  .last {
    display: flex;
    flex-direction: column;
  }
  .heading {
    font-weight: 600;
    font-size: 62px;
  }
  .left {
    padding-left: 20px;
  }
  .right {
    width: 48%;
    height: 400px;
    align-self: flex-end;
    /* margin-right: -15px; */
  }
  .right img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .middle {
    font-size: 35px;
    font-weight: 600;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .head-part {
    font-size: 25px;
    font-weight: 500;
  }
  .info-part {
    font-size: 15px;
    font-weight: 400;
  }
  .img-part {
    width: 90%;
    height: 500px;
    margin: auto;
    /* border: 1px solid green; */
  }
  .img-part img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-part {
    width: 90%;
    margin: auto;
  }
}
</style>
