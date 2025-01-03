<template>
    <div class="parent_landing">
        <Navbar />
        <section class="flex flex-col justify-start items-start pt-32">
            <div class="flex flex-col align-start justify-start md:px-16 px-4 w-full max-w-5xl">
                <div class="flex flex-col align-start justify-start gap-8">
                    <img class="w-48 h-auto" src="@/assets/images/logo/Leren Leren Logo.png" />
                    <div class="flex flex-col align-start">
                        <span class="text-lg font-semibold text-white text-left mb-4">//About</span>
                        <h1 id="head-id" class="sm:text-3xl xl:text-7xl text-5xl font-extrabold text-primary text-left">
                            Leren Leren
                        </h1>
                    </div>
                    <div class="flex flex-col gap-8 justify-start items-start">
                        <p class="text-xl text-white opacity-75 flex justify-center text-left">
                            Leren Leren, that is Dutch for 'Learning to Learn', is a word play that explains the mission
                            of company as, LEARNING TO LEARN WITH TECHNOLOGY, WHILE TECHNOLOGY LEARNS TO LEARN. It is
                            currently developing Decast.live and other ambitious products like Video.Wiki & Recap. All
                            products are experimental and in market exploration.
                        </p>

                        <ul
                            class="text-xl text-white opacity-75 flex flex-col gap-4 list-disc justify-center text-left">
                            <li>Learning to Learn i.e. the ability of life to learn; from RNA, DNA, to microorganisms,
                                to life, indicating a focus on how humans and machines learn in the new age and extend
                                this to the collective social consciousness.
                            </li>
                            <li>Learning with technologies i.e. understanding the mechanisms of human learning and
                                inventing new tools thereby to enable learning and development.
                            </li>
                            <li>Learning Technologies i.e. technologies that learn, indicating its focus on AI
                                (Artificial Intelligence), ML (Machine Learning), AGI and ASI.</li>
                        </ul>

                        <p class="text-xl text-white opacity-75 flex justify-center text-left">
                            At Leren Leren, we’re a mix of creative thinkers, technologists and digital product experts.
                            All our team are client facing. We love helping our users present themselves smartly though
                            beautifully intuitive interfaces of our website and app. We are focused on building and
                            working together with exceptional talent; be it as an external hire or internal training and
                            grooming. We want to be a closely knit team of extra-ordinary people who love what they do
                            and live for it.
                        </p>
                    </div>
                </div>

                <div
                    class="flex flex-col align-start justify-start gap-8 pt-16 pb-32 mt-16 border-white border-0 border-t-2 border-opacity-50 border-solid">
                    <div class="flex flex-col align-start">
                        <span class="text-lg font-semibold text-white text-left mb-4">//Team</span>
                    </div>
                    <div class="grid grid-flow-row grid-cols-3 flex-col gap-8 justify-start items-start">

                        <div class="flex flex-row w-full col-span-1 justify-center items-center gap-4">
                            <div
                                class="relative flex h-full w-24 border-[1px] border-solid border-white rounded-full overflow-hidden">
                                <img class="w-full h-fit" alt="chirag" src="@/assets/images/team/shivam.png"></img>
                            </div>
                            <div class="flex flex-col w-full justify-start items-start gap-2 h-full">
                                <span
                                    class="text-white font-semibold text-2xl relative flex flex-row items-center justify-center gap-2">
                                    <span class="text-xl text-white font-semibold">
                                        Shivam Dhawan
                                    </span>
                                    <a target="_blank" href="https://www.linkedin.com/in/shivamdhawan/"
                                        class="h-full w-6 flex justify-center items-center opacity-100">
                                        <img class="w-full h-auto" alt="linkedin"
                                            src="@/assets/images/logo/linkedin.svg"></img>
                                    </a>
                                </span>
                                <p class="font-light text-white text-base opacity-50">
                                    Founder | Operations
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-row w-full col-span-1 justify-center items-center gap-4">
                            <div
                                class="relative flex h-full w-24 border-[1px] border-solid border-white rounded-full overflow-hidden">
                                <img class="w-full h-fit" alt="chirag" src="@/assets/images/team/aman.png"></img>
                            </div>
                            <div class="flex flex-col w-full justify-start items-start gap-2 h-full">
                                <span
                                    class="text-white font-semibold text-2xl relative flex flex-row items-center justify-center gap-2">
                                    <span class="text-xl text-white font-semibold">
                                        Aman Bishnoi
                                    </span>
                                    <a target="_blank" href="https://www.linkedin.com/in/aman-j-bishnoi/"
                                        class="h-full w-6 flex justify-center items-center opacity-100">
                                        <img class="w-full h-auto" alt="linkedin"
                                            src="@/assets/images/logo/linkedin.svg"></img>
                                    </a>
                                </span>
                                <p class="font-light text-white text-base opacity-50">
                                    Product Manager
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-row w-full col-span-1 justify-center items-center gap-4">
                            <div
                                class="relative flex h-full w-24 border-[1px] border-solid border-white rounded-full overflow-hidden">
                                <img class="w-full h-fit" alt="chirag" src="@/assets/images/team/yasrab.png"></img>
                            </div>
                            <div class="flex flex-col w-full justify-start items-start gap-2 h-full">
                                <span
                                    class="text-white font-semibold text-2xl relative flex flex-row items-center justify-center gap-2">
                                    <span class="text-xl text-white font-semibold">
                                        Mohammed Yasrab
                                    </span>
                                    <a target="_blank" href="https://www.linkedin.com/in/mohammed-yasrab/"
                                        class="h-full w-6 flex justify-center items-center opacity-100">
                                        <img class="w-full h-auto" alt="linkedin"
                                            src="@/assets/images/logo/linkedin.svg"></img>
                                    </a>
                                </span>
                                <p class="font-light text-white text-base opacity-50">
                                    Product Developer
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-row w-full col-span-1 justify-center items-center gap-4">
                            <div
                                class="relative flex h-full w-24 border-[1px] border-solid border-white rounded-full overflow-hidden">
                                <img class="w-full h-fit" alt="chirag" src="@/assets/images/team/sushil.png"></img>
                            </div>
                            <div class="flex flex-col w-full justify-start items-start gap-2 h-full">
                                <span
                                    class="text-white font-semibold text-2xl relative flex flex-row items-center justify-center gap-2">
                                    <span class="text-xl text-white font-semibold">
                                        Sushil Gupta
                                    </span>
                                    <a target="_blank" href="https://www.linkedin.com/in/sushil-kumar-gupta/"
                                        class="h-full w-6 flex justify-center items-center opacity-100">
                                        <img class="w-full h-auto" alt="linkedin"
                                            src="@/assets/images/logo/linkedin.svg"></img>
                                    </a>
                                </span>
                                <p class="font-light text-white text-base opacity-50">
                                    Full Satck Developer
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-row w-full col-span-1 justify-center items-center gap-4">
                            <div
                                class="relative flex h-full w-24 border-[1px] border-solid border-white rounded-full overflow-hidden">
                                <img class="w-full h-fit" alt="chirag" src="@/assets/images/team/anish.png"></img>
                            </div>
                            <div class="flex flex-col w-full justify-start items-start gap-2 h-full">
                                <span
                                    class="text-white font-semibold text-2xl relative flex flex-row items-center justify-center gap-2">
                                    <span class="text-xl text-white font-semibold">
                                        Anish Jha
                                    </span>
                                    <a target="_blank" href="https://www.linkedin.com/in/anish-jha7/"
                                        class="h-full w-6 flex justify-center items-center opacity-100">
                                        <img class="w-full h-auto" alt="linkedin"
                                            src="@/assets/images/logo/linkedin.svg"></img>
                                    </a>
                                </span>
                                <p class="font-light text-white text-base opacity-50">
                                    Full Satck Developer
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-row w-full col-span-1 justify-center items-center gap-4">
                            <div
                                class="relative flex h-full w-24 border-[1px] border-solid border-white rounded-full overflow-hidden">
                                <img class="w-full h-fit" alt="chirag" src="@/assets/images/team/rupesh.png"></img>
                            </div>
                            <div class="flex flex-col w-full justify-start items-start gap-2 h-full">
                                <span
                                    class="text-white font-semibold text-2xl relative flex flex-row items-center justify-center gap-2">
                                    <span class="text-xl text-white font-semibold">
                                        Rupesh Choudhary
                                    </span>
                                    <a target="_blank" href="https://www.linkedin.com/in/rupesh-choudhary-241b687/"
                                        class="h-full w-6 flex justify-center items-center opacity-100">
                                        <img class="w-full h-auto" alt="linkedin"
                                            src="@/assets/images/logo/linkedin.svg"></img>
                                    </a>
                                </span>
                                <p class="font-light text-white text-base opacity-50">
                                    DPO Infrastructure
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-row w-full col-span-1 justify-center items-center gap-4">
                            <div
                                class="relative flex h-full w-24 border-[1px] border-solid border-white rounded-full overflow-hidden">
                                <img class="w-full h-fit" alt="chirag" src="@/assets/images/team/ahmad.png"></img>
                            </div>
                            <div class="flex flex-col w-full justify-start items-start gap-2 h-full">
                                <span
                                    class="text-white font-semibold text-2xl relative flex flex-row items-center justify-center gap-2">
                                    <span class="text-xl text-white font-semibold">
                                        Muhammad Ahmad
                                    </span>
                                    <a target="_blank" href="https://www.linkedin.com/in/fateahmad/"
                                        class="h-full w-6 flex justify-center items-center opacity-100">
                                        <img class="w-full h-auto" alt="linkedin"
                                            src="@/assets/images/logo/linkedin.svg"></img>
                                    </a>
                                </span>
                                <p class="font-light text-white text-base opacity-50">
                                    App Developer
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <FooterNew />
    </div>
</template>

<script>
import FooterNew from './FooterNew.vue';
import Navbar from './NavbarNew.vue';
import axios from '../axios';
import constants from '../../constant';
import FaqBox from './components/homepage/FaqBox.vue';
import SubscribeModal from './SubscribeModal.vue';
import NodeWaitListModal from './NodeWaitListModal.vue';
// import HomePageSlider from './HomePageSlider.vue';

export default {
    name: 'New Landing',
    components: {
        Navbar,
        FooterNew,
        FaqBox,
        SubscribeModal,
        NodeWaitListModal,
        // HomePageSlider,
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