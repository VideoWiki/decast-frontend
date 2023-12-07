<template>
  <div class="nft-container">
    <div class="head-container">
      <h3>Add drops - NFT</h3>
      <button>
        <img src="@/assets/images/cross.svg" />
      </button>
    </div>

    <div class="horizontal-line"></div>

    <div class="mid-1">
      <div>
        <span
          @click="toggleTextColor('nft')"
          :style="{ color: nftIsChecked ? '#31a2f4' : 'gray' }"
          >NFTs</span
        >
        <ToggleSwitch @toggle="toggleNftSwitch()" />
        <span
          @click="toggleTextColor('token')"
          :style="{ color: tokenIsChecked ? '#31a2f4' : 'gray' }"
          >Token</span
        >
      </div>
      <div>
        <span>NFT Distribution - </span>
        <span
          @click="toggleTextColor('private')"
          :style="{ color: privateIsChecked ? '#31a2f4' : 'gray' }"
          >Private</span
        >
        <ToggleSwitch @toggle="togglePrivateSwitch()" />
        <span
          @click="toggleTextColor('public')"
          :style="{ color: publicIsChecked ? '#31a2f4' : 'gray' }"
          >Public</span
        >
      </div>
    </div>

    <div class="mid-2">
      <div>
        <label for="select">Select a network</label>
        <br />
        <select name="network-select" id="network-select">
          <option value="">Telos EVM Testnet</option>
        </select>
      </div>
      <div>
        <label for="input2">Contact address</label>
        <br />
        <input type="text" placeholder=" Ex: 0x0710A4F91Dfa5c88A81A5b7a767" />
      </div>
    </div>

    <div class="mid-3">
      <label>ABI</label>
      <br />
      <textarea placeholder='Ex: [{"internalType": "uint256}]'></textarea>
    </div>

    <div class="mid-4">
      <div>
        <label for="select">Select a network</label>
        <br />
        <input type="text" placeholder="Ex: {_count:1}" />
      </div>
      <div>
        <label for="select">Select a network</label>
        <br />
        <input type="text" placeholder=" Ex: mintNFTs" />
      </div>
      <div>
        <label for="input2">Contact address</label>
        <br />
        <input type="text" placeholder=" Ex: 0.0009 (ETH)" />
      </div>
    </div>

    <div class="mid-5">
      <div>
        <label>Description</label>
        <br />
        <textarea placeholder="Explain the utility of the NFT"></textarea>
      </div>
      <div id="sample-nft">
        <label>Sample NFT -</label>
        <div>
          <button>Select file</button>
          <p>presentation.xls</p>
          <button>
            <img src="@/assets/images/delete.svg" />
          </button>
        </div>
      </div>
    </div>

    <div class="add-cont">
      <button>Add NFT</button>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from '@/views/dashboard/components/SetUpCasts/Tabs/ToggleSwitch.vue';
import buttonToggle from '@/views/dashboard/components/SetUpCasts/Tabs/buttonToggle.vue';
export default {
  name: 'NftWallet',
  components: {
    ToggleSwitch,
    buttonToggle,
  },
  data() {
    return {
      nftIsChecked: true,
      tokenIsChecked: false,
      publicIsChecked:false,
      privateIsChecked:true,
      textColor: 'blue',
      isChecked: false,
    }
  },
  mounted() {
    document.getElementById('loading-bg').style.display = 'none';
  },
  methods: {
    toggleTextColor(type) {
      if (type === 'nft') {
        this.textColor = this.nftIsChecked ? '#31a2f4' : 'gray';
      } else if (type === 'token') {
        this.textColor = this.tokenIsChecked ? 'gray' : '#31a2f4';
      } else if (type === 'private') {
        this.textColor = this.privateIsChecked ? '#31a2f4' : 'gray';
      } else if (type === 'public') {
        this.textColor = this.publicIsChecked ? 'gray' : '#31a2f4';
      }
      console.log('colortype',type)
    },
    toggleNftSwitch() {
      this.nftIsChecked = !this.nftIsChecked;
      this.tokenIsChecked=!this.tokenIsChecked;
      console.log('NFT switch toggled');
    },
    togglePrivateSwitch() {
      this.privateIsChecked = !this.privateIsChecked;
      this.publicIsChecked = !this.publicIsChecked;
      console.log('Private switch toggled');
    },
  },
};
</script>

<style>
.nft-container {
  width: 590px;
  min-height: 575px;
  height: auto;
  border-radius: 10px;
  background-color: #1f272f;
  border: 1px solid #31394e;
  padding: 15px;
  padding-bottom: 25px;
  margin: auto;
  top: 10px;
}

button {
  cursor: pointer;
}

.head-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a6a6a8;
}

.head-container h3 {
  font-size: 14px;
  font-weight: 600px;
  color: #a6a6a8;
}

.head-container button {
  background-color: #1f272f;
  border: none;
  cursor: pointer;
}

.horizontal-line {
  border: 1px solid #31394e;
  width: 588px;
  margin: auto;
  margin-top: 10px;
  margin-left: -15px;
}

.mid-1 {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.mid-1 div{
  font-size: small;
  font-weight: 500;
  display: flex;
  gap:5px
}

.mid-2,
.mid-4 {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.mid-2,
.mid-3,
.mid-4 div label {
  font-size: 12px;
  color: #637181;
}

.mid-2 div select,
input {
  width: 260px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
  background-color: #1d232b;
  color: #a6a6a8;
  padding: 5px 10px 5px 10px;
  font-size: 13px;
}

option {
  color: #a6a6a8;
}

.mid-3 {
  margin-top: 20px;
}

.mid-3 textarea {
  resize: none;
  width: 558px;
  background-color: #1d232b;
  color: #a6a6a8;
  height: 84px;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 8px;
  margin-top: 6px;
  color: #a6a6a8;
  font-size: 13px;
}

.mid-4 div input {
  width: 175px;
}

.mid-5 div label {
  font-size: 12px;
  color: #637181;
}

.mid-5 {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.mid-5 div textarea {
  resize: none;
  width: 275px;
  background-color: #1d232b;
  color: #a6a6a8;
  height: 84px;
  border-radius: 6px;
  border: 1px solid #31394e;
  padding: 8px;
  margin-top: 6px;
  color: #a6a6a8;
  font-size: 13px;
}

#sample-nft {
  width: 250px;
  margin: auto;
}

#sample-nft label {
  font-size: 13px;
  color: #a6a6a8;
}

#sample-nft div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

#sample-nft div button:nth-child(1) {
  background-color: #2d3a48;
  border-radius: 6px;
  color: #a6a6a8;
  border: none;
  outline: none;
  width: 115.6px;
  height: 34px;
}

#sample-nft div button:nth-child(3) {
  background-color: #1f272f;
  border: none;
  outline: none;
  width:16px;
  height: 18px;
  margin: auto;
}

#sample-nft div p {
  margin: auto;
  font-size: 12px;
}

#sample-nft div button img {
  width: 14px;
  height: 16px;
  margin: auto;
}

.add-cont {
  display: flex;
  justify-content: flex-end;
}

.add-cont button {
  background-color: #d7df23;
  color: #1f272f;
  font-weight: 700;
  font: bold;
  width: 91px;
  height: 40px;
  border: 1px solid #31394e;
  border-radius: 6px;
}

@media screen {
  
}
</style>
