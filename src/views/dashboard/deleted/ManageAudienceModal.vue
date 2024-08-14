<template>
    <BaseModal :title="'Invite your attendees'" @close="closeModal">
        <template #modalContent>
            <div class="invite-cont">
                <div class="input-container">
                    <div class="opt-cont" ref="customSelect" @mousedown="toggleDropdown">
                        <label class="custom-selector">
                            <select v-model="selectedOption">
                                <option value="participant">Participants</option>
                                <option value="co-host">Co-host</option>
                                <option v-if="isStream" value="spectator">Spectator</option>
                                <option v-if="viewer" value="viewer">Viewer</option>
                            </select>
                        </label>
                        <ul v-if="isDropdownOpen" class="custom-options">
                            <li v-for="(option, index) in options" :key="index" @mousedown="selectOption(option)">
                                {{ option.label }}
                            </li>
                        </ul>
                    </div>
                    <input v-model="userEmail" @keydown.enter="addUser" placeholder="contact@example.com" />
                    <button @click="addUser">Invite</button>
                </div>

                <div class="parent-img">
                    <div class="main-img">
                        <div v-for="(invite, inviteIndex) in invites" :key="inviteIndex" class="images-container">
                            <p>
                                {{ invite.email.slice(0, 2) }}
                            </p>
                            <button class="close-button" @click="removeUser(invite, inviteIndex)">
                                X
                            </button>
                        </div>
                    </div>
                    <span>{{ invites.length }}</span>
                </div>

                <div class="info-cont">
                    <p>Or Invite many attendees by submitting an excel sheet</p>
                    <div class="opt-container">
                        <div class="child-1">
                            <div>
                                <input type="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    style="display: none" @change="updateSheetInfo" ref="sheetInput" />
                                <button @click="openSheetInput">Select file</button>
                                <p>{{ sheetFileName }}</p>
                                <span>{{ sheetFileSize }}</span>
                            </div>

                            <div>
                                <button>
                                    <img src="@/assets/images/delete.svg" />
                                </button>
                            </div>
                        </div>

                        <div class="midStroke"></div>

                        <div class="prog-cont">
                            <div class="progression">
                                <progress max="100" class="prog-bar" :value="uploadPercentage"></progress>
                                <p class="w-2/12 px-4" style="line-height: 15px">
                                    {{ uploadPercentage }}%
                                </p>
                            </div>
                            <div class="btn-cont">
                                <button class="sample-Btn">
                                    <a
                                        href="https://videowikistorage.blob.core.windows.net/room-db-backup/Sample_Invitee_List.xlsx">
                                        <span>Sample List</span>
                                    </a>
                                </button>
                                <button class="invite-btn" @click="submitSheet">
                                    Invite People
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="nots-cont">
        <div>
          <span>Notifications</span>
          <br />
          <button>Email</button>
        </div>
        <div>
          <span>Set reminder</span>
          <br />
          <button>1 hour before call</button>
        </div>
      </div> -->

                <div class="done-btn">
                    <!-- <button @click="changeStatus('success')" class="back-btn">Back</button> -->
                    <button @click="closeModal">Done</button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
  
