<template>
    <BaseModal :title="'Streaming'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <!-- <div class="modal-heading">
                        <h3>Facebook Streaming Options</h3>
                    </div>
                    <div class="flex flex-col mt-6 w-3/4">
                        <p class="collect-em-label">//Switch the option to true if you want to stream your cast onto Facebook</p>
                        <span>facebookStreaming()</span>
                        <div class="flex flex-col mt-2">
                            <button class="custm-toggle mb-1" @click="() => {}"
                                v-bind:style="true ? 'backgroundColor: #FFFFFF; color: #000000' : 'backgroundColor: #000000; color: #FFFFFF'">true</button>
                            <button class="custm-toggle" @click="() => {}"
                                v-bind:style="true ? 'backgroundColor: #000000; color: #FFFFFF' : 'backgroundColor: #FFFFFF; color: #000000'">false</button>
                        </div>
                    </div> -->

                    <div class="modal-heading mt-8">
                        <h3>Facebook Streaming Details</h3>
                    </div>
                    <div class="flex flex-col mt-6">
                        <span>//Facebook RTMP Url</span>
                        <div>
                            <input class="w-2/5 p-2 mt-2" placeholder="//RTMP URL" type="text"
                                v-model="facebook" @keyup="urlError = facebook === ''" />
                            <p v-if="urlError" class="text-danger my-2 p-0">>> RTMP URL is required</p>
                        </div>
                    </div>

                    <div class="flex flex-col mt-6">
                        <span>//Facebook Secret Key</span>
                        <div>
                            <input class="w-2/5 p-2 mt-2" placeholder="//Secret Key" type="text"
                                v-model="facebookSecret" @keyup="secretKeyError = facebookSecret === ''" />
                            <p v-if="secretKeyError" class="text-danger my-2 p-0">>> Secret Key is required</p>
                        </div>
                    </div>

                    <vs-button class="mt-8" type="border" @click="updateCastWithStream">>>confirm</vs-button>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Live Streaming Settings > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'TwitchStreamModal',
    props: ['closeModal', 'castDetails', 'stepThreeProps', 'handleEditCast'],
    components: {
        BaseModal,
    },
    data() {
        return {
            urlError: false,
            secretKeyError: false,
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
                        }
                        if (item.match(/video.wiki/)) {
                            this.stepThreeProps.vw_stream = true; 
                        }
                        if (item.match(/facebook/)) {
                            this.stepThreeProps.facebook_secret_key = x.pop();
                            this.stepThreeProps.facebook_rtmp_url = x.join('/');
                            this.stepThreeProps.facebook_stream_url = item;
                            this.stepThreeProps.record_facebook = true;  
                        }
                        if (item.match(/twitch/)) {
                            this.stepThreeProps.twitch_secret_key = x.pop();
                            this.stepThreeProps.twitch_rtmp_url = x.join('/');
                            this.stepThreeProps.twitch_stream_url = item;
                            this.stepThreeProps.record_twich = true;
                        }
                    });
                }
                this.youtubeSecret = this.stepThreeProps.youtube_secret_key;
                this.youtube = this.stepThreeProps.youtube_rtmp_url;
                this.VWStream = this.stepThreeProps.vw_stream;
                this.facebookSecret = this.stepThreeProps.facebook_secret_key;
                this.facebook = this.stepThreeProps.facebook_rtmp_url;
                this.twitch = this.stepThreeProps.twitch_rtmp_url;
                this.twitchSecret = this.stepThreeProps.twitch_secret_key;
            })
            .catch((e) => {
                console.log('Error editing', e);
            });
    },
    methods: {
        updateCastWithStream() {
            const streamUrls = [{ vw_stream: true }, { urls: [] }];

            if (this.VWStream === true) {
                streamUrls[0].vw_stream = 'True';
            }else {
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
            this.handleEditCast();
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
    width: fit-content;
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