<template>
    <div>
        <div class="w-1/3">
            <label for="token-select" class="text-grey-light">Token Select</label>
            <select id="token-select" v-model="selectedToken" class="h-12 p-2 text-lg w-full">
                <option v-for="(token, name) in tokens" :key="name" :value="name">{{ name }}</option>
            </select>
        </div>
        <div class="w-2/3">
            <label for="storage-select" class="text-left text-grey-light">Storage Select</label>
            <div class="relative w-full">
                <div @click="toggleDropdown"
                    class="h-12 w-full p-2 outline-none bg-black text-white flex justify-between items-center cursor-pointer storage-select">
                    <div class="flex gap-4 items-center justify-start">
                        <img v-if="selectedStorage" :src="storages[selectedStorage].icon" class="w-8 h-8 object-contain"
                            alt="icon" />
                        <span>{{ selectedStorage ? storages[selectedStorage].desc : 'Select Storage' }}</span>
                    </div>
                    <span> <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.3333 1.66667L18.3333 -7.28519e-08L1.66668 -8.01375e-07L1.66668 1.66667L18.3333 1.66667Z"
                                fill="black" />
                            <path d="M20 1.66671L18.3333 1.66667L18.3333 5.00002L20 5.00002L20 1.66671Z" fill="black" />
                            <path d="M18.3333 5.00002L16.6667 5L16.6667 8.33336L18.3333 8.33338L18.3333 5.00002Z"
                                fill="black" />
                            <path d="M16.6667 8.33336L15 8.33336L15 11.6667L16.6667 11.6667L16.6667 8.33336Z"
                                fill="black" />
                            <path d="M15 11.6667L13.3333 11.6667L13.3333 15L15 15L15 11.6667Z" fill="black" />
                            <path d="M13.3333 15L11.6667 15L11.6667 18.3334L13.3333 18.3334L13.3333 15Z" fill="black" />
                            <path d="M8.33332 18.3334L8.33332 20L11.6667 20L11.6667 18.3334L8.33332 18.3334Z"
                                fill="black" />
                            <path d="M8.33334 15L6.66668 15L6.66668 18.3334L8.33332 18.3334L8.33334 15Z" fill="black" />
                            <path d="M6.66667 11.6667L5 11.6667L5 15L6.66668 15L6.66667 11.6667Z" fill="black" />
                            <path d="M4.99999 8.33336L3.33332 8.33336L3.33332 11.6667L5 11.6667L4.99999 8.33336Z"
                                fill="black" />
                            <path d="M3.33334 5L1.66667 5.00002L1.66668 8.33338L3.33332 8.33336L3.33334 5Z"
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
                    <div v-for="(storage, name) in storages" :key="name" @click="selectStorage(name)"
                        class="storage_opt_ p-2 h-12 flex gap-4 items-center justify-start cursor-pointer text-lg hover:bg-gray-800 hover:text-green-500">
                        <img class="w-8 h-8 object-contain" :src="storage.icon" />
                        <span>{{ storage.desc }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2 flex flex-row items-center justify-between w-full gap-6">
            <div class="w-1/2">
                <p class="text-grey-light">Add Coins</p>
                <input class="h-12 p-2 text-lg mt-2 w-full" v-model="amount" type="text" placeholder="Enter amount" />
            </div>

            <span class="text-4xl font-bold text-grey-light mt-6">≈</span>

            <div class="w-1/2">
                <p class="text-grey-light">Estimated minutes</p>
                <div class="bg-grey-light text-lg text-dark-black p-2 mt-2 w-full">{{ minutes }}
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/axios';
import tokens from './token';
import storages from './storage';

export default {
    name: 'MinutesCalculator',
    data() {
        return {
            amount: '',
            selectedToken: '',
            tokens,
            storages,
            selectedStorage: '',
            isOpen: false,
            minutes: '',
            timeoutId: null,
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectStorage(name) {
            this.selectedStorage = name;
            this.isOpen = false;
            this.handleInputChange();
        },
        handleInputChange() {
            if (this.selectedToken && this.selectedStorage && this.amount) {
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => {
                    this.calculateMinutes();
                }, 3000);
            }
        },
        async calculateMinutes() {
            const apiUrl = `https://api.cast.decast.live/api/decast/calculate-minutes/?amount=${this.amount}&currency=${this.selectedToken}&storage_type=${this.selectedStorage}`;
            try {
                this.minutes = '';
                const response = await axios.get(apiUrl);
                this.minutes = parseFloat(response.data.total_minutes).toFixed(3);
            } catch (error) {
                ////console.log('Error fetching estimated minutes:', error);
            }
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
};
</script>
