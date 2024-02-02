<template>
  <BaseModal :title="'Reset password'" @close="toggleActiveModal('')">
    <template #modalContent>
      <div class="modal-content-wrapper">
        <div class="modal-content">
          <div class="modal-heading">
            <h3>Reset</h3>
          </div>
          <div class="reset-pass-content flex flex-col gap-4 mt-8">

            <div class="desc-cont">
              <p>Strong password required. Enter 8-14 characters.</p>
            </div>

            <div class="form flex flex-col pb-12">
              <label class="mt-4" for="oldPassword">Old password</label>
              <div class="password-input flex flex-row w-2/5 p-2 mt-2 items-center justify-between ">
                <input type="password" id="oldPassword" v-model="oldPassword" />
                <span class="toggle-password" @click="togglePasswordVisibility('oldPassword')">
                  <EyeVisible v-if="passwordVisible.oldPassword" />
                  <EyeHide v-else />
                </span>
              </div>
              <span class="error text-red-500" v-if="error.oldPassword">{{
                error.oldPassword
              }}</span>

              <label class="mt-4" for="newPassword">Create new password</label>
              <div class="password-input flex flex-row w-2/5 p-2 mt-2 items-center justify-between ">
                <!-- <input type="password" id="newPassword" v-model="newPassword" /> -->
                <input type="password" id="newPassword" v-model="newPassword"
                  @input="validatePassword" />
                <span class="toggle-password" @click="togglePasswordVisibility('newPassword')">
                  <EyeVisible class="icon_eye" v-if="passwordVisible.newPassword" />
                  <EyeHide class="icon_eye" v-else />
                </span>
              </div>
              <span class="error text-red-500" v-if="error.newPassword">{{
                error.newPassword
              }}</span>

              <label class="mt-4" for="confirmPassword">Confirm new password</label>
              <div class="password-input flex flex-row w-2/5 p-2 mt-2 items-center justify-between ">
                <!-- <input type="password" id="confirmPassword" v-model="confirmPassword" /> -->
                <input type="password" id="confirmPassword" v-model="confirmPassword"
                  @input="validatePassword" />
                <span class="toggle-password" @click="togglePasswordVisibility('confirmPassword')">
                  <EyeVisible v-if="passwordVisible.confirmPassword" />
                  <EyeHide v-else />
                </span>
              </div>
              <span class="error text-red-500" v-if="error.confirmPassword">{{
                error.confirmPassword
              }}</span>

              <vs-button class="save-btn mt-8" type="border" @click="savePassword"> >> Confirm</vs-button>
            </div>
          </div>
        </div>
      </div>

    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";
import EyeHide from "@/assets/svgs/EyeHide.vue";
import EyeVisible from "@/assets/svgs/EyeVisible.vue";

export default {
  name: 'ResetPasswordModal',
  props: ['toggleActiveModal'],
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordVisible: {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      },
      error: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      isPasswordValid: false,
    };
  },
  components: {
    BaseModal,
    EyeHide,
    EyeVisible,
  },
  mounted() {
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    togglePasswordVisibility(field) {
      this.passwordVisible[field] = !this.passwordVisible[field];
      const input = document.getElementById(field);
      if (input) {
        input.type = this.passwordVisible[field] ? 'text' : 'password';
      }
    },
    validatePassword() {
      // Password conditions
      const capitalRegex = /[A-Z]/;
      const smallRegex = /[a-z]/;
      const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /\d/;

      // Check if the new password meets all conditions
      const isCapital = capitalRegex.test(this.newPassword);
      const isSmall = smallRegex.test(this.newPassword);
      const isSymbol = symbolRegex.test(this.newPassword);
      const isNumber = numberRegex.test(this.newPassword);

      // Update the error message based on the conditions
      this.error.newPassword = '';
      if (!isCapital)
        this.error.newPassword +=
          'Password must contain at least one capital letter. ';
      if (!isSmall)
        this.error.newPassword +=
          'Password must contain at least one small letter. ';
      if (!isSymbol)
        this.error.newPassword += 'Password must contain at least one symbol. ';
      if (!isNumber)
        this.error.newPassword += 'Password must contain at least one number. ';

      // Check if the password length is between 8 and 14 characters
      if (this.newPassword.length < 8 || this.newPassword.length > 14) {
        this.error.newPassword +=
          'Password must be between 8 and 14 characters. ';
      }

      // Check if the "Confirm new password" field matches the "Create new password" field
      if (this.confirmPassword !== this.newPassword) {
        this.error.confirmPassword = 'Passwords do not match.';
      } else {
        this.error.confirmPassword = '';
      }

      // Update the isPasswordValid flag
      this.isPasswordValid =
        isCapital &&
        isSmall &&
        isSymbol &&
        isNumber &&
        this.newPassword.length >= 8 &&
        this.newPassword.length <= 14 &&
        this.confirmPassword === this.newPassword;
    },
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
  z-index: 10000;
}

.password-input{
  background: #fff;
}

.password-input input{
  outline: none;
  border: none;
}

</style>
