<template>
  <BaseModal :title="'Reset password'" @close="toggleActiveModal('')">
    <template #modalContent>
      <div>
        <!-- <div class="head-cont">
      <h3>Reset Password</h3>
      <button @click="closeProfile">
        <img src="@/assets/images/cross.svg" />
      </button>
    </div> -->

        <div class="desc-cont">
          <p>Strong password required. Enter 8-14 characters.</p>
        </div>

        <div class="form">
          <label for="oldPassword">Old password</label>
          <input type="password" id="oldPassword" v-model="oldPassword" />
          <span class="error" v-if="error.oldPassword">{{
            error.oldPassword
          }}</span>

          <label for="newPassword">Create new password</label>
          <input type="password" id="newPassword" v-model="newPassword" />
          <span class="error" v-if="error.newPassword">{{
            error.newPassword
          }}</span>

          <label for="confirmPassword">Confirm new password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" />
          <span class="error" v-if="error.confirmPassword">{{
            error.confirmPassword
          }}</span>

          <vs-button class="save-btn" @click="savePassword">Save</vs-button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
  name: 'ResetPasswordModal',
  props: ['toggleActiveModal'],
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  components: {
    BaseModal,
  },
  mounted() {
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    closeProfile() {
      this.$store.commit('room/SET_POPUP', '');
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.container');
      const isNotTogglePass = !event.target.closest('.toggle-pass');
      if (isOutsideRoomPopup && isNotTogglePass && this.showPass !== false) {
        this.showPass = false;
        this.$emit('p-closed');
      }
    },
    savePassword() {
      // Reset previous error messages
      this.error = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      };

      // Performing validation
      if (!this.oldPassword) {
        this.error.oldPassword = 'Old password is required.';
      }
      if (this.newPassword.length < 8 || this.newPassword.length > 14) {
        this.error.newPassword =
          'Password must be between 8 and 14 characters.';
      }
      if (this.newPassword !== this.confirmPassword) {
        this.error.confirmPassword = 'Passwords do not match.';
      }

      // reset paasword
      if (
        !this.error.oldPassword &&
        !this.error.newPassword &&
        !this.error.confirmPassword
      ) {
        const data = {};
        data.current_password = this.oldPassword;
        data.new_password = this.newPassword;
        data.confirm_password = this.confirmPassword;
        this.$vs.loading();
        this.$store
          .dispatch('auth/changePassword', data)
          .then(() => {
            this.$vs.notify({
              title: 'Success',
              text: 'Password updated successfully',
              color: 'success',
            });
            this.oldPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            this.$validator.reset();
          })
          .catch((error) => {
            this.$vs.notify({
              title: 'Error',
              text: error.response.data.message,
              color: 'danger',
            });
          })
          .finally(() => {
            this.$vs.loading.close();
          });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 367px;
  height: auto;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
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
  width: 100%;
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
  margin-top: 20px;
  float: right;
}

@media (max-width: 500px) {
  .container {
    width: 350px;
  }

  .form input {
    width: 100%;
  }
}
</style>
