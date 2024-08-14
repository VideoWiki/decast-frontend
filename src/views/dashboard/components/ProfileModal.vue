<template>
  <BaseModal :title="'My profile'" @close="toggleActiveModal('')">
    <template #modalContent>
      <div class="modal-content-wrapper">
        <div class="modal-content">
          <div class="modal-heading">
            <h3>Profile</h3>
          </div>
          <!-- Profile Image -->
          <div class="pri-cont pt-8">
            <div class="img-cont">
              <input type="file" id="display-profile-input" @change="uploadFile" class="hidden" accept="image/*" />
              <button class="img-up" :disabled="!isEditing || uploadInProgress" @click="openUpload"
                :style="{ display: !isEditing ? 'none' : 'block' }">
                <img src="@/assets/images/camera.svg" alt="Upload Image" />
              </button>
              <vs-avatar :text="activeUserInfo.first_name[0]" color="primary" class="m-0 shadow-md"
                :src="activeUserInfo.profile_pic || null" size="57px" />
            </div>

            <div class="name-cont">
              <h3>{{ activeUserInfo.username }}</h3>
              <p>{{ activeUserInfo.email }}</p>
            </div>
          </div>

          <!-- Form Fields -->
          <div class="form-cont w-full flex flex-col">
              <label class="label">First name</label>
              <input class="w-2/5 p-3 mt-2" v-model="firstName" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.7 }" required />
              <span class="error text-red-500 mt-1" v-if="error.firstName">{{
                error.firstName
              }}</span>

              <label class="label">Last name</label>
              <input class="w-2/5 p-3 mt-2" v-model="lastName" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.7 }" required />
              <span class="error text-red-500 mt-1" v-if="error.lastName">{{ error.lastName }}</span>

              <label class="label">Email address</label>
              <input class="w-2/5 p-3 mt-2" v-model="email" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.7 }" type="email"
                required />
              <span class="error text-red-500 mt-1" v-if="error.email">{{ error.email }}</span>
              <label class="label">Add your designation</label>
              <input class="w-2/5 p-3 mt-2" v-model="designation" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.7 }" required />
              <span class="error text-red-500 mt-1" v-if="error.designation">{{
                error.designation
              }}</span>
            </div>
          </div>

          <!-- Edit and Save Buttons -->
          <div class="edit-cont flex mt-4">
            <vs-button @click="editProfile" :disabled="isEditing" type="border" :style="{ display: isEditing ? 'none' : 'block' }"> >> Edit</vs-button>
            <vs-button @click="saveProfile" :disabled="!isEditing" type="border" :style="{ display: isEditing ? 'block' : 'none' }">
             >> Confirm
            </vs-button>
          </div>
        </div>
    </template>
  </BaseModal>
</template>

<script>
import constants from '../../../../constant';
import axios from '../../../axios';
import BaseModal from "@/components/common/BaseModal.vue";

export default {
  name: 'ProfileModal',
  props: ['toggleActiveModal'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      designation: localStorage.getItem('designation') || '',
      isEditing: false,
      uploadInProgress: false,
      uploadedImageBlob: null,
      error: {
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
      },
    };
  },
  components: {
    BaseModal,
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  mounted() {
    this.firstName = this.activeUserInfo.first_name;
    this.lastName = this.activeUserInfo.last_name;
    this.email = this.activeUserInfo.email;
    window.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleGlobalClick);
  },
  methods: {
    openUpload() {
      document.getElementById('display-profile-input').click();
    },
    uploadFile(event) {
      const selectedFile = event.target.files[0];
      this.uploadedImageBlob = selectedFile;
      this.activeUserInfo.profile_pic = URL.createObjectURL(selectedFile);
      event.target.value = '';
    },
    handleGlobalClick(event) {
      const isOutsideRoomPopup = !event.target.closest('.full-cont');
      const isNotToggleProfile = !event.target.closest('.toggle-profile');
      if (
        isOutsideRoomPopup &&
        isNotToggleProfile &&
        this.showProfile !== false
      ) {
        this.showProfile = false;
        this.$emit('profile-closed');
      }
    },
    closeProfile() {
      this.$store.commit('room/SET_POPUP', '');
      this.isEditing = false;
    },
    editProfile() {
      this.isEditing = true;
    },
    logout() {
      this.$cookies.remove('userId');
      this.$cookies.remove('Token');
      this.$router.push('/');
      return this.$store.dispatch('auth/logOut');
    },
    saveProfile() {
      this.error = {
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
      };

      // Performing validation
      if (!this.firstName) {
        this.error.firstName = 'First name is required.';
      }
      if (!this.lastName) {
        this.error.lastName = 'Last name is required.';
      }
      if (!this.email) {
        this.error.email = 'Email address is required.';
      }
      //   if (!this.designation) {
      //     this.error.designation = 'Designation is required.';
      //   }

      if (
        !this.error.firstName &&
        !this.error.lastName &&
        !this.error.email &&
        !this.error.designation
      ) {
        this.$vs.loading();
        const payload = {
          user_name: this.activeUserInfo.username,
          fname: this.firstName,
          lname: this.lastName,
          email: this.email,
          p_image: this.uploadedImageBlob ? this.uploadedImageBlob : '',
        };
        //console.log(payload);
        this.$store
          .dispatch('auth/updateUserDetails', payload)
          .then((res) => {
            //console.log(res, 'res');
            localStorage.setItem('designation', this.designation);
            this.isEditing = false;
            this.activeUserInfo.profile_pic = res.data.profile_image;
            //console.log(res.data.profile_image, 'img');
            //console.log(payload, 'pay');
            this.$store.commit('UPDATE_USER_INFO', this.activeUserInfo);
            this.$vs.notify({
              title: 'Success',
              text: 'Changes Saved, Please Login again',
              color: 'success',
            });
            this.logout();
          })
          .catch((err) => {
            ////console.log(err);
            this.$vs.notify({
              title: 'Error',
              text: 'Error Saving Details',
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
.full-cont {
  width: 541px;
  height: auto;
  border-radius: 10px;
  background-color: #000;
  /* border: 1px solid #31394e;
  padding: 15px; */
  z-index: 10000;
}

.head-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.head-container h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #fff;
}

.head-container button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}

.pri-cont {
  display: flex;
  width: fit-content;
  gap: 15px;
}

.img-cont {
  width: 59px;
  height: 59px;
  position: relative;
  border-radius: 50%;
  border: 1px solid #31394e;
}

.img-cont img {
  width: 59px;
  height: 59px;
  border-radius: 50%;
}

.img-up {
  position: absolute;
  background-color: #1f272f;
  border: 1px solid #31394e;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  right: 0%;
  z-index: 10000;
  cursor: pointer;
}

.img-up img {
  width: 18px;
  height: 18px;
}

.form-cont input {
  font-family: 'JetBrains Mono';
  border: 0px;
  background-color: #FFFFFF;
  outline: none;
  border-radius: 0px;
  color: #000000;
  font: bold !important;
}

.name-cont p {
  color: #647181;
}

.name-cont h3 {
  color: #fff;
}

.label {
  display: block;
  font-size: 12px;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 5px;
}

.edit-cont button:nth-child(1) {
  width: 113px;
}

.edit-cont button:nth-child(2) {
  width: 113px;
}

@media (max-width: 500px) {
  .full-cont {
    width: 300px;
    display: flex;
    flex-direction: column;
  }

  .info-cont {
    display: flex;
    flex-direction: column;
  }

  .child-2 {
    margin-top: -20px;
  }

  .name-cont h3 {
    color: #fff;
    font-size: 16px;
  }
}
</style>
