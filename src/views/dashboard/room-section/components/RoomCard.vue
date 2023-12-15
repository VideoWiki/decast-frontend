<template>
    <div class="child-options flex justify-between items-center mb-4">
        <div>
            <p style="font-size: 14px; font-weight: 500 width: 50%">
                {{ truncateText(room.room_name, 20) }}
            </p>
        </div>
        <!-- vx-tooltip -->
        <!-- vs-dropdown -->
        <div class="flex justify-between">
            <div class="tooltip-container">
                <!-- <button class="copy-link tooltip-button" @click="copy(room.room_url)" @mouseover="showTooltip[index] = true"
                    @mouseout="showTooltip[index] = false">
                    <img src="@/assets/images/Rooms/copy.svg" alt="" />
                </button> -->
                <vx-tooltip text="Copy Link" position="bottom" delay=".3s">
                    <button class="copy-link tooltip-button" @click="copy(room.room_url)" @mouseover="showTooltip[index] = true"
                    @mouseout="showTooltip[index] = false">
                    <img src="@/assets/images/Rooms/copy.svg" alt="" />
                </button>
                </vx-tooltip>
                <!-- <div class="tooltip" :class="{ 'show-tooltip': showTooltip[index] }">
                    Copy Link
                </div> -->

                <!-- <span class="tooltip">Tooltip text</span> -->
            </div>
            <button class="session-button ml-4" @click="start(room.room_url)">
                Start Session
            </button>
            <SimpleMenu :menuList="roomCardMenuItems" :menuKey="'roomCardMenu' + index" :customStyles="customStyles">
                <template #menuButton>
                    <button class="side-btn border-none">
                        <img src="@/assets/images/Rooms/Vector2.svg" class="h-7 p-2" alt="" />
                    </button>
                </template>
            </SimpleMenu>
        </div>
    </div>
</template>
<script>
import axios from '@/axios';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';

export default {
    name: 'RoomSection',
    props: ['room', 'index'],
    data() {
        return {
            showTooltip: [],
            showTooltip3: false,
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
            ],
            text: '',
            rooms: [],
            sharePopup: false,
            recordings: [],
            roomCardMenuItems: [
                {
                    label: "Share",
                    icon: () => import("@/assets/svgs/button-icons/share.vue"),
                    onClick: () => null
                },
                {
                    label: "Delete",
                    icon: () => import("@/assets/svgs/button-icons/delete.vue"),
                    onClick: () => deleteRoom(this.room)
                },
            ],
            customStyles: {
                menuList: {
                    right: '0% !important',
                },
            },
        };
    },
    components: {
        SimpleMenu
    },
    methods: {
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },
        getColor(index) {
            const colors = ['#FCB92d', '#FB7E84', '#2CC2D3', '#79FC9E', '#D971BC'];
            return colors[index % colors.length];
        },
        copy(url) {
            let id = url.split('/');
            id = id[id.length - 1];
            navigator.clipboard.writeText(
                'https://decast.live/join-room/' + id
            );
        },
        getList() {
            this.$store
                .dispatch('room/getList')
                .then((res) => {
                    console.log(res);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        start(url) {
            let id = url.split('/');
            id = id[id.length - 1];
            this.$store
                .dispatch('room/start', id)
                .then((res) => {
                    console.log(res.data);
                    window.location.href = res.data.room_url;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deleteRoom(room) {
            const options = {
                method: 'DELETE',
                url: 'https://api.room.video.wiki/api/delete/room/',
                data: { public_meeting_id: room.room_url.split('/').pop() },
            };

            axios
                .request(options)
                .then((response) => {
                    console.log(response.data);
                    const index = this.rooms.indexOf(room);
                    if (index !== -1) {
                        var newRooms = this.rooms;
                        newRooms.splice(index, 1);
                        this.$store.commit('room/setRooms', newRooms);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            console.log('delete');
        },
    },
    mounted() {
        // this.getList();
    },
};
</script>
  
<style scoped>
*:not(i) {
    font-family: 'Karla', sans-serif;
}

.menuPosition {
    left: 0;
}

.create-room-button {
    overflow-wrap: break-word;
    font-size: 14px;
    font-weight: 400;
    background-color: #d7df23;
    color: rgb(0, 0, 0);
    border: 1px solid rgb(49, 57, 78);
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    margin: 0px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
    font-weight: regular;
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
  