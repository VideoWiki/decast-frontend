<template>
    <div class="parent_landing">
        <Navbar />
        <section class="hp-main flex flex-col justify-center items-center">
            <div class="flex align-center justify-center px-16 py-12 w-full max-w-5xl">
                <div class="flex flex-col align-center justify-center">
                    <div class="op-1 flex flex-col align-center">
                        <h1 id="head-id" class="sm:text-3xl xl:text-6xl text-5xl font-extrabold text-white text-center">
                            Decentralized Live
                        </h1>
                        <h1 id="head-id" class="sm:text-3xl xl:text-6xl text-5xl font-extrabold text-white text-center">
                            Casting and Storage
                        </h1>
                    </div>
                    <div class="op-2 mt-8">
                        <p class="text-xl text-white opacity-75 flex justify-center text-center">
                            Groundbreaking technology converges with the<br class="xl:block hidden" />
                            future of live content creation!
                        </p>
                    </div>
                    <div class="op-3 mt-8 flex justify-center">
                        <button class="hm-action-btn-1 mr-4" @click="handleButtonClick">decast.Start()
                        </button>
                        <button class="hm-action-btn-2" @click="handleButtonClick">decast.Subscribe()
                        </button>
                    </div>
                </div>
            </div>
            <section class="flex flex-col justify-center items-center">
                <div class="logos px-16 py-12 w-full max-w-5xl">
                    <div class="logos-slide">
                        <img src="@/assets/images/partners/tedx.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/deep.png" />
                        <img src="@/assets/images/partners/treejer.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                    </div>
                    <div class="logos-slide">
                        <img src="@/assets/images/partners/tedx.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/deep.png" />
                        <img src="@/assets/images/partners/treejer.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                    </div>
                    <div class="logos-slide">
                        <img src="@/assets/images/partners/videowiki.png" />
                        <img src="@/assets/images/partners/tedx.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/deep.png" />
                        <img src="@/assets/images/partners/treejer.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                    </div>
                </div>
                <div class="logos px-16 pb-12 w-full max-w-5xl">
                    <div class="logos-slide2">
                        <img src="@/assets/images/partners/tedx.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/deep.png" />
                        <img src="@/assets/images/partners/treejer.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                    </div>
                    <div class="logos-slide2">
                        <img src="@/assets/images/partners/tedx.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/deep.png" />
                        <img src="@/assets/images/partners/treejer.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                    </div>
                    <div class="logos-slide2">
                        <img src="@/assets/images/partners/videowiki.png" />
                        <img src="@/assets/images/partners/tedx.png" />
                        <img src="@/assets/images/partners/startup portugal.png" />
                        <img src="@/assets/images/partners/pci.png" />
                        <img src="@/assets/images/partners/africa.png" />
                        <img src="@/assets/images/partners/deep.png" />
                        <img src="@/assets/images/partners/treejer.png" />
                        <img src="@/assets/images/partners/getboarded.png" />
                    </div>
                </div>
            </section>
        </section>

        <section class="flex justify-center">
            <div class="flex flex-col align-center justify-center px-16 py-6 w-full max-w-5xl">
                <div class="box-header">
                    <div class="grad-1 mr-2"></div>
                    <div class="grad-2 mr-2"></div>
                    <div class="grad-2"></div>
                </div>
                <div class="box-wrapper flex justify-between p-16">
                    <div class="lg:w-3/5 w-full flex flex-col items-start gap-4 justify-start">
                        <p class="text-color-primary">// What is Decast?</p>
                        <div class="box-border p-2">
                            <p class="text-medium text-white">
                                Decast revolutionizes your virtual events and communications with a secure, customizable
                                platform. Whether hosting private meetings or large broadcasts, you’ll enjoy features
                                like
                                private rooms, NFT gating for enhanced security, and effortless event creation. With
                                multi-platform streaming and innovative engagement tools, Decast connects you with your
                                audience in exciting ways. Elevate your online interactions and experience the future
                                with
                                Decast, where every event becomes exceptional.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src="@/assets/images/homepage/peertopeer.svg" />
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container px-16 py-6 w-full max-w-5xl">
                <!-- First Row -->
                <div class="flex flex-wrap -mx-2">
                    <!-- 1st card - 60% width of the 2nd -->
                    <div class="w-full md:w-3/5 px-2 mb-4">
                        <div class="feature-card shadow-md p-6 flex align-center justify-center">
                            <div class="h-48 w-3/5 bg-slate-50"></div>
                            <div class="h-48 w-2/5 bg-slate-400"></div>
                        </div>
                    </div>
                    <!-- 2nd card - 40% width -->
                    <div class="w-full md:w-2/5 px-2 mb-4">
                        <div class="feature-card shadow-md p-6 flex flex-col align-center justify-center">
                            <div class="h-24 w-full bg-slate-50"></div>
                            <div class="h-24 w-full bg-slate-400"></div>
                        </div>
                    </div>
                </div>

                <!-- Second Row -->
                <div class="flex flex-wrap -mx-2">
                    <!-- 1st card - 50% width -->
                    <div class="w-full md:w-1/2 px-2 mb-4">
                        <div class="feature-card shadow-md p-6 flex flex-col align-center justify-center">
                            <div class="h-24 w-3/6 bg-slate-50"></div>
                            <div class="h-24 w-3/6 bg-slate-400"></div>
                        </div>
                    </div>
                    <!-- 2nd card - 50% width -->
                    <div class="w-full md:w-1/2 px-2 mb-4">
                        <div class="feature-card shadow-md p-6 flex flex-col align-center justify-center">
                            <div class="h-24 w-3/6 bg-slate-50"></div>
                            <div class="h-24 w-3/6 bg-slate-400"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16">
            <div
                class="max-w-5xl w-full md:px-16 px-4 lg:gap-2 gap-16 flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start mx-auto">
                <div class="basic_future_2 lg:w-1/3 w-full flex flex-col items-start gap-4 justify-start">
                    <p class="text-color-primary">//Fast - Efficient - Decentralized</p>
                    <p class="text-4xl font-extrabold text-white">Peer-to-Peer (P2P) <br /> Torrent Technology </p>
                    <p class="font-semibold text-lg text-white">In a P2P torrent network, each peer can upload and
                        download data simultaneously.</p>
                    <p class="flex gap-4 justify-start items-center text-white text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Distribution of Data </p>
                    <p class="flex gap-4 justify-start items-center text-white text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Decentralized Network</p>
                    <p class="flex gap-4 justify-start items-center text-white text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Piece-by-Piece Download</p>
                </div>

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
            </div>

            <div
                class="max-w-5xl w-full md:px-16 px-4 lg:gap-2 gap-16 flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start mx-auto">
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
                    <p class="text-color-primary">//Fast - Efficient - Decentralized</p>
                    <p class="text-4xl font-extrabold text-white">Peer-to-Peer (P2P) <br /> Torrent Technology </p>
                    <p class="font-semibold text-lg text-white">In a P2P torrent network, each peer can upload and
                        download data simultaneously.</p>
                    <p class="flex gap-4 justify-start items-center text-white text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Distribution of Data </p>
                    <p class="flex gap-4 justify-start items-center text-white text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Decentralized Network</p>
                    <p class="flex gap-4 justify-start items-center text-white text-lg font-semibold"><span><img
                                src="@/assets/images/sett.svg" />
                        </span>Piece-by-Piece Download</p>
                </div>
            </div>
        </section>

        <section>
            <div class="container flex px-16 py-6 w-full max-w-5xl">
                <div class="flex-1 mr-8 cont-left p-8">
                    <p class="text-color-primary">// What is Decast?</p>
                    <div class="p-2">
                        <h2 class="leading-tight text-4xl text-white">
                            Decast Web Extension:</br> Seamless Access Across Platforms.
                        </h2>
                        <p class="text-medium text-white py-4">
                            Streamline your access to meetings and events directly from your browser—no need to visit
                            the Decast website.
                        </p>
                        <div class="op-3 mt-6 flex">
                            <button class="hm-action-btn-1 w-1/3 mr-4" @click="handleButtonClick">chrome.download()
                            </button>
                            <button class="hm-action-btn-2 w-1/3" @click="handleButtonClick">firefox.download()
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex-1 cont-right">
                    //Similar box as on left
                </div>
            </div>
        </section>

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
                    ques: "What payment methods do you accept?",
                    answer: "We have integrations with Stripe to accept all major credit and debit cards. We accept bank transfers for annual subscriptions and custom contracts. Connect with our consultants for a customized talent management quote.",
                },
                {
                    ques: "What payment methods do you accept?",
                    answer: "We have integrations with Stripe to accept all major credit and debit cards. We accept bank transfers for annual subscriptions and custom contracts. Connect with our consultants for a customized talent management quote.",
                },
                {
                    ques: "What payment methods do you accept?",
                    answer: "We have integrations with Stripe to accept all major credit and debit cards. We accept bank transfers for annual subscriptions and custom contracts. Connect with our consultants for a customized talent management quote.",
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
    -webkit-box-shadow: 3px 3px 0px 0px #FFFFFF !important;
    box-shadow: 3px 3px 0px 0px #FFFFFF !important;
}

.text-color-primary {
    color: #D7DF23;
}

.feature-card {
    border: 1px solid #636363;
}
</style>