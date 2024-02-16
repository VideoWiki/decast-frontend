<template>
    <div class="recordings flex justify-between items-center mb-4 w-full py-2 px-6">
        <div class="w-3/4 flex justify-between items-center">
            <p>
                {{ recording['Start Time (Readable)'].split(' ')[0] }}
            </p>
            <p>
                {{ recording.Name }}
            </p>
        </div>
        <SimpleMenu :menuList="recordingCardMenuItems">
            <template #menuButton>
                <vs-button class="custm-more-icon">
                    <img src="@/assets/images/menu.svg" />
                </vs-button>
            </template>
        </SimpleMenu>
        <RenameModal v-if="activeModal === 'renameRecording'" :closeModal="() => activeModal=''"
            :recording="recording" :getRecordings="getRecordings"/>
    </div>
</template>

<script>
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import MoreIcon from '@/assets/svgs/button-icons/more.vue';
import RenameModal from './recording-options/RenameModal.vue';

export default {
    name: 'RecordingCard',
    props: ['recording', 'index', 'getRecordings'],
    components: {
    SimpleMenu,
    MoreIcon,
    RenameModal
},
    data() {
        return {
            activeModal: '',
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
                {
                    label: "Rename",
                    icon: () => import("@/assets/svgs/menu-icons/pen.vue"),
                    onClick: () => this.activeModal = 'renameRecording',
                },
            ]
        }
    },
    methods: {
        openRecording() {
            const playbackURL =
                this.recording['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v';
            window.open(playbackURL, '_blank');
        },
        copyRecording() {
            navigator.clipboard.writeText(
                this.recording['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v'
            );
        },
        editRecord() {
            setTimeout(() => {
                const meetingId = this.recording['Record ID'];
                const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
                window.open(url, '_blank');
            }, 1000);
        },
    },
}

</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
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
    box-shadow: 3px 3px 0px 0px white;
}

.recordings:hover{
    border-top: 1px solid #D7DF23;
    border-left: 1px solid #D7DF23;
    border-right: 2px solid #D7DF23;
    border-bottom: 2px solid #D7DF23;
    box-shadow: 3px 3px 0px 0px #D7DF23;
}
</style>