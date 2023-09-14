<template>
  <div v-if="showMenu" class="user-menu">
    <!-- Add your menu options here -->
    <div>
      <img src="@/assets/images/usermenu.svg" />
      My Profile
    </div>
    <MyProfile :showProfile="userProfile" @closeProfile="closeProfile" />
    <div>
      <img src="@/assets/images/setting.svg" />
      Reset Password
    </div>
    <ResetPass :showPass="userPass" @closeProfile="closeProfile" />
    <div>
      <img src="@/assets/images/guide.svg" />
      Guide
    </div>
    <div>
      <img src="@/assets/images/help.svg" />
      Help Center
    </div>
    <div>
      <img src="@/assets/images/export.svg" />
      Logout
    </div>
  </div>
</template>

<script>
import MyProfile from './MyProfile.vue';
import ResetPass from './ResetPass.vue';
export default {
  name: 'userMenu',
  props: {
    showMenu: Boolean,
    closeMenu: Function,
  },
  components: {
    MyProfile,
    ResetPass,
  },
  data() {
    return {
      userProfile: false,
      userPass: false,
    };
  },
  methods: {
    toggleProfile() {
      //   this.closeMenu();
      this.userProfile = !this.userProfile;
      this.userPass = false;
      console.log('HHHH');
    },
    togglePass() {
      //   this.closeMenu();
      this.userPass = !this.userPass;
      this.userProfile = false;
      console.log('PPP');
    },
    closeProfile() {
      console.log('close');
      this.userProfile = false;
      this.userPass = false;
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles for the user menu here */
.user-menu {
  position: absolute;
  background-color: #1f272f;
  width: 145px;
  height: 186px;
  border: 1px solid #31394e;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 12px;
  color: #ffffff;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 0;
  right: 5%;
}

.user-menu div {
  background: none;
  cursor: pointer;
  border: none;
  color: #a6a6a8;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding: 5px 10px;
}

.user-menu div:hover {
  background: #31394e7d;
  color: #fff;
}

div:active {
  color: #ffffff;
}

div img {
  margin-right: 5px;
}
</style>
