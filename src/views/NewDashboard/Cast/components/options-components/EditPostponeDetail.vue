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
                        <TimeZoneMenu :menuList="allTimeZone" :stepOneProps="stepOneProps" class="menu-button">
                            <template #menuButton>
                                <div class="text-left">
                                    {{ stepOneProps.timezone }}
                                </div>
                            </template>
                        </TimeZoneMenu>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.startTime</span>
                        <StartTimeMenu :menuList="timeFrames" :stepOneProps="stepOneProps" class="menu-button">
                            <template #menuButton>
                                <div class="text-left">
                                    {{ convertTo12(stepOneProps.startTime) }}
                                </div>
                            </template>
                        </StartTimeMenu>
                    </div>
                    <div class="flex flex-col mt-8">
                        <span>cast.postpone</span>
                        <div>
                            <vs-textarea class="w-2/5 mt-2 txt-desc" id="postpone" v-model="postponeMessage"
                                placeholder="//Postpone Message" height="70px"
                                @keyup="postponeMessageError = postponeMessage === ''" />
                            <p v-if="postponeMessageError" class="text-danger my-2 p-0">>> Postpone message is required</p>
                        </div>
                    </div>
                    <vs-button class="mt-8" type="border" @click="validateMessage">>>save</vs-button>
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
import TimeZoneMenu from '@/views/NewDashboard/components/TimeZoneMenu.vue'
import HoursFrameMenu from '@/views/NewDashboard/components/HoursFrameMenu.vue'
import { timeFrames } from '@/views/NewDashboard/Cast/data/timeFrames';
import { allTimeZone } from '@/views/NewDashboard/Cast/data/allTimeZone';
import { hoursFrame } from '@/views/NewDashboard/Cast/data/hoursFrame';
import moment from 'moment-timezone';

export default {
    name: 'EditPostponeDetail',
    props: ['closeModal', 'stepOneProps', 'stepTwoProps', 'handleEditCast'],
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
            postponeMessageError: false,
            postponeMessage: '',
        };
    },
    methods: {
        convertTo12(time) {
            return moment(time, 'HH:mm:ss').format('h:mm A');
        },
        validateMessage(){
            if(this.postponeMessage === ''){
                this.postponeMessageError = true;
                return;
            }
            this.handleEditCast(true, this.postponeMessage);
        }
        // handleEditSetup() {
        //     this.$vs.loading();
        //     var data = new FormData();
        //     data.append('cast_id', this.castId);
        //     data.append('schedule_time', `${this.stepOneProps.startD} ${this.stepOneProps.startTime}`);
        //     data.append('duration', this.stepTwoProps.duration);
        //     data.append('timezone', this.stepOneProps.timezone);
        //     this.$store
        //         .dispatch('cast/formSubmit', data)
        //         .then((response) => {
        //             this.getCastList();
        //             this.$vs.loading.close();
        //             this.$vs.notify({
        //                 title: 'Success',
        //                 text: response.data.message,
        //                 color: 'success',
        //             });
        //             this.closeModal();
        //         })
        //         .catch((error) => {
        //             this.$vs.loading.close();
        //             if (error) {
        //                 this.$vs.notify({
        //                     title: 'Error!',
        //                     text: error.response.data.message,
        //                     color: 'danger',
        //                 });
        //             } else {
        //                 this.$vs.notify({
        //                     title: 'Fields Missing!',
        //                     text: 'Some Fields are Missing',
        //                     color: 'danger',
        //                 });
        //             }
        //         });
        // }
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
.txt-desc {
    background-color: #FFFFFF !important;
    border: none !important;
    width: 100%;
    height: 100px;
    border: 1px solid #FFFFFF !important;
    background-color: #FFFFFF !important;
    border-radius: 0px !important;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0px !important;
    padding: 0px;
}
</style>