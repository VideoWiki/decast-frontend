<template>
    <div class="w-full">
        <div class="recordings w-full flex flex-col justify-between items-center mb-4 py-2 px-4 gap-2">
            <div class="flex flex-row justify-between items-center w-full">
                <p class="text-lg font-semibold">
                    {{ truncateText(recording.Name, 20) }}
                </p>
                <div class="flex gap-2 justify-end items-center">
                    <span v-if="loading"
                        class="spinner cursor-pointer"
                        v-tooltip="'Loading storage...'">
                        <CommonLoader />
                    </span>

                    <span v-else-if="selectedStorage === 'swarm'"
                        class="choose_plat cursor-pointer"
                        v-tooltip="'Uploaded to Swarm'">
                        <img class="w-4 h-4 object-contain" src="../../../../images/swarm.png" />
                    </span>

                    <span v-else-if="selectedStorage === 'sia'"
                        class="choose_plat cursor-pointer"
                        v-tooltip="'Uploaded to Sia'">
                        <img class="w-6 h-6 object-contain" src="../../../../images/sia.png" />
                    </span>

                    <span v-else
                        class="no_storage cursor-pointer"
                        v-tooltip="'No storage selected'">
                        <p>No Storage</p>
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
            loading: true,
            selectedStorage: null, // Keeps track of which storage is used
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

        truncateText(text, maxLength) {
            return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
        },

        handleDownloadRecording() {
            // Your download logic here
        },
    },
};
</script>
