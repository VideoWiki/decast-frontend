<template>
    <div class="recordings flex justify-between items-center mb-4 w-full py-2 px-6">
        <div class="w-full flex justify-between items-center">
            <div>
                <p>{{ recording.Name }}</p>
            </div>
            <div class="flex items-center">
                <p class="mr-2">
                    {{ recording['Start Time (Readable)'].split(' ')[0] }}
                </p>
                <SimpleMenu :menuList="recordingCardMenuItems">
                    <template #menuButton>
                        <vs-button class="custm-more-icon">
                            <img src="@/assets/images/menu.svg" />
                        </vs-button>
                    </template>
                </SimpleMenu>
                <vs-button class="custm-style" @click="openRecording">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H31V31H0V0Z" fill="#D7DF23" />
                        <path
                            d="M31 31V31.8596H31.8596V31H31ZM30.1404 0V31H31.8596V0H30.1404ZM31 30.1404H0V31.8596H31V30.1404Z"
                            fill="white" />
                        <path d="M7.62409 7.88238H6.10059V23.1174H7.62409V7.88238Z" fill="black" />
                        <path d="M7.62413 6.35889L7.62409 7.88238L10.6711 7.88239V6.35889H7.62413Z" fill="black" />
                        <path d="M10.6711 7.88239L10.6711 9.4059L13.7181 9.40589L13.7181 7.8824L10.6711 7.88239Z"
                            fill="black" />
                        <path d="M13.7181 9.40589V10.9294L16.7652 10.9294L16.7651 9.40589H13.7181Z" fill="black" />
                        <path d="M16.7652 10.9294V12.4529L19.8121 12.4529L19.8121 10.9294H16.7652Z" fill="black" />
                        <path d="M19.8121 12.4529V13.9764L22.8592 13.9764L22.8592 12.4529H19.8121Z" fill="black" />
                        <path d="M22.8592 17.0234H24.3827V13.9764H22.8592V17.0234Z" fill="black" />
                        <path d="M19.8121 17.0234V18.5469H22.8592L22.8592 17.0234L19.8121 17.0234Z" fill="black" />
                        <path d="M16.7652 18.5469V20.0704H19.8121L19.8121 18.5469L16.7652 18.5469Z" fill="black" />
                        <path d="M13.7181 20.0704V21.5939H16.7651L16.7652 20.0704L13.7181 20.0704Z" fill="black" />
                        <path d="M10.6711 21.5939L10.6711 23.1174L13.7181 23.1174L13.7181 21.5939L10.6711 21.5939Z"
                            fill="black" />
                        <path d="M7.62409 23.1174L7.62413 24.6409H10.6711V23.1174L7.62409 23.1174Z" fill="black" />
                        <path
                            d="M10.671 7.88232H7.62402V23.1174H10.671V21.5939H13.718V20.0704H16.765V18.5469H19.8121V17.0233H22.8591V13.9763H19.8121V12.4528H16.765V10.9293H13.718V9.40583H10.671V7.88232Z"
                            fill="white" />
                    </svg>
                </vs-button>
            </div>
        </div>

        <RenameModal v-if="activeModal === 'renameRecording'" :closeModal="() => activeModal = ''" :recording="recording"
            :getRecordings="getRecordings" />
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
                // {
                //     label: "Play",
                //     icon: () => import("@/assets/svgs/button-icons/copy.vue"),
                //     onClick: () => this.openRecording()
                // },
                {
                    label: "Copy Link",
                    icon: () => import("@/assets/svgs/button-icons/copy.vue"),
                    onClick: () => this.copyRecording()
                },
                {
                    label: "Rename",
                    icon: () => import("@/assets/svgs/menu-icons/pen.vue"),
                    onClick: () => this.activeModal = 'renameRecording',
                },
                {
                    label: "Editor",
                    icon: () => import("@/assets/svgs/menu-icons/editor.vue"),
                    onClick: () => this.editRecord(),
                    tooltip: "The recording may require some time for processing. If it doesn't work, please try again later.",
                    tooltipPosition: "left",
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
</style>