<template>
    <BaseModal :title="'Create new room'" @close="closeModal">
        <template #modalContent>
            <div>
                <div class="text">Room Name</div>
                <div class="input">
                    <input placeholder="Name" type="text" v-model="roomName" />
                </div>
                <div class="button">
                    <vs-button v-if="isLoading">
                        Creating room
                        <div role="status" class="ml-2">
                            <svg aria-hidden="true"
                                class="inline w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="#d7df23" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </vs-button>
                    <vs-button v-else @click="createRoom">
                        Create room
                    </vs-button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CreateRoomModal',
    props: ['closeModal'],
    data() {
        return {
            isLoading: false,
            roomName: '',
        };
    },
    components: {
        BaseModal
    },
    computed: {
    },
    methods: {
        createRoom() {
            this.isLoading = true;
            this.$store
                .dispatch('room/addRoom', this.roomName)
                .then(async (res) => {
                    this.isLoading = false;
                    this.closeModal();
                })
                .catch((e) => {
                    this.isLoading = false;
                    console.log(e.resonse);
                });
        },
    },
    mounted() {
    },
};
</script>
  
<style scoped>
*:not(i) {
    font-family: 'Karla', sans-serif;
}

.center-container-full {
    justify-content: center;
    align-items: center;
    color: #a6a6a8;
    width: 100%;
    max-width: 450px;
    margin: auto;
    /* border: 1px solid white; */
    height: 100%;
}

.heading-container {
    width: 270px;
}

.sub-heading {
    font-weight: 400;
    font-size: 11px;
    line-height: 12.86px;
}

.con-vs-popup .vs-popup {
    background: transparent !important;
}

.header-button {
    background: none;
    cursor: pointer;
    height: max-content;
    margin-left: 5px;
}

.side-btn {
    background: none;
    cursor: pointer;
    height: max-content;
    margin-left: 5px;
}

.options-button {
    background: none;
    color: #a6a6a8;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}

.room-popup {
    position: absolute;
    width: 100px;
    height: fit-content;
    background-color: #1f272f;
    border: 1px solid #31394e;
    color: #31394e;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    top: 85%;
    left: 72%;
    z-index: 999;
    padding: 10px;
    margin: auto;
    text-align: left;
}

.room-popup>button {
    display: flex;
    cursor: pointer;
    font-size: 12px;
    gap: 7px;
    background-color: #1f272f;
    border: none;
    color: #647181;
    text-align: left;
    margin-top: 5px;
}

.room-popup>button img {
    width: 10px;
    height: 10px;
    margin: auto;
}

.focused-button {
    color: #d7df23;
    text-decoration: underline;
    text-underline-offset: 7px;
    text-decoration-thickness: 2px;
}

.child-options {
    position: relative;
    padding: 10px 0px 10px 15px;
    border: 1px solid #31394e;
    width: 100%;
    border-radius: 10px;
    height: 63px;
    font-weight: 600;
}

.recordings {
    position: relative;
    padding: 10px 10px 10px 15px;
    border-bottom: 1px solid #31394e;
    width: 96%;
    height: 62px;
    font-weight: 600;
}

.child-options div p {
    width: 160px;
}

.session-button {
    background-color: #1f272f;
    border: 1px solid #31394e;
    padding: 8px 8px 8px 8px;
    color: #a6a6a8;
    border-radius: 5px;
    font-weight: 700;
    font-weight: 12px;
    width: 104px;
    height: 35px;
}

.session-button:hover {
    background-color: #d7df23;
    color: #1f272f;
    cursor: pointer;
}

.copy-link {
    cursor: pointer;
    background: none;
    border: 1px solid #31394e;
    border-radius: 6px;
    width: 35px;
    height: 34px;
    padding: 5px;
    position: relative;
}

.copy-link:active {
    border-color: #d7df23;
    color: #d7df23;
    fill: #d7df23;
}

.tooltip-container {
    position: relative;
}

.tooltip-button {
    position: relative;
    z-index: 1;
}

.tooltip {
    position: absolute;
    top: -10%;
    left: -20%;
    background-color: #31394e;
    color: #a6a6a8;
    font-size: 12px;
    font-weight: 500;
    width: 100px;
    height: 20px;
    padding: 5px;
    border-radius: 6px;
    display: none;
}

.tooltip-button:hover+.tooltip {
    display: block;
}

.tooltip2 {
    position: absolute;
    z-index: 5;
    color: #a6a6a8;
    display: flex;
    align-items: center;
    background-color: none;
    background: transparent;
    pointer-events: none;
    top: 30px;
    right: 7rem;
    width: 265px;
}

.tooltip2 div:nth-child(1) {
    background-color: #31394e;
    display: flex;
    font-size: 12px;
    border-radius: 4px;
    padding: 5px;
}

.triangle {
    width: 0px;
    height: 0px;
    background: transparent;
    border-left: 10px solid #31394e;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    margin: auto;
}

.popup {
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #1f272f67;
    z-index: 999;
}

.createPopup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.options-container {
    margin-top: 30px;
    height: 58vh;
    overflow: auto;
}

.options-container::-webkit-scrollbar {
    width: 5px;
}

.options-container::-webkit-scrollbar-thumb {
    background-color: #31394e !important;
    border-radius: 4px;
    height: 10px;
}

.footer-content {
    width: max-content;
    text-align: center;
    margin-top: 40px !important;
}

.dot {
    margin-left: 17px;
}

.choose-room {
    margin-top: 20px;
}
</style>
<style scoped>
*:not(i) {
    font-family: 'Karla', sans-serif;
}

.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.container {
    width: 500px;
    border: 1px solid #31394e;
    background-color: #1f272f;
    border-radius: 12px;
    padding: 25px;
}

.popup-heading {
    font-size: 18px;
    font-weight: 500;
    color: #a6a6a8;
}

.first-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    color: #a6a6a8;
    font-weight: 'regular';
    font-size: 14px;
    font-family: 'Karla', sans-serif;
}

