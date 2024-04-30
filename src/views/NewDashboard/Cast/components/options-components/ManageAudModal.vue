<template>
    <BaseModal :title="'Manage Audience'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="invite-cont">
                        <div class="invite-section mb-6">
                            <div class="invite-wrapper">
                                <div class="invite-wrapper-left">
                                    <div class="input-container">
                                        <div class="opt-cont" ref="customSelect">
                                            <label class="custom-selector">
                                                <select v-model="selectedOption">
                                                    <option value="participant">Participants</option>
                                                    <option value="co-host">Co-host</option>
                                                    <option v-if="isStream" value="spectator">Spectator</option>
                                                    <option v-if="viewer" value="viewer">Viewer</option>
                                                </select>
                                            </label>
                                            <ul v-if="isDropdownOpen" class="custom-options">
                                                <li v-for="(option, index) in options" :key="index"
                                                    @mousedown="selectOption(option)">
                                                    {{ option.label }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="flex">
                                            <input v-model="userEmail" @keydown.enter="addUser"
                                                placeholder="//contact@example.com" />
                                            <vs-button type="border" @click="addUser">>>invite</vs-button>
                                        </div>
                                    </div>
                                </div>
                                <!-- <p class="input-separator">or</p> -->
                                <div class="invite-wrapper-right">
                                    <input type="file"
                                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        style="display: none" @change="updateSheetInfo" ref="sheetInput" />
                                    <div v-if="!file" class="invite-bulk-wrapper">
                                        <button class="invite-bulk-btn" @click="openSheetInput">Invite Bulk</button>
                                        <button class="sample-btn">
                                            <a
                                                href="https://videowikistorage.blob.core.windows.net/room-db-backup/Sample_Invitee_List.xlsx">
                                                <vs-icon icon-pack="feather" icon="icon-download" size="14px" rounded="true"
                                                    style="align-self: flex-end; color: #a6a6a8;">
                                                </vs-icon>
                                                <span class="ml-2">sample file</span>
                                            </a>
                                        </button>
                                    </div>
                                    <div v-else class="invite-bulk-wrapper">
                                        <vs-button type="border" @click="submitSheet">
                                            >>upload file
                                        </vs-button>
                                        <div class="flex">
                                            <p>{{ sheetFileName }}</p>
                                            <button class="close-button" @click="handleClearFile">
                                                <img src="@/assets/images/delete.svg" />
                                            </button>
                                        </div>
                                        <span>{{ sheetFileSize }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ma-actions-btn">
                            <div class="flex items-center">
                                <h2>Audience</h2>
                                <!-- <vx-tooltip text="Download Invitee List" position="bottom">
                                    <vs-button v-if="users" @click="inviteeListDownload" class="airdrop-btn-1"
                                        style="font-size: 12px;">
                                        <vs-icon icon-pack="feather" icon="icon-download" size="14px" rounded="true">
                                        </vs-icon>
                                    </vs-button>
                                </vx-tooltip>

                                <vx-tooltip text="Edit NFT" position="bottom">
                                    <vs-button v-if="nft_details_submitted && !certificate_enabled" style="font-size: 12px;"
                                        @click="setActiveModal('editNft')" class="airdrop-btn-1">
                                        <vs-icon icon-pack="feather" icon="icon-edit" size="14px" rounded="true">
                                        </vs-icon>
                                    </vs-button>
                                </vx-tooltip> -->

                                <vx-tooltip text="Copy NFT link to share" position="bottom">
                                    <vs-button type="border" v-if="isAirdrop && pub_nft_flow" class="airdrop-btn-1"
                                        style="font-size: 12px;" @click="setActiveModal('copyNftModal')">
                                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.490967 7.3846H1.77668V8.61537H0.490967V7.3846Z" fill="white" />
                                            <path d="M12.0624 14.7692H13.3481V16H12.0624V14.7692Z" fill="white" />
                                            <path d="M10.7767 13.5384H12.0624V14.7692H10.7767V13.5384Z" fill="white" />
                                            <path d="M8.20525 8.61537H9.49097V9.84614H8.20525V8.61537Z" fill="white" />
                                            <path d="M9.49097 7.3846H10.7767V8.61537H9.49097V7.3846Z" fill="white" />
                                            <path d="M10.7767 6.15383H12.0624V7.3846H10.7767V6.15383Z" fill="white" />
                                            <path d="M12.0624 4.92306H13.3481V6.15383H12.0624V4.92306Z" fill="white" />
                                            <path d="M13.3481 3.69229H14.6338V4.92306H13.3481V3.69229Z" fill="white" />
                                            <path d="M14.6338 2.46152H15.9195V3.69229H14.6338V2.46152Z" fill="white" />
                                            <path d="M1.77668 6.15383V7.3846H4.34811V6.15383H1.77668Z" fill="white" />
                                            <path d="M4.34811 9.84614V8.61537H1.77668V9.84614H4.34811Z" fill="white" />
                                            <path
                                                d="M8.20525 13.5384H6.91954V11.0769H8.20525V9.84614H4.34811V11.0769H5.63382V16H6.91954V14.7692H8.20525V13.5384Z"
                                                fill="white" />
                                            <path d="M10.7767 12.3077H9.49097V11.0769H8.20525V13.5384H10.7767V12.3077Z"
                                                fill="white" />
                                            <path d="M14.6338 11.0769H13.3481V14.7692H14.6338V11.0769Z" fill="white" />
                                            <path d="M15.9195 7.3846H14.6338V11.0769H15.9195V7.3846Z" fill="white" />
                                            <path d="M4.34811 4.92306V6.15383H6.91954V4.92306H4.34811Z" fill="white" />
                                            <path d="M6.91954 3.69229V4.92306H9.49097V3.69229H6.91954Z" fill="white" />
                                            <path d="M9.49097 2.46152V3.69229H12.0624V2.46152H9.49097Z" fill="white" />
                                            <path d="M14.6338 2.46152V1.23075H12.0624V2.46152H14.6338Z" fill="white" />
                                            <path d="M14.6338 -1.52588e-05V1.23075H17.2053V-1.52588e-05H14.6338Z"
                                                fill="white" />
                                            <path d="M18.491 1.23075H17.2053V3.69229H18.491V1.23075Z" fill="white" />
                                            <path d="M17.2053 3.69229H15.9195V7.3846H17.2053V3.69229Z" fill="white" />
                                        </svg>
                                        <!-- <vs-icon icon-pack="feather" icon="icon-share-2" size="14px" rounded="true">
                                        </vs-icon> -->
                                    </vs-button>
                                </vx-tooltip>
                            </div>

                            <div>
                                <vs-button type="border"
                                    v-if="(nft_enable_count <= 0 || airdrop_done) && event_nft_enabled && nft_details_submitted"
                                    disabled @click="audienceDropMail" style="font-size: 12px;">>>Airdrop
                                </vs-button>

                                <vs-button type="border" v-if="nft_enable_count > 0 && !airdrop_done && event_nft_enabled"
                                    @click="audienceDropMail">>>Airdrop
                                </vs-button>

                                <vs-button type="border" v-if="isAirdrop && pub_nft_flow" @click="
                                    public_nft_status
                                        ? changePublicNftStatus(castId, 'False')
                                        : changePublicNftStatus(castId, 'True')
                                    " style="font-size: 12px;">
                                    <div class="flex items-center">
                                        {{ public_nft_status ? '>>Disable Claim NFT' : '>>Enable Claim NFT' }}
                                        <div class="flex items-center ml-2">
                                            &nbsp;
                                            <div></div>
                                            <vx-tooltip text="Allow the Viewers/Attendees to mint the NFT"
                                                position="bottom">
                                                <vs-icon icon-pack="feather" icon="icon-info" size="14px" rounded="true"
                                                    style="align-self: flex-end">
                                                </vs-icon>
                                            </vx-tooltip>
                                        </div>
                                    </div>
                                </vs-button>
                            </div>
                        </div>

                        <div v-if="!users" class="w-full full-height-table">No users added</div>
                        <!-- Normal table when no nft is enabled -->
                        <div v-else-if="!event_nft_enabled && !certificate_enabled" class="user-table-wrapper">
                            <div class="table-heading-wrapper">
                                <div class="table-head-col1">
                                    <span>Status</span>
                                </div>
                                <div class="table-head-col2">
                                    <span>Role</span>
                                </div>
                                <div class="table-head-col3">
                                    <span>Email</span>
                                </div>
                                <div class="table-head-col4">
                                    <span>Delete</span>
                                </div>
                            </div>
                            <div class="table-content-wrapper">
                                <div class="table-content-row" v-for="(user, userIdx) in users" :key="userIdx">
                                    <div class="table-content-col1" v-if="user.email">
                                        <span v-if="user.joined">
                                            <span></span>
                                            <vx-tooltip text="Joined the event" position="bottom">
                                                <vs-icon icon-pack="feather" icon="icon-user-check" size="18px"
                                                    color="green" rounded="true"></vs-icon>
                                            </vx-tooltip>
                                        </span>
                                        <span v-else>
                                            <span></span>
                                            <vx-tooltip text="Didn't joined the event" position="bottom">
                                                <vs-icon icon-pack="feather" icon="icon-user-x" size="18px" color="red"
                                                    rounded="true"></vs-icon>
                                            </vx-tooltip>
                                        </span>
                                    </div>
                                    <div class="table-content-col2" v-if="user.email">
                                        <span>{{ user.role }}</span>
                                    </div>
                                    <div class="table-content-col3" v-if="user.email">
                                        <span>{{ user.email }}</span>
                                    </div>
                                    <div class="table-content-col4" v-if="user.email">
                                        <vs-icon icon-pack="feather" icon="icon-trash-2" class="cursor"
                                            @click.stop="removeUser(user, userIdx)" size="18px" rounded="true"
                                            v-if="user.email">
                                        </vs-icon>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Table when nft is enabled -->
                        <div v-else-if="event_nft_enabled || certificate_enabled" class="user-table-wrapper">
                            <NftUserTable :certificate_enabled="certificate_enabled" :users="users"
                                :vc_details_submitted="vc_details_submitted" :event_nft_enabled="event_nft_enabled"
                                :nft_details_submitted="nft_details_submitted" :removeUser="removeUser" :castId="castId"
                                :isStream="isStream" :viewer="viewer" :inviteeList="inviteeList"
                                :nft_enable_count="nft_enable_count" :increNftEnableCount="increNftEnableCount"
                                :decreNFTEnableCount="decreNFTEnableCount" />
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Edit Cast > <span>Manage Audience</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
  
<script>
import constants from '../../../../../../constant';
import axios from '@/axios';
import NftUserTable from './NftUserTable.vue';
import BaseModal from "@/components/common/BaseModal.vue";
// import { IExecWeb3mail } from "@iexec/web3mail";

export default {
    name: 'ManageAudModal',
    props: ['closeModal', 'isAirdrop', 'setActiveModal', 'pub_nft_flow', 'public_nft_status', 'changePublicNftStatus', 'nft_details_submitted',
        'castId', 'invites', 'closeModal', 'isStream', 'viewer', 'event_nft_enabled', 'certificate_enabled', 'vc_details_submitted',
        'showBackButton'],
    components: {
        // NftEdit,
        // ShareNftLink,
        NftUserTable,
        BaseModal,
    },
    data() {
        return {
            file: null,
            userEmail: '',
            userRoleLabel: 'Participant',
            inviteeList: [],
            users: [],
            walletAddress: [],
            selectedOption: 'participant',
            isDropdownOpen: false,
            options: [
                { value: 'participant', label: 'Participants' },
                { value: 'co-host', label: 'Co-host' },
            ],
            sheetFileName: 'No File Selected',
            sheetFileSize: 0,
            uploadPercentage: 0,
            currStatus: '',
            nft_enable_count: 0,
            airdrop_done: false,
        };
    },
    mounted() {
        window.addEventListener('click', this.closeDropDown);
        console.log(this.isStream);
        console.log(this.viewer);
        if (this.isStream)
            this.options.push({ value: 'spectator', label: 'Spectator' });
        if (this.viewer) this.options.push({ value: 'viewer', label: 'Viewer' });
        this.userDetails();
    },
    beforeDestroy() {
        window.removeEventListener('click', this.closeDropDown);
    },
    methods: {
        increNftEnableCount() {
            this.nft_enable_count = this.nft_enable_count + 1;
        },
        decreNFTEnableCount() {
            this.nft_enable_count = this.nft_enable_count - 1;
        },
        audienceDropMail() {
            if (this.nft_enable && this.certificate_enabled) {
                this.disabled = true;
            }
            const payload = {
                cast_id: this.castId,
            };
            this.$store
                .dispatch('studio/audienceAirdropMail', payload)
                .then((res) => {
                    this.$vs.notify({
                        title: 'Success',
                        text: 'Mail sent successfully !',
                        color: 'success',
                    });
                    this.airdrop_done = true;
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: 'Error',
                        text:
                            err.response != null ? err.response.data.message : 'Try again',
                        color: 'danger',
                    });
                });
        },
        validateEmail(email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(email);
        },
        ToggleEdit(status) {
            this.currStatus = status;
        },
        inviteeListDownload() {
            const payload = {
                cast_id: this.castId,
            };
            this.$store
                .dispatch('studio/inviteesCSV', payload)
                .then((res) => {
                    const anchor = document.createElement('a');
                    anchor.href = res.data.path;
                    anchor.click();
                    this.$vs.notify({
                        title: 'Success',
                        text: 'Downloaded Successfully !',
                        color: 'success',
                    });
                })
                .catch((err) => {
                    this.$vs.notify({
                        title: 'Error',
                        text:
                            err.response != null ? err.response.data.message : 'Try again',
                        color: 'danger',
                    });
                });
        },
        userDetails() {
            this.$vs.loading();
            const payload = { cast_id: this.castId };
            this.$store
                .dispatch('studio/inviteeDetails', payload)
                .then(async (res) => {
                    this.users = await res.data.data;
                    var address = [];
                    for (var i = 0; i < this.users.length; i++) {
                        if (this.users[i].wallet_address) {
                            this.walletAddress[i] = this.users[i].wallet_address;
                        } else {
                            this.walletAddress[i] = null;
                        }
                        const userList = {
                            id: this.users[i].id,
                            name: this.users[i].name,
                            email: this.users[i].email,
                            type: this.users[i].role,
                            nft_enable: this.users[i].nft_enable,
                            vc_enable: this.users[i].vc_enable,
                        };
                        if (this.users[i].nft_enable) {
                            this.nft_enable_count++;
                        }
                        if (this.users[i].vc_enable) {
                            address.push(this.users[i].wallet_address);
                        }
                        this.inviteeList.push(userList);
                    }
                    this.certificateProps.sender_addresses = address;
                    this.$vs.loading.close();
                })
                .catch(() => {
                    this.$vs.loading.close();
                });
        },
        handleClearFile() {
            this.sheetFileName = 'No File Selected';
            this.sheetFileSize = '';
            this.uploadPercentage = 0;
            this.file = null;
            fileInput.value = '';
        },
        closeDropDown(e) {
            console.log(e.target.tagName);
            if (e.target.tagName !== 'LI') {
                console.log(2);
                this.isDropdownOpen = false;
            }
        },
        toggleDropdown(event) {
            if (window.innerWidth >= 420) {
                event.preventDefault();
                console.log(1);
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
                    console.log(err);
                    result = true;
                });
            return result;
        },

        async addUser() {
            var x = {};
            var emailList = this.userEmail.split(',').map((item) => {
                if (x[item.trim()]) {
                    console.log('nooooo');
                    return;
                }
                x[item.trim()] = 1;

                return item.trim();
            });
            emailList = Object.keys(x);
            var validEmails = emailList.reduce((validEmail, item) => {
                if (!this.validateEmail(item)) {
                    this.$vs.notify({
                        time: 6000,
                        title: 'Invalid Email',
                        text: item + ' is not a valid email',
                        color: 'danger',
                    });
                }
                return validEmail && this.validateEmail(item);
            }, true);
            if (!validEmails) {
                this.validEmailError = true;
                return;
            }
            this.$vs.loading();
            var users = [];
            for (let i = 0; i < emailList.length; i++) {
                const duplicate = await this.checkInvitee(emailList[i]);
                if (duplicate) {
                    this.$vs.notify({
                        time: 6000,
                        title: 'Email Already Invited',
                        text: 'We are going to  ignore user ' + emailList[i],
                        color: 'warning',
                    });
                    continue;
                }
                console.log(duplicate);
                users.push({
                    name: '',
                    email: emailList[i],
                    type: this.selectedOption,
                    nft_enable: '',
                    give_nft: false,
                });
            }
            const payload = {
                invitee_list: users,
                cast_id: this.castId,
            };
            this.validEmailError = false;
            if (users.length === 0) {
                this.$vs.loading.close();
                this.userEmail = '';
                this.$vs.notify({
                    color: 'warning',
                    title: 'User Already Invited',
                });
                return;
            }
            this.$store
                .dispatch('studio/addInvitee', payload)
                .then((res) => {
                    this.$vs.loading.close();
                    this.$vs.notify({
                        title: '',
                        text: 'User added successfully !',
                        color: 'success',
                    });
                    this.userEmail = '';
                    // this.closePopup();
                    this.userDetails();
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

        removeUser(user, userIndex) {
            const payload = {
                email: [user.email],
                cast_id: this.castId,
            };

            this.$store
                .dispatch('studio/deleteInvitee', payload)
                .then((res) => {
                    if (user.nft_enable) this.nft_enable_count--;
                    if (userIndex > -1) {
                        this.users.splice(userIndex, 1);
                        this.inviteeList.splice(userIndex, 1);
                    }
                    this.invites.splice(userIndex, 1);
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
                    this.file = null;
                    fileInput.value = '';
                    this.userDetails();
                })
                .catch((error) => {
                    console.log(error);
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
  
<style scoped> .full-height-table {
     height: inherit;
 }

 .ma-actions-btn {
     display: flex;
     justify-content: space-between;
     padding-top: 15px;
     border-top: 1px dashed #FFFFFF;
 }

 .ma-actions-btn h2 {
     color: #FFFFFF !important;
 }

 .user-manage-bottom-sec {
     display: flex;
     justify-content: end;
 }

 .table-heading-wrapper {
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: #FFFFFF;
     color: #000000;
     margin-top: 10px;
 }

 .table-head-col1,
 .table-head-col2,
 .table-head-col3,
 .table-head-col4 {
     display: flex;
     align-items: center;
     flex: 1;
     padding: 5px 10px;
 }

 .table-content-row {
     display: flex;
     align-items: center;
     justify-content: center;
     margin: 10px 0px 5px 0px;
     background-color: #000000;
 }

 .table-content-col1,
 .table-content-col2,
 .table-content-col3,
 .table-content-col4 {
     display: flex;
     align-items: center;
     flex: 1;
     padding: 5px 10px;
     cursor: pointer;
 }

 .table-content-wrapper {
     border: 1px solid #FFFFFF;
     margin-top: 6px;
 }

 .invite-wrapper {
     display: flex;
     justify-content: space-between;
 }

 .invite-wrapper-left {
     display: flex;
     flex: 0.45;
     margin-right: 10px;
 }

 .invite-wrapper-right {
     display: flex;
     justify-content: end;
     flex: 0.5;
     margin-left: 10px;
 }

 .input-separator {
     display: flex;
     align-items: center;
     justify-content: center;
 }

 .percent-label {
     width: 100%;
     text-align: center;
 }

 .user-table-wrapper {
     overflow-y: scroll;
     height: inherit;
 }

 .select-btn {
     cursor: pointer;
     background-color: #2d3a48;
     border-radius: 6px;
     border: 1px solid #31394e;
     font-size: 12px;
     height: 100%;
     width: 115.5px;
     color: #a6a6a8;
 }

 .airdrop-btn-1 {
     border: none !important;
     background: transparent !important;
     color: #a6a6a8 !important;
     box-shadow: none !important;
 }

 .opt-cont {
     width: 150px;
     height: 34px;
     background-color: #000000;
     border: 1px solid #FFFFFF;
     padding: 8px;
     font-size: 12px;
     font-family: sans-serif;
     position: relative;
     margin-bottom: 6px;
 }

 .opt-cont .custom-selector select {
     max-width: 120px;
     min-width: 120px;
     border-radius: 6px;
     border: none;
     outline: none;
     background-color: #000000;
     color: #FFFFFF;
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
     color: #FFFFFF;
     background-color: #000000 !important;
     border-left: 1px solid #FFFFFF;
     border-right: 1px solid #FFFFFF;
     border-bottom: 1px solid #FFFFFF;
     z-index: 999 !important;
     width: 150px;
     position: absolute !important;
     margin: auto;
     left: -1px;
 }

 .opt-cont .custom-options li {
     height: 28px;
     display: flex;
     align-items: center;
     cursor: pointer;
     padding-left: 8px;
     color: #FFFFFF;
     transition: background 0.3s ease;
 }

 .opt-cont .custom-options li:hover {
     background-color: #FFFFFF;
     color: #000000;
 }
</style>
  
<style scoped>
.invite-cont {
    margin: auto;
    display: flex;
    flex-direction: column;
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
    flex-direction: column;
    border-radius: 6px;
    /* width: 555px; */
    width: 100%;
}

.invite-bulk-wrapper {
    display: flex;
    flex-direction: column;
    align-items: end;
}

.invite-bulk-wrapper p {
    padding: 0px 10px;
}

/* :root {
      --select-border: #777;
      --select-focus: blue;
      --select-arrow: var(--select-border);
  } */

.input-container button {
    width: 80px;
    height: 34px;
    border-radius: 6px;
    border: 1px solid #31394e;
    color: #fff;
    background-color: #31a2f4;
}

.input-container input {
    width: 100%;
    background-color: #FFFFFF;
    padding: 10px;
    border: none;
    outline: none;
    height: 34px;
    color: #000000;
    margin-right: 6px;
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
    /* position: absolute;
    top: -5px;
    right: -5px; */
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #000000;
    border: 1px solid #000000;
    cursor: pointer;
    font-size: 10px;
    color: #FFFFFF;
}

.info-cont {
    width: 565px;
    margin: auto;
    margin-top: 25px;
}

.info-cont p {
    color: #637181;
    font-size: 12px;
    font-weight: 600px;
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

.back-btn {
    background-color: #1F272F !important;
    color: #A6A6A8 !important;
    border: 1px solid #31394E !important;
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
    width: 100%;
    /* background-color: #2934415E; */
    margin: auto;
}

.invite-bulk-btn {
    border: 1px solid #FFFFFF;
    background-color: #000000;
    color: #FFFFFF;
    padding: 8px;
}

.sample-btn {
    border: none;
    outline: none;
    background: none;
    color: #838383;
    padding: 10px 0px;
}

.sample-btn * {
    color: #838383 !important;
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
    /* height: 30px; */
    height: 100%;
    border-radius: 6px;
    color: #fff;
    border: none;
    /* margin: auto !important; */
}

@media (max-width: 499px) {
    .invite-cont {
        width: 370px;
        padding: auto;
        margin: auto;
        margin-top: -30rem;
    }

    .input-container input {
        width: 200px;
        padding: 3px;
        height: 34px;
        font-size: 12px;
        font-weight: 500;
    }

    .input-container button {
        width: 50px;
        font-size: 12px;
        font-weight: 500;
    }

    .input-container {
        width: 350px;
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
        width: 350px;
        height: auto;
    }

    .prog-cont {
        display: flex;
        flex-direction: column;
    }

    .midStroke {
        width: 350px;
    }

    .prog-cont {
        display: flex;
        width: 350px;
        margin: auto;
        height: auto;
    }

    .progression {
        display: flex;
    }

    .btn-cont {
        margin: 10px 0px 10px 0px;
    }
}</style>