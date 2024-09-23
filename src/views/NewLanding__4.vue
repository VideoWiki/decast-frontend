<template>
    <div class="parent_landing">
        <Navbar />
        <section class="flex flex-col justify-center items-center pt-32">
            <div class="flex align-center justify-center md:px-16 px-4 w-full max-w-5xl">
                <div class="flex flex-col align-center justify-center gap-8">
                    <div class="op-1 flex flex-col align-center">
                        <h1 id="head-id" class="sm:text-3xl xl:text-7xl text-5xl font-extrabold text-white text-center">
                            Decentralized Live
                        </h1>
                        <h1 id="head-id" class="sm:text-3xl xl:text-7xl text-5xl font-extrabold text-white text-center">
                            <span class="text-primary">Casting</span> & <span class="text-primary">Storage</span>
                        </h1>
                    </div>
                    <div class="op-2">
                        <p class="text-2xl text-white opacity-75 flex justify-center text-center">
                            Groundbreaking technology converges with the<br class="xl:block hidden" />
                            future of live content creation!
                        </p>
                    </div>
                    <div class="op-3 flex justify-center">
                        <button class="hm-action-btn-1 mr-4 text-xl" @click="handleButtonClick">decast.Start()
                        </button>
                        <button class="hm-action-btn-2 text-xl" @click="handleButtonClick">decast.Subscribe()
                        </button>
                    </div>
                </div>
            </div>
            <section class="flex flex-col justify-center items-center">
                <div class="logos md:px-16 px-4 pt-32 w-full max-w-5xl opacity-50">
                    <div class="logos-slide">
                        <img src="@/assets/images/partners/sia.png" />
                        <img src="@/assets/images/partners/swarm.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/ocean.png" />
                        <img src="@/assets/images/partners/videowiki.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                        <img src="@/assets/images/partners/gala.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />

                    </div>
                    <div class="logos-slide">
                        <img src="@/assets/images/partners/sia.png" />
                        <img src="@/assets/images/partners/swarm.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/ocean.png" />
                        <img src="@/assets/images/partners/videowiki.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                        <img src="@/assets/images/partners/gala.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                    </div>
                    <div class="logos-slide">
                        <img src="@/assets/images/partners/sia.png" />
                        <img src="@/assets/images/partners/swarm.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/ocean.png" />
                        <img src="@/assets/images/partners/videowiki.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                        <img src="@/assets/images/partners/gala.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                    </div>
                </div>
            </section>
        </section>

        <section class="flex justify-center items-center py-16 relative w-full">
            <div class="flex flex-col items-center justify-center py-6 w-full max-w-5xl relative md:px-16 px-4">

                <div class="h-4 flex justify-between flex-no-wrap relative opacity-75 mb-2 w-full">
                    <div class="bg-white h-full w-full mr-2"></div>
                    <div class="mr-2 bg-primary h-full w-4"></div>
                    <div class="bg-primary w-4 h-full"></div>
                </div>

                <div id="what-is-decast"
                    class="box-wrapper grid grid-flow-col grid-cols-12 justify-between items-center py-16 px-20 gap-8 overflow-hidden relative">
                    <div class="w-full flex flex-col items-start gap-6 justify-start col-span-6">
                        <p class="text-primary text-base font-normal">// What is Decast?</p>
                        <h4 class="text-white text-5xl font-bold">A Decentralized Video Infrastructure...</h4>
                        <p class="text-lg font-normal text-white opacity-75">
                            Decast is a revolutionary decentralized live casting platform that empowers creators
                            and viewers with an open, distributed network.
                            <br /><br />
                            We offer seamless video infrastructure and decentralized storage without relying on
                            centralized
                            servers, ensuring greater security, privacy, and autonomy.
                        </p>
                    </div>
                    <div
                        class="col-span-6 flex justify-end items-center relative h-full w-full opacity-100 transition-all z-10">
                        <img class="flex justify-center items-center w-fit object-contain" style="height: 28rem;"
                            src="@/assets/images/homepage/what.svg" />
                    </div>

                    <div class="flex justify-center items-center h-full w-full absolute">
                        <img class="flex justify-center items-center w-full object-contain"
                            src="@/assets/images/homepage/bg-what.png" />
                    </div>
                </div>
            </div>
        </section>

        <section class="flex justify-center items-center py-32 relative w-full" id="features">
            <div class="flex flex-col items-center justify-center py-6 w-full max-w-5xl relative gap-8 md:px-16 px-4">
                <!-- First Row -->
                <div class="grid grid-cols-12 grid-flow-row items-center justify-center relative w-full gap-8">

                    <div
                        class="h-full w-full col-span-8 p-16 flex justify-start items-start relative border-white border-solid border-2 border-opacity-50 hover:border-opacity-100">

                        <div class="w-2/3 flex flex-col items-start gap-6 justify-start">
                            <h4 class="text-white text-3xl font-bold">//Scalable Casting</h4>
                            <p class="text-base font-normal text-white opacity-75">
                                Easily manage private and public events with password protection and full control over
                                your sessions.
                            </p>
                            <div class="grid grid-cols-2 w-full justify-start items-start gap-4 opacity-50 mt-8">

                                <span
                                    class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                                    <span class="p-2 bg-white"></span>
                                    Cheap and Reliable
                                </span>

                                <span
                                    class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                                    <span class="p-2 bg-white"></span>
                                    Customizable
                                </span>

                                <span
                                    class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                                    <span class="p-2 bg-white"></span>
                                    Ownership and Access
                                </span>

                                <span
                                    class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                                    <span class="p-2 bg-white"></span>
                                    Community Engagements
                                </span>

                            </div>
                        </div>


                        <div
                            class="flex justify-end items-end h-full w-full opacity-100 transition-all absolute bottom-0 right-0">
                            <img class="flex justify-center items-center w-fit object-contain"
                                src="@/assets/images/homepage/scale.png" />
                        </div>


                    </div>
                    <div
                        class="h-full w-full col-span-4 justify-center items-center relative border-white border-solid border-2 border-opacity-50 hover:border-opacity-100 overflow-hidden">

                        <div class="w-full flex flex-col items-center gap-6 justify-start pt-16 px-8">
                            <h4 class="text-white text-3xl font-bold text-center">//Private Rooms</h4>
                            <p class="text-base font-normal text-white opacity-75 text-center">
                                Secure, dedicated spaces for meetings, one-on-one chats or
                                small group collaborations.
                            </p>
                        </div>

                        <div
                            class="flex justify-center items-start h-full w-full opacity-100 transition-all relative -mt-4">
                            <img class="flex justify-center items-center h-fit object-cover"
                                src="@/assets/images/homepage/private.png" />
                        </div>

                    </div>

                    <div
                        class="h-full w-full col-span-5 justify-center items-center relative border-white border-solid border-2 border-opacity-50 hover:border-opacity-100 overflow-hidden">

                        <div class="w-full flex flex-col items-start gap-6 justify-start pt-16 px-16">
                            <h4 class="text-white text-3xl font-bold text-left">//Secure Storage</h4>
                            <p class="text-base font-normal text-white opacity-75 text-left">
                                Safeguard your recordings with decentralized, tamper-proof storage on platforms like
                                Sia, Swarm or other decentralized storages.
                            </p>

                        </div>

                        <div
                            class="flex justify-center items-start h-full w-full opacity-100 transition-all relative -mt-4">
                            <img class="flex justify-center items-center h-fit object-cover"
                                src="@/assets/images/homepage/storage.png" />
                        </div>

                    </div>

                    <div
                        class="h-full w-full col-span-7 p-16 flex justify-start items-start relative border-white border-solid border-2 border-opacity-50 hover:border-opacity-100">

                        <div class="w-2/3 flex flex-col items-start gap-6 justify-start">
                            <h4 class="text-white text-3xl font-bold">//Enhanced Security</h4>
                            <p class="text-base font-normal text-white opacity-75">
                                Ensure exclusivity with NFT gating and ticket protection, allowing only verified
                                participants to join.
                            </p>
                            <div class="grid grid-cols-1 w-full justify-start items-start gap-4 opacity-50 mt-8">

                                <span
                                    class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                                    <span class="p-2 bg-white"></span>
                                    Event Pages
                                </span>

                                <span
                                    class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                                    <span class="p-2 bg-white"></span>
                                    Decentralized Marketplace
                                </span>
                            </div>
                        </div>

                        <div
                            class="flex justify-end items-end h-full w-full opacity-100 transition-all absolute bottom-0 right-0">
                            <img class="flex justify-center items-center w-fit object-contain"
                                src="@/assets/images/homepage/security.png" />
                        </div>

                    </div>

                </div>

            </div>
        </section>


        <section class="max-w-5xl w-full md:px-16 px-4 gap-32 flex flex-col justify-center items-center mx-auto py-16">

            <div class="grid grid-cols-2 grid-flow-row justify-center items-start w-full h-full gap-16">

                <div class="col-span-1 w-full flex flex-col items-start gap-4 justify-start">
                    <p class="text-primary text-base">//Virtual Events</p>
                    <h4 class="text-4xl font-extrabold text-white">Effortless Event Creation
                    </h4>
                    <p class="font-semibold text-lg text-white opacity-75 w-2/3">Create and manage events while
                        streamlining
                        the process and saving time.</p>

                    <div class="grid grid-cols-2 w-full justify-start items-start gap-4 opacity-50 mt-8">

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            Multi-Platform Streaming
                        </span>

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            NFT Airdrops and Rewards
                        </span>

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            AI-Powered Post Editing
                        </span>

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            Custom Branding
                        </span>

                    </div>
                </div>

                <div class="col-span-1 w-full flex flex-col gap-4 border-white border-2 border-solid border-opacity-50">
                    <div class="w-full">
                        <img class="w-full h-full object-contain" src="@/assets/images/homepage/events.png" />
                    </div>
                </div>

            </div>

            <div class="grid grid-cols-2 justify-center items-start w-full h-full grid-flow-row gap-16">

                <div class="col-span-1 w-full flex flex-col items-start gap-4 justify-start order-2">
                    <p class="text-primary text-base">//Decentralized Organizations</p>
                    <h4 class="text-4xl font-extrabold text-white">Secure Collaborations & Records
                    </h4>
                    <p class="font-semibold text-lg text-white opacity-75 w-full">Optimize your collaborative
                        workflow with fully personalised rooms with advanced analytics</p>

                    <div class="grid grid-cols-2 w-full justify-start items-start gap-4 opacity-50 mt-8">

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            Meeting Analytics
                        </span>

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            Recording Version Control
                        </span>

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            Access Control
                        </span>

                        <span class="flex gap-4 justify-start items-center text-white text-lg font-semibold col-span-1">
                            <span class="p-2 bg-white"></span>
                            Advanced In-meeting Tools
                        </span>

                    </div>
                </div>

                <div class="col-span-1 w-full flex flex-col gap-4 border-white border-2 border-solid border-opacity-50">
                    <div class="w-full">
                        <img class="w-full h-full object-contain" src="@/assets/images/homepage/records.png" />
                    </div>
                </div>

            </div>
        </section>


        <h1 class="text-center w-full text-green-400 py-16">/* Decast Tools */</h1>


        <div
            class="max-w-5xl w-full md:px-16 px-4 gap-8 py-16 grid grid-cols-2 grid-flow-col justify-center items-center mx-auto">

            <div
                class="col-span-1 w-full border-white border-solid border-2 border-opacity-50 p-8 flex flex-col justify-start items-start gap-4">
                <p class="text-primary">//Web Extension</p>
                <h2 class="text-4xl text-white">
                    Decast Web Extension:</br> Seamless Across Platforms.
                </h2>
                <p class="text-medium text-white">
                    Streamline your access to meetings and events directly from your browser—no need to visit
                    the Decast website.
                </p>
                <div class="flex flex-row gap-4 mt-4">
                    <button
                        class="w-fit flex justify-center items-center font-medium px-4 py-2 bg-primary text-black border-none cursor-pointer"
                        @click="handleButtonClickChrome">chrome.download()
                    </button>
                    <button
                        class="w-fit flex justify-center items-center font-medium px-4 py-2 bg-white text-black border-none cursor-pointer"
                        @click="handleButtonClickFirefox">firefox.download()
                    </button>
                </div>

                <div class="flex justify-center items-center h-full w-full relative mt-8">
                    <img class="flex justify-center items-center w-full object-contain border-white border-2 border-solid border-opacity-50"
                        src="@/assets/images/homepage/extension.png" />
                </div>
            </div>

            <div
                class="col-span-1 w-full border-white border-solid border-2 border-opacity-50 p-8 flex flex-col justify-start items-start gap-4">
                <p class="text-primary">//Node Provider</p>
                <h2 class="text-4xl text-white">
                    Decast Node Provider:</br> Earn by Hosting Events.
                </h2>
                <p class="text-medium text-white">
                    Earn tokens and rewards by hosting large scale event on our decentralized dcast network. Become a
                    node provider today!
                </p>
                <div class="flex flex-row gap-4 mt-4">
                    <button
                        class="w-fit flex justify-center items-center font-medium px-4 py-2 bg-primary text-black border-none pointer-events-none opacity-25">node.download()
                    </button>
                    <button
                        class="w-fit flex justify-center items-center font-medium px-4 py-2 bg-white text-black border-none"
                        @click="handleButtonClick">waitList.join()
                    </button>
                </div>
                <div class="flex justify-center items-center h-full w-full relative mt-8">
                    <img class="flex justify-center items-center w-full object-contain border-white border-2 border-solid border-opacity-50"
                        src="@/assets/images/homepage/node.png" />
                </div>
            </div>

        </div>

        <section>
            <div class="container px-16 py-6 w-full max-w-5xl flex flex-col">
                <h1 class="text-center text-white py-16">/* FAQs */</h1>
                <div class="faq-container">
                    <div v-for="(quesObj, index) in faqQuestions" :key="index">
                        <FaqBox :quesObj="quesObj" :index="index" />
                    </div>
                </div>
            </div>
        </section>

        <!-- <div class="basic_folder_cont__ py-16">
            <div class="max-w-4xl w-full flex flex-col gap-16 justify-start items-center m-auto py-24">
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
        </div> -->
        <FooterNew />
    </div>
