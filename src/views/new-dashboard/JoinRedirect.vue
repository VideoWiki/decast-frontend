<template>
    <div class="join-rdct">
        <h2 v-if="urlNotFound">😕 Oops! No room or cast is linked with this shortcode</h2>
    </div>
</template>

<script>
export default {
    name: 'JoinRedirect',
    components: {
    },
    data() {
        return {
            urlNotFound: false,
        };
    },
    mounted() {
        this.redirectUrl();
    },
    methods: {
        async redirectUrl() {
            document.getElementById('loading-bg').style.display = 'block';
            const shortcode = this.$route.params.shortCode;
            const eventUrl = await this.fetchOriginalUrl(shortcode);
            if (eventUrl) {
                window.location.href = eventUrl;
            } else {
                // this.$router.push("/");
                this.urlNotFound = true;
                this.$vs.notify({
                    title: 'Invalid shortcode',
                    text: 'Room/Cast not found for the given shortcode',
                    color: 'danger',
                });
            }
            document.getElementById('loading-bg').style.display = 'none';
        },
        // async fetchOriginalUrl(shortcode) {
        //     try {
        //         const [castUrl, roomUrl] = await Promise.all([
        //             this.$store.dispatch('cast/getOriginalUrl', shortcode),
        //             this.$store.dispatch('room/getOriginalUrl', shortcode)
        //         ]);
        //         if (castUrl && castUrl.data && castUrl.data.original_url) {
        //             return castUrl.data.original_url;
        //         } else if (roomUrl && roomUrl.data && roomUrl.data.original_url) {
        //             return roomUrl.data.original_url;
        //         } else {
        //             throw new Error('No original URL found');
        //         }
        //     } catch (error) {
        //         throw error;
        //     }
        // }
        async fetchOriginalUrl(shortcode) {
            try {
                const urls = [
                    `https://api.room.video.wiki/api/url/retrieve/${shortcode}/`,
                    `https://api.cast.decast.live/api/url/retrieve/${shortcode}/`
                ];

                const [castResponse, roomResponse] = await Promise.all(urls.map(url => fetch(url)));

                const castUrl = await castResponse.json();
                const roomUrl = await roomResponse.json();

                if (castUrl && castUrl.original_url) {
                    return castUrl.original_url;
                } else if (roomUrl && roomUrl.original_url) {
                    return roomUrl.original_url;
                } else {
                    document.getElementById('loading-bg').style.display = 'none';
                }
            } catch (error) {
                document.getElementById('loading-bg').style.display = 'none';
                throw error;
            }
        }
    }
};
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.join-rdct {
    height: 100vh;
    width: 100vw;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.join-rdct h2 {
    color: #FFFFFF;
    margin: 0px 50px;
}
</style>