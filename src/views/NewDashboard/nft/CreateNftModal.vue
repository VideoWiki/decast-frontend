<template>
    <BaseModal :title="'Basic Details'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>NFT</h3>
                    </div>
                    <div class="flex flex-col items-start justify-start gap-6">
                        <div class="flex flex-col gap-4 pt-6">
                            <p>drop.type</p>
                            <vs-button>NFTs</vs-button>
                            <vs-button>Tokens</vs-button>
                        </div>

                        <div  class="flex flex-col gap-4">
                            <p>nft.distribute</p>
                            <vs-button>public</vs-button>
                            <vs-button>private</vs-button>
                        </div>

                        <div  class="flex flex-col gap-4">
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

                        <div  class="flex flex-col gap-4">
                            <p>contract.address</p>
                            <input type="text" id="contract_address" placeholder=" Ex: 0x0710A4F91Dfa5c88A81A5b7a767" />
                        </div>

                        <div  class="flex flex-col gap-4">
                            <p>ABI</p>
                            <br />
                            <textarea id="aib" placeholder='Ex: [{"internalType": "uint256}]'></textarea>
                        </div>

                        <div  class="flex flex-col gap-4">
                            <p>parameters</p>
                            <input type="text" id="parameter" placeholder="Ex: {_count:1}" />
                        </div>

                        <div  class="flex flex-col gap-4">
                            <p>mintFunction.name</p>
                            <input type="text" placeholder=" Ex: mintNFTs" id="mint_function_name" />
                        </div>

                        <div  class="flex flex-col gap-4">
                            <p>price</p>
                            <input />
                        </div>

                        <div  class="flex flex-col gap-4">
                            <p>description</p>
                            <br />
                            <textarea id="nft_description" placeholder="ex. utility of the NFT"></textarea>
                        </div>

                        <div  class="flex flex-col gap-4">
                            <p>Upload NFT</p>
                            <div>
                                <vs-button>/* <br> Click to upload file
                                    or drag and drop your file <br> */</vs-button>
                                <input type="file" class="hidden" name="Sample nft" id="nft_image" />
                                <p></p>
                            </div>
                        </div>

                        <div>
                            <vs-button @click.stop="uploadMetadata" class="mt-8" type="border"> >>add NFT</vs-button>
                        </div>
                    </div>

                </div>
                <div class="cast-modal-bottom">
                    <p>>> Estimated time to setup > <span>5mins - 7mins</span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CreateNftModal',
    props: ['closeModal'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    methods: {
    },
}
</script>

<style scoped></style>