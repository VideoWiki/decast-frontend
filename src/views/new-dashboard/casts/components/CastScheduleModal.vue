<template>
    <BaseModal :title="'Cast schedule'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
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
                        <span>cast.duration</span>
                        <HoursFrameMenu :menuList="hoursFrame" :stepTwoProps="stepTwoProps" class="menu-button">
                            <template #menuButton>
                                <div class="text-left">
                                    {{ stepTwoProps.duration / 60 }} Hours
                                </div>
                            </template>
                        </HoursFrameMenu>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.timeZone</span>
                        <TimeZoneMenu :menuList="allTimeZone" :stepOneProps="stepOneProps">
                            <template #menuButton>
                                <div class="text-left">
                                    {{ stepOneProps.timezone }}
                                </div>
                            </template>
                        </TimeZoneMenu>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.startTime</span>
                        <input type="time" v-model="stepOneProps.startTime" class="menu-button text-left" />
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
import Calendar from '@/views/new-dashboard/components/Calendar.vue';
import StartTimeMenu from '@/views/new-dashboard/components/StartTimeMenu.vue'
import TimeZoneMenu from '@/views/new-dashboard/components/TimeZoneMenu.vue'
import HoursFrameMenu from '@/views/new-dashboard/components/HoursFrameMenu.vue'
import { timeFrames } from '@/views/new-dashboard/casts/data/timeFrames';
import { allTimeZone } from '@/views/new-dashboard/casts/data/allTimeZone';
import { hoursFrame } from '@/views/new-dashboard/casts/data/hoursFrame';
import moment from 'moment-timezone';

export default {
    name: 'CastScheduleModal',
    props: ['closeModal', 'setActiveModal', 'stepOneProps', 'stepTwoProps'],
    components: {
        BaseModal,
        Calendar,
        StartTimeMenu,
        TimeZoneMenu,
        HoursFrameMenu,
    },
    data() {
        return {
            timeFrames: timeFrames,
            allTimeZone: allTimeZone,
            hoursFrame: hoursFrame,
        };
    },
    methods: {
        formatDateTime() {

            const formattedTime = this.stepOneProps.startTime + ':00';
            const formattedDateTime = `${this.stepOneProps.startD} ${formattedTime}`;

            return formattedDateTime;
        },
        handleConfirmSchedule() {
            this.stepOneProps.startTime = this.stepOneProps.startTime + ':00';
            this.stepOneProps.schedule_time = this.formatDateTime();
            console.log(this.stepOneProps.schedule_time, this.stepOneProps.startTime, 'schedu time')
            this.setActiveModal('castDetailModal');
        },
        convertTo12(time) {
            return moment(time, 'HH:mm:ss').format('h:mm A');
        },
    },
}
</script>

<style scoped>
.menu-button {
    width: 196px;
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: #FFFFFF;
    color: #000000;
}
</style>