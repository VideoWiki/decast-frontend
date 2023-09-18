<template>
  <div class="container" v-if="showPass">
    <div class="head-cont">
      <h3>Reset Password</h3>
      <button @click="closeProfile">
        <img src="@/assets/images/cross.svg" />
      </button>
    </div>

    <div class="desc-cont">
      <p>Strong password required. Enter 8-14 characters.</p>
    </div>

    <div class="form">
      <label for="oldPassword">Old password</label>
      <input type="password" id="oldPassword" v-model="oldPassword" />
      <span class="error" v-if="errors.oldPassword">{{
        errors.oldPassword
      }}</span>

      <label for="newPassword">Create new password</label>
      <input type="password" id="newPassword" v-model="newPassword" />
      <span class="error" v-if="errors.newPassword">{{
        errors.newPassword
      }}</span>

      <label for="confirmPassword">Confirm new password</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" />
      <span class="error" v-if="errors.confirmPassword">{{
        errors.confirmPassword
      }}</span>

      <button class="save-btn" @click="savePassword">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPass',
  props: {
    showPass: Boolean,
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errors: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    closeProfile() {
      this.$emit('closeProfile');
    },
    savePassword() {
      // Reset previous error messages
      this.errors = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      };

      // Performing validation
      if (!this.oldPassword) {
        this.errors.oldPassword = 'Old password is required.';
      }
      if (this.newPassword.length < 8 || this.newPassword.length > 14) {
        this.errors.newPassword =
          'Password must be between 8 and 14 characters.';
      }
      if (this.newPassword !== this.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match.';
      }

      // reset paasword
      if (
        !this.errors.oldPassword &&
        !this.errors.newPassword &&
        !this.errors.confirmPassword
      ) {
        console.log('Success');
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  width: 367px;
  height: auto;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
  top: 40vh;
  right: 205%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.head-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a6a6a8;
}

.head-cont h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #a6a6a8;
}

.head-cont button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}

.form input {
  background-color: #1d232b;
  border: 1px solid #31394e;
  border-radius: 6px;
  color: #a6a6a8;
  width: 315px;
  height: 34px;
  font-size: 13px;
  padding: 10px;
}

.form span {
  display: block;
  color: red;
  font-size: 12px;
}

label {
  display: block;
  font-size: 12px;
  color: #647181;
  margin-top: 20px;
}

.desc-cont P {
  font-size: 12px;
  color: #647181;
  text-align: left;
}

.save-btn {
  background-color: #d7df23;
  border: 1px solid #31394e;
  width: 113px;
  height: 40px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 60%;
}
</style>