<script>
// import axios from 'axios';
import constants from '../../../../../constant';
import axios from '@/axios';
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'ManageAudienceModal',
    props: ['closeModal', 'castId', 'invites', 'isStream', 'viewer'],
    data() {
        return {
            file: null,
            userEmail: '',
            userRoleLabel: 'Participant',

            selectedOption: 'participant',
            isDropdownOpen: false,
            options: [
                { value: 'participant', label: 'Participants' },
                { value: 'co-host', label: 'Co-host' },
            ],
            sheetFileName: 'No File Selected',
            sheetFileSize: 0,
            uploadPercentage: 0,
        };
    },
    components: {
        BaseModal,
    },
    mounted() {
        window.addEventListener('click', this.closeDropDown);
        if (this.isStream)
            this.options.push({ value: 'spectator', label: 'Spectator' });
        if (this.viewer) this.options.push({ value: 'viewer', label: 'Viewer' });
    },
    beforeDestroy() {
        window.removeEventListener('click', this.closeDropDown);
    },
    methods: {
        closeDropDown(e) {
            //console.log(e.target.tagName);
            if (e.target.tagName !== 'LI') {
                //console.log(2);
                this.isDropdownOpen = false;
            }
        },
        toggleDropdown(event) {
            if (window.innerWidth >= 420) {
                event.preventDefault();
                //console.log(1);
                setTimeout(() => (this.isDropdownOpen = !this.isDropdownOpen), 500);
            }
        },
        selectOption(option) {
            this.selectedOption = option.value;
            this.isDropdownOpen = false;
        },

        async checkInvitee(email) {
            let result = false;
            const payload = {
                email: email,
                cast_id: this.castId,
            };
            await this.$store
                .dispatch('studio/checkInvitee', payload)
                .then((res) => {
                    result = false;
                })
                .catch((err) => {
                    //console.log(err);
                    result = true;
                });
            return result;
        },

        async addUser() {
            const userEmail = this.userEmail.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(userEmail)) {
                this.$vs.notify({
                    time: 3000,
                    title: 'Invalid Email',
                    text: 'Please enter a valid email address.',
                    color: 'warning',
                });
                return;
            }

            this.$vs.loading();

            const isAlreadyInvited = await this.checkInvitee(userEmail);

            if (isAlreadyInvited) {
                this.$vs.loading.close();
                this.$vs.notify({
                    time: 6000,
                    title: 'Email Already Invited',
                    text: 'This email has already been invited.',
                    color: 'warning',
                });
                return;
            }

            const userToInvite = {
                name: '',
                email: userEmail,
                type: this.selectedOption,
                nft_enable: '',
                give_nft: false,
            };

            const newUser = {
                email: userEmail,
                role: this.selectedOption,
                images: [],
            };

            const emailPrefix = userEmail.substring(0, 2).toUpperCase();
            newUser.images.push(`https://fakeimg.pl/50x50/?text=${emailPrefix}`);

            this.invites.push(newUser);
            const payload = {
                invitee_list: [userToInvite],
                cast_id: this.castId,
            };

            this.$store
                .dispatch('studio/addInvitee', payload)
                .then((res) => {
                    this.$vs.loading.close();
                    this.$vs.notify({
                        title: '',
                        text: 'User added successfully!',
                        color: 'success',
                    });
                    this.userEmail = '';
                    this.$vs.loading.close();
                })
                .catch((err) => {
                    //console.log(err);
                    this.$vs.loading.close();
                    this.$vs.notify({
                        title: 'Error',
                        text: 'Try again',
                        color: 'danger',
                    });
                });
        },

        removeUser(user, inviteIndex) {
            const payload = {
                email: [user.email],
                cast_id: this.castId,
            };

            this.$store
                .dispatch('studio/deleteInvitee', payload)
                .then((res) => {
                    this.invites.splice(inviteIndex, 1);
                    this.$vs.notify({
                        title: '',
                        text: 'User removed successfully !',
                        color: 'success',
                    });
                })
                .catch((err) => {
                    this.$vs.loading.close();
                    this.$vs.notify({
                        title: 'Error',
                        text:
                            err.response != null ? err.response.data.message : 'Try again !',
                        color: 'danger',
                    });
                });
        },

        openSheetInput() {
            this.$refs.sheetInput.click();
        },
        submitSheet() {
            const fileInput = this.$refs.sheetInput;
            if (fileInput.files.length === 0) {
                this.$vs.notify({
                    time: 3000,
                    title: 'Oh No',
                    text: 'No File Selected',
                    color: 'warning',
                });
                return;
            }
            const file = fileInput.files[0];
            var formData = new FormData();
            formData.append('file', file);
            formData.append('cast_id', this.castId);
            axios
                .post(constants.apiCastUrl + '/api/event/invitee/import/', formData, {
                    headers: {
                        'Content-Type': 'multiPart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        this.uploadPercentage = parseInt(
                            Math.round((progressEvent.loaded / progressEvent.total) * 100)
                        );
                    },
                })
                .then((res) => {
                    this.$vs.notify({
                        time: 3000,
                        title: 'Success',
                        text: 'Invited Successfully.',
                        color: 'success',
                    });

                    this.sheetFileName = 'No File Selected';
                    this.sheetFileSize = '';
                    this.uploadPercentage = 0;
                    fileInput.value = '';
                })
                .catch((error) => {
                    //console.log(error);
                    this.$vs.notify({
                        time: 3000,
                        title: 'Unauthorized',
                        text: 'You are not allowed to invite people',
                        color: 'danger',
                    });
                    this.uploadPercentage = 0;
                });
        },

        updateSheetInfo(event) {
            const fileInput = event.target;
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                this.file = file;
                this.sheetFileName = file.name;
                this.sheetFileSize = `${(file.size / 1024 / 1024).toFixed(2)}MB`;
            } else {
                this.sheetFileName = 'No File Selected';
                this.sheetFileSize = '';
            }
        },
    },
};
</script>
  
