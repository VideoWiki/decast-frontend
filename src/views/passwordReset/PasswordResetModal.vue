<template>
  <div class="centered-container">
    <div class="w-full flex flex-col items-center top-panel">
      <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-8">
        <div class="bg-black w-4 h-4"></div>
        <div class="flex flex-row gap-2">
          <div class="bg-black w-4 h-4"></div>
          <div class="bg-black w-4 h-4"></div>
        </div>
      </div>

      <div class="container">
        <div class="flex flex-col justify-between cc-label">
          <h6 class="custom-heading mb-2">//Reset your password</h6>
          <p>Enter your Decast email address so we can reset your password.</p>
        </div>

        <!-- <div class="input">
          <input placeholder="Email" type="email" v-model="email" @input="clearEmailError" />
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div> -->
        <div class="flex flex-col mt-8">
          <span class="text-white">user.email</span>
          <div>
            <input class="w-4/5 p-2 mt-2" v-model="email" type="email" placeholder="//example@email.com"
              @input="clearEmailError" />
            <p v-if="errors.email" class="text-danger my-2 p-0">>> email is required</p>
          </div>
        </div>

        <div class="button">
          <!-- <button class="button-text font-semibold" @click="validateAndProceed">
            Next
          </button> -->
          <button class="custm-button mt-8" @click="validateAndProceed">/next</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PasswordReset',
  data() {
    return {
      email: '',
      errors: {},
    };
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
  },
  methods: {
    close() {
      window.parent.postMessage('closeIframe', '*');
    },
    sendResetEmail() {
      this.$store
        .dispatch('auth/sendResetEmail', this.email)
        .then((res) => {
          //console.log('sending sms');
          this.$vs.notify({
            title: 'Check your mail',
            text: 'Mail sent successfully',
            color: 'success',
          });
          this.email = '';
        })
        .catch((e) => {
          //console.log(' can not sending sms');
          if (e.response.data.message === 'invalid email') {
            this.$vs.notify({
              title: 'Error occurred',
              text: 'Invalid email ',
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              title: 'Error occurred',
              text: 'Try Again',
              color: 'danger',
            });
          }
        });
    },
    validateAndProceed() {
      this.errors = {};
      if (!this.email) {
        this.errors.email = 'Email is required.';
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = 'Invalid email format.';
      } else {
        //console.log('Form submitted with email:', this.email);
        this.sendResetEmail();
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    clearEmailError() {
      this.errors.email = '';
    },
  },
};
</script>
<style scoped>
*:not(i) {
  /* font-family: 'Karla', sans-serif !important; */
  font-family: 'JetBrains Mono' !important;
}

.cc-label p {
  color: #5B96EB;
}

.custom-heading {
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF;
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000000;
}
.custm-button {
  background-color: #D7DF23;
  color: #000000;
  border: 2px solid #000000;
  outline: none;
  padding: 10px;
  width: fit-content;
  cursor: pointer;
  font-weight: 600;
  -webkit-box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
  -moz-box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 0px -1px rgba(255, 255, 255, 1);
}
.custm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.top-panel {
  max-width: 500px;
  margin-bottom: 10px;
}

.container {
  height: 300px;
  width: 500px;
  background-color: #000000;
  padding: 30px;
  position: relative;
  border: 1px solid #FFFFFF;
  margin-top: 10px;
}

.first-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  color: #a6a6a8;
  padding-top: 25px;
  font-weight: regular;
  font-size: 13px;
  font-family: 'Karla', sans-serif;
}

.input input {
  margin-top: 40px;
  height: 45px;
  width: 100%;
  background-color: #18191b;
  border: 1px solid #31394e;
  padding: 20px;
  color: #a6a6a8;
  border-radius: 6px;
  border: 1px solid #31394e;
}

.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a8;
  background: none;
  border: none;
}

.button-text {
  margin-top: 30px;
  height: 45px;
  width: 100%;
  background-color: #d7df23;
  border: 1px solid #31394e;
  border-radius: 6px;
}

.error-message {
  color: rgba(199, 70, 70, 0.869);
  font-weight: regular;
  font-size: 13px;
}

.icon {
  position: absolute;
  right: 5px;
  top: 5px;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}

.icon i {
  font-size: 2em;
  color: #647181;
}</style>
