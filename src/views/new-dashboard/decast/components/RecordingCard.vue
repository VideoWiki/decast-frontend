<template>
    <div class="w-full">
        <!-- <div v-if="loading">
            <CommonLoader />
        </div> -->
        <div class="recordings w-full flex flex-col justify-between items-center mb-4 py-2 px-4 gap-2">
            <div class="flex flex-row justify-between items-center w-full">
                <p class="text-lg font-semibold">
                    {{ truncateText(recording.Name, 20) }}
                </p>
                <div class="flex gap-2 justify-end items-center">
                    <span v-if="loading" class="spinner cursor-pointer">
                        <vx-tooltip text="/Loading storage..." position="top">
                            <div class="loader"></div>
                        </vx-tooltip>
                    </span>

                    <span v-else-if="selectedStorage === 'swarm'" class="choose_plat cursor-pointer">
                        <vx-tooltip text="/Uploaded to Swarm" position="top">
                            <img class="w-6 h-6 object-contain" src="@/assets/images/swarm.png" />
                        </vx-tooltip>
                    </span>

                    <span v-else-if="selectedStorage === 'sia'" class="choose_plat cursor-pointer">
                        <vx-tooltip text="/Uploaded to Sia" position="top">
                            <img class="w-8 h-8 object-contain" src="@/assets/images/sia.png" />
                        </vx-tooltip>
                    </span>

                    <span v-else class="no_storage cursor-pointer">
                        <vx-tooltip text="/No storage selected" position="top">
                            <p>O</p>
                        </vx-tooltip>
                    </span>

                    <span class="down_btn cursor-pointer" @click="handleDownloadRecording">
                        <vx-tooltip text="/ download" position="top">
                            <DownloadButton />
                        </vx-tooltip>
                    </span>
                </div>
            </div>
            <div class="flex flex-row justify-between items-center w-full">
                <div class="flex flex-col gap-2">
                    <p style="color: #a6a6a6; font-size: 16px">
                        >>Cast:
                        <span style="color: #d7df23">
                            {{ truncateText(recording.cast_name, 20) }}
                        </span>
                    </p>

                    <p style="color: #a6a6a6; font-size: 16px">
                        >>Size:
                        <span style="color: #d7df23">
                            {{ recording["Playback Data"]["Playback Size"] }}</span>
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="flex justify-end items-end" style="color: #a6a6a6; font-size: 16px">
                        {{ recording["Start Time (Readable)"].split(" ")[0] }}
                    </p>

                    <p style="color: #a6a6a6; font-size: 16px">
                        >>Length:
                        <span style="color: #d7df23">{{ recording["Playback Data"]["Playback Length"] }} min</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CopyButton from "./common/CopyButton.vue";
import StartButton from "./common/StartButton.vue";
import DeleteButton from "./common/DeleteButton.vue";
import axios from '../../../../axios';
import DownloadButton from "./common/DownloadButton.vue";
import constants from "../../../../../constant";
import CommonLoader from "./common/CommonLoader.vue";

export default {
    name: "RecordingCard",
    props: ["recording", "index", "getRecordings", "siaMinutes", "siaFreeGiven", "swarmMinutes", "swarmFreeGiven"],
    data() {
        return {
            isSelecting: false,
            loading: false,
            taskId: '',
            loading: true,
            selectedStorage: null,
        };
    },
    components: {
        CopyButton,
        StartButton,
        DeleteButton,
        DownloadButton,
        CommonLoader,
    },
    computed: {
        accessToken() {
            return this.$store.state.accessToken;
        },
    },
    mounted() {
        this.fetchSelectedStorage();
    },
    methods: {
        handleSelect() {
            this.isSelecting = !this.isSelecting;
        },
        openRecording() {
            const playbackURL =
                this.recording["Playback Data"]["Playback URL"].replace(
                    "/presentation/2.3",
                    "/video"
                ) + "/video-0.m4v";
            window.open(
                playbackURL,
                "_blank",
                "width=1366,height=768,scrollbars=yes,resizable=yes"
            );
        },
        copyRecording() {
            navigator.clipboard.writeText(
                this.recording["Playback Data"]["Playback URL"].replace(
                    "/presentation/2.3",
                    "/video"
                ) + "/video-0.m4v"
            );
        },

        editRecord() {
            setTimeout(() => {
                const meetingId = this.recording['Record ID'];
                const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
                // window.open(url, '_blank');
                window.open(url, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
            }, 1000);
        },

        async updateIsDeducted() {
            const url = `${constants.apiCastUrl}/api/decast/update/deducted/status/`;
            const payload = {
                cast_id: this.recording.pub_id,
                start_time: this.recording["Start Time (Readable)"],
                l_time: this.recording["End Time (Readable)"],
                is_deducted: this.recording.is_deducted,
            };

            try {
                const response = await axios.post(url, payload, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                });
                console.log("Update successful:", response.data);
            } catch (error) {
                console.error("Error updating deducted status:", error);
            }
        },

        async fetchSelectedStorage() {
            const cast_id = this.recording.pub_id;
            const url = `${constants.apiCastUrl}/api/event/select/storage/?cast_id=${cast_id}`;

            try {
                const response = await axios.get(url);
                const { SIA, SWARM } = response.data;
                if (SIA && !SWARM) {
                    this.selectedStorage = "sia";
                } else if (!SIA && SWARM) {
                    this.selectedStorage = "swarm";
                } else {
                    this.selectedStorage = null;
                }
            } catch (error) {
                console.error("Error fetching selected storage:", error);
                this.selectedStorage = null;
            } finally {
                this.loading = false;
            }
        },

        async getSelectedStorage() {
            const cast_id = this.recording.pub_id;
            const url = `${constants.apiCastUrl}/api/event/select/storage/?cast_id=${cast_id}`;

            try {
                this.$vs.loading({
                    type: 'corners',
                    color: '#22c55e',
                    text: 'Fetching your storage details...',
                });
                const response = await axios.get(url);
                // //console.log('Storage retrived successfully:', response.data);

                if (response.data.SIA == true && response.data.SWARM == false) {
                    await this.handleSiaDownload();
                } else if (response.data.SIA == false && response.data.SWARM == true) {
                    await this.handleSwarmDownload();
                }
                this.$vs.loading.close();
            } catch (error) {
                this.$vs.loading.close();
                console.error('Error:', error);
            }
        },
        async handleSiaStatus() {
            const cast_id = this.recording.pub_id;
            const start_time = this.recording["Start Time (Readable)"];
            const l_time = this.recording["End Time (Readable)"];
            const url = `${constants.apiCastUrl}/api/decast/rec/sia/download/?start_time=${start_time}&l_time=${l_time}&pub_id=${cast_id}`;
            try {
                this.$vs.loading();
                const response = await axios.get(url);
                //console.log('Storage retrived successfully:', response.data);
                this.taskId = response.data.task_id;
                this.$vs.loading.close();
            } catch (error) {
                this.$vs.loading.close();
                console.error('Error:', error);
            }
        },
        async handleSiaDownload() {
            await this.handleSiaStatus();
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/result/?task_id=${this.taskId}`;

            this.$vs.loading();
            // if (this.recording.is_deducted === false) {
            //     //console.log("size true");
            //     this.$vs.notify({
            //         title: 'Try again later',
            //         text: 'Your recording will be ready for download in a short while.',
            //         color: 'danger',
            //     });
            //     this.$vs.loading.close();
            //     return;
            // }
            console.log(this.recording["Playback Data"]["Playback Length"], this.siaMinutes);

            if (this.siaMinutes < this.recording["Playback Data"]["Playback Length"] && this.recording.is_deducted == false) {
                this.$vs.notify({
                    title: 'Try again later',
                    text: 'Insufficient minutes available to download this recording. Please check your balance or upgrade your plan.',
                    color: 'danger',
                });
                this.$vs.loading.close();
                return;
            }

            try {
                let success = false;
                while (!success) {
                    const response = await axios.get(url);

                    if (response.data.status === 'SUCCESS') {
                        success = true;
                        const binaryData = response.data.result?.binary_data;
                        if (binaryData) {
                            const byteCharacters = atob(binaryData);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);

                            const blob = new Blob([byteArray], { type: 'video/webm' });
                            const contentDisposition = response.headers['content-disposition'];
                            const fileName = contentDisposition
                                ? contentDisposition.split('filename=')[1].split(';')[0].trim()
                                : 'downloaded_video.webm';
                            const blobUrl = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = blobUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(blobUrl);
                            this.$vs.notify({
                                title: 'Success!',
                                text: 'Download successful',
                                color: 'success',
                            });
                        } else {
                            this.$vs.notify({
                                title: 'Try again later!',
                                text: 'Your recording is not ready for download yet!',
                                color: 'danger',
                            });
                            console.error('No binary data found in response.');
                        }
                    }
                    else if (response.data.status === 'PENDING') {
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Download Not Ready',
                            text: 'Your download is not ready yet. Please try again later.',
                            color: 'warning',
                        });
                        return;
                    }
                    else {
                        console.error('Failed to retrieve video data. Status:', response.data.status);
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
            } catch (error) {
                this.$vs.loading.close();
                this.$vs.notify({
                    title: 'Error',
                    text: 'Unable to process your request!',
                    color: 'danger',
                });
                console.error('Error:', error);
            } finally {
                this.$vs.loading.close();
            }
        },
        async handleSwarmStatus() {
            const cast_id = this.recording.pub_id;
            const start_time = this.recording["Start Time (Readable)"];
            const l_time = this.recording["End Time (Readable)"];
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/download/?start_time=${start_time}&l_time=${l_time}&pub_id=${cast_id}`;
            try {
                this.$vs.loading({
                    type: 'corners',
                    color: '#22c55e',
                    text: 'Fetching your storage details...',
                });
                const response = await axios.get(url);
                //console.log('Storage retrived successfully:', response.data);
                this.taskId = response.data.task_id;
                this.$vs.loading.close();
            } catch (error) {
                this.$vs.loading.close();
                console.error('Error:', error);
            }
        },
        async handleSwarmDownload() {
            //console.log('Running handleSwarmDownload', this.recording["Playback Data"]["Playback Size"], this.swarmMinutes);
            await this.handleSwarmStatus();
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/result/?task_id=${this.taskId}`;
            this.$vs.loading({
                    type: 'corners',
                    color: '#22c55e',
                    text: 'Downloading your recording...',
                });
            // if (this.recording.is_deducted === false) {
            //     //console.log("size true");
            //     this.$vs.notify({
            //         title: 'Try again later',
            //         text: 'Your recording will be ready for download in a short while.',
            //         color: 'danger',
            //     });
            //     this.$vs.loading.close();
            //     return;
            // }

            // if (this.swarmMinutes < this.recording["Playback Data"]["Playback Length"] && this.recording.is_deducted==false) {
            //     this.$vs.notify({
            //         title: 'Try again later',
            //         text: 'Insufficient minutes available to download this recording. Please check your balance or upgrade your plan.',
            //         color: 'danger',
            //     });
            //     this.$vs.loading.close();
            //     return;
            // }

            try {
                let success = false;
                while (!success) {
                    const response = await axios.get(url);

                    if (response.data.status === 'SUCCESS') {
                        success = true;
                        const binaryData = response.data.result?.binary_data;
                        if (binaryData) {
                            const byteCharacters = atob(binaryData);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);

                            const blob = new Blob([byteArray], { type: 'video/webm' });
                            const contentDisposition = response.headers['content-disposition'];
                            const fileName = contentDisposition
                                ? contentDisposition.split('filename=')[1].split(';')[0].trim()
                                : 'downloaded_video.webm';
                            const blobUrl = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = blobUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(blobUrl);
                            this.$vs.notify({
                                title: 'Success!',
                                text: 'Download successful',
                                color: 'success',
                            });
                        } else {
                            this.$vs.notify({
                                title: 'Try again later!',
                                text: 'Your recording is not ready for download yet!',
                                color: 'danger',
                            });
                            console.error('No binary data found in response.');
                        }
                    }
                    else if (response.data.status === 'PENDING') {
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Download Not Ready',
                            text: 'Your download is not ready yet. Please try again later.',
                            color: 'warning',
                        });
                        return;
                    }
                    else {
                        console.error('Failed to retrieve video data. Status:', response.data.status);
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
            } catch (error) {
                this.$vs.loading.close();
                this.$vs.notify({
                    title: 'Error',
                    text: 'Unable to process your request!',
                    color: 'danger',
                });
                console.error('Error:', error);
            } finally {
                this.$vs.loading.close();
            }
        },

        handleDownloadRecording() {
            this.getSelectedStorage();
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + "...";
            } else {
                return text;
            }
        },
    },
};
</script>

<style scoped>
* {
    font-family: "JetBrains Mono", monospace !important;
}

.custm-more-icon {
    background-color: transparent !important;
    border: none !important;
}

.recordings {
    border-top: 1px solid white;
    border-left: 1px solid white;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    box-shadow: 3px 3px 0px 0px #a6a6a6;
}

.recordings:hover {
    border-top: 1px solid #D7DF23;
    border-left: 1px solid #D7DF23;
    border-right: 2px solid #D7DF23;
    border-bottom: 2px solid #D7DF23;
    box-shadow: 3px 3px 0px 0px #D7DF23;
}

.custm-style {
    background: none !important;
    outline: none !important;
    border: none !important;
    background-color: transparent !important;
}

.custm-style:hover {
    box-shadow: none !important;
}

.select_card {
    /* border: 1px solid #fff; */
    min-height: 220px;
    height: auto;
    width: 435px;
    display: flex;
}

.sia_container,
.swarm_container {
    border: 1px solid #fff;
    width: 100%;
}

.swarm_container:hover {
    border: 1px solid #d7df23;
    width: 100%;
}

.sia_container:hover {
    border: 1px solid #d7df23;
    width: 100%;
}

.loader {
    border: 4px solid #f3f3f3;
    /* Light gray */
    border-top: 4px solid #d7df23;
    /* Highlight color */
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