<style scoped>
.opt-cont {
    width: 109px;
    height: 40px;
    background-color: #2d3a48;
    border: 1px solid #31394e;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
    font-size: 12px;
    font-family: sans-serif;
    position: relative;
}

.opt-cont .custom-selector select {
    max-width: 95px;
    min-width: 90px;
    border-radius: 6px;
    border: 1px solid #31394e;
    outline: none;
    background-color: #2d3a48;
    color: #a6a6a8;
    cursor: pointer;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
}

.opt-cont .custom-selector::after {
    content: '';
    border-width: 6px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #fff;
    display: inline-block;
    position: absolute;
    top: 13px;
    right: 10px;
}

.opt-cont .custom-options {
    list-style: none;
    padding: 5px 0;
    background-color: #2d3a48 !important;
    z-index: 999 !important;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 108.8px;
    position: absolute !important;
    margin: auto;
    left: -1px;
}

.opt-cont .custom-options li {
    height: 28px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 5px;
    color: #a6a6a8;
    transition: background 0.3s ease;
}

.opt-cont .custom-options li:hover {
    background-color: #31a2f4;
}
</style>
  
<style scoped>
.invite-cont {
    /* width: 590px; */
    /* min-height: 475px; */
    height: auto;
    border-radius: 10px;
    background-color: #1f272f;
    /* border: 1px solid #31394e; */
    /* padding: 15px; */
    /* padding-bottom: 25px; */
    margin: auto;
}

