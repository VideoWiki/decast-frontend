<template >
    <div class="modal-backdrop" v-if="activeModal !== ''" @click="click">
        <div class="modal" @click.stop>
            <header class="modal-header">
                <h3 class="modal-title">{{ modalTitle }}</h3>
                <button class="btn-close" @click.stop="closeModal"><img src="@/assets/images/dashboard/Cross.svg" /></button>
            </header>
            <section class="modal-body">
                <CreateRoomModal v-if="activeModal === 'roomModal'" />
                <profile v-if="activeModal === 'profileModal'" />
                <reset-password v-if="activeModal === 'resetPasswordModal'" />
                <SetupCastNew v-if="activeModal === 'createCastModal'" />
            </section>
        </div>
    </div>
</template>
  
<script>
import CreateRoomModal from '@/views/dashboard/room-section/components/CreateRoomModal.vue'
import Profile from '@/views/dashboard/Popups/Profile.vue';
import ResetPassword from '@/views/dashboard/Popups/ResetPassword.vue';
import SetupCastNew from '@/views/dashboard/cast-section/components/SetupCastNew.vue'

export default {
    name: 'SimpleModal',
    data() {
        return {
            showPopup: false, // Initially, the pop-up is hidden
        };
    },
    components: {
        CreateRoomModal,
        Profile,
        ResetPassword,
        SetupCastNew,
    },
    computed: {
        activeModal() {
            return this.$store.state.modal.activeModal;
        },
        modalTitle() {
            return this.$store.state.modal.modalTitle;
        },
    },
    mounted() {
        console.log(this.modalTitle);
    },
    methods: {
        click(e) {
            console.log(e.currentTarget);
            if (e.currentTarget === e.target) {
                this.$store.commit('modal/SET_MODAL_CLOSE');
            }
        },
        closeModal() {
            this.$store.commit('modal/SET_MODAL_CLOSE');
        }
    },
};
</script>
  
<style lang="scss">
.modal-backdrop {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: none rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    position: relative;
    min-width: 500px;
    margin: 0px 10px;
    z-index: 1000;
    background-color: rgb(31, 39, 47);
    display: flex;
    flex-direction: column;
    border-radius: 8px;

    &__title {
        font-weight: 600;
        font-size: 24px;
        display: block;
        color: var(--black-title);
        margin-bottom: 30px;
    }

    &-footer {
        margin-top: 30px;
        display: flex;
        align-items: center;
    }
}

@media screen and (max-width: 500px) {
    .modal {
        min-width: calc(100vw - 10px);
        width: calc(100vw - 10px);
    }
}

.modal-header {
    padding: 20px;
}

.modal-title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: normal;
    color: rgba(255, 255, 255, 0.75);
    margin: 0px;
    padding: 0px;
}

.btn-close {
    background-color: rgb(31, 39, 47);
    border-radius: 50%;
    height: 20px;
    width: 20px;
    margin: 0px;
    padding: 0px;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 600;
}

.modal-body {
    padding: 0px 20px 20px 20px;
}

.btn-close {
    position: absolute;
    top: 17px;
    right: 17px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #2196F3;
    background: transparent;
}
</style>