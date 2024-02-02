<template>
    <BaseModal :title="'Cast schedule'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper flex flex-col justify-between">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>1.Setup</h3>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.date</span>
                        <Calendar :stepOneProps="stepOneProps" />
                        <!-- <div><input class="w-1/4 p-2 mt-2" placeholder="22 Jan 24"/></div> -->
                    </div>

                    <div class="flex flex-col mt-8">
                        <span>cast.startAt</span>
                        <StartTimeMenu :menuList="timeOptions" :stepOneProps="stepOneProps" class="menu-button">
                            <template #menuButton>
                                <div class="text-left">
                                    {{ convertTo12(stepOneProps.startTime) }}
                                </div>
                            </template>
                        </StartTimeMenu>
                        <!-- <div><input class="w-1/4 p-2 mt-2" placeholder="1 Hours" /></div> -->
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.timeZone</span>
                        <div><input class="w-1/4 p-2 mt-2" placeholder="India/Kolkata" /></div>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.startTime</span>
                        <div><input class="w-1/4 p-2 mt-2" placeholder="12:00" /></div>
                    </div>
                    <vs-button class="mt-8" type="border" @click="handleConfirmSchedule">>>confirm</vs-button>
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
import Calendar from '@/views/NewDashboard/components/Calendar.vue';
import StartTimeMenu from '@/views/NewDashboard/components/StartTimeMenu.vue'
import { timeFrames } from './timeFrames';
import moment from 'moment-timezone';

export default {
    name: 'CastScheduleModal',
    props: ['closeModal', 'setActiveModal', 'stepOneProps'],
    components: {
        BaseModal,
        Calendar,
        StartTimeMenu,
    },
    data() {
        return {
            timeOptions: timeFrames,
        };
    },
    methods: {
        handleConfirmSchedule() {
            this.setActiveModal('castDetailModal');
        },
        convertTo12(time) {
            return moment(time, 'HH:mm:ss').format('h:mm A');
        },
    },
}
</script>

<style scoped>
.modal-content-wrapper * {
    font-family: 'JetBrains Mono' !important;
}
.modal-content-wrapper {
    height: 75vh;
    width: 60vw;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 1rem;
}
.modal-heading {
    border-top: 1px dashed #FFFFFF;
    border-bottom: 1px dashed #FFFFFF;
    padding: 5px 0px;
}
.modal-heading h3 {
    font-size: 18px;
    color: #FFFFFF;
    line-height: unset;
}
.menu-button {
    width: 196px;
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: #FFFFFF;
    color: #000000;
}
</style>