button {
    cursor: pointer;
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

.input-container {
    display: flex;
    border: 1px solid #31394e;
    border-radius: 6px;
    width: 555px;
    /* margin: auto; */
    height: 42px;
    /* margin-top: 20px; */
}

/* :root {
      --select-border: #777;
      --select-focus: blue;
      --select-arrow: var(--select-border);
  } */

.input-container button {
    width: 80px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #31394e;
    color: #fff;
    background-color: #31a2f4;
}

.input-container input {
    width: 365px;
    background-color: #1d232b;
    padding: 10px;
    border: none;
    outline: none;
    height: 40px;
    color: #a6a6a8;
}

/* .final-div {
      max-width: 270px;
      width: fit-content;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      gap: 10px;
  } */

.parent-img {
    max-width: 270px;
    width: fit-content;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.main-img {
    max-width: 220px;
    height: 45px;
    width: fit-content;
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    overflow: hidden;
}

.parent-img span {
    width: 30px;
    height: 18px;
    border-radius: 8px;
    background-color: #2934415e;
    border: 1px solid #31394e99;
    margin: auto;
    text-align: center;
    font-size: 11px;
    color: #a6a6a8;
}

.images-container {
    width: 38px;
    display: inline-block;
    flex-wrap: nowrap;
    margin-top: 20px;
    padding: 0;
    margin: 0;
    margin-top: 10px;
    position: relative;
}

.images-container img {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    position: relative;
}

.images-container p {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    position: relative;
    border: 1px solid #31394e;
    color: #a6a6a8;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #31394e;
}

.close-button {
    position: absolute;
    top: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    left: 25px;
    background-color: #293441;
    border: 1px solid #31394e;
    cursor: pointer;
    font-size: 8px;
    color: #a6a6a8;
}

.info-cont {
    /* width: 565px; */
    /* margin: auto;
    margin-top: 25px; */
}

.info-cont p {
    color: #637181;
    font-size: 12px;
    font-weight: 600;
}

.opt-container {
    border: 1px solid #31394e;
    background-color: #1f272f;
    width: 555px;
    height: 120px;
    border-radius: 6px;
    /* margin: auto; */
    margin-top: 10px;
}

.nots-cont {
    width: 240px;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
}

.nots-cont div span {
    font-size: 12px;
}

.nots-cont div button {
    margin-top: 5px;
}

.nots-cont div:nth-child(1) button {
    background-color: #464775;
    width: 63px;
    height: 30px;
    border: none;
    border-radius: 6px;
    color: #a6a6a8;
}

.nots-cont div:nth-child(2) button {
    background-color: #2934415e;
    border: 1px solid #31394e;
    color: #a6a6a8;
    width: 149px;
    height: 30px;
    border-radius: 6px;
}

.done-btn {
    text-align: right;
    margin-top: 20px;
}

.done-btn button {
    background-color: #d7df23;
    width: 141px;
    height: 40px;
    border: none;
    border-radius: 6px;
}

.child-1 {
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: space-between;
}

.child-1 div:nth-child(1) {
    display: flex;
    gap: 10px;
}

.child-1 div:nth-child(1) button {
    cursor: pointer;
    background-color: #2d3a48;
    border-radius: 6px;
    border: 1px solid #31394e;
    font-size: 12px;
    width: 115.5px;
    height: 34px;
    color: #a6a6a8;
}

.child-1 div:nth-child(1) p {
    margin: auto;
    color: #a6a6a8;
}

.child-1 div:nth-child(1) span {
    background-color: #2934415e;
    border: 1px solid #31394e;
    border-radius: 8px;
    width: 50px;
    height: 17px;
    margin: auto;
    font-size: 12px;
    color: #a6a6a8;
    text-align: center;
}

.child-1 div:nth-child(2) {
    width: 16px;
    margin-top: 5px;
}

.child-1 div:nth-child(2) button {
    background: none;
    border: none;
    margin: auto;
}

.child-1 div:nth-child(2) button img {
    width: 15px;
    height: 16px;
}

.midStroke {
    width: 554px;
    margin: auto;
    border: 1px solid #31394e;
}

.prog-cont {
    display: flex;
    width: 540px;
    margin: auto;
    height: 60px;
    /* border: 1px solid #fff; */
}

.progression p {
    margin: auto;
}

.prog-bar {
    width: 265px;
    /* background-color: #2934415E; */
    margin: auto;
}

.sample-Btn {
    min-width: 101px;
    height: 30px;
    background-color: #1f272f;
    border: 1px solid #31394e;
    border-radius: 6px;
    color: #a6a6a8;
    margin: auto;
}

.btn-cont {
    margin: auto;
    display: flex;
    gap: 10px;
}

.sample-Btn a span {
    color: #a6a6a8;
}

.invite-btn {
    background-color: #31a2f4 !important;
    min-width: 101px;
    height: 30px;
    border-radius: 6px;
    color: #fff;
    border: none;
    margin: auto !important;
}

.back-btn {
    color: #A6A6A8 !important;
    border-radius: 6px !important;
    border: 1px solid #31394E !important;
    background-color: #2D3A48 !important;
    margin-right: 10px;
}

@media (max-width: 499px) {
    .invite-cont {
        /* width: 370px; */
        padding: auto;
        margin: auto;
        /* margin-top: -30rem; */
    }

    .input-container input {
        width: 200px;
        padding: 3px;
        height: 40px;
        font-size: 12px;
        font-weight: 500;
    }

    .input-container button {
        width: 50px;
        font-size: 12px;
        font-weight: 500;
    }

    .input-container {
        /* width: 350px; */
        width: calc(100vw - 50px);
    }

    .opt-cont {
        width: 100px;
        padding: 8px 3px;
        font-size: 10px;
    }

    .opt-cont .custom-selector select {
        max-width: 95px;
        min-width: 90px;
    }

    .opt-cont .custom-selector::after {
        right: 5px;
    }

    .opt-container {
        /* width: 350px; */
        width: calc(100vw - 50px);
        height: auto;
    }

    .prog-cont {
        display: flex;
        flex-direction: column;
    }

    .info-cont {
        width: calc(100vw - 50px);
    }

    .midStroke {
        /* width: 350px; */
        width: calc(100vw - 50px);
    }

    .prog-cont {
        display: flex;
        /* width: 350px; */
        width: calc(100vw - 50px);
        margin: auto;
        height: auto;
    }

    .progression {
        display: flex;
    }

    .btn-cont {
        margin: 10px 0px 10px 0px;
    }

    .done-btn button {
        width: 100px;
        height: 40px;
    }
}
</style>
  