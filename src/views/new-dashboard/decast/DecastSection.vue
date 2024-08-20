<template>
    <div class="w-full flex flex-col gap-6 justify-start">
        <div class="flex justify-between">
            <div class="text-white">
                <p class="font-bold text-2xl">//Decentralized Casts</p>
                <p>Immutable, irrefutable, and editable in a version controlled <br> manner over decentralized and
                    distributed storage.</p>
            </div>


        </div>

        <div class="basic_child_parent__ w-full flex items-center justify-between">
            <div class="choose-room">
                <button class="options-button border-none" @click="changeFocus(true)"
                    :class="{ 'focused-button': focusYourRooms }">
                    /decast
                </button>
                <button class="options-button border-none px-5" @click="handleButtonClick"
                    :class="{ 'focused-button': !focusYourRooms }">
                    /recordings
                </button>
            </div>

            <div class="cursor-pointer">
                <vx-tooltip text="/ decast.create" position="left">
                    <img src="@/assets/images/pixel_create.svg" @click="$router.push('/dashboard/decast/create')" />
                </vx-tooltip>
            </div>
        </div>
        <div class="flex flex-row gap-12 w-full">
            <div class="flex flex-col gap-6 w-1/2">
                <div class="flex flex-col gap-4">
                    <div class="cast_list_cont w-full" v-if="focusYourRooms">
                        <div v-if="isCastsLoading">
                            <CastCardShimmer />
                            <CastCardShimmer :style="{ opacity: 0.6 }" />
                            <CastCardShimmer :style="{ opacity: 0.5 }" />
                        </div>
                        <div v-else v-for="(cast, index) in castList" :key="index">
                            <CastCard :castDetails="cast" :index="index" :getCastList="getDecastList"
                                @card-click="handleCardClick" @openModal="openModal(cast)" />
                        </div>
                    </div>
                    <div v-else class="cast_list_cont">
                        <div v-if="isRecordingLoading">
                            <RecordingCardShimmer />
                            <RecordingCardShimmer :style="{ opacity: 0.7 }" />
                            <RecordingCardShimmer :style="{ opacity: 0.6 }" />
                        </div>
                        <div v-else-if="recordingList.length">
                            <div class="recordings flex justify-between items-center mb-4"
                                v-for="(recording, index) in flattenedRecordingList" :key="index">
                                <RecordingCard :recording="recording" :index="index"
                                    :getRecordings="getDecastRecordings" :siaMinutes="siaMinutes"
                                    :siaFreeGiven="siaFreeGiven" :swarmMinutes="swarmMinutes"
                                    :swarmFreeGiven="swarmFreeGiven" />
                            </div>
                        </div>
                        <div v-else class="recording flex flex-col items-center justify-items-center gap-4 mt-4">
                            <span>
                                <svg width="160px" height="160px" viewBox="0 0 16 16" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    class="si-glyph si-glyph-disc-upload" fill="#ffffff">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <title>598</title>
                                        <defs> </defs>
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g fill="#ffffff">
                                                <path
                                                    d="M7.917,6 C6.857,6 6,6.863 6,7.93 C6,8.995 6.857,9.858 7.917,9.858 C8.974,9.858 9.832,8.996 9.832,7.93 C9.832,6.864 8.974,6 7.917,6 L7.917,6 Z"
                                                    class="si-glyph-fill"> </path>
                                                <path
                                                    d="M10.979,15.1106614 L14.51,10.5030985 L15.2,11.4045782 C15.702,10.3553813 15.999,9.18983179 15.999,7.94637663 C15.999,3.49867206 12.417,0 7.999,0 C3.581,0 -0.00100000005,3.49867206 -0.00100000005,7.94637663 C-0.00100000005,12.3940812 3.581,16 7.999,16 C9.366,16 10.642,15.7005185 11.765,15.1106614 L10.979,15.1106614 L10.979,15.1106614 Z M12.423,2.691 L13.269,3.537 L11.481,5.324 L10.637,4.479 L12.423,2.691 L12.423,2.691 Z M3.548,13.258 L2.703,12.412 L4.49,10.625 L5.336,11.47 L3.548,13.258 L3.548,13.258 Z M8,11 C6.34408936,11 5,9.65704979 5,8.00046533 C5,6.34388087 6.34315855,5 8,5 C9.65684145,5 11,6.34295021 11,8.00046533 C11,9.65611913 9.65591064,11 8,11 L8,11 Z"
                                                    class="si-glyph-fill"> </path>
                                                <path
                                                    d="M16,13.966 L14.511,12.106 L13.021,13.966 L14.018,13.966 L14.018,15.969 L14.988,15.969 L14.988,13.966 L16,13.966 Z"
                                                    class="si-glyph-fill"> </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                            <h1 class="text-lg text-white font-semibold">No Recordings Found.</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="firstCastId !== null" class="cast_details w-1/2 p-5">
                <DecastDetails :selectedCastId="selectedCastId" :firstCastId="firstCastId"
                    :selectedStorage="selectedStorage" :getSelectedStorage="getSelectedStorage" />
            </div>
        </div>
        <CreateDecastModal v-if="activeModal === 'createDecastModal'" :closeModal="closeCreateModal"
            :createCast="createCast" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps"
            :stepThreeProps="stepThreeProps" :stepFourProps="stepFourProps" :getCastList="getDecastList"
            :inviteData="inviteData" :updateCastListElement="updateCastListElement" />
    </div>
</template>

<script>
import moment from 'moment-timezone';
import CastCardShimmer from './components/DecastCardShimmer.vue';
import CastCard from './components/DecastCard.vue';
import CreateDecastModal from './components/CreateDecastModal.vue'
import RecordingCardShimmer from './components/RecordingCardShimmer.vue';
import RecordingCard from './components/RecordingCard.vue';
import DecastDetails from './components/DecastDetails.vue';
import constants from '../../../../constant';
import axios from '../../../axios';
export default {
    name: "DecastSection",
    data() {
        return {
            activeModal: '',
            focusYourRooms: true,
            castList: [],
            isCastsLoading: false,
            isRecordingLoading: false,
            showCastIsLive: false,
            index: '',
            moment,
            casts: [],
            recordings: [],
            inviteData: null,
            showStorageModal: false,
            selectedCast: null,
            selectedCastId: null,
            firstCastId: null,
            loading: false,
            selectedStorage: 'Null',
            formData: new FormData(),
            stepOneProps: {
                mint_function_name: '',
                mintfnc_name_error: false,
                contract_address: '',
                contract_address_error: false,
                aib: '',
                aib_error: false,
                parameter: '',
                parameter_error: false,
                network: '',
                audienceAirdrop: true,
                give_vc: false,
                airdropType: 'NFTs',
                price: '',
                price_error: false,
                nft_description: '',
                nft_description_error: false,
                nft_image: '',
                data_token: false,
                nft_image_error: false,
                password_auth: false,
                auth_type: 'public',
                meeting_auth_error: false,
                send_otp: false,
                public_auth: false, // Changed from the first object's 'true' to the second object's 'false'
                public_otp: false,
                give_nft: false,
                public_stream_nfts: 'true',
                public_nft_flow: false,
                nft_t_ype: 'NFTs', // Appears only in the first object, I'll keep it here
                nft_type: 'NFTs', // Appears only in the first object, I'll keep it here
                generated_event_title: '',
                event_name: '',
                invalidTimeError: false,
                moderator_password: '',
                attendee_password: '',
                meeting_type: 'public',
                schedule_time: '',
                description: '',
                max_participant: 100,
                short_description: '',
                hide_users: false,
                event_name_error: false,
                moderator_password_error: false,
                attendee_password_error: false,
                viewer_password_error: false,
                description_error: false,
                description_length_error: false,
                schedule_time_error: false,
                meeting_type_error: false,
                event_name_length_error: false,
                start_now: false,
                startTime: '0:00:00',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timeZoneList: [],
                event_tag: ['videowiki'],
                startD: moment().format('YYYY-MM-DD'),
                is_decast: "True"
            },
            stepTwoProps: {
                BackImageURL: '',
                imageURL: '',
                primary_color: '#D7DF23',
                secondary_color: '',
                logo: '',
                back_image: '',
                cover_image: '',
                cover_image_error: false,
                back_image_error: false,
                banner_text: '',
                moderator_only_text: 'You are a Moderator, you can control who presents and participates in the live cast',
                guest_policy: '',
                welcome_text: '',
                showText: true,
                duration: '60',
                logout_url: 'https://decast.live/dashboard',
            },
            stepThreeProps: {
                vw_stream: false,
                vw_stream_url: [{ vw_stream: '' }, { urls: [] }],
                is_streaming: false,
                public_stream: true,
            },
            stepFourProps: {
                start_stop_recording: true,
                record: true,
                mute_on_start: true,
                end_when_no_moderator: true,
                allow_moderator_to_unmute_user: false,
                webcam_only_for_moderator: false,
                auto_start_recording: false,
                allow_start_stop_recording: false,
                disable_cam: false,
                disable_mic: false,
                lock_layout: true,
                lock_on_join: false,
                viewer_mode: false,
                viewer_password: false,
                listen_only_mode: true,
                webcam_enable: false,
                screen_sharing: true,
                restrict_participants: false,
                meeting_settings: false,
                checkBox: '',
            },
        }
    },
    components: {
        CastCardShimmer,
        RecordingCardShimmer,
        RecordingCard,
        CastCard,
        DecastDetails,
        CreateDecastModal,
        // StorageModal
    },
    mounted() {
        this.getDecastList();
    },
    computed: {
        flattenedRecordingList() {
            return this.flattenRecordingList(this.recordings);
        },
        recordingList() {
            return this.$store.state.cast.recordings;
        },
        siaMinutes() {
            return this.$store.state.minutes.siaMinutes;
        },
        siaFreeGiven() {
            return this.$store.state.minutes.siaFreeGiven;
        },
        swarmMinutes() {
            return this.$store.state.minutes.swarmMinutes;
        },
        swarmFreeGiven() {
            return this.$store.state.minutes.swarmFreeGiven;
        },
    },
    watch: {
        recordingList(newList) {
            this.recordings = [...newList];
        },
        '$route'(to, from) {
            if (to.params.action === 'create') {
                this.setActiveModal('createDecastModal');
            }
        }
    },
    methods: {
        closeCreateModal() {
            this.setActiveModal('');
            this.$router.push('/dashboard/decast');
            localStorage.removeItem("LOG_BOARDID");
            localStorage.removeItem("LOG_REDIRECT");
            localStorage.removeItem("LOG_TOKEN");
        },
        changeFocus(toYourRooms) {
            this.focusYourRooms = toYourRooms;
        },
        handleCardClick(details) {
            //console.log(details, 'detao;s');
            this.selectedCastId = details;
            this.getSelectedStorage();
        },
        async handleButtonClick() {
            this.getDecastRecordings();
            this.changeFocus(false);
            this.$store.dispatch('fetchUserMinutes');
        },
        setActiveModal(modalName) {
            this.activeModal = modalName;
        },
        openModal(cast) {
            this.selectedCast = cast;
            this.showStorageModal = true;
        },
        async getSelectedStorage() {
            const cast_id = this.selectedCastId ? this.selectedCastId.public_meeting_id : this.firstCastId.public_meeting_id;
            const url = `${constants.apiCastUrl}/api/event/select/storage/?cast_id=${cast_id}`;

            try {
                this.loading = true;
                const response = await axios.get(url);
                //console.log('Storage retrived successfully:', response.data);

                if (response.data.SIA == true && response.data.SWARM == false) {
                    //console.log(response.data.SIA, response.data.SWARM, 'cjdkunn')
                    this.selectedStorage = 'Sia';
                    this.preSelected = true;
                } else if (response.data.SIA == false && response.data.SWARM == true) {
                    //console.log(response.data.SIA, response.data.SWARM, 'cjdkunn')
                    this.selectedStorage = 'Swarm';
                    this.preSelected = true;
                } else if (response.data.SIA == false && response.data.SWARM == false) {
                    //console.log(response.data.SIA, response.data.SWARM, 'cjdkunn')
                    this.selectedStorage = 'Null';
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.selectedStorage = 'Null';
                // console.error('Error:', error);
            }
        },
        async getDecastList() {
            this.isCastsLoading = true;
            try {
                const response = await this.$store.dispatch('cast/getDecasts');
                if (response.data.my_events) {
                    const allEvents = response.data.my_events.sort((a, b) => b.event_id - a.event_id);
                    this.castList = allEvents;
                    this.firstCastId = this.castList[0];
                    this.selectedCastId = this.castList[0];
                    //console.log('This is castlist', this.castList)
                    this.isCastsLoading = false;
                }
            } catch (error) {
                this.isCastsLoading = false;
                //console.log("Error in fetching cast detail");
            }
        },
        async getDecastRecordings() {
            this.isRecordingLoading = true;
            try {
                const res = await this.$store.dispatch('cast/decastRecordings');
                this.isRecordingLoading = false;
                //console.log(res);
            } catch (e) {
                this.isRecordingLoading = false;
                //console.log(e);
            }
        },
        flattenRecordingList(recordings) {
            const flattenedList = [];
            recordings.forEach((meetings) => {
                meetings.forEach((recording) => {
                    flattenedList.push(recording);
                });
            });
            return flattenedList;
        },
        toggleCopy(index) {
            this.showCopy = this.showCopy === index ? null : index;
            //console.log(index, 'copy');
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },
        validateFormOne() {
            if (
                this.stepOneProps.event_name === '' ||
                this.stepOneProps.description === '' ||
                (this.stepOneProps.audienceAirdrop &&
                    this.stepOneProps.airdropType === 'NFTs' &&
                    (this.stepOneProps.mint_function_name === '' ||
                        this.stepOneProps.contract_address === '' ||
                        this.stepOneProps.aib === '' ||
                        this.stepOneProps.nft_description === '' ||
                        this.stepOneProps.nft_image === '')) ||
                (this.stepOneProps.auth_type === 'private' &&
                    this.stepOneProps.send_otp === false &&
                    this.stepOneProps.password_auth === false) ||
                (!this.stepOneProps.start_now &&
                    this.stepOneProps.schedule_time_error) ||
                this.stepOneProps.invalidTimeError
            ) {
                this.stepOneProps.event_name_error =
                    this.stepOneProps.event_name === '';
                this.stepOneProps.description_error =
                    this.stepOneProps.description === '';

                if (
                    this.stepOneProps.audienceAirdrop &&
                    this.stepOneProps.airdropType === 'NFTs'
                ) {
                    this.stepOneProps.mintfnc_name_error =
                        this.stepOneProps.mint_function_name === '';
                    this.stepOneProps.contract_address_error =
                        this.stepOneProps.contract_address === '';
                    this.stepOneProps.aib_error = this.stepOneProps.aib === '';
                    this.stepOneProps.nft_image_error =
                        this.stepOneProps.nft_image === '';
                    this.stepOneProps.nft_description_error =
                        this.stepOneProps.nft_description === '';
                }

                if (
                    this.stepOneProps.auth_type === 'private' &&
                    this.stepOneProps.send_otp === false &&
                    this.stepOneProps.password_auth === false
                ) {
                    this.stepOneProps.meeting_auth_error = true;
                    this.stepOneProps.moderator_password = '';
                }

                this.stepOneProps.public_nft_flow =
                    this.stepOneProps.public_stream_nfts === 'true';
                this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
                return false;
            } else {
                this.stepOneProps.meeting_type = this.stepOneProps.auth_type;
                this.stepOneProps.public_nft_flow =
                    this.stepOneProps.public_stream_nfts === 'true';
                window.scroll(0, 0);
                localStorage.setItem('Step1', JSON.stringify(this.stepOneProps));
                return true;
            }
        },
        setCreateEventData() {
            // //console.log('12');
            const board_id = localStorage.getItem("LOG_BOARDID");
            if (board_id) {
                this.formData.append("board_id", board_id);
            }
            this.startNow = this.stepOneProps.start_now;
            for (let [key, value] of Object.entries(this.stepOneProps)) {
                if (value.length === 0) {
                    value = '';
                } else {
                    if (value === false) {
                        value = 'False';
                    } else if (value === true) {
                        value = 'True';
                    } else if (value === '') {
                        value = '';
                    }
                }
                this.formData.append(key, value);
            }
            // //console.log('123');
            this.stepTwoProps.imageURL = '';
            this.stepTwoProps.BackImageURL = '';
            for (let [key, value] of Object.entries(this.stepTwoProps)) {
                if (value.length === 0) {
                    value = '';
                } else {
                    if (value === false) {
                        value = 'False';
                    } else if (value === true) {
                        value = 'True';
                    } else if (value === '') {
                        value = '';
                    }
                }
                this.formData.append(key, value);
            }
            // //console.log('1234');
            for (let [key, value] of Object.entries(this.stepThreeProps)) {
                if (value.length === 0) {
                    value = '';
                } else {
                    if (value === false) {
                        value = 'False';
                    } else if (value === true) {
                        value = 'True';
                    } else if (value === '') {
                        value = '';
                    }
                }
                this.formData.append(key, value);
            }
            for (let [key, value] of Object.entries(this.stepFourProps)) {
                // //console.log(value);

                if (value.length === 0) {
                    value = '';
                } else {
                    if (value === false) {
                        value = 'False';
                    } else if (value === true) {
                        value = 'True';
                    } else if (value === '') {
                        value = '';
                    }
                }
                this.formData.append(key, value);
            }
        },
        formSubmitted() {
            this.stepFourProps.start_stop_recording = this.stepFourProps.record;
            this.stepFourProps.allow_start_stop_recording = this.stepFourProps.record;
            this.stepOneProps.schedule_time =
                this.stepOneProps.startD + ' ' + this.stepOneProps.startTime;
            if (moment().isAfter(this.stepOneProps.schedule_time)) {
                const fiveMin = moment().add(5, 'minutes');
                this.stepOneProps.schedule_time =
                    `${fiveMin._d.getFullYear()}-${String(
                        fiveMin._d.getMonth() + 1
                    ).padStart(2, '0')}-${String(fiveMin._d.getDate()).padStart(
                        2,
                        '0'
                    )}` +
                    ' ' +
                    fiveMin._d.getHours() +
                    ':' +
                    fiveMin._d.getMinutes() +
                    ':00';
            }
            this.setCreateEventData();
            this.$vs.loading();
            return this.$store
                .dispatch('cast/submitForm', this.formData)
                .then(async (response) => {
                    this.getDecastList();
                    this.status = 'success';
                    this.$vs.loading.close();
                    this.responsedata = response.data.message;
                    this.$vs.notify({
                        title: 'Success',
                        text: response.data.message,
                        color: 'success',
                    });
                    this.status = 'success';
                    this.castId = response.data.meeting_id;
                    this.inviteData = response.data;
                    return;
                })
                .catch((error) => {
                    this.$vs.loading.close();
                    this.formData = new FormData();

                    if (error) {
                        this.$vs.notify({
                            title: 'Error!',
                            text: error.response.data.message,
                            color: 'danger',
                        });
                    } else {
                        this.$vs.notify({
                            title: 'Fields Missing!',
                            text: 'Some Fields are Missing',
                            color: 'danger',
                        });
                    }
                });
        },
        createCast() {
            if (this.validateFormOne) {
                return this.formSubmitted();
            }
        },
        updateCastListElement(eventId, newData) {
            const index = this.castList.findIndex(item => item.public_meeting_id === eventId);
            if (index !== -1) {
                var newCastList = this.castList;
                newCastList[index] = { ...newCastList[index], ...newData };
                this.$store.commit('cast/SET_ALL_CASTS', newCastList);
                this.firstCastId = this.castList[index];
                this.selectedCastId = this.castList[index];
            }
        },
    },
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.options-button {
    background: none;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
}

.focused-button {
    color: #d7df23;
}

.cast_header {
    background-color: #272727;
}

.cast_list_cont {
    overflow: scroll !important;
    height: 60vh;
    max-width: 645px;
}

.basic_child_parent__{
    max-width: 644px;
}

.cast_list_cont::-webkit-scrollbar {
    display: none;
}

.cast_details {
    border: 2px solid #272727;
    box-shadow: 3px 3px 0px 0px #272727;
    height: 60vh;
    overflow: scroll !important;
}

.cast_details::-webkit-scrollbar {
    display: none;
}
</style>