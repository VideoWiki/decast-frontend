<template>
    <div class="bg-white footer-container w-full">
        <div
            class="max-w-5xl w-full md:px-16 px-4 lg:py-16 py-10 lg:gap-8 gap-16  flex lg:flex-row flex-col lg:justify-between justify-start items-start mx-auto">
            <!-- first section -->
            <div class="lg:w-3/5 w-full flex flex-col gap-6 text-left items-start">
                <div class="flex items-center gap-2">
                    <svg width="50" height="50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="border-2 border-solid border-dark-black">
                        <path d="M200 0H0V200H200V0Z" fill="white" />
                        <path
                            d="M109.143 127.428V118.285V109.142V99.999H90.8574V109.142V118.285V127.428V136.57V145.713H109.143V136.57V127.428Z"
                            fill="black" />
                        <path
                            d="M118.286 164H127.429H136.572H145.715V145.714H136.572H127.429H118.286H109.144V164H118.286Z"
                            fill="black" />
                        <path
                            d="M127.429 100H136.572H145.715V81.7144H136.572H127.429H118.286H109.144V100H118.286H127.429Z"
                            fill="black" />
                        <path
                            d="M90.8574 54.2861V63.429V72.5718V81.7147V90.8575V100H109.143V90.8575V81.7147V72.5718V63.429V54.2861H90.8574Z"
                            fill="black" />
                        <path
                            d="M72.5718 100H63.429H54.2861V118.286H63.429H72.5718H81.7147H90.8575V100H81.7147H72.5718Z"
                            fill="black" />
                        <path d="M81.7147 36H72.5718H63.429H54.2861V54.2857H63.429H72.5718H81.7147H90.8575V36H81.7147Z"
                            fill="black" />
                    </svg>
                    <h1 class="font-bold">Decast.live</h1>
                </div>
                <p class="text-black-main">/* Groundbreaking technology converges with <br /> the future of live content
                    creation! */</p>
                <div class="flex justify-start items-center gap-6">
                    <span @click="commingSoon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.5 12C2.5 7.522 2.5 5.282 3.891 3.891C5.282 2.5 7.521 2.5 12 2.5C16.478 2.5 18.718 2.5 20.109 3.891C21.5 5.282 21.5 7.521 21.5 12C21.5 16.478 21.5 18.718 20.109 20.109C18.718 21.5 16.479 21.5 12 21.5C7.522 21.5 5.282 21.5 3.891 20.109C2.5 18.718 2.5 16.479 2.5 12Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M17.508 6.5H17.498M16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5C10.8065 16.5 9.66193 16.0259 8.81802 15.182C7.97411 14.3381 7.5 13.1935 7.5 12C7.5 10.8065 7.97411 9.66193 8.81802 8.81802C9.66193 7.97411 10.8065 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span @click="reTweet">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 21L10.548 13.452M10.548 13.452L3 3H8L13.452 10.548M10.548 13.452L16 21H21L13.452 10.548M21 3L13.452 10.548"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span @click="commingSoon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13 9.25V3.75C13 3.28587 13.1844 2.84075 13.5126 2.51256C13.8408 2.18437 14.2859 2 14.75 2C15.2141 2 15.6592 2.18437 15.9874 2.51256C16.3156 2.84075 16.5 3.28587 16.5 3.75V9.25C16.5 9.71413 16.3156 10.1592 15.9874 10.4874C15.6592 10.8156 15.2141 11 14.75 11C14.2859 11 13.8408 10.8156 13.5126 10.4874C13.1844 10.1592 13 9.71413 13 9.25ZM7.5 20.25V14.75C7.5 14.2859 7.68437 13.8408 8.01256 13.5126C8.34075 13.1844 8.78587 13 9.25 13C9.71413 13 10.1592 13.1844 10.4874 13.5126C10.8156 13.8408 11 14.2859 11 14.75V20.25C11 20.7141 10.8156 21.1592 10.4874 21.4874C10.1592 21.8156 9.71413 22 9.25 22C8.78587 22 8.34075 21.8156 8.01256 21.4874C7.68437 21.1592 7.5 20.7141 7.5 20.25ZM14.75 13H20.25C20.7141 13 21.1592 13.1844 21.4874 13.5126C21.8156 13.8408 22 14.2859 22 14.75C22 15.2141 21.8156 15.6592 21.4874 15.9874C21.1592 16.3156 20.7141 16.5 20.25 16.5H14.75C14.2859 16.5 13.8408 16.3156 13.5126 15.9874C13.1844 15.6592 13 15.2141 13 14.75C13 14.2859 13.1844 13.8408 13.5126 13.5126C13.8408 13.1844 14.2859 13 14.75 13ZM3.75 7.5H9.25C9.71413 7.5 10.1592 7.68437 10.4874 8.01256C10.8156 8.34075 11 8.78587 11 9.25C11 9.71413 10.8156 10.1592 10.4874 10.4874C10.1592 10.8156 9.71413 11 9.25 11H3.75C3.28587 11 2.84075 10.8156 2.51256 10.4874C2.18437 10.1592 2 9.71413 2 9.25C2 8.78587 2.18437 8.34075 2.51256 8.01256C2.84075 7.68437 3.28587 7.5 3.75 7.5ZM7 3.75C7 4.716 7.784 5.5 8.75 5.5H10.5V3.75C10.5 3.28587 10.3156 2.84075 9.98744 2.51256C9.65925 2.18437 9.21413 2 8.75 2C8.28587 2 7.84075 2.18437 7.51256 2.51256C7.18437 2.84075 7 3.28587 7 3.75ZM17 20.25C17 19.7859 16.8156 19.3408 16.4874 19.0126C16.1592 18.6844 15.7141 18.5 15.25 18.5H13.5V20.25C13.5 20.7141 13.6844 21.1592 14.0126 21.4874C14.3408 21.8156 14.7859 22 15.25 22C15.7141 22 16.1592 21.8156 16.4874 21.4874C16.8156 21.1592 17 20.7141 17 20.25ZM20.25 7C19.7859 7 19.3408 7.18437 19.0126 7.51256C18.6844 7.84075 18.5 8.28587 18.5 8.75V10.5H20.25C20.7141 10.5 21.1592 10.3156 21.4874 9.98744C21.8156 9.65925 22 9.21413 22 8.75C22 8.28587 21.8156 7.84075 21.4874 7.51256C21.1592 7.18437 20.7141 7 20.25 7ZM3.75 17C4.21413 17 4.65925 16.8156 4.98744 16.4874C5.31563 16.1592 5.5 15.7141 5.5 15.25V13.5H3.75C3.28587 13.5 2.84075 13.6844 2.51256 14.0126C2.18437 14.3408 2 14.7859 2 15.25C2 15.7141 2.18437 16.1592 2.51256 16.4874C2.84075 16.8156 3.28587 17 3.75 17Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span @click="commingSoon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 6.99999C10.889 5.66699 13.111 5.66699 17 6.99999M7 17C10.5 18.333 13.5 18.333 17 17"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M8.85711 17.625C8.85711 18.75 6.73711 21 6.19211 21C4.55911 21 3.10911 19.125 2.38311 17.625C1.65711 15.75 1.83911 11.063 4.01511 4.688C5.60111 3.546 7.19511 3.18 8.85711 3L10.0001 6M15.1431 17.625C15.1431 18.75 17.2631 21 17.8081 21C19.4411 21 20.8911 19.125 21.6171 17.625C22.3431 15.75 22.1611 11.063 19.9851 4.688C18.3991 3.546 16.8051 3.18 15.1431 3L14.0001 6M7.51011 12H7.50011M16.5001 12H16.4901"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>

                </div>
            </div>

            <!-- second section  -->
            <div class="lg:w-1/5 w-full flex flex-col gap-12">
                <div class="flex flex-col gap-2">
                    <h3 class="font-bold my-4 text-black-main">//Policy</h3>
                    <p class="text-black-main" @click="termsRedirect">>Terms & Conditions</p>
                    <p class="text-black-main" @click="redirect">>Privacy Policy</p>
                    <!-- <p class="text-black-main">>Copyright</p> -->
                    <!-- <p>>Support</p> -->
                </div>
            </div>

            <div class="lg:w-1/5 w-full flex flex-col gap-12">
                <div class="flex flex-col gap-2">
                    <h3 class="font-bold my-4 text-black-main">//Contact</h3>
                    <p class="text-black-main" @click="setActiveModal('contactUsModal')">>Contact Us</p>
                    <p class="text-black-main" @click="commingSoon">>Work With us</p>
                    <p class="text-black-main" @click="redirectToLink">>Suggestions</p>
                    <!-- <p>>Book a demo</p> -->
                </div>
            </div>

            <!-- <div class="lg:w-1/5 w-full flex flex-col gap-12">
                <div class="flex flex-col gap-2">
                    <h3 class="font-bold my-4 text-black-main">//Helpful.links</h3>
                    <p class="text-black-main" @click="$router.push('/features')">>Features</p>
                    <p class="text-black-main" @click="$router.push('/faq')">>Faqs</p>
                    <p class="text-black-main" @click="$router.push('/achievements')">>Achievements</p>
                </div>
            </div> -->
            <ContactUsModal v-if="activeModal === 'contactUsModal'" :closeModal="() => setActiveModal('')"/>
        </div>
        <div class="max-w-4xl w-full m-auto">
            <hr />
            <div class="text-lg text-center p-4 text-black-main">
                © 2024 All Rights Reserved - Getboarded Technology
            </div>
        </div>
    </div>
</template>

<script>
import ContactUsModal from './ContactUsModal.vue';

export default {
    name: "Footer",
    components: {
        ContactUsModal,
    },
    data() {
        return {
            activeModal: '',
        }
    },
    methods: {
        setActiveModal(modalName) {
            this.activeModal = modalName;
        },
        commingSoon() {
            this.$vs.notify({
                title: 'coming soon',
                text: 'Please hold tight!',
                color: 'primary',
            });
        },
        redirectToLink() {
            window.open('https://fider.video.wiki/', '_blank');
        },
        redirect() {
            this.$router.push('/privacy');
        },
        termsRedirect() {
            this.$router.push('/terms');
        },
        workRed() {
            this.$router.push('/workwithus');
        },
        reTweet() {
            window.open('https://twitter.com/VideoWiki_PT', '_blank');
        },
        reLink() {
            window.open('https://www.linkedin.com/company/videowiki.pt/', '_blank');
        },
    },
}
</script>

<style scoped>
* {
    font-family: "JetBrains Mono", monospace !important;
}

span,
p {
    cursor: pointer;
}

.text-black-main {
    color: #000000;
}
</style>