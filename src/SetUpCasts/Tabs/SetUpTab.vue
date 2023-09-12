<template>
    <div class="wrapper">
        <div class="cast-name">
            <div class="event-name">Cast name</div>
            <input
                id="eventName"
                type="text" 
                placeholder="e.g my friend hang out"
            />
        </div>
        <div class="cast-desc">
            <vs-textarea 
                id="description"
                placeholder="Quick description"
                class="desc"
            />
        </div>
        <div class="cast-time flex">
            <div class="date">
                <label class="text">Schedule your cast date and time</label>
                <input class="input-box"/>
            </div>
            <div class="input-date">
                <label for="startTimeSelect" class="text">Start Time</label>
                <select 
                  id="startTimeSelect" 
                  v-model="selectedStartTime"
                  class="custom-dropdown1 input-box"
                >
                    <option v-for="time in timeOptions" :key="time">{{ time }}</option>
                </select>
            </div>
            <div >
                <label for="endTimeSelect" class="text">End Time</label>
                <select 
                  id="endTimeSelect" 
                  v-model="selectedEndTime"
                  class="custom-dropdown2 input-box"

                >
                    <option v-for="time in timeOptions" :key="time">{{ time }}</option>
                </select>
            </div>
            <div class="time-zone">
            <label class="text">Time zone</label>
            <vs-select v-model="timezone" label="Time Zone">
                <vs-optgroup label="Most Used Timezone">
                <vs-select-item
                    :key="index"
                    :value="item.value"
                    :text="item.text"
                    v-for="(item, index) in mostUsedTimezone"
                ></vs-select-item>
                </vs-optgroup>
                <vs-optgroup label="All Timezones">
                <vs-select-item
                    :key="index"
                    :value="item.value"
                    :text="item.text"
                    v-for="(item, index) in allTimeZone"
                ></vs-select-item>
                </vs-optgroup>
            </vs-select>
            </div>
        </div>
        <div class="schedule-info">
            This call will take place on the May 15, 2023 from {{ selectedStartTime }} until {{ selectedEndTime }}
        </div>
        <div class="button">
            <button>Next</button>
        </div>
    </div>
</template>
<script>
import vSelect from "vue-select";
import allTimeZone  from "./allTimeZone";
export default {
    name : 'SetUpTab',
    components: {
        "vs-select": vSelect,
    },
    data() {
        return {
            selectedStartTime: null,
            selectedEndTime: null,
            timeOptions: this.generateTimeOptions(),
            mostUsedTimezone: [
                { text: 'Asia/Calcutta', value: 'Asia/Kolkata' },
                { text: 'Europe/Lisbon', value: 'Europe/Lisbon' },
                { text: 'GMT', value: 'GMT' },
            ],
            allTimeZone,
            timezone: null,
        };
    },
    mounted() {
        
    },
    methods: {
        generateTimeOptions() {
        const timeOptions = [];
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0); 
        
        for (let i = 0; i < 24 * 4; i++) { 
            const hours = startTime.getHours();
            const minutes = startTime.getMinutes();
            const ampm = hours < 12 ? 'AM' : 'PM';

            const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
            timeOptions.push(formattedTime);

            startTime.setMinutes(startTime.getMinutes() + 15);
        }
        
        return timeOptions;
        },
    },  
}
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.wrapper{
   margin-top: 22px;
   display: flex;
   flex-direction: column;
}
.event-name{
    font-weight: 600;
    font-size: 12px;
    color: #637181;
    margin-bottom: 6px;
}
.cast-name input{
    width: 541px;
    height: 40px;
    border: 1px solid #31394E;
    background-color: #1D232B;
    border-radius: 6px;
    color: #A6A6A8;
    font-size: 12px;
    font-weight: 500;
    padding-left: 14px;
}
.cast-desc{
    margin-top: 20px;
}
.desc{
    background-color: transparent !important;
    border: none !important;
    width: 541px;
    height: 90px;
    border: 1px solid #31394E !important;
    background-color: #1D232B !important;
    border-radius: 6px !important;
    color: #A6A6A8;
    font-size: 12px ;
    font-weight: 500;
   
}
.cast-time{
    margin-top: 12px;
}
.date{
    width: 196px;
}
.text{
    font-weight: 600;
    font-size: 12px;
    color: #637181;
    margin-bottom: 5px;
}
.input-box{
    border: 1px solid #31394E;
    background-color: #1F272F;
    color: #A6A6A8;
    font-weight: 500;
    font-size: 12px;
    height: 40px;
}
.date input{
    width: 196px;
    border-radius: 6px;
    padding: 10px;
}
.time-zone{
    margin-left: 10px;
    min-width: 130px;
}
.zone{
    width: 125px;
}
.schedule-info{
    margin-top: 5px;
    font-weight: 400;
    font-size: 11px;
    color: #637181;
}
.button{
    align-self: flex-end;
    margin-top: 35px;
}
.button button{
    width: 141px;
    height: 40px;
    border: 1px solid #31394E;
    background-color: #D7DF23;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #1F272F;
}
.custom-dropdown1 {
   width: 100px; 
   border-radius: 6px 0px 0px 6px;
   padding-left: 10px;
   
}
.custom-dropdown2 {
   width: 100px; 
   border-radius: 0px 6px 6px 0px;
   padding-left: 10px;
   
}
.input-date{
    margin-left: 10px;
}

</style>