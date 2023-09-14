<template>
    <div v-if="showMenu" class="user-menu">
        <!-- Add your menu options here -->
        <div>
            <button @click="toggleProfile">
                <img src="@/assets/images/usermenu.svg" />
                My Profile
            </button>
        </div>
        <MyProfile :showProfile="userProfile" @closeProfile="closeProfile" />
        <div>
            <button @click="togglePass">
                <img src="@/assets/images/setting.svg" />
                Reset Password
            </button>
        </div>
        <ResetPass :showPass="userPass" @closeProfile="closeProfile" />
        <div>
            <button>
                <img src="@/assets/images/guide.svg" />
                Guide
            </button>
        </div>
        <div>
            <button>
                <img src="@/assets/images/help.svg" />
                Help Center
            </button>
        </div>
        <div>
            <button>
                <img src="@/assets/images/export.svg" />
                Logout
            </button>
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
    },
    components: {
        MyProfile,
        ResetPass,
    },
    data() {
        return {
            userProfile: false,
            userPass: false,
        }
    },
    methods: {
        toggleProfile() {
            this.userProfile = !this.userProfile;
            this.userPass==this.userPass
            console.log("HHHH");
        },
        togglePass() {
            this.userPass = !this.userPass;
            this.userProfile==this.userProfile;
            console.log("PPP");
        },
        closeProfile() {
            console.log("close");
            this.userProfile = false;
            this.userPass=false;
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
    padding: 10px;
    right: 5%;
}

button {
    background: none;
    cursor: pointer;
    border: none;
    color: #A6A6A8;
    text-align: left;
}

button:active {
    color: #ffffff;
}

button img {
    margin-top: 5px;
    margin-right: 5px;
}
</style>
