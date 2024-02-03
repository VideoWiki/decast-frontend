<template>
  <BaseModal :title="'NFT Details'" @close="toggleActiveModal('')">
    <template #modalContent>
      <div class="modal-content-wrapper">
        <div class="modal-content">
          <div class="flex flex-col items-start justify-start gap-6">
            <div>
              <p>drop.type</p>
              <button>NFTs</button>
              <button>Tokens</button>
            </div>

            <div>
              <p>nft.distribute</p>
              <button>public</button>
              <button>private</button>
            </div>

            <div>
              <p>network.select</p>
              <select name="network-select" id="network-select" v-model="network" @change="updateNetwork">
                <option value="41">Telos EVM Testnet</option>
                <option value="1">Ethereum</option>
                <option value="5">Goerli Testnet RPC</option>
                <option value="137">Polygon</option>
                <option value="40">Telos EVM Mainnet</option>
                <option value="11155111">Sepolia</option>
              </select>
            </div>

            <div>
              <p>contract.address</p>
              <input type="text" id="contract_address" placeholder=" Ex: 0x0710A4F91Dfa5c88A81A5b7a767" />
            </div>

            <div>
              <p>ABI</p>
              <br />
              <textarea id="aib" placeholder='Ex: [{"internalType": "uint256}]'></textarea>
            </div>

            <div>
              <p>parameters</p>
              <input type="text" id="parameter" placeholder="Ex: {_count:1}" />
            </div>

            <div>
              <p>mintFunction.name</p>
              <input type="text" placeholder=" Ex: mintNFTs" id="mint_function_name" />
            </div>

            <div>
              <p>price</p>
              <input />
            </div>

            <div>
              <p>description</p>
              <br />
              <textarea id="nft_description" placeholder="ex. utility of the NFT"></textarea>
            </div>

            <div>
              <p>Upload NFT</p>
              <div>
                <button>/* <br> Click to upload file
                  or drag and drop your file <br> */</button>
                <input type="file" class="hidden" name="Sample nft" id="nft_image" />
                <p></p>
              </div>
            </div>

            <div>
              <vs-button @click.stop="uploadMetadata" type="border"> >>add NFT</vs-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
  name:"CreateNFT"
}
</script>

<style scoped></style>