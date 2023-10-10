<template>
    <div  class="ll-cont">
      <form :class="[this.public && !this.public_auth ? 'join-box' : 'lets-see']">
        <div>
          <span v-if="!this.public_auth">
            <h2 class="join-head">You're joining the cast</h2>
            <h4 class="join-name">Joining name</h4>
          </span>
          <span v-if="this.public_auth">
            <h2 class="font-semibold text-2xl my-4">Click to join the stream</h2>
          </span>
          <div v-if="!public_auth">  
            <input
              class="verification-input text-xl"
              v-validate="'required'"
              name="Name"
              placeholder="e.g John G. Miguel"
              autocomplete="off"
              v-model="name"
            />
          </div>
  
          <div class="flex flex-wrap my-3">
            <button
              class="acc-btn flex-1 h-16"
              :disabled="!validateForm"
              @click.prevent="joinStreaming"
              >Access Cast</button
            >
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        public_auth: '',
        public: '',
      };
    },
    computed: {
      validateForm() {
        return (!this.errors.any() && this.name !== '') || this.public_auth;
      },
    },
    methods: {
      joinStreaming() {
        sessionStorage.setItem('username', this.name);
        this.$router.go();
      },
    },
  };
  </script>
  
  <style scoped>

.ll-cont{
    border: 1px solid #1F272F;
    background-color: #31394E;
    border-radius: 6px;
    padding: 25px;
    margin-bottom: 5px;
    margin-left: 3rem;
}

.join-head{
    font-size: 12px;
    color: #A6A6A8;
}

.join-name{
    font-size: 12px;
    color: #637181;
    font-weight: 600;
    margin-top: 20px;
}
  .join-box {
    margin-top: 5em;
    margin-left: 32em;
    padding: 5em;
    width: 40% !important;
    background-color: #31394E;
  }
  .verification-input {
    height: 40px !important;
    border: none;
    background: #1F272F;
    font-family: Montserrat;
    border-radius: 6px;
    padding: 10px;
    width: 100%;
  }
 .acc-btn{
    background-color: #D7DF23;
    height: 40px !important;
    color: #181A20;
    border-radius: 6px  !important;
    border: none;
    font-weight: 600 !important;
    cursor: pointer;
    margin-top: 20px;
 }
  @media screen and (max-device-width: 480px) {
    .join-box {
      padding: 1.6em;
      margin: 0;
      margin-top: 20rem;
      width: 100% !important;
    }
    .verification-img {
      display: none !important;
    }
  }
  </style>
  