</template>

<script>
import FooterNew from './FooterNew.vue';
import Navbar from './NavbarNew.vue';
import axios from '../axios';
import constants from '../../constant';
import FaqBox from './components/homepage/FaqBox.vue';
// import HomePageSlider from './HomePageSlider.vue';

export default {
    name: 'New Landing',
    components: {
        Navbar,
        FooterNew,
        FaqBox,
        // HomePageSlider,
    },
    data() {
        return {
            formData: {
                email: '',
            },
            faqQuestions: [
                {
                    ques: "Is there a free trial available?",
                    answer: "Yes, our core services are free to use. However, decentralized storage options like Sia and Swarm may incur additional costs.",
                },
                {
                    ques: "How secure are my meetings and events on Decast?",
                    answer: "Decast prioritizes your security with features like private rooms, password-protected events, and NFT gating to ensure only authorized participants can access your sessions.",
                },
                {
                    ques: "Can I reschedule or edit Cast details later?",
                    answer: "Yes, you can easily reschedule or edit details of any Cast through your event management dashboard.",
                },
                {
                    ques: "Can I access the recordings of my Cast or room sessions?",
                    answer: "Yes, all recordings are securely stored on Decast and decentralized platforms depending upon your event, ensuring they are tamper-proof and available for future access. There are many exciting options available in recordings as well.",
                },
                {
                    ques: "What customization options are available for my events?",
                    answer: "You can fully brand your events with custom logos, colors, NFT Airdrops and unique meeting URLs ensuring a personalized and professional experience.",
                }
            ]
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
        handleButtonClickChrome(){
            window.open('https://chromewebstore.google.com/detail/decast/nldgpgdgbbhhndfibcmeccbeialcldcc','_blank');
        },
        handleButtonClickFirefox(){
            window.open('https://addons.mozilla.org/en-US/firefox/addon/decast/','_blank');
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

.logos {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}

.logos:before,
.logos:after {
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    content: '';
    /* z-index: 1; */
}

.logos:before {
    left: 0;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
    /* Set the fixed width of the gradient */
    background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    /* Dark to transparent gradient */
    z-index: 1;
}

.logos:after {
    right: 0;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
    /* Set the fixed width of the gradient */
    background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    /* Black to transparent gradient */
    z-index: 1;
}

.logos:hover .logos-slide {
    animation-play-state: paused;
    animation-play-state: paused;
}

.box-border {
    border: 1px solid #636363;
}

.cont-left {
    border: 1px solid #636363;
}

.cont-right {
    border: 1px solid #636363;
}

.hp-main {
    height: calc(100vh - 84px);
}

.bg-gradient {
    background-image: url('../assets/images/homepage/homepage-gradient.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

@keyframes logos {
    from {
        transform: translateX(0);
    }

    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}

@keyframes logos2 {
    from {
        transform: translateX(-100%);
    }

    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}

.logos-slide {
    display: inline-block;
    animation: 30s logos infinite linear;
    margin: auto;
}

.logos-slide img {
    margin: auto 40px;
    height: 50px !important;
    width: auto;
    object-fit: contain;
}

.logos-slide2 {
    display: inline-block;
    animation: 20s logos2 infinite linear;
    margin: auto;
}

.logos-slide2 img {
    margin: auto 40px;
    height: 40px !important;
    width: auto;
    object-fit: contain;
}

.parent_landing {
    /* background-image: linear-gradient(180deg, #000, #111); */
    background-color: #000000
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

.hm-action-btn-1 {
    border: none;
    outline: none;
    color: #000000;
    background-color: #D7DF23;
    padding: 8px 10px;
    font-weight: 600;
    cursor: pointer;
}

.hm-action-btn-2 {
    border: none;
    outline: none;
    color: #000000;
    background-color: #FFFFFF;
    padding: 8px 10px;
    font-weight: 600;
    cursor: pointer;
}

.box-header {
    height: 16px;
    width: 100%;
    display: flex;
}

.grad-1 {
    height: 20px;
    width: 100%;
    background-color: #7C7C7C;
}

.grad-2 {
    height: 20px;
    width: 34px;
    background-color: #7C7C7C;
}

.box-wrapper {
    border: 1px solid #FFFFFF;
    margin-top: 12px;
    -webkit-box-shadow: 10px 16px 0px 0px rgba(255, 255, 255, 1) !important;
    box-shadow: 10px 16px 0px 0px rgba(255, 255, 255, 1) !important;
}

.text-color-primary {
    color: #D7DF23;
}

.feature-card {
    border: 1px solid #636363;
}
</style>