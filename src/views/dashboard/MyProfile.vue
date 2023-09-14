<template>
    <div class="full-cont" v-if="showProfile">
      <div class="head-container">
        <h3>My Profile</h3>
        <button @click="closeProfile">
          <img src="@/assets/images/cross.svg" />
        </button>
      </div>
  
      <div class="info-cont">
        <div class="pri-cont">
          <div class="img-cont">
            <button class="img-up">
              <img src="@/assets/images/camera.svg" />
            </button>
            <img src="@/assets/images/luffy.webp" />
          </div>
  
          <div class="name-cont">
            <h3>Christopher Holm</h3>
            <p>chrishtoperholm@gmail.com</p>
          </div>
        </div>
  
        <div class="form-cont">
          <div class="child-1">
            <label>First name</label>
            <input v-model="firstName" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.5 }" />
            <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
  
            <label>Email address</label>
            <input v-model="email" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.5 }" />
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </div>
  
          <div class="child-2">
            <label>Last name</label>
            <input v-model="lastName" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.5 }" />
            <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
  
            <label>Add your designation</label>
            <input v-model="designation" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.5 }" />
            <span class="error" v-if="errors.designation">{{ errors.designation }}</span>
          </div>
        </div>
  
        <div class="edit-cont">
          <button @click="editProfile" :disabled="isEditing">Edit</button>
          <button @click="saveProfile" :disabled="!isEditing" :style="{ opacity: isEditing ? 1 : 0.5 }">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyProfile',
    props: {
      showProfile: Boolean,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        isEditing: false,
        errors: {
          firstName: '',
          lastName: '',
          email: '',
          designation: '',
        },
      };
    },
    methods: {
      closeProfile() {
        this.$emit('closeProfile');
        this.isEditing = false;
      },
      editProfile() {
        this.isEditing = true;
      },
      saveProfile() {
        this.errors = {
          firstName: '',
          lastName: '',
          email: '',
          designation: '',
        };
  
        // Performing validation
        if (!this.firstName) {
          this.errors.firstName = 'First name is required.';
        }
        if (!this.lastName) {
          this.errors.lastName = 'Last name is required.';
        }
        if (!this.email) {
          this.errors.email = 'Email address is required.';
        }
        if (!this.designation) {
          this.errors.designation = 'Designation is required.';
        }
        if (
          !this.errors.firstName &&
          !this.errors.lastName &&
          !this.errors.email &&
          !this.errors.designation
        ) {
          console.log('Success');
          this.isEditing = false;
        }
      },
    },
  };
  </script>
<style>
.full-cont {
    position: absolute;
    width: 541px;
    height: auto;
    border-radius: 10px;
    background-color: #1f272f;
    border: 1px solid #31394e;
    padding: 15px;
    top: 40vh;
    right: 75%;
    transform: translate(-50%, -50%);
    z-index: 10000;
}

.head-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #a6a6a8;
}

.head-container h3 {
    font-size: 14px;
    font-weight: 600px;
    color: #a6a6a8;
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
    margin-top: 20px;
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

.form-cont {
    display: flex;
    gap: 20px;
    text-align: left;
    justify-content: space-between;
    color: #647181;
    /* font-family: Popins,sans-serif; */
    /* border: 1px solid red; */
}

.form-cont input {
    background-color: #1D232B;
    border: 1px solid #31394E;
    border-radius: 6px;
    color: #A6A6A8;
    width: 242px;
    height: 34px;
    font-size: 13px;
    padding: 10px;
}

.form-cont span {
    display: block;
    color: red;
    font-size: 12px;
}

.name-cont p {
    color: #647181;
}

.name-cont h3 {
    color: #a6a6a8;
}

label {
    display: block;
    font-size: 12px;
    color: #647181;
    margin-top: 20px;
    margin-bottom: 5px;
}


.edit-cont {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 20px;
}

.edit-cont button:nth-child(1) {
    background-color: #1D232B;
    border: 1px solid #31394e;
    width: 113px;
    height: 40px;
    border-radius: 6px;
    color: #A6A6A8;
    font-weight: 600;
    cursor: pointer;
    font-family: Popins,sans-serif;
}

.edit-cont button:nth-child(2) {
    background-color: #D7DF23;
    border: 1px solid #31394e;
    width: 113px;
    height: 40px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-family: Popins,sans-serif;
}
</style>
