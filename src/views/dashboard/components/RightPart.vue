<template>
  <div class="center-container-full">
    <div class="flex justify-between">
      <div class="heading-container">
        <h2 class="custom-heading" style="color: #a6a6a8; font-weight: 500; font-size: 24px">
          Casts
        </h2>
        <p class="sub-heading pt-2">
          Casts are social spaces for events and wide-range. Ideal for X Y Z.
          <a target="_blank" href="#" style="color: #31a2f4; text-decoration: underline; cursor: pointer">Learn more about
            Casts.</a>
        </p>
      </div>
      <div class="flex justify-between">
        <button class="header-button p-2" style="
            border: 1px solid #a6a6a8;
            border-radius: 5px;
            background-color: #1f272f;
            width: 28px;
            height: 28px;
          ">
          <img src="@/assets/images/Plus.svg" alt="" />
        </button>
        <button class="header-button border-none dot">
          <img src="@/assets/images/Vector2.svg" class="h-7 p-1" alt="" />
        </button>
      </div>
    </div>

    <!-- <div class="bottom">
      <div class="coming-soon">
        <h3>COMING SOON</h3>
      </div>
      <div class="cast-featurea">
        <p>Cast feature coming soon some more</p>
        <p>description goes here.</p>
      </div>
    </div> -->

    <div class="rooms-container">
      <div class="choose-room">
        <button class="options-button border-none" @click="changeFocus(true)"
          :class="{ 'focused-button': focusYourRooms }">
          Scheduled Casts
        </button>
        <button class="options-button border-none px-5" @click="changeFocus(false)"
          :class="{ 'focused-button': !focusYourRooms }">
          Cast Recordings
        </button>
      </div>

      <div class="options-container">
        <div v-for="(cast, index) in casts" :key="index">
          <div class="child-options">
            <div class="inner-div1">
              <div class="inner-child1">
                <p>{{ cast.name }}</p>
                <button>{{ cast.date }}</button>
              </div>
              <div class="inner-child2">
                <a href="#">{{ cast.desc }}</a>
                <img src="@/assets/images/user.svg" />
              </div>
              <div class="img-info">
                <div class="images-container">
                  <img v-for="(image, imageIndex) in cast.images" :key="imageIndex" :src="image" alt="" />
                </div>
                <!-- <p>{{ totalImagesCount[index] }}</p> -->
              </div>
            </div>

            <div class="inner-div2">
              <button @click="togglePopup(index)">
                <img src="@/assets/images/Vector2.svg" class="h-7 p-2" alt="" />
              </button>
              <div class="cast-popup" v-if="cast.showPopup">
                <button>
                  <img src="@/assets/images/manage.svg" alt="" />Manage
                  attendees
                </button>
                <button>
                  <img src="@/assets/images/call.svg" alt="" />Call settings
                </button>
                <button>
                  <img src="@/assets/images/stream.svg" alt="" />Stream settings
                </button>
                <button>
                  <img src="@/assets/images/drops.svg" alt="" />Drops
                </button>
                <button>
                  <img src="@/assets/images/reschedule.svg" alt="" />Reschedule
                  cast
                </button>
                <button>
                  <img src="@/assets/images/clock.svg" alt="" />Set reminder
                </button>
                <button>
                  <img src="@/assets/images/pen.svg" alt="" />Edit
                </button>
                <button>
                  <img src="@/assets/images/prepone.svg" alt="" />Prepone cast
                </button>
                <button>
                  <img src="@/assets/images/delete.svg" />
                  Delete
                </button>
              </div>
              <div class="inner-child3">
                <button v-if="cast.showCastIsLive" class="live-btn">
                  Cast is live
                </button>
                <div class="inner-child4">
                  <button><img src="@/assets/images/copy.svg" alt="" /></button>
                  <button v-if="!cast.showCastIsLive" @click="toggleCastIsLive(index)">
                    Go live now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-content m-auto">
      <p>
        You can only create one cast per week in our free plan want to create
        more try our premium plan.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rightpart',
  data() {
    return {
      focusYourRooms: true,
      showCastIsLive: false,
      showPopup: false,
      casts: [
        {
          name: 'Friends hangout',
          date: 'May 15-2pm',
          showCastIsLive: false,
          desc: 'Invite Attendees'
        },
        {
          name: 'Digital marketing webinar',
          date: 'May 15-2pm',
          showCastIsLive: false,
          desc: '20 attendees invited',
          images: [
            require('@/assets/images/luffy.webp'),
            require('@/assets/images/luffy.webp'),
            require('@/assets/images/luffy.webp'),
            require('@/assets/images/luffy.webp'),
            require('@/assets/images/luffy.webp'),
            require('@/assets/images/luffy.webp'),
            require('@/assets/images/luffy.webp'),
          ],
        },
      ],
    };
  },
  computed: {
    totalImagesCount() {
      return this.casts.map(cast => cast.images.length);
    }
  },
  methods: {
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    toggleCastIsLive(index) {
      this.casts[index].showCastIsLive = !this.casts[index].showCastIsLive;
    },
    togglePopup(index) {
      this.$set(this.casts[index], 'showPopup', !this.casts[index].showPopup);
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.center-container-full {
  justify-content: center;
  align-items: center;
  color: #a6a6a8;
  width: 100%;
  max-width: 500px;
  margin: auto;
  margin-left: 37px;
  /* border: 1px solid white; */
  height: 100%;
}

.options-button {
  background: none;
  color: #a6a6a8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.heading-container {
  width: 270px;
}

.footer-content {
  text-align: center;
  margin-top: 40px !important;
  color: #d7df23;
  width: 350px;
  margin: auto;
}

.choose-room {
  margin-top: 20px;
}

.sub-heading {
  font-weight: 400;
  font-size: 11px;
  line-height: 12.86px;
}

.header-button {
  background: none;
  cursor: pointer;
  height: max-content;
  margin-left: 15px;
}

.focused-button {
  color: #d7df23;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
}

.options-container {}

.images-container {
  width: 140px;
  margin-top: 10px;
  height: 30px !important;
  padding: 0;
  margin: 0;
  overflow: hidden;
  /* border: 1px solid red; */
  z-index: 99;
  position: absolute;
  top: 70%;
}



.images-container img {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: 1px solid #31394E;
  top: 0%;
  margin-top: 0;
  left: 50%;
  /* position: absolute; */
}

.cast-popup {
  position: absolute;
  width: 150px;
  height: fit-content;
  background-color: #1f272f;
  border: 1px solid #31394e;
  color: #31394e;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 30%;
  left: 55%;
  z-index: 999;
  padding: 10px;
  margin: auto;
  text-align: left;
}

.cast-popup button {
  display: flex;
  cursor: pointer;
  font-size: 12px;
  gap: 7px;
  background-color: #1f272f;
  border: none;
  color: #647181;
  text-align: left;
  margin-top: 5px;
}

.cast-popup button img {
  width: 10px;
  height: 10px;
  margin: auto;
}

.child-options {
  max-width: 480px;
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #31394e;
  background-color: #1f272f;
  color: #a6a6a8;
  border-radius: 6px;
  padding: 10px;
  margin-top: 30px;
  position: relative;
}

.inner-div1 {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  /* border: 1px solid green; */
}

.inner-child1 button {
  margin-top: 5px;
  background-color: #31394e85;
  padding: 5px;
  font-size: 12px;
  border-radius: 6px;
  border: none;
  color: #a6a6a8;
  cursor: pointer;
}

.inner-child2 {
  display: flex;
  gap: 5px;
}

.inner-child2 a {
  text-decoration: underline;
  color: #a6a6a8;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 20px;
}

.inner-child2 img {
  margin-bottom: 20px;
}

.inner-div2 {
  width: max-content;
  justify-content: right;
  text-align: right;
  /* border: 1px solid yellow; */
}

.inner-div2 button {
  background: none;
  border: none;
  align-items: right;
  cursor: pointer;
}

.inner-child3 {
  position: relative;
  width: 156px;
}

.inner-child3 button {
  background-color: #f84330;
  border-radius: 6px;
  color: #ffffff;
  padding: 5px;
  height: 33px;
  width: 115px;
}

.live-btn {
  z-index: 999;
  margin-top: 40px;
}

.inner-child4 {
  display: flex;
  gap: 8px;
  margin-top: 5px;
  z-index: 5;
  position: absolute;
  top: 35px !important;
  /* left: 20px; */
}

.inner-child4 button:nth-child(1) {
  background: none;
  border: 1px solid #31394e;
  width: 33px;
  height: 33px;
}

.inner-child4 button:nth-child(2) {
  background-color: #d7df23;
  color: #31394e;
}

/* .cast-section {
  height: auto;
  width: auto;
  height: 500px;
  /* border: 1px solid red; */
/* position: relative; 
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
} */

/* .bottom {
  margin: auto;
  width: 320px;
  margin-left: 20px;
  /* border: 1px solid yellow; 
}

/* .coming-soon {
  width: fit-content;
  height: 23px;
  margin: auto;
  /* border: 1px solid green; 
  font-family: Karla;
  font-size: 20px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0.76em;
  text-align: center;
  white-space: nowrap;
} */
/* .coming-soon h3 {
  color: #365e8b;
  opacity: 28%;
} */

/* .cast-featurea {
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
  /* border: 1px solid red; 
} */

/* .cast-featurea p {
  color: #6c6767;
  margin: auto;
} */

/* .cast-featurea p:last-child {
  margin: auto;
} */
</style>
