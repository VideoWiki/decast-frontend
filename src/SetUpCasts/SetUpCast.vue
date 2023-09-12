<template>
    <div class="main-containr">
        <div class="center-containr">
            <div class="heading-part flex">
                <div class="heading">Set up your cast</div>
                <img src="@/assets/images/editor/cross.svg" alt=""/>
            </div>
            <div class="buttons flex">
                <button class="button-1" 
                    :style="{
                        backgroundColor: activeTab === 'Set up' ? '#464775' : '#1F272F',
                        color: activeTab === 'Set up' ? 'rgba(255, 255, 255, 0.8) ' : 'rgba(166, 166, 168, 0.8)',
                    }"
                    @click="activeTab = 'Set up'"
                > Set up </button>
                <button class="button-2" 
                    :style="{
                        backgroundColor: activeTab === 'Branding' ? '#464775' : '#1F272F',
                        color: activeTab === 'Branding' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(166, 166, 168, 0.8)',
                    }"
                    @click="activeTab = 'Branding'"
                > Branding </button>
                <button class="button-3" 
                    :style="{
                            backgroundColor: activeTab === 'Settings' ? '#464775' : '#1F272F',
                            color: activeTab === 'Settings' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(166, 166, 168, 0.8)',
                        }"
                    @click="activeTab = 'Settings'"
                >Settings</button>
            </div>
            <div class="tab-content">
                <component :is="activeTabComponent"></component>
            </div>
        </div>
    </div>
</template>
<script>
import BrandingTab from "./Tabs/BrandingTab.vue";
import SettingsTab from "./Tabs/SettingsTab.vue";
import SetUpTab from "./Tabs/SetUpTab.vue";
export default {
    name : 'SetUpCast',
    data() {
        return {
           activeTab: 'Set up',
        };
    },
    computed: {
        activeTabComponent() {
            switch (this.activeTab) {
                case 'Set up':
                return SetUpTab;
                case 'Branding':
                return BrandingTab;
                case 'Settings':
                return SettingsTab;
                default:
                return null;
            }
        },
    },
}
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}
.main-containr{
    max-height: 506px;
    min-width: auto;
    overflow: scroll;
    width: 583px;
    border: 1px solid #31394E;
    background-color: #1F272F;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 18px;
    margin-top: 100px;
}
.heading-part{
    justify-content: space-between;
}
.heading-part img{
    width: 12px;
    height: 12px;
    color: #647181;
    cursor: pointer;
}
.heading{
    color: #A6A6A8;
    font-size: 14px;
    font-weight: 600;
}
.buttons{
    margin-top: 23px;
}
.buttons button{
    width: 180px;
    height: 40px;
    border: 1px solid #31394E;
    font-size: 12px;
    font-weight: 600;
    color: #A6A6A8;
    background-color: #1F272F;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.button-1{
    border-radius: 6px 0px 0px 6px;
}
.button-3{
    border-radius: 0px 6px 6px 0px;
}

</style>