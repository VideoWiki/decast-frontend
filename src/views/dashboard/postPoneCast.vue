<template>
    <div class="main-container">
        <div class="close-btn-cont">
            <button>
                <img src="@/assets/images/cross.svg" />
            </button>
        </div>
        <div class="choice-container">
            <div class="choose-opt">
                <button class="options-button border-none" @click="changeFocus(true)"
                    :class="{ 'focused-button': focusReschedule }">
                    Reschedule
                </button>
                <button class="options-button border-none px-5" @click="changeFocus(false)"
                    :class="{ 'focused-button': !focusReschedule }">
                    Postpone
                </button>
            </div>

            <div v-if="focusReschedule" class="reschedule">
                <div class="fisrt-desc">
                    <p>
                        Choose a day and time in the future you
                        want your cast to be live.
                    </p>
                </div>

                <div class="cal-cont">
                    <div>
                        <img src="@/assets/images/date.svg" />
                    </div>

                    <div>
                        <p>Date</p>
                        <p>November 7,2023</p>
                    </div>
                </div>

                <div class="time-cont">
                    <div class="child1">
                        <div>
                            <img src="@/assets/images/timer.svg" />
                        </div>

                        <div>
                            <p>Start time</p>
                            <p>12:30 pm</p>
                        </div>
                    </div>
                    <div class="child2">
                        <p>End time</p>
                        <p>02:30 pm</p>
                    </div>
                </div>

                <div class="resc-btn">
                    <button>
                        Reschedule
                    </button>
                </div>
            </div>

            <div v-else class="postpone">
                <div class="sec-desc">
                    <p>
                        This cast has been postponed.
                    </p>
                </div>

                <div class="text-ar">
                    <textarea placeholder="Send message to all participants">

                    </textarea>
                </div>

                <div class="send-btn">
                    <button>
                        Send
                    </button>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    name: 'postPoneCast',
    props: {
        showPostpone: Boolean,
    },
    data() {
        return {
            focusReschedule: true,
        }
    },
    mounted() {
        document.getElementById('loading-bg').style.display = 'none';
    },
    methods: {
        changeFocus(toPostpone) {
            this.focusReschedule = toPostpone;
            console.log("EEEE")
        },
    },
}
</script>

<style>
.main-container {
    width: 285px;
    height: 310px;
    margin: auto;
    background-color: #1F272F;
    border: 1px solid #31394E;
    border-radius: 10px;
    padding: 10px;
    margin-top: 2rem;
}

.close-btn-cont {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.close-btn-cont button {
    width: 14px;
    height: 14px;
    background: transparent;
    border: none;
    cursor: pointer;
}

.close-btn-cont button img {
    width: 12px;
    height: 12px;
}

.choose-opt {
    width: 180px;
    background-color: #31394E;
    border-radius: 6px;
    height: 27px;
}

.options-button {
    background: transparent;
    font-size: 12px;
    color: #A6A6A8;
    border: none;
    cursor: pointer;
    width: 90px;
    height: 27px;
    border-radius: 6px;
}

.focused-button {
    background-color: #31A2F4;
    color: #fff;
}

.fisrt-desc {
    width: 255px;
    margin-top: 10px;
}

.fisrt-desc p {
    font-size: 12px;
    color: #637181;
}

.sec-desc {
    width: 255px;
    margin-top: 10px;
}

.sec-desc p {
    font-size: 12px;
    color: #637181;
}

.text-ar {
    width: 255px;
    height: 145px;
    background-color: #1D232B;
    border-radius: 6px;
    margin-top: 10px;
}

.text-ar textarea {
    background: transparent;
    width: 100%;
    border-radius: 6px;
    height: 100%;
    border-color: #31394E;
    color: #A6A6A8;
    padding: 5px;
    font-size: 12px;
    resize: none;
}

.cal-cont,
.time-cont {
    width: 260px;
    display: flex;
    height: 60px;
    border: 1px solid #31394E;
    border-radius: 6px;
    margin-top: 10px;
    background-color: #242936;
    padding: 10px;
}

.cal-cont:active {
    border: 1px solid #D7DF23;
}

.time-cont:active {
    border: 1px solid #D7DF23;
}

.resc-btn,
.send-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.resc-btn button,
.send-btn button {
    background-color: #31394E;
    border-radius: 6px;
    font-size: 12px;
    color: #a6a6a6;
    width: 95px;
    height: 27px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
}

.cal-cont {
    gap: 10px;
}

.cal-cont div img {
    width: 13px;
    height: 14px;
}

.cal-cont div p {
    font-size: 12px;
}

.cal-cont div p:nth-child(2) {
    font-size: 14px;
    color: #a6a6a6;
}

.child1 {
    width: 50%;
    display: flex;
    gap: 10px;
    border-right: 1px solid #31394E;
}

.child1 div img {
    width: 13px;
    height: 14px;
}

.child1 div p {
    font-size: 12px;
}

.child1 div p:nth-child(2) {
    font-size: 14px;
    color: #a6a6a6;
}

.child2 p:nth-child(2) {
    font-size: 14px;
    color: #a6a6a6;
}

.child2 {
    width: 50%;
    padding-left: 10px;
}

.child2 p {
    font-size: 12px;
}
</style>