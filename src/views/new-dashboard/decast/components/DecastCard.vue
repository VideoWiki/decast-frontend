<template>
    <div>
        <DecastCardShimmer v-if="isLoading" />
        <div v-else class="cast_list flex flex-col justify-between items-start text-left mb-4 w-full py-3 px-4">
            <div class="flex flex-row justify-between items-center w-full">
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-lg flex items-center">
                        {{ truncateText(castDetails.event_name, 25) }}
                        <span class="text-red-500 text-sm flex items-center gap-2 ml-4"
                            v-if="castDetails.is_running === 'true'"><span class="basic_live_dot_ rounded-full"></span>
                        </span>
                    </p>
                    <p style="color: #a6a6a6;" class="mt-2">{{ castDetails.schedule_time }}</p>
                </div>

                <div class="cursor-pointer flex gap-4 justify-end items-center">
                    <span v-if="castDetails.is_running === 'false' && !isCastStart" @click="openModal">
                        <vx-tooltip text="/ storage.select" position="top">
                            <StartButton />
                        </vx-tooltip>
                    </span>
                    <!-- @click="joinNow(castDetails.public_meeting_id)" -->
                    <span v-if="castDetails.is_running === 'true'">
                        <LiveButton />
                    </span>

                    <span v-else-if="isCastStart && castDetails.is_running === 'false'">
                        <LiveButton />
                    </span>

                    <vs-button class="custm-style" @click="setActiveModal('castOptionsModal')">
                        <vx-tooltip text="/ menu" position="top">
                            <img class="h-8" src="@/assets/images/menu.svg" />
                        </vx-tooltip>
                    </vs-button>
                </div>
            </div>
            <div class="flex flex-row justify-start items-center gap-4 mt-2" v-if="castDetails.cast_type === 'public'">
                <p class="text-md shortURL">{{ truncateText(shortURL, 30) }}</p>
                <button class="custm-style bg-back-black cursor-pointer outline-none border-none"
                    @click="copy(castDetails.public_meeting_id, castDetails.h_ap)">
                    <span>
                        <vx-tooltip text="/ copy" position="top">
                            <CopyButton color="#D7DF23" />
                        </vx-tooltip>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import DecastCardShimmer from "./DecastCardShimmer.vue";
import CopyButton from "./common/CopyButton.vue";
import StartButton from "./common/StartButton.vue";
import DownButton from "./common/DownButton.vue";
import LiveButton from "./common/LiveButton.vue";

export default {
    name: "DecastCardShimmer",
    props: ["castDetails", "index", "getCastList"],
    components: {
        DecastCardShimmer,
        CopyButton,
        StartButton,
        LiveButton,
        DownButton
    },
    data() {
        return {
            isLoading: false,
            isCastStart: false,
            showCastIsLive: false,
            shortURL: '',
            casts: [],
            remainingTime: [],
        }
    },
    mounted() {
        this.showURL(this.castDetails.public_meeting_id, this.castDetails.h_ap);
    },
    methods: {
        openModal() {
            this.$emit('openModal', this.castDetails);
        },
        copy(id, pass) {
            if (pass === undefined) {
                navigator.clipboard.writeText('https://decast.live/live/' + id);
                return;
            }
            navigator.clipboard.writeText(
                'https://decast.live/c/' + id + '/?pass=' + pass
            );
        },
        showURL(id, pass) {
            if (pass === undefined) {
                this.shortURL = `https://decast.live/live/` + id;
            } else {
                this.shortURL = `https://decast.live/c/` + id + '/?pass=' + pass;
            }
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },
        async joinNow(id) {
            const data = {
                email: '',
                name: '',
                password: '',
                public_meeting_id: id,
                redirect: true,
                room_type: 'private',
                avatar_url: '',
                guest: false,
                attendee_password: '',
                meetingId: '',
            };
            try {
                const res = await this.$store.dispatch('cast/joinNow', data);
                this.isCastStart = true;
                chrome.runtime.sendMessage({ action: 'updateBadge', badgeType: 'cast' });
                // window.open(res.url, '_blank');
                window.open(res.url, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
            } catch (e) {
                console.log('error', e);
            }
        },
    }
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.cast_list {
    border: 1px solid #fff;
}

.cast_list:hover {
    border: 1px solid #D7DF23;
}

.basic_live_dot_ {
    background-color: red !important;
    height: 12px;
    width: 12px;
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

.shortURL {
    color: #a6a6a6;
}

.cast_list {
    border-top: 1px solid white;
    border-left: 1px solid white;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    box-shadow: 3px 3px 0px 0px #a6a6a6;
}

.cast_list:hover {
    border-top: 1px solid #d7df23;
    border-left: 1px solid #d7df23;
    border-right: 2px solid #d7df23;
    border-bottom: 2px solid #d7df23;
    box-shadow: 3px 3px 0px 0px #d7df23;
}
</style>