.input input {
    margin-top: 14px;
    height: 45px;
    width: 100%;
    background-color: #18191b;
    border: 1px solid #31394e;
    padding: 20px;
    color: #a6a6a8;
    border-radius: 6px;
    border: 1px solid #31394e;
}

.close-icon {
    font-size: 20px;
    cursor: pointer;
    color: #a6a6a8;
    background: none;
    border: none;
}

.button {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
}

.button-text {
    margin-top: 30px;
    height: 45px;
    width: 30%;
    background-color: #d7df23;
    border: 1px solid #31394e;
    border-radius: 6px;
}

.error-message {
    color: rgba(199, 70, 70, 0.869);
    font-weight: regular;
    font-size: 13px;
}

.icon {
    position: absolute;
    right: 5px;
    top: 5px;
    font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}

.icon i {
    font-size: 2em;
    color: #647181;
}

.tooltip-container {
    position: relative;
}

.tooltip-button {
    position: relative;
}

.tooltip {
    display: none;
    position: absolute;
    background-color: #31394e85;
    color: #a6a6a8;
    font-size: 12px;
    font-weight: 400;
    padding: 5px;
    border-radius: 6px;
    top: calc(100%);
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    width: 65px;
    height: 30px;
}

.show-tooltip {
    display: block;
}
</style>
  
<style>
input {
    font-family: Montserrat;
}

body {
    background: none transparent;
}

.button {
    display: none;
}

@media (max-width: 499px) {
    .copy-link {
        border-radius: 10px;
    }

    .button .button-text {
        font-size: 12px;
        height: 30px;
    }

    .button-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        /* Ensures content doesn't spill over */
        height: 62px;
    }

    .center-container-full {
        height: auto;
        border: 0.2px;
        border-color: #31394e;
        border-radius: 7px;
        border-style: solid;
        padding: 16px;
        background-color: #1f272f;
        margin-bottom: 5px;
        width: 305px;
        overflow: hidden;
        padding-bottom: 10px !important;
    }

    .options-container {
        margin-top: 20px;
        height: 43vh !important;
        padding-top: 0;
        overflow: auto;
        padding-bottom: 10px !important;
    }

    .sub-heading {
        font-weight: 400;
        font-size: 11px;
    }

    .footer-content {
        display: none;
    }

    .recording img {
        width: 100%;
        padding: 2px;
        margin: 10px;
    }

    .options-container {
        height: 200px;
        overflow: auto;
        overflow-x: hidden;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .tooltip-container,
    .session-button {
        display: none;
    }

    .createPopup {
        height: 100vh;
        max-width: 300px !important;
        min-width: 250px;
    }

    .centered-container {
        margin-top: -20rem !important;
    }

    .popup {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: transparent !important;
        z-index: 999;
    }

    .container {
        max-width: 330px !important;
        min-width: 250px;
    }
}
</style>
  