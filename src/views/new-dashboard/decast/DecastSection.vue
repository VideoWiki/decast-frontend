<template>
    <div class="w-full flex flex-col gap-6 justify-start">
        <div class="flex justify-between">
            <div class="text-white">
                <p class="font-bold text-2xl">//Decentralized Casts</p>
                <p>Immutable, irrefutable, and editable in a version controlled <br> manner over decentralized and
                    distributed storage.</p>
            </div>

            <div class="cursor-pointer">
                <vx-tooltip text="/ decast.create" position="left">
                    <img src="@/assets/images/pixel_create.svg" @click="$router.push('/dashboard/casts/create')" />
                </vx-tooltip>
            </div>
        </div>

        <div class="choose-room">
            <button class="options-button border-none" @click="changeFocus(true)"
                :class="{ 'focused-button': focusYourRooms }">
                /decast
            </button>
            <button class="options-button border-none px-5" @click="handleButtonClick"
                :class="{ 'focused-button': !focusYourRooms }">
                /recordings
            </button>
        </div>


    </div>
</template>

<script>
export default {
    name: "DecastSection",
    data() {
        return {
            activeModal: '',
            focusYourRooms: true,
        }
    },
    methods: {
        changeFocus(toYourRooms) {
            this.focusYourRooms = toYourRooms;
        },
        async handleButtonClick() {
            //   this.getRecordings();
            this.changeFocus(false);
        },
    },
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.options-button {
    background: none;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
}

.focused-button {
    color: #d7df23;
}

.cast_header {
    background-color: #272727;
}
</style>