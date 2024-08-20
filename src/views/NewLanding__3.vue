<template>
    <div class="parent_landing">
        <Navbar />
        <div class="home-cont">
            <div
                class="max-w-5xl w-full md:px-16 px-4 lg:py-24 py-10 lg:gap-2 gap-16  flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start mx-auto">
                <div class="lg:w-6/12 md:w-8/12 sm:w-10/12 w-full">
                    <div class="op-1">
                        <h1 id="head-id" class="sm:text-3xl xl:text-6xl text-5xl text-left font-extrabold text-white">
                            Revolutionary Decentralized
                        </h1>
                        <h1 id="head-id" class="sm:text-3xl xl:text-6xl text-5xl text-left font-extrabold text-white">
                            Live Casting
                        </h1>
                    </div>
                    <div class="op-2 mt-6">
                        <p class="text-lg text-left text-white">
                            Groundbreaking technology converges with <br class="xl:block hidden" />the future of live
                            content creation!
                        </p>
                    </div>
                    <div class="op-3 mt-6">
                        <button
                            class="cast_start_btn_ flex justify-center items-center text-lg font-semibold gap-6 p-2 px-4 cursor-pointer bg-primary"
                            @click="handleButtonClick">/cast.enter <span class="pt-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.9678 1.49731H1.49731V17.9678H17.9678V1.49731Z" fill="white" />
                                    <path
                                        d="M8.9839 5.98927H10.4812V8.9839H13.4758V10.4812H10.4812V13.4758H8.9839V10.4812H5.98927V8.9839H8.9839V5.98927Z"
                                        fill="black" />
                                    <path d="M1.49732 0V1.49732H17.9678V0H1.49732Z" fill="black" />
                                    <path d="M19.4651 1.49732H17.9678V17.9678H19.4651V1.49732Z" fill="black" />
                                    <path d="M1.49732 17.9678V19.4651H17.9678V17.9678H1.49732Z" fill="black" />
                                    <path d="M0 17.9678H1.49732V1.49732H0V17.9678Z" fill="black" />
                                </svg>

                            </span></button>
                    </div>
                </div>

                <div class="cont-3 flex flex-col justify-start items-start lg:w-6/12 md:w-8/12 sm:w-10/12 w-full gap-4">
                    <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-12">
                        <div class="bg-black w-4 h-4"></div>
                        <div class="flex flex-row gap-2">
                            <div class="bg-black w-4 h-4"></div>
                            <div class="bg-black w-4 h-4"></div>
                        </div>
                    </div>

                    <div
                        class="basic_home_head__ flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start border-white w-full p-6">
                        <div class="lg:w-1/2 w-full lg:order-1 order-2 flex flex-col lg:justify-between justify-start p-2">
                            <p class="text-lg text-left" style="color: #22c55e">/* Welcome to
                                decast.live */</p>
                            <div class="text-white">
                                <p class="text-left text-lg mt-4">> /testNet.explore</p>
                                <p class="text-left text-lg mt-4">> /room.create</p>
                                <p class="text-left text-lg mt-4">> /event.host</p>
                            </div>
                        </div>

                        <div class="lg:w-1/2 w-full p-2 lg:order-2 order-1">
                            <span>
                                <img src="@/assets/images/homecode.svg"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="basic_future_div bg-white py-16">
            <div
                class="max-w-5xl w-full md:px-16 px-4 lg:gap-2 gap-16  flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start mx-auto">
                <div class="lg:w-2/5 w-full flex flex-col gap-4">
                    <div class="bg-new-black w-full flex flex-row justify-between items-center px-4 h-12">
                        <div class="bg-primary w-4 h-4"></div>
                        <div class="flex flex-row gap-2">
                            <div class="bg-primary w-4 h-4"></div>
                            <div class="bg-white w-4 h-4"></div>
                        </div>
                    </div>

                    <div class="w-full">
                        <img class="w-full h-full object-contain" src="@/assets/images/calls-ss.svg" />
                    </div>
                </div>


                <div class="basic_future_2 lg:w-1/3 w-full flex flex-col items-start gap-4 justify-start">
                    <p class="text-custom-grey">//Fast - Efficient - Decentralized</p>
                    <p class="text-4xl font-extrabold text-new-black">Peer-to-Peer (P2P) <br /> Torrent Technology </p>
                    <p class="font-semibold text-lg text-new-black">In a P2P torrent network, each peer can upload and
                        download data simultaneously.</p>
                    <p class="flex gap-4 justify-start items-center text-new-black text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Distribution of Data </p>
                    <p class="flex gap-4 justify-start items-center text-new-black text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Decentralized Network</p>
                    <p class="flex gap-4 justify-start items-center text-new-black text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Piece-by-Piece Download</p>
                </div>

            </div>

            <div
                class="max-w-5xl w-full md:px-16 px-4 lg:gap-2 gap-16  flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start mx-auto">

                <div
                    class="basic_future_2 lg:w-1/3 w-full lg:order-1 order-2 flex flex-col items-start gap-4 justify-start">
                    <p class="text-custom-grey">//Content - Streaming - Casting</p>
                    <p class="text-4xl font-extrabold text-new-black">Decentralized network <br /> for Video Casting</p>
                    <p class="font-semibold text-lg text-new-black">Decast essentially reverses the P2P torrent concept to
                        enable decentralized video streaming.</p>
                    <p class="flex gap-4 justify-start items-center text-new-black text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Decentralized Video Streaming</p>
                    <p class="flex gap-4 justify-start items-center text-new-black text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Distribution of Live Video </p>
                    <p class="flex gap-4 justify-start items-center text-new-black text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Dynamic Content Delivery</p>
                </div>
                <div class="lg:w-2/5 w-full flex flex-col gap-4 lg:order-2 order-1 mt-12">
                    <div class="bg-new-black w-full flex flex-row justify-between items-center px-4 h-12">
                        <div class="bg-primary w-4 h-4"></div>
                        <div class="flex flex-row gap-2">
                            <div class="bg-primary w-4 h-4"></div>
                            <div class="bg-white w-4 h-4"></div>
                        </div>
                    </div>

                    <div class="w-full">
                        <img class="w-full h-full object-contain" src="@/assets/images/calls-ss2.svg" />
                    </div>
                </div>
            </div>
        </div>

        <div class="basic_folder_cont__ py-16">
            <div class="max-w-4xl w-full flex flex-col gap-16 justify-start items-center m-auto py-24">
                <!-- <div class='mt-16 flex flex-col gap-4 items-center justify-start w-full'>
                    <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-12">
                        <div class="bg-black w-4 h-4"></div>
                        <div class="flex flex-row gap-2">
                            <div class="bg-black w-4 h-4"></div>
                            <div class="bg-black w-4 h-4"></div>
                        </div>
                    </div>

                    <div class="basic_child_folder_ w-full flex lg:flex-row flex-col justify-between gap-24 items-center p-4 lg:px-12 px-2">
                        <div class="grid-container lg:w-2/5 w-full">
                            <span class="grid-item cursor-pointer"><img src="@/assets/images/road.svg" /></span>
                            <span class="grid-item cursor-pointer"><img src="@/assets/images/docs.svg" /></span>
                            <span class="grid-item cursor-pointer"><img src="@/assets/images/token.svg" /></span>
                            <span class="grid-item cursor-pointer"><img src="@/assets/images/arch.svg" /></span>
                            <span class="grid-item cursor-pointer"><img src="@/assets/images/eco.svg" /></span>
                            <span class="grid-item cursor-pointer mt-4"><img src="@/assets/images/test.svg" /></span>
                        </div>

                        <div class="lg:w-2/5 w-full flex flex-col justify-end pb-12">
                            <div class="text-white font-bold text-4xl mt-16 pt-8">Take a deeper dive into
                                <br /> the <span class="text-primary">Decast</span> Ecosystem
                            </div>
                            <p class="text-white text-lg mt-4">Groundbreaking technology converges with <br /> the future of
                                live content creation!</p>
                        </div>
                    </div>
                </div> -->

                <div class="flex lg:flex-row flex-col items-center justify-between gap-16 w-full mt-12">
                    <div class="lg:w-2/5 w-4/5">
                        <img class="w-full object-contain" src="@/assets/images/nn.png" />
                    </div>

                    <div class="lg:w-2/5 w-4/5 flex flex-col gap-4">
                        <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-12">
                            <div class="bg-black w-4 h-4"></div>
                            <div class="flex flex-row gap-2">
                                <div class="bg-black w-4 h-4"></div>
                                <div class="bg-black w-4 h-4"></div>
                            </div>
                        </div>

                        <div class="basic_event_cont_ flex flex-col gap-4 p-8 py-16">
                            <h1 class="text-white font-bold text-4xl">Looking to host <br /> a massive event?</h1>
                            <p class="text-lg mt-4" style="color:#22c55e;">/*Groundbreaking technology converges
                                with <br /> the future of live content creation!*/</p>
                            <div class="flex justify-between items-center gap-4 mt-4">
                                <input class="outline-none border-none bg-white p-2 w-3/4 font-semibold text-lg"
                                    type="email" placeholder="//Email" v-model="formData.email" />
                                <button @click="sendMessage"
                                    class="cast_start_btn_ w-1/4 bg-primary p-2 font-semibold text-lg flex justify-between gap-4 items-center cursor-pointer">/Send
                                    <span><svg width="14" height="13" viewBox="0 0 14 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 6H1V7H0V6Z" fill="black" />
                                            <path d="M9 12H10V13H9V12Z" fill="black" />
                                            <path d="M8 11H9V12H8V11Z" fill="black" />
                                            <path d="M6 7H7V8H6V7Z" fill="black" />
                                            <path d="M7 6H8V7H7V6Z" fill="black" />
                                            <path d="M8 5H9V6H8V5Z" fill="black" />
                                            <path d="M9 4H10V5H9V4Z" fill="black" />
                                            <path d="M10 3H11V4H10V3Z" fill="black" />
                                            <path d="M11 2H12V3H11V2Z" fill="black" />
                                            <path d="M1 5V6H3V5H1Z" fill="black" />
                                            <path d="M3 8V7H1V8H3Z" fill="black" />
                                            <path d="M6 11H5V9H6V8H3V9H4V13H5V12H6V11Z" fill="black" />
                                            <path d="M8 10H7V9H6V11H8V10Z" fill="black" />
                                            <path d="M11 9H10V12H11V9Z" fill="black" />
                                            <path d="M12 6H11V9H12V6Z" fill="black" />
                                            <path d="M3 4V5H5V4H3Z" fill="black" />
                                            <path d="M5 3V4H7V3H5Z" fill="black" />
                                            <path d="M7 2V3H9V2H7Z" fill="black" />
                                            <path d="M11 2V1H9V2H11Z" fill="black" />
                                            <path d="M11 0V1H13V0H11Z" fill="black" />
                                            <path d="M14 1H13V3H14V1Z" fill="black" />
                                            <path d="M13 3H12V6H13V3Z" fill="black" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';
