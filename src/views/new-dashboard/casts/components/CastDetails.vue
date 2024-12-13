<template>
    <div class="parent_cast_cont_">
        <div class="cast_header flex justify-between items-center w-full h-16 px-4 py-2 z-5 sticky top-0">
            <p class="text-xl font-bold">/cast.details </p>
            <p class="text-red font-bold" v-if="selectedCastId.is_running === 'true'">
                <span class="font-bold text-4xl">.</span> LIVE
            </p>
            <button class="redi_btn" v-if="selectedCastId.isNftGated" @click="goToEventPage">Event page ↗️</button>
        </div>

        <div class="flex flex-col gap-4 text-lg pt-6">
            <!-- <p>UTC Time: {{ utcTime }}</p>
            <p v-if="localTime">Local Time: {{ localTime }}</p>
            <p v-if="error">{{ error }}</p> -->

            <h1 class="text-xl font-bold" style="color: #545454 !important;">C:\{{ activeUserInfo.first_name
                }}\cast.name > <span style="color: #22C55E !important;">{{ selectedCastId.event_name }}</span></h1>
            <p class="basic_detail_cont_">>> Cast Type > <span class="text-white">{{ selectedCastId.cast_type }}</span>
            </p>
            <p class="basic_detail_cont_">>> Total Attendees > <span class="text-white">{{
                selectedCastId.invitee_list.length }}</span>
            </p>
            <p class="basic_detail_cont_">>> Scheduled Date > <span class="text-white">{{ convertedDate
                    }}</span></p>
            <p v-if="localTime" class="basic_detail_cont_">>> Scheduled Time > <span class="text-white">{{localTime }}
                Local Time</span></p>
            <p v-else class="basic_detail_cont_">>> Scheduled Time > <span class="text-white">{{ selectedCastId.event_time }}
                    UTC</span></p>
            <p class="basic_detail_cont_">>> NFT Drop > <span class="text-white">{{ selectedCastId.nft_details_submitted
                    }}</span></p>
            <p class="basic_detail_cont_">>> NFT Gating > <span class="text-white">{{ selectedCastId.isNftGated
                    }}</span>
            </p>
            <p class="basic_detail_cont_">>> Live Casting > <span class="text-white">{{ selectedCastId.is_running
                    }}</span></p>
            <p class="basic_detail_cont_">>> Recording available > <span class="text-white">{{
                selectedCastId.recording_available
            }}</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CastDetails",
    props: ['selectedCastId', 'firstCastId'],
    data() {
        return {
            utcTime: '00:00:00', // Example UTC time
            localTime: null,
            error: null,
        };
    },
    computed: {
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        },
        convertedDate() {
            const date = new Date(`${this.selectedCastId.event_date}T${this.selectedCastId.event_time}`);

            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getUTCFullYear();

            // const hours = String(date.getUTCHours()).padStart(2, '0');
            // const minutes = String(date.getUTCMinutes()).padStart(2, '0');

            const formattedDate = `${day}/${month}/${year}`;
            // const formattedTime = `${hours}:${minutes} GMT`;

            return formattedDate;
        },
    },
    watch: {
        selectedCastId: {
            handler(newVal) {
                if (newVal) {
                    this.utcTime = newVal.event_time;
                    this.convertUtcToLocalTime();
                }
            },
            deep: true,
            immediate: true
        },
        firstCastId: {
            handler(newVal) {
                if (newVal) {
                    this.selectedCastId = newVal;
                    this.utcTime = newVal.event_time;
                    this.convertUtcToLocalTime();
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        goToEventPage() {
            const url = `https://decast.live/cast/nft-gated/${this.selectedCastId.public_meeting_id}`;
            window.open(url, '_blank');
        },
        convertUtcToLocalTime() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    this.handleGeolocationSuccess,
                    this.handleGeolocationError
                );
            } else {
                this.error = 'Geolocation is not supported by this browser.';
            }
        },
        handleGeolocationSuccess(position) {
            const { latitude, longitude } = position.coords;
            const utcDate = new Date(`1970-01-01T${this.utcTime}Z`);

            fetch(`https://worldtimeapi.org/api/timezone/Etc/UTC`)
                .then((response) => response.json())
                .then((data) => {
                    const localOffset = data.utc_offset;
                    const [hours, minutes] = localOffset.split(':');
                    utcDate.setHours(utcDate.getHours() + parseInt(hours));
                    utcDate.setMinutes(utcDate.getMinutes() + parseInt(minutes));
                    this.localTime = utcDate.toLocaleTimeString();
                })
                .catch((error) => {
                    this.error = 'Failed to fetch local time zone data.';
                });
        },
        handleGeolocationError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    this.error = 'User denied the request for Geolocation.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    this.error = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    this.error = 'The request to get user location timed out.';
                    break;
                case error.UNKNOWN_ERROR:
                    this.error = 'An unknown error occurred.';
                    break;
            }
        },
    },
    mounted() {
        this.selectedCastId = this.firstCastId;
        this.utcTime = this.firstCastId.event_time;
        this.convertUtcToLocalTime();
    },
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.cast_header {
    background-color: #272727;
}

.basic_detail_cont_ {
    color: #545454;
}


.redi_btn {
    background-color: transparent;
    outline: none;
    border: none;
    color: violet;
    font-size: 16px;
    cursor: pointer;
}
</style>