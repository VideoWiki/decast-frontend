<template >
    <div class="modal-backdrop" @click="close">
        <div class="modal" @click.stop>
            <header class="modal-header">
                <h3 class="modal-title">{{ title }}</h3>
                <button class="btn-close" @click.stop="close"><img src="@/assets/images/dashboard/Cross.svg" /></button>
            </header>
            <section class="modal-body">
                <slot name="modalContent" />
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseModal',
    props: {
        title: {
            type: String,
            required: false
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
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