<template>
  <div class="idk-co">
    <div class="container-full flex">
      <div class="logo">
        <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" alt="" />
      </div>
      <div class="left-side">
        <!-- <div class="time flex">
        <div class="number flex">
          02
          <p>hr</p>
          <p class="dot">:</p>
        </div>
        <div class="number flex">
          06
          <p>min</p>
          <p class="dot">:</p>
        </div>
        <div class="number flex">
          08
          <p>sec</p>
        </div>
      </div> -->
        <div v-if="running" class="info-part flex">
          <div>Cast is live</div>
          <img src="@/assets/images/dashboard/Live.svg" alt="" />
        </div>
        <div v-else class="info-part flex text-danger">
          <div>Cast is not live</div>
        </div>
        <div class="class-name">
          <p>{{ eventName }}</p>
          <div class="host-name">Hosted by “{{ creator }}”</div>
        </div>
        <div class="bottom-text">
          {{ eventDescription }}
        </div>
      </div>
      <div class="right-side">
        <div class="heading">You're joining the cast</div>
        <div class="name">Joining name</div>
        <input
          placeholder="e.g John G. Miguel"
          @keydown.enter="accessCast"
          v-model="joiningName"
        />
        <div class="button">
          <button class="cursor-pointer" :disabled="!validateForm" @click="accessCast">
            Access cast
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WaitForJoin',
  data() {
    return {
      joiningName: '',
      meeting_id: this.$route.params.meetingID,
      eventName: '',
      eventDescription: '',
      creator: '',
      disabled: false,
      running: false,
    };
  },
  computed:{
    validateForm() {
      return (!this.errors.any() && this.joiningName !== '');
    },
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'block';
    this.getMeetingDetails();
  },
  methods: {
    async getMeetingDetails() {
      const res = await this.$store.dispatch(
        'cast/meetingInfo',
        this.meeting_id
      );
      const details = res.data.meeting_info;
      console.log(details);
      this.eventName = details.event_name;
      this.eventDescription = details.description;
      this.creator = details.event_creator_name;
      this.running = details.running;
      document.getElementById('loading-bg').style.display = 'none';
    },
    accessCast() {
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
      if (this.joiningName.length === 0) {
        this.$vs.notify({
          title: 'Name require',
          color: 'danger',
        });
        return;
      }
      var data = JSON.stringify({
        id: this.meeting_id,
        pass: this.$route.query.pass,
        name: this.joiningName,
      });
      this.$vs.loading();
      console.log(178);
      this.$store
        .dispatch('studio/magicJoin', data)
        .then((res) => {
          console.log(res.data.url, 181);
          if (res.data.url) {
            console.log(184);
            this.$vs.notify({
              title: 'Success',
              color: 'success',
            });
            location.href = res.data.url;
          } else {
            this.$vs.loading.close();
            this.disabled = false;
            this.$vs.notify({
              title: 'Wrong Link',
              text: 'You have the wrong link to join',
              color: 'danger',
            });
          }
        })
        .catch((e) => {
          this.$vs.loading.close();
          console.log(e.response);
        });
    },
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.idk-co {
  background: #000000;
  background-image: url('../assets/images/back.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.container-full {
  backdrop-filter: brightness(0.2);
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.logo {
  width: 91px;
  height: 91px;
}
.left-side {
  width: 425px;
  margin-left: 300px;
  margin-top: 200px;
}
.number {
  font-weight: 600;
  font-size: 20px;
  color: #d7df23;
}
.number p {
  font-size: 13px;
  font-weight: 500;
  color: #647181;
  display: flex;
  align-self: flex-end;
  padding-bottom: 4px;
  padding-left: 2px;
}
.dot {
  margin: 5px 32px 0px 32px;
  width: 6px;
  height: 28px;
  color: #64718180;
  display: flex;
}
.info-part {
  margin-top: 20px;
  align-items: center;
}
.info-part div {
  font-weight: 600;
  font-size: 12px;
  color: #d7df23;
}
.info-part img {
  margin-left: 8px;
  width: 16px;
  height: 12px;
}
.class-name p {
  margin-top: 10px;
  font-weight: 500;
  font-size: 24px;
  color: #a6a6a8;
}
.host-name {
  margin-top: 5px;
  font-weight: 500;
  font-size: 16px;
  color: #647181;
}
.bottom-text {
  margin-top: 15px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.right-side {
  margin-top: 200px;
  margin-left: 44px;
  width: 376px;
  height: 206px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 6px;
  padding: 30px;
}
.heading {
  font-size: 12px;
  font-weight: 600;
  color: #a6a6a8;
}
.name {
  margin-top: 18px;
  font-size: 12px;
  font-weight: 600;
  color: #637181;
  margin-bottom: 5px;
}
.right-side input {
  width: 319px;
  height: 40px;
  background-color: #1d232b;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 0px 15px;
  font-weight: 500;
  font-size: 12px;
  color: #a6a6a8;
}
.button {
  margin-top: 20px;
}
.button button {
  width: 319px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #31394e;
  font-weight: 600;
  font-size: 12px;
  color: #181a20;
  background-color: #d7df23;
}

.button button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 499px) {
  .container-full {
    flex-direction: column;
    justify-content: center;
    max-width: 499px;
    margin: auto;
    /* border: 1px solid red; */
  }

  .left-side {
    /* border: 1px solid red; */
    margin: auto;
    width: auto !important;
    max-width: 400px !important;
    margin-top: 60px;
  }

  .right-side {
    /* border: 1px solid yellow; */
    max-height: 215px !important;
    max-width: 320px;
    width: auto;
    min-width: 280px;
    margin: auto;
    margin-top: -100px;
    padding: 15px;
  }

  .right-side input{
    width: 100%;
  }

  .button button{
    width: 100%;
  }
}
</style>
