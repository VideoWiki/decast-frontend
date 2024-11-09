<template>
    <div class="cd-timer">
        <p v-if="isCastStarted" class="live-status">Cast is Live</p>
        <p v-else-if="remainingSeconds > 0">Cast will begin in : {{ formattedTime }}
            <br />
            <span>(You will be notified when the cast is live)</span>
        </p>
        <p v-else>Waiting for Co-Host to start the cast...</p>
    </div>
</template>

<script>
export default {
    name: 'CountDownTimer',
    props: ['castDetails'],
    data() {
        return {
            startTimeUTC: '11:00:00',
            remainingSeconds: 0,
            apiInterval: null,
            isCastStarted: false // Flag to control API calls
        };
    },
    computed: {
        formattedTime() {
            let totalSeconds = this.remainingSeconds;
            let days = Math.floor(totalSeconds / 86400); 
            let hours = Math.floor((totalSeconds % 86400) / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;
            return `${this.pad(days)}d ${this.pad(hours)}h ${this.pad(minutes)}m ${this.pad(seconds)}s`;
        }
    },
    mounted() {
        // Update remaining time every second
        this.startTimeUTC = `${this.castDetails.date}T${this.castDetails.time}Z`;
        this.callAPI();
        this.updateTime();
        this.timerInterval = setInterval(() => {
            this.updateTime();
        }, 1000);
    },
    methods: {
        pad(num) {
            return num.toString().padStart(2, '0');
        },
        convertTimeToUTCSeconds(datetime) {
            const utcDate = new Date(datetime);
            return Math.floor(utcDate.getTime() / 1000);
        },
        updateTime() {
            const currentTimeUTC = Math.floor(Date.now() / 1000);
            const startTimeUTCSeconds = this.convertTimeToUTCSeconds(this.startTimeUTC);
            this.remainingSeconds = Math.max(0, startTimeUTCSeconds - currentTimeUTC);
            if (this.remainingSeconds === 0) {
                clearInterval(this.timerInterval);
                this.apiInterval = setInterval(() => {
                    if (!this.isCastStarted) {
                        this.callAPI();
                    }
                }, 30000);
            }
        },
        callAPI() {
            // Example API call simulation (replace with your actual API call)
            // Replace 'your-api-endpoint' with your actual API endpoint
            fetch(`https://api.cast.decast.live/api/event/meeting/running/?public_meeting_id=${this.castDetails.public_meeting_id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.meeting_running === 'true') {
                        // Stop further API calls and clear the interval
                        this.isCastStarted = true;
                        this.$vs.notify({
                            title: 'Cast is Live',
                            text: 'You can now join the meeting',
                            color: 'success',
                        });
                        clearInterval(this.apiInterval);
                    }
                })
                .catch(error => {
                    console.error('Error fetching API:', error);
                });
        },
    },
    beforeDestroy() {
        // Clear intervals when component is destroyed
        clearInterval(this.timerInterval);
        clearInterval(this.apiInterval);
    }
};
</script>

<style scoped>
/* Add your component-specific styles here */
.cd-timer p {
    color: #D7DF23;
}

.cd-timer span {
    color: #868686;
}

.live-status {
    color: #EF4444;
}
</style>