import axios from '../axios';
import constants from '../../constant';

export default {
    name: 'New Landing',
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            formData: {
                email: '',
            },
        };
    },
    mounted() {
        window.addEventListener('message', (event) => {
            if (event.data === 'loginSuccess') {
                console.log(this.$store.state.auth.loggedIn, 'loggedIn');
                this.$store.dispatch('auth/fetched');
                this.$acl.change('user');
                this.$store.commit('auth/SET_LOGGEDIN', true);
                this.$router.push('/dashboard');
                this.url = '';
            }
        });
    },
    methods: {
        open() {
            window.open(constants.challengeUri, '_blank', 'width=600,height=600');
            // window.addEventListener('message', this.handleMessage, false);
        },
        // handleMessage(event) {
        //     if (event.data === 'loginSuccess') {
        //         window.location.reload();
        //     }
        // },
        handleButtonClick() {
            const userInfo = localStorage.getItem('userInfo');
            const accessToken = localStorage.getItem('accessToken');
            if (userInfo && accessToken) {
                this.$router.push('/dashboard');
            } else {
                this.open();
            }
        },
        async sendMessage() {
            if (
                !this.formData.email
            ) {
                this.$vs.notify({
                    title: 'Error',
                    text: 'Basic fields are mandatory',
                    color: 'danger',
                });
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.formData.email)) {
                this.$vs.notify({
                    title: 'Error',
                    text: 'Incorrect email',
                    color: 'danger',
                });
                return;
            }
            try {
                const response = await axios.post(
                    constants.apiCastUrl + "/api/contact_us/",
                    this.formData
                );
                this.$vs.notify({
                    title: 'Successful',
                    text: 'Response recieved',
                    color: 'success',
                });
                this.resetForm();
            } catch (error) {
                this.$vs.notify({
                    title: 'Error',
                    text: 'Try again',
                    color: 'danger',
                });
                console.error('Error sending message:', error);
            }
        },
        resetForm() {
            this.formData.email = '';
        },
    },
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.parent_landing {
    background-image: linear-gradient(180deg, #000, #111);
}

.basic_home_head__ {
    border: 1px solid white;
}

.basic_home_head__ div:nth-child(1) {
    justify-content: space-between !important;
    height: 320px !important;
    /* border: 1px solid red; */
}

.cast_start_btn_ {
    border: 1px solid black;
    box-shadow: 3px 3px 0px 0px #fff;
}

.home-cont {
    background-image: url("../assets/images/white-box-up.svg");
    background-position: bottom;
    background-size: contain;
    background-repeat: no-repeat;
    padding-bottom: 10vh;
}

.basic_future_div {
    margin-top: -5px;
}

.basic_folder_cont__ {
    background-image: url("../assets/images/white-box-down.svg");
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
    margin: -2px;
}

.basic_child_folder_ {
    border: 1px solid white;
}

.grid-container {
    display: grid;
    column-gap: 25px;
    row-gap: 25px;
    grid-template-columns: repeat(3, 1fr);
}

.basic_event_cont_ {
    border: 1px solid white;
}
</style>