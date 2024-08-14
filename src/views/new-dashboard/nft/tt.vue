<template>
    <div class="w-1/3">
      <label for="token-select" class="text-grey-light">Token Select</label>
      <select id="token-select" v-model="selectedToken" class="h-12 p-2 text-lg w-full">
        <option v-for="(token, name) in tokens" :key="name" :value="name">{{ name }}</option>
      </select>
    </div>
    <div class="w-2/3">
      <label for="storage-select" class="text-left text-grey-light">Storage Select</label>
      <div class="relative w-full">
        <div @click="toggleDropdown" class="h-12 w-full p-2 outline-none bg-black text-white flex justify-between items-center cursor-pointer storage-select">
          <div class="flex gap-4 items-center justify-start">
            <img v-if="selectedStorage" :src="storages[selectedStorage].icon" class="w-8 h-8 object-contain" alt="icon" />
            <span>{{ selectedStorage ? storages[selectedStorage].desc : 'Select Storage' }}</span>
          </div>
        </div>
        <div v-if="isOpen" class="absolute w-full bg-black text-white z-10">
          <div v-for="(storage, name) in storages" :key="name" @click="selectStorage(name)" class="storage_opt_ p-2 h-12 flex gap-4 items-center justify-start cursor-pointer text-lg hover:bg-gray-800 hover:text-green-500">
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
        <div class="bg-grey-light text-lg text-dark-black p-2 mt-2 w-full">{{ minutes }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import tokens from './token';
  import storages from './storage';
  
  export default {
    name: 'AddFunds',
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
          this.minutes = response.data.minutes;
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
  