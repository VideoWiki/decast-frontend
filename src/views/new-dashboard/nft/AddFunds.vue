<template>
    <div class="parent_funds_container_ flex flex-col gap-4 justify-start items-center bg-dark-black">
        <div
            class="dashboard_navbar max-w-6xl w-full items-center flex flex-row justify-between lg:px-12 md:px-4 px-3 py-4">
            <div class="flex justify-start gap-4 w-2/5">
                <img src="@/assets/images/logot.svg" class="w-24 h-24 cursor-pointer mr-10" @click="redirectHome" />
                <div class="text-white flex flex-row justify-center items-center h-24 gap-6">
                    <p class="welcome_msg text-4xl font-bold">
                        Decast.Live
                    </p>
                    <span class="text-lg bg-black text-white p-2 pl-3 pr-3">
                        Testnet
                    </span>
                </div>
            </div>

            <div class="w-3/5 flex flex-row gap-6 justify-end h-24 items-center">
                <div v-if="(accessToken || loggedIn) && activeUserInfo.email == ''" class="flex gap-6">
                    <img src="@/assets/images/pixel_wallet.svg" class="w-8 h-6 cursor-pointer" />
                    <p class="text-lg text-white">{{ activeUserInfo.username }}</p>
                </div>

                <div v-else class="flex gap-6">
                    <img src="@/assets/images/pixel_email.svg" class="w-8 h-6 cursor-pointer" />
                    <p class="text-lg text-white">{{ activeUserInfo.email }}</p>
                </div>
                <!-- <img src="@/assets/images/pixel_smile.svg" class="w-12 h-12 cursor-pointer" /> -->
                <div class="">
                    <div v-if="accessToken || loggedIn">
                        <div class="pfp">
                            <vs-avatar :text="getFirstLetter" color="primary" class="m-0 shadow-md" :src="activeUserInfo.profile_pic
                                ? activeUserInfo.profile_pic
                                : ''
                                " size="40px" />
                        </div>
                    </div>
                    <button v-else class="butt cursor-pointer" @click="open">
                        Login
                    </button>
                </div>
            </div>
        </div>

        <div class="" v-if="isLoading">
            <p class="text-md basic_note_">/* Please wait while your transaction is being processed. Do not close or
                refresh this page. */</p>
        </div>

        <div class="dashboard_content max-w-6xl w-full flex flex-row gap-3 justify-start lg:px-12 md:px-4 px-3 py-4">
            <div class="w-24 h-24 mr-10">
                <vx-tooltip text="/Add funds" position="right">
                    <img src="@/assets/images/pixel_min.svg" class="w-24 h-24 cursor-pointer object-contain" />
                </vx-tooltip>
            </div>

            <div class="basic_chilc_parent_div__ flex flex-row gap-12 w-full">
                <div class="wallet_container_basic__ w-1/2">
                    <div class="parent_2 flex justify-start items-center p-2 pl-2 pr-2 w-full">
                        <div class="basic_child_3 h-4 w-16 bg-dark-black"></div>
                    </div>
                    <div class="basic_child_container__ w-full flex flex-col mt-4 gap-4 p-4 pb-8">
                        <h2 class="text-white font-bold text-3xl">//Buy Decentralized Minutes
                        </h2>

                        <div class="flex flex-row gap-4 w-full mt-2">
                            <div class="flex flex-col gap-2 items-start justify-center w-1/2">
                                <label for="token-select" class="text-grey-light">token.select</label>
                                <select id="token-select" v-model="selectedToken" class="h-12 p-2 text-lg w-full">
                                    <option v-for="(token, name) in tokens" :key="name" :value="name">{{ name }}
                                    </option>
                                </select>
                            </div>

                            <div class="flex flex-col gap-2 items-start justify-center w-1/2">
                                <label for="network-select" class="text-grey-light">network.select</label>
                                <select id="network-select" v-model="selectedNetwork" class="h-12 p-2 text-lg w-full">
                                    <option class="text-lg p-2" v-for="(network, id) in networks" :key="id"
                                        :value="network">{{
                                            network.chainName }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="flex w-full gap-6 justify-between items-center">
                            <div class="w-2/3 flex flex-col gap-2">
                                <label for="storage-select" class="text-left text-grey-light">Storage Select</label>
                                <div class="relative w-full">
                                    <div @click="toggleDropdown"
                                        class="h-12 w-full p-2 outline-none bg-black text-white flex justify-between items-center cursor-pointer storage-select">
                                        <div class="flex gap-4 items-center justify-start text-lg">
                                            <img v-if="selectedStorage" :src="storages[selectedStorage].icon"
                                                class="w-8 h-8 object-contain" alt="icon" />
                                            <span>{{ selectedStorage ? storages[selectedStorage].desc : 'Select Storage'
                                                }}</span>
                                        </div>
                                        <span> <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18.3333 1.66667L18.3333 -7.28519e-08L1.66668 -8.01375e-07L1.66668 1.66667L18.3333 1.66667Z"
                                                    fill="black" />
                                                <path
                                                    d="M20 1.66671L18.3333 1.66667L18.3333 5.00002L20 5.00002L20 1.66671Z"
                                                    fill="black" />
                                                <path
                                                    d="M18.3333 5.00002L16.6667 5L16.6667 8.33336L18.3333 8.33338L18.3333 5.00002Z"
                                                    fill="black" />
                                                <path
                                                    d="M16.6667 8.33336L15 8.33336L15 11.6667L16.6667 11.6667L16.6667 8.33336Z"
                                                    fill="black" />
                                                <path d="M15 11.6667L13.3333 11.6667L13.3333 15L15 15L15 11.6667Z"
                                                    fill="black" />
                                                <path
                                                    d="M13.3333 15L11.6667 15L11.6667 18.3334L13.3333 18.3334L13.3333 15Z"
                                                    fill="black" />
                                                <path
                                                    d="M8.33332 18.3334L8.33332 20L11.6667 20L11.6667 18.3334L8.33332 18.3334Z"
                                                    fill="black" />
                                                <path
                                                    d="M8.33334 15L6.66668 15L6.66668 18.3334L8.33332 18.3334L8.33334 15Z"
                                                    fill="black" />
                                                <path d="M6.66667 11.6667L5 11.6667L5 15L6.66668 15L6.66667 11.6667Z"
                                                    fill="black" />
                                                <path
                                                    d="M4.99999 8.33336L3.33332 8.33336L3.33332 11.6667L5 11.6667L4.99999 8.33336Z"
                                                    fill="black" />
                                                <path
                                                    d="M3.33334 5L1.66667 5.00002L1.66668 8.33338L3.33332 8.33336L3.33334 5Z"
                                                    fill="black" />
                                                <path
                                                    d="M1.66668 1.66667L-7.28543e-08 1.66671L-2.18558e-07 5.00002L1.66667 5.00002L1.66668 1.66667Z"
                                                    fill="black" />
                                                <path
                                                    d="M18.334 5.00008L18.334 1.66675L1.66732 1.66675L1.66732 5.00008L3.33399 5.00008L3.33399 8.33341L5.00065 8.33341L5.00065 11.6667L6.66732 11.6667L6.66732 15.0001L8.33398 15.0001L8.33398 18.3334L11.6673 18.3334L11.6673 15.0001L13.334 15.0001L13.334 11.6667L15.0007 11.6667L15.0007 8.33341L16.6673 8.33341L16.6673 5.00008L18.334 5.00008Z"
                                                    fill="#D7DF23" />
                                            </svg></span>
                                    </div>
                                    <div v-if="isOpen" class="absolute w-full bg-black text-white z-10">
                                        <div v-for="(storage, name) in storages" :key="name"
                                            @click="selectStorage(name)"
                                            class="storage_opt_ p-2 h-12 flex gap-4 items-center justify-start cursor-pointer text-lg hover:bg-gray-800 hover:text-green-500">
                                            <img class="w-8 h-8 object-contain" :src="storage.icon" />
                                            <span>{{ storage.desc }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="flex flex-row items-center">
                                <p
                                    class="text-xl font-semibold flex flex-row gap-2 items-center justify-end text-white">
                                    {{ normalPrice.price }}
                                    <span class="text-md text-grey-light">gwei</span>
                                    <span class="reload cursor-pointer" @click="getGasPrices">
                                        <svg class="reload-icon" fill="#ffffff" width="20px" height="20px"
                                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z">
                                                </path>
                                            </g>
                                        </svg>
                                    </span>
                                </p>
                            </div> -->
                        </div>


                        <hr class="border-grey mt-2" />

                        <!-- <div class="mt-6">
                            <p class="text-grey">quick.select</p>
                            <div class="basic_minute_opt__ flex flex-row gap-6 justify-between mt-4">
                                <span class="bg-primary text-lg text-dark-black p-2 pl-4 pr-4 cursor-pointer">60
                                    Mins</span>
                                <span class="bg-primary text-lg text-dark-black p-2 pl-4 pr-4 cursor-pointer">90
                                    Mins</span>
                                <span class="bg-primary text-lg text-dark-black p-2 pl-4 pr-4 cursor-pointer">100
                                    Mins</span>
                                <span class="bg-primary text-lg text-dark-black p-2 pl-4 pr-4 cursor-pointer">250
                                    Mins</span>
                                <span class="bg-primary text-lg text-dark-black p-2 pl-4 pr-4 cursor-pointer">500
                                    Mins</span>
                            </div>
                        </div> -->

                        <div class="mt-6 flex flex-row items-center justify-between w-full gap-6">
                            <div class="w-1/2">
                                <p class="text-grey-light">Add Coins</p>
                                <input class="h-12 p-2 text-lg mt-2 w-full" v-model="amount" type="text"
                                    placeholder="Enter amount" />
                            </div>

                            <span class="text-4xl font-bold text-grey-light mt-6">≈</span>

                            <div class="w-1/2">
                                <p class="text-grey-light">Estimated minutes</p>
                                <div class="bg-grey-light text-lg text-dark-black p-2 mt-2 w-full h-12 font-semibold">{{
                                    minutes }}
                                    <div v-if="loading" class="loader">Loading...</div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-grey mt-2" />
                        <div class="w-full basic_note_">
                            /*This is an approximate figure according to current storage prices. Real price/duration
                            will be assigned after the transaction is completed. Please note that a 1% platform fee will
                            be applied to the transaction.
                            */
                        </div>
                        <hr class="border-grey mt-2" />

                        <div class="flex justify-end items-center w-full">
                            <button
                                class="basic_pay_btn_ text-dark-black w-48 text-lg cursor-pointer p-2 mt-2 bg-primary font-semibold"
                                :disabled="isLoading" @click="sendFunds"><span v-if="!isLoading">>>Buy Minutes</span>
                                <span v-else>Processing...</span></button>
                        </div>
                    </div>
                </div>

                <div class="basic_right_side_cont__ flex flex-col gap-8 justify-start items-center w-1/2">
                    <div class="basic_balance_cont__ w-full">
                        <div class="flex justify-end items-center p-2 pl-2 pr-2 bg-grey-light">
                            <div class="flex gap-4">
                                <div class="basic_child_3 h-4 w-12 bg-dark-black"></div>
                                <div class="basic_child_4 h-4 w-16 bg-dark-black"></div>
                            </div>
                        </div>
                        <div class="basic_child_container__ w-full flex flex-col mt-4 gap-4 p-4 pb-4">
                            <h2 class="text-white font-bold text-3xl flex justify-between items-center">//Wallet Balance

                                <span><svg width="32px" height="32px" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z"
                                                stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </g>
                                    </svg></span>
                            </h2>

                            <div class="w-2/3 flex flex-col gap-2">
                                <label for="storage-select" class="text-left text-grey-light">storage.select</label>
                                <div class="relative w-full">
                                    <div @click="toggleDropdown1"
                                        class="h-12 w-full p-2 outline-none bg-black text-white flex justify-between items-center cursor-pointer storage-select">
                                        <div class="flex gap-4 items-center justify-start text-lg">
                                            <img v-if="selectedStorage1" :src="storages[selectedStorage1].icon"
                                                class="w-8 h-8 object-contain" alt="icon" />
                                            <span>{{ selectedStorage1 ? storages[selectedStorage1].desc :
                                                'storage.select'
                                                }}</span>
                                        </div>
                                        <span> <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18.3333 1.66667L18.3333 -7.28519e-08L1.66668 -8.01375e-07L1.66668 1.66667L18.3333 1.66667Z"
                                                    fill="black" />
                                                <path
                                                    d="M20 1.66671L18.3333 1.66667L18.3333 5.00002L20 5.00002L20 1.66671Z"
                                                    fill="black" />
                                                <path
                                                    d="M18.3333 5.00002L16.6667 5L16.6667 8.33336L18.3333 8.33338L18.3333 5.00002Z"
                                                    fill="black" />
                                                <path
                                                    d="M16.6667 8.33336L15 8.33336L15 11.6667L16.6667 11.6667L16.6667 8.33336Z"
                                                    fill="black" />
                                                <path d="M15 11.6667L13.3333 11.6667L13.3333 15L15 15L15 11.6667Z"
                                                    fill="black" />
                                                <path
                                                    d="M13.3333 15L11.6667 15L11.6667 18.3334L13.3333 18.3334L13.3333 15Z"
                                                    fill="black" />
                                                <path
                                                    d="M8.33332 18.3334L8.33332 20L11.6667 20L11.6667 18.3334L8.33332 18.3334Z"
                                                    fill="black" />
                                                <path
                                                    d="M8.33334 15L6.66668 15L6.66668 18.3334L8.33332 18.3334L8.33334 15Z"
                                                    fill="black" />
                                                <path d="M6.66667 11.6667L5 11.6667L5 15L6.66668 15L6.66667 11.6667Z"
                                                    fill="black" />
                                                <path
                                                    d="M4.99999 8.33336L3.33332 8.33336L3.33332 11.6667L5 11.6667L4.99999 8.33336Z"
                                                    fill="black" />
                                                <path
                                                    d="M3.33334 5L1.66667 5.00002L1.66668 8.33338L3.33332 8.33336L3.33334 5Z"
                                                    fill="black" />
                                                <path
                                                    d="M1.66668 1.66667L-7.28543e-08 1.66671L-2.18558e-07 5.00002L1.66667 5.00002L1.66668 1.66667Z"
                                                    fill="black" />
                                                <path
                                                    d="M18.334 5.00008L18.334 1.66675L1.66732 1.66675L1.66732 5.00008L3.33399 5.00008L3.33399 8.33341L5.00065 8.33341L5.00065 11.6667L6.66732 11.6667L6.66732 15.0001L8.33398 15.0001L8.33398 18.3334L11.6673 18.3334L11.6673 15.0001L13.334 15.0001L13.334 11.6667L15.0007 11.6667L15.0007 8.33341L16.6673 8.33341L16.6673 5.00008L18.334 5.00008Z"
                                                    fill="#D7DF23" />
                                            </svg></span>
                                    </div>
                                    <div v-if="isOpen1" class="absolute w-full bg-black text-white z-10">
                                        <div v-for="(storage, name) in storages" :key="name"
                                            @click="selectStorage1(name)"
                                            class="storage_opt_ p-2 h-12 flex gap-4 items-center justify-start cursor-pointer text-lg hover:bg-gray-800 hover:text-green-500">
                                            <img class="w-8 h-8 object-contain" :src="storage.icon" />
                                            <span>{{ storage.desc }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col gap-2">
                                <p class="text-grey-light text-lg" style="color: #22c55e;">Storage</p>
                                <p class="text-3xl font-semibold text-white"
                                    v-if="swarmFreeGiven === true && selectedStorage1 == 'Swarm'">{{ swarmMinutes
                                    }}<span class="text-lg font-normal">Minutes</span></p>
                                <p class="text-3xl font-semibold text-white"
                                    v-else-if="siaFreeGiven === true && selectedStorage1 == 'Sia'">{{ siaMinutes }}<span
                                        class="text-lg font-normal">Minutes</span>
                                </p>
                                <p class="text-3xl font-semibold text-white" v-else>0<span
                                        class="text-lg font-normal">Minutes</span>
                                </p>
                            </div>

                            <hr class="border-grey mt-2" />
                            <div class="w-full basic_note_">
                                /* Note: After a successful recharge, it may take some time for your updated balance to
                                reflect here. If you still see the old balance, please be patient; it will be updated
                                shortly. */
                            </div>
                            <hr class="border-grey mt-2 mb-2" />

                        </div>

                    </div>

                    <div class="basic_calc_cont___ w-full">
                        <!-- <div class="flex justify-end items-center p-2 pl-2 pr-2 bg-grey">
                            <div class="flex gap-4">
                                <div class="basic_child_3 h-4 w-12 bg-dark-black"></div>
                                <div class="basic_child_4 h-4 w-16 bg-dark-black"></div>
                            </div>
                        </div> -->

                        <!-- <div class="basic_child_container__ w-full flex flex-col mt-4 gap-4 p-4 pb-6">
                            <h2 class="text-white font-bold text-3xl flex justify-between items-center">//Minutes
                                Calculator
                            </h2>

                            <hr class="border-grey mt-4" />

                            <div class="flex flex-row gap-4 items-center justify-start w-full">
                                <div class="w-1/3">
                                    <label for="token-select" class="text-grey-light">Token Select</label>
                                    <select id="token-select" v-model="selectedToken" @change="handleInputChange"
                                        class="h-12 p-2 text-lg w-full">
                                        <option v-for="(token, name) in tokens" :key="name" :value="name">{{ name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="w-2/3">
                                    <label for="storage-select" class="text-left text-grey-light">Storage Select</label>
                                    <div class="relative w-full">
                                        <div @click="toggleDropdown"
                                            class="h-12 w-full p-2 outline-none bg-black text-white flex justify-between items-center cursor-pointer storage-select">
                                            <div class="flex gap-4 items-center justify-start">
                                                <img v-if="selectedStorage" :src="storages[selectedStorage].icon"
                                                    class="w-8 h-8 object-contain" alt="icon" />
                                                <span>
                                                    {{ selectedStorage ? storages[selectedStorage].desc :
                                                        'Select-Storage' }}
                                                </span>
                                            </div>
                                           
                                        </div>
                                        <div v-if="isOpen" class="absolute w-full bg-black text-white z-10">
                                            <div v-for="(storage, name) in storages" :key="name"
                                                @click="selectStorage(name)"
                                                class="storage_opt_ p-2 h-12 flex gap-4 items-center justify-start cursor-pointer text-lg hover:bg-gray-800 hover:text-green-500">
                                                <img class="w-8 h-8 object-contain" :src="storage.icon" />
                                                <span>{{ storage.desc }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-2 flex flex-row items-center justify-between w-full gap-6">
                                <div class="w-1/2">
                                    <p class="text-grey-light">Add Coins</p>
                                    <input class="h-12 p-2 text-lg mt-2 w-full" v-model="amount"
                                        @input="handleInputChange" type="text" placeholder="Enter amount" />
                                </div>

                                <span class="text-4xl font-bold text-grey-light mt-6">≈</span>

                                <div class="w-1/2">
                                    <p class="text-grey-light">Estimated minutes</p>
                                    <div class="bg-grey-light text-lg text-dark-black p-2 mt-2 w-full h-12">{{ minutes
                                        }}
                                    </div>
                                </div>
                            </div>

                            <hr class="border-grey mt-4" />
                            <div class="flex justify-between items-center">
                                <input v-model="amount"
                                    class="bg-dark-black border-none outline-none text-lg text-white"></input>
                                <span></span>
                                <p class="text-grey">cost.total</p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Wallet from '@/layouts/components/navbar/components/Connect_Wallet.vue';
import storages from './storage';
import networks from '@/views/create-event/netwoks.js';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import tokens from './token';
import { ethers } from 'ethers';
import axios from '@/axios';

export default {
    name: 'AddFunds',
    components: {
        Wallet,
        SimpleMenu
    },
    data() {
        return {
            amount: '',
            selectedNetwork: '',
            selectedToken: '',
            networks,
            tokens,
            storages,
            selectedStorage: '',
            selectedStorage1: '',
            isOpen: false,
            isOpen1: false,
            defaultDecimals: 18,
            isLoading: false,
            timeoutId: null,
            minutes: '',
            loading: false,
            mintInfo: '',
            fastPrice: '',
            slowPrice: '',
            normalPrice: '',
            gasPriceInterval: '',
        };
    },
    created() {
        this.$store.dispatch('fetchUserMinutes');
        // this.getGasPrices();
        // this.startGasPriceInterval();
    },
    computed: {
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        },
        accessToken() {
            return this.$store.state.auth.accessToken;
        },
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        },
        getFirstname() {
            return this.activeUserInfo.first_name;
        },
        getFirstLetter() {
            return this.activeUserInfo.first_name[0];
        },
        siaMinutes() {
            return this.$store.state.minutes.siaMinutes;
        },
        siaFreeGiven() {
            return this.$store.state.minutes.siaFreeGiven;
        },
        swarmMinutes() {
            return this.$store.state.minutes.swarmMinutes;
        },
        swarmFreeGiven() {
            return this.$store.state.minutes.swarmFreeGiven;
        },

    },
    watch: {
        amount() {
            this.handleInputChange();
        },
        selectedToken() {
            this.handleInputChange();
        },
        selectedStorage() {
            this.handleInputChange();
        },
    },
    methods: {
        redirectHome() {
            this.$router.push('/');
        },
        async getAccount() {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                return accounts[0];
            } catch (error) {
                ////console.log('Error fetching account:', error);
                return null;
            }
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        toggleDropdown1() {
            this.isOpen1 = !this.isOpen1;
        },
        selectStorage(name) {
            this.selectedStorage = name;
            this.isOpen = false;
            this.$emit('input', name);
            this.handleInputChange();
        },
        selectStorage1(name) {
            // this.$store.dispatch('fetchUserMinutes');
            this.selectedStorage1 = name;
            this.isOpen1 = false;
            this.$emit('input', name);
        },
        handleInputChange() {
            if (this.selectedToken && this.selectedStorage && this.amount) {
                this.loading = true;
                this.minutes = '';
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => {
                    this.calculateMinutes();
                    this.loading = false;
                }, 2000);
            }
        },
        async calculateMinutes() {
            const apiUrl = `https://api.cast.decast.live/api/decast/calculate-minutes/?amount=${this.amount}&currency=${this.selectedToken}&storage_type=${this.selectedStorage}`;
            try {
                this.loading = true;
                this.minutes = '';
                const response = await axios.get(apiUrl);
                this.loading = false;
                this.minutes = parseFloat(response.data.total_minutes).toFixed(2);
            } catch (error) {
                this.loading = false;
                ////console.log('Error fetching estimated minutes:', error);
            }
        },
        async getGasPrices() {
            this.hasOpenLoading = true;
            const apiKey = '47002a53-0b3a-4d42-a1cb-c776909c9a3f';
            const url = 'https://api.blocknative.com/gasprices/blockprices?confidenceLevels=99&confidenceLevels=90&confidenceLevels=80&confidenceLevels=60';

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: apiKey,
                    },
                });

                if (response.data && response.data.blockPrices) {
                    const blockPrices = response.data.blockPrices[0].estimatedPrices;

                    this.fastPrice = blockPrices.find(price => price.confidence === 99);
                    this.normalPrice = blockPrices.find(price => price.confidence === 90);
                    this.slowPrice = blockPrices.find(price => price.confidence === 80);

                    // //console.log('Fast Gas Price:', this.fastPrice.maxFeePerGas, 'Gwei');
                    // //console.log('Normal Gas Price:', this.normalPrice.maxFeePerGas, 'Gwei');
                    // //console.log('Slow Gas Price:', this.slowPrice.maxFeePerGas, 'Gwei');
                } else {
                    //console.log('No gas price data available');
                }
            } catch (error) {
                ////console.log('Error fetching gas prices:', error);
            } finally {
                this.hasOpenLoading = false;
            }
        },
        startGasPriceInterval() {
            this.gasPriceInterval = setInterval(async () => {
                await this.getGasPrices();
            }, 90000);
        },
        async getDecimals(tokenContract) {
            try {
                return await tokenContract.decimals();
            } catch (error) {
                console.warn('Error fetching decimals, using default value:', error);
                return this.defaultDecimals;
            }
        },
        async switchNetwork(chainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId }],
                });
                return true;
            } catch (switchError) {
                if (switchError.code === 4902) {
                    try {
                        const network = this.networks[chainId];
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: network.chainId,
                                    chainName: network.chainName,
                                    nativeCurrency: {
                                        name: network.currencyName,
                                        symbol: network.symbol,
                                        decimals: 18,
                                    },
                                    rpcUrls: [network.rpcUrl],
                                    blockExplorerUrls: [network.blockExplorerUrl],
                                },
                            ],
                        });
                        return true;
                    } catch (addError) {
                        ////console.log('Error adding network:', addError);
                        return false;
                    }
                }
                ////console.log('Error switching network:', switchError);
                return false;
            }
        },
        async sendFunds() {
            if (typeof window.ethereum === 'undefined') {
                this.$vs.notify({
                    title: 'Warning',
                    text: 'MetaMask is not installed. Please install MetaMask to proceed.',
                    color: 'warning',
                });
                // alert('MetaMask is not installed. Please install MetaMask to proceed.');
                return;
            }

            if (!this.selectedNetwork) {
                this.$vs.notify({
                    title: 'Warning',
                    text: 'Please select a network.',
                    color: 'warning',
                });
                // alert('Please select a network.');
                return;
            }

            if (this.amount === '') {
                this.$vs.notify({
                    title: 'Warning',
                    text: 'Please add some amount first.',
                    color: 'warning',
                });
                // alert('Please add some amount first.');
                return;
            }

            const isCorrectNetwork = await this.switchNetwork(this.selectedNetwork.chainId);
            if (!isCorrectNetwork) return;

            this.isLoading = true;
            try {
                const account = await this.getAccount();
                if (!account) {
                    this.$vs.notify({
                        title: 'Warning',
                        text: 'No account is selected in MetaMask.',
                        color: 'warning',
                    });
                    // alert('No account is selected in MetaMask.');
                    return;
                }

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const token = this.tokens[this.selectedToken];

                if (!this.selectedToken) {
                    //console.log("YES ETH")
                    const tx = await signer.sendTransaction({
                        to: '0x8762e42C7Ae230d3Cd0651a897580caAb28B65B3',
                        value: ethers.utils.parseEther(this.amount),
                        gasLimit: '0x5208',
                    });
                    await tx.wait();
                    this.mintInfo = tx;
                    //console.log(tx, this.mintInfo, 'trans')
                } else {
                    //console.log('No ETH')
                    const tokenContract = new ethers.Contract(token.address, token.abi, signer);
                    //console.log(tokenContract, 'tokecvont')
                    const decimals = token.decimals || await this.getDecimals(tokenContract);
                    //console.log(decimals, 'decc')
                    const amountInWei = ethers.utils.parseUnits(this.amount, decimals);
                    //console.log(amountInWei, 'amtgg')
                    const tx = await tokenContract.transfer('0x8762e42C7Ae230d3Cd0651a897580caAb28B65B3', amountInWei);
                    this.mintInfo = tx;
                    //console.log(tx, this.mintInfo, 'trans')
                    await tx.wait();
                }

                this.$vs.notify({
                    title: 'Success!',
                    text: 'Transaction successful!',
                    color: 'success',
                });

                try {
                    const formData = new FormData();
                    formData.append('wallet_address', this.mintInfo.from);
                    formData.append('transaction_hash', this.mintInfo.hash);
                    formData.append('amount', this.amount);
                    formData.append('network', JSON.stringify({
                        chainId: this.selectedNetwork.chainId,
                        chainName: this.selectedNetwork.currencyName,
                    }));
                    formData.append('minutes', parseInt(this.minutes, 10));
                    formData.append('storage', this.selectedStorage);
                    await axios.post('https://api.cast.decast.live/api/decast/create/tx/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    this.$vs.notify({
                        title: 'Success!',
                        text: 'Transaction saved successfully!',
                        color: 'success',
                    });
                } catch (saveError) {
                    ////console.log('Error saving transaction:', saveError);
                    this.$vs.notify({
                        title: 'Error',
                        text: 'Transaction succeeded but failed to save. Please try again.',
                        color: 'danger',
                    });
                }

            } catch (transferError) {
                ////console.log('Error transferring funds:', transferError);
                this.$vs.notify({
                    title: 'Error',
                    text: 'Failed to transfer funds. Please try again.',
                    color: 'danger',
                });
            } finally {
                this.isLoading = false;
                this.selectStorage = '';
                this.selectedNetwork = '';
                this.amount = '';
                this.minutes = '';
                this.selectedToken = '';
            }
        },
    },
    beforeDestroy() {
        clearInterval(this.gasPriceInterval);
    },

};
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono' !important;
}

