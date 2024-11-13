<template>
    <BaseModal :title="'Streaming'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Live Streaming Settings</h3>
                    </div>
                    <div class="flex mt-8">
                        <div class="strm-button" @click="setActiveModal('youtubeStreamModal')">
                            <p class="flex items-center justify-between">Youtube
                                <svg v-if="youtubeSecret !== ''" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.4615 1.53846V0H1.53846V1.53846L18.4615 1.53846Z" fill="#22C55E" />
                                    <path d="M0 18.4615H1.53846V1.53846H0V18.4615Z" fill="#22C55E" />
                                    <path d="M18.4615 20V18.4615H1.53846V20H18.4615Z" fill="#22C55E" />
                                    <path d="M20 1.53846L18.4615 1.53846V18.4615H20V1.53846Z" fill="#22C55E" />
                                    <path d="M14.7999 6.85714H13V8.71429H14.7999V6.85714Z" fill="#22C55E" />
                                    <path d="M13 8.71429H11.2V10.5714H13V8.71429Z" fill="#22C55E" />
                                    <path d="M16.6 5H14.7999V6.85714H16.6V5Z" fill="#22C55E" />
                                    <path d="M9.39995 12.4286H7.59995V14.2857H9.39995V12.4286Z" fill="#22C55E" />
                                    <path d="M11.2 10.5714H9.39995V12.4286H11.2V10.5714Z" fill="#22C55E" />
                                    <path d="M7.6 10.5714H5.8V12.4286L7.59995 12.4286L7.6 10.5714Z" fill="#22C55E" />
                                    <path d="M5.8 8.71428H4V10.5714H5.8V8.71428Z" fill="#22C55E" />
                                    <path d="M9.39995 12.4286H7.59995V14.2857H9.39995V12.4286Z" fill="#22C55E" />
                                </svg>
                            </p>
                        </div>
                        <div class="strm-button" @click="setActiveModal('facebookStreamModal')">
                            <p class="flex items-center justify-between">Facebook
                                <svg v-if="facebookSecret !== ''" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.4615 1.53846V0H1.53846V1.53846L18.4615 1.53846Z" fill="#22C55E" />
                                    <path d="M0 18.4615H1.53846V1.53846H0V18.4615Z" fill="#22C55E" />
                                    <path d="M18.4615 20V18.4615H1.53846V20H18.4615Z" fill="#22C55E" />
                                    <path d="M20 1.53846L18.4615 1.53846V18.4615H20V1.53846Z" fill="#22C55E" />
                                    <path d="M14.7999 6.85714H13V8.71429H14.7999V6.85714Z" fill="#22C55E" />
                                    <path d="M13 8.71429H11.2V10.5714H13V8.71429Z" fill="#22C55E" />
                                    <path d="M16.6 5H14.7999V6.85714H16.6V5Z" fill="#22C55E" />
                                    <path d="M9.39995 12.4286H7.59995V14.2857H9.39995V12.4286Z" fill="#22C55E" />
                                    <path d="M11.2 10.5714H9.39995V12.4286H11.2V10.5714Z" fill="#22C55E" />
                                    <path d="M7.6 10.5714H5.8V12.4286L7.59995 12.4286L7.6 10.5714Z" fill="#22C55E" />
                                    <path d="M5.8 8.71428H4V10.5714H5.8V8.71428Z" fill="#22C55E" />
                                    <path d="M9.39995 12.4286H7.59995V14.2857H9.39995V12.4286Z" fill="#22C55E" />
                                </svg>
                            </p>
                        </div>
                        <div class="strm-button" @click="setActiveModal('twitchStreamModal')">
                            <p class="flex items-center justify-between">Twitch
                                <svg v-if="twitchSecret !== ''" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.4615 1.53846V0H1.53846V1.53846L18.4615 1.53846Z" fill="#22C55E" />
                                    <path d="M0 18.4615H1.53846V1.53846H0V18.4615Z" fill="#22C55E" />
                                    <path d="M18.4615 20V18.4615H1.53846V20H18.4615Z" fill="#22C55E" />
                                    <path d="M20 1.53846L18.4615 1.53846V18.4615H20V1.53846Z" fill="#22C55E" />
                                    <path d="M14.7999 6.85714H13V8.71429H14.7999V6.85714Z" fill="#22C55E" />
                                    <path d="M13 8.71429H11.2V10.5714H13V8.71429Z" fill="#22C55E" />
                                    <path d="M16.6 5H14.7999V6.85714H16.6V5Z" fill="#22C55E" />
                                    <path d="M9.39995 12.4286H7.59995V14.2857H9.39995V12.4286Z" fill="#22C55E" />
                                    <path d="M11.2 10.5714H9.39995V12.4286H11.2V10.5714Z" fill="#22C55E" />
                                    <path d="M7.6 10.5714H5.8V12.4286L7.59995 12.4286L7.6 10.5714Z" fill="#22C55E" />
                                    <path d="M5.8 8.71428H4V10.5714H5.8V8.71428Z" fill="#22C55E" />
                                    <path d="M9.39995 12.4286H7.59995V14.2857H9.39995V12.4286Z" fill="#22C55E" />
                                </svg>
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col mt-8 w-3/4">
                        <p class="collect-em-label">//For streaming the event on Decast, choose this option and you will
                            receive the stream page address in your email.</p>
                        <span>decastStreaming()</span>
                        <div class="flex flex-col mt-2" v-if="!isLoading">
                            <button class="custm-toggle mb-1" @click="() => VWStream = true"
                                v-bind:style="VWStream ? 'backgroundColor: #22C55E; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">enable</button>
                            <button class="custm-toggle" @click="() => VWStream = false"
                                v-bind:style="VWStream ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #22C55E; color: #000000'">disable</button>
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" @click="updateCastWithStream">>>confirm</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p v-if="isLoading">>> Initiating cast > <span>loading...</span></p>
                    <p v-else>>> Live Streaming Settings > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'LiveStreamModal',
    props: ['closeModal', 'setActiveModal', 'castDetails', 'stepThreeProps', 'handleEditCast'],
    components: {
        BaseModal,
    },
    data() {
        return {
            isLoading: false,
            VWStream: false,
            youtube: '',
            youtubeSecret: '',
            facebook: '',
            facebookSecret: '',
            twitch: '',
            twitchSecret: '',
        };
    },
    mounted() {
        this.isLoading = true;
        this.$store
            .dispatch('cast/editEvent', this.castDetails.public_meeting_id)
            .then((res) => {
                const info = res.data.details;
                if (info.bbb_stream_url !== null) {
                    window.eval(info.bbb_stream_url).forEach((item) => {
                        var x = item.split('/');
                        if (item.match(/youtube/)) {
                            this.stepThreeProps.youtube_secret_key = x.pop();
                            this.stepThreeProps.youtube_rtmp_url = x.join('/');
                            this.stepThreeProps.youtube_stream_url = item;
                            this.stepThreeProps.record_youtube = true;
                            this.youtubeSecret = this.stepThreeProps.youtube_secret_key;
                            this.youtube = this.stepThreeProps.youtube_rtmp_url;
                        }
                        if (item.match(/video.wiki/)) {
                            this.stepThreeProps.vw_stream = true;
                            this.VWStream = this.stepThreeProps.vw_stream;
                        }
                        if (item.match(/facebook/)) {
                            this.stepThreeProps.facebook_secret_key = x.pop();
                            this.stepThreeProps.facebook_rtmp_url = x.join('/');
                            this.stepThreeProps.facebook_stream_url = item;
                            this.stepThreeProps.record_facebook = true;
                            this.facebookSecret = this.stepThreeProps.facebook_secret_key;
                            this.facebook = this.stepThreeProps.facebook_rtmp_url;
                        }
                        if (item.match(/twitch/)) {
                            this.stepThreeProps.twitch_secret_key = x.pop();
                            this.stepThreeProps.twitch_rtmp_url = x.join('/');
                            this.stepThreeProps.twitch_stream_url = item;
                            this.stepThreeProps.record_twich = true;
                            this.twitch = this.stepThreeProps.twitch_rtmp_url;
                            this.twitchSecret = this.stepThreeProps.twitch_secret_key;
                        }
                    });
                }
                this.isLoading = false;
            })
            .catch((e) => {
                this.isLoading = false;
                console.log('Error editing', e);
            });
    },
    methods: {
        updateCastWithStream() {
            const streamUrls = [{ vw_stream: 'True' }, { urls: [] }];

            if (this.VWStream === true) {
                streamUrls[0].vw_stream = 'True';
            } else {
                streamUrls[0].vw_stream = 'False';
            }

            if (this.youtube !== '' && this.youtubeSecret !== '') {
                streamUrls[1].urls.push(`${this.youtube}/${this.youtubeSecret}`);
            }

            if (this.facebook !== '' && this.facebookSecret !== '') {
                streamUrls[1].urls.push(`${this.facebook}/${this.facebookSecret}`);
            }

            if (this.twitch !== '' && this.twitchSecret !== '') {
                streamUrls[1].urls.push(`${this.twitch}/${this.twitchSecret}`);
            }
            const isStreaming = this.VWStream || streamUrls[1].urls.length > 0;

            this.stepThreeProps.is_streaming = isStreaming;
            this.stepThreeProps.vw_stream = streamUrls[0].vw_stream;
            this.stepThreeProps.vw_stream_url = JSON.stringify(streamUrls);
            this.handleEditCast({ updateStream: true });
        },
    },
}
</script>

<style scoped>
.custm-toggle {
    padding: 0.30rem 0.75rem !important;
    border: 1px solid #FFFFFF;
    outline: none;
    cursor: pointer;
    width: 100px;
    text-align: left;
}

.collect-em-label {
    color: #5B96EB !important;
}

.strm-button {
    height: 70px;
    width: 135px;
    margin-right: 14px;
    padding: 8px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid #FFFFFF;
}
</style>