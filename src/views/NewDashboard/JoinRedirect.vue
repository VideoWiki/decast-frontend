<template></template>
  
<script>
export default {
    name: 'JoinRedirect',
    components: {
    },
    data() {
        return {
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
                this.$router.push("/");
            }
            document.getElementById('loading-bg').style.display = 'none';
        },
        async fetchOriginalUrl(shortcode) {
            try {
                const [castUrl, roomUrl] = await Promise.all([
                    this.$store.dispatch('cast/getOriginalUrl', shortcode),
                    this.$store.dispatch('room/getOriginalUrl', shortcode)
                ]);
                if (castUrl && castUrl.data && castUrl.data.original_url) {
                    return castUrl.data.original_url;
                } else if (roomUrl && roomUrl.data && roomUrl.data.original_url) {
                    return roomUrl.data.original_url;
                } else {
                    throw new Error('No original URL found');
                }
            } catch (error) {
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
</style>
  