.parent_funds_container_ {
    min-height: 100vh !important;
    height: 100% !important;
}

.basic_child_container__ {
    /* width: 560px; */
    border: 1px solid white;
    /* transform-origin: right;
    transition: 0.3s ease-in-out; */
}

.basic_chilc_parent_div__ {
    height: 602px;
}

.wallet_container_basic__ {
    height: 602px;
}

.basic_right_side_cont__ {
    height: 602px;
}


.basic_pay_btn_ {
    border: 2px solid black;
    box-shadow: 3px 3px 0px 0px #fff;
}

.basic_pay_btn_:hover {
    box-shadow: 4px 4px 0px 0px #fff;
}

.parent_2 {
    background: #fff;
}

.dashboard_content {
    height: 84vh;
}

.dashboard_navbar {
    height: 16vh;
}

.basic_minute_opt__ span {
    box-shadow: 3px 3px 0px 0px #fff;
    border: 2px solid black;
}

.basic_minute_opt__ span:hover {
    box-shadow: 4px 4px 0px 0px #fff;
}

.storage-select {
    border: 1px solid white;
}

.basic_note_ {
    color: #22c55e;
}

.reload:active .reload-icon path {
    fill: #d7df23;
}

.reload:active {
    animation: rotateIcon 0.5s linear;
    transform-origin: center;
    transition-delay: 0.3s;
    transition: 0.5s ease-in-out;
}

@keyframes rotateIcon {
    100% {
        transform: rotate(720deg);
    }
}
</style>