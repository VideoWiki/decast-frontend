<template>
  <div class="centered-container">
    <div class="container">
      <div class="first-row">
        <h6 class="custom-heading">Reset your password</h6>
        <button class="close-icon">✕</button>
      </div>
      <div class="text">
        Enter your VideoWiki email address so we can reset your password.
      </div>
      <div class="input">
        <input
          placeholder="Email"
          type="email"
          v-model="email"
          @input="clearEmailError"
        />
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
      </div>

      <div class="button">
        <button
          class="button-text"
          @click="emailSubmit"
          :style="{
            opacity: emailError ? 0.5 : 1,
            cursor: emailError ? 'not-allowed' : 'pointer',
          }"
        >
          Next
        </button>
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
      emailError: false,
    };
  },
  watch: {
    email: function (val) {
      if (val === '') {
        this.emailError = true;
      }
    },
  },
  methods: {
    emailSubmit() {
      console.log('clicked');
      this.validateAndProceed();
      if (this.emailError === false) {
        this.sendResetEmail();
        return;
      }
    },
    sendResetEmail() {
      if (this.emailError === false) {
        this.emailError = true;
        setTimeout(() => {
          this.emailError = false;
        }, 5000);
        this.$store
          .dispatch('auth/sendResetEmail', this.email)
          .then((res) => {
            this.$vs.notify({
              title: 'Check your mail',
              text: 'Mail sent successfully',
              color: 'success',
            });
            this.email = '';
          })
          .catch((e) => {
            if (e.response.data.message === 'invalid emaiil') {
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
      }
    },

    validateAndProceed() {
      console.log('i am here');
      this.errors = {};
      if (!this.email) {
        this.errors.email = 'Email is required.';
        this.emailError = true;
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = 'Invalid email format.';
        this.emailError = true;
      } else {
        console.log('Form submitted with email:', this.email);
        this.emailError = false;
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
@import url(https://allfont.net/allfont.css?fonts=karla);

*:not(i) {
  font-family: 'Karla', sans-serif;
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}
.container {
  height: 300px;
  width: 500px;
  border: 1px solid #31394e;
  background-color: #1f272f;
  border-radius: 12px;
  padding: 25px;
  position: relative;
}
.custom-heading {
  font-size: 18px;
  font-weight: 500;
  color: #a6a6a8;
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
  font-size: 14px;
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
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  color: #a6a6a8;
  background: none;
  border: none;
  top: 5px;
  right: 10px;
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
}
</style>
