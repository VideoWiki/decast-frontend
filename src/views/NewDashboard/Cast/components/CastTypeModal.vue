<template>
    <BaseModal :title="'Cast types'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="cast-box-wrapper">
                    <div class="cast-type-row">
                        <div class="cast-type-box" @click="setCastType('quick-cast')" v-bind:style="castType==='quick-cast' ? 'border: 1px solid #D7DF23;' : ''">
                            <h3>Quick</h3>
                            <p>Start a cast now with default setup</p>
                        </div>
                        <div class="cast-type-box" @click="setCastType('basic-cast')" v-bind:style="castType==='basic-cast' ? 'border: 1px solid #D7DF23;' : ''">
                            <h3>Basic</h3>
                            <p>Schedule a cast for an audience</p>
                        </div>
                    </div>
                    <div class="cast-type-row">
                        <div class="cast-type-box" @click="setCastType('branded-cast')" v-bind:style="castType==='branded-cast' ? 'border: 1px solid #D7DF23;' : ''">
                            <h3>Branded</h3>
                            <p>Setup your own colors and logo</p>
                        </div>
                        <div class="cast-type-box" @click="setCastType('advanced-cast')" v-bind:style="castType==='advanced-cast' ? 'border: 1px solid #D7DF23;' : ''">
                            <h3>Advanced</h3>
                            <p>Personalize your cast configuration</p>
                        </div>
                    </div>
                </div>
                <vs-button type="border" @click="handleConfirmType">>>confirm</vs-button>
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
    name: 'CastTypeModal',
    props: ['closeModal', 'castType', 'setCastType', 'setActiveModal', 'createCast', 'stepOneProps'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
    methods: {
        handleConfirmType(){
            if(this.castType==='quick-cast'){
                this.stepOneProps.event_name = 'Guest_Room';
                this.stepOneProps.description = 'Guest_Room';
                this.createCast();
                this.setActiveModal('castInviteModal');
            }else {
                this.setActiveModal('castScheduleModal')
            }          
        }
    },
}
</script>

<style scoped>
.modal-content-wrapper {
    height: 75vh;
    width: 60vw;
    overflow-y: scroll;
}
.cast-box-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 40px 0px;
}
.cast-box-wrapper h3 {
    font-size: 18px;
    color: #FFFFFF;
    line-height: unset;
}
.cast-type-row {
    display: flex;
    align-items: center;
    justify-content: center;
}
.cast-type-box {
    border: 1px solid #FFFFFF;
    height: 180px;
    width: 185px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 14px;
    cursor: pointer;
}
</style>

<style>
.cast-modal-bottom {
    margin-top: 20px;
}
.cast-modal-bottom span {
    color: #22C55E;
}
</style>