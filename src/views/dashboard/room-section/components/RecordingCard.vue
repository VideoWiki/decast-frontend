<template>
    <div class="recordings flex justify-between items-center mb-4">
        <div class="w-3/4 flex justify-between items-center">
            <p>
                {{ recording.url['Start Time (Readable)'].split(' ')[0] }}
            </p>
            <p>{{ recording.room_name }}</p>
        </div>

        <!-- <button class="side-btn border-none" @click="toggleRecordingPopup(index)">
            <img src="@/assets/images/Rooms/Vector2.svg" class="h-7 p-2" alt="" />
        </button> -->
        <SimpleMenu :menuList="recordingCardMenuItems">
            <template #menuButton>
                <vs-button class="custm-more-icon">
                    <MoreIcon />
                </vs-button>
            </template>
        </SimpleMenu>
        <!-- <div class="room-popup" v-if="showPopup === index" @click="closePopup(index)">
            <button @click="openRecording(recording)">
                <vs-icon icon-pack="feather" icon="icon-play" size="12px" rounded="true" style="align-self: center">
                </vs-icon>
                Play
            </button>
            <button @click="downloadRoom(room)">
                  <img src="@/assets/images/download.svg" />
                  Download
                </button>
            <button @click="copyLink(room)">
                  <img src="@/assets/images/copy.svg" />
                  Copy Link
                </button>
            <button @click="copyRecording(recording, index)">
                <img src="@/assets/images/copy.svg" />
                Copy Link
            </button>

            <button @mouseover="toggleEditTool(index)" @mouseleave="toggleEditTool(index)" @click="editRecord(recording)">
                <img class="mr-1" src="@/assets/images/pen.svg" alt="" />Edit
            </button>
            <div class="tooltip2" v-if="showTooltip3 === index">
                <div>
                    The recording may require some time for processing. If it
                    doesn't work, please try again later.
                </div>
                <div class="triangle"></div>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from '@/axios';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import MoreIcon from '@/assets/svgs/button-icons/more.vue';

export default {
    name: 'RecordingCard',
    props: ['recording', 'index'],
    components: {
        SimpleMenu,
        MoreIcon,
    },
    data() {
        return {
            recordingCardMenuItems: [
                {
                    label: "Play",
                    icon: () => import("@/assets/svgs/button-icons/copy.vue"),
                    onClick: () => this.openRecording()
                },
                {
                    label: "Copy Link",
                    icon: () => import("@/assets/svgs/button-icons/copy.vue"),
                    onClick: () => this.copyRecording()
                },
                {
                    label: "Edit",
                    icon: () => import("@/assets/svgs/menu-icons/pen.vue"),
                    onClick: () => this.editRecord(),
                    tooltip: "The recording may require some time for processing. If it doesn't work, please try again later.",
                    tooltipPosition: "left",
                },
            ]
        }
    },
    methods: {
        openRecording() {
            // this.$router.push(`/recording/${recording.url['Record ID']}`);
            const playbackURL =
                this.recording.url['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v';
            window.open(playbackURL, '_blank');
            // window.location.href = '/recording/' + room.url['Record ID'];
        },
        copyRecording() {
            navigator.clipboard.writeText(
                this.recording.url['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v'
            );
        },
        editRecord() {
            const meetingId = this.recording.url['Record ID'];
            setTimeout(() => {
                const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
                window.open(url, '_blank');
            }, 2000);
        },
    },
};
</script>

<style scoped>
*:not(i) {
    font-family: 'Karla', sans-serif;
}

.custm-more-icon {
    background-color: transparent !important;
    border: none !important;
}

.recordings {
    position: relative;
    padding: 10px 0px;
    border-bottom: 1px solid #31394e;
    height: 62px;
    font-weight: 600;

    p {
        font-weight: 400;
    }
}
</style>