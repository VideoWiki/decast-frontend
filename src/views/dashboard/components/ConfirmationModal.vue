<template>
  <BaseModal :title="title" @close="toggleConfirmModal('')">
    <template #modalContent>
      <div class="full-wrapper">
        <div class="middle-part">
          <div class="img">
            <CrossIcon />
          </div>
          <p>
            {{ description }}
          </p>
        </div>
        <div class="lower-part">
          <vs-button @click="onConfirm" class="cursor-pointer">Confirm</vs-button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";
import CrossIcon from "@/assets/svgs/CrossIcon.vue";

export default {
  name: 'ConfirmationModal',
  props: ['title', 'description', 'onConfirm', 'toggleConfirmModal'],
  data() {
    return {
      showDeletePopup: false,
    };
  },
  components: {
    BaseModal,
    CrossIcon,
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif;
}

.full-wrapper {
  display: flex;
  flex-direction: column;
}

.heading {
  font-size: 14px;
  font-weight: 600;
  color: #a6a6a8;
}

.uppar-part img {
  height: 12px;
  width: 12px;
  margin-right: -18px;
  margin-top: -6px;
}

.middle-part {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 25px;
}

.img {
  margin: auto;
}

.middle-part p {
  margin: auto;
  font-size: 13px;
  font-weight: 500;
  color: #a6a6a8;
}

.lower-part {
  align-self: flex-end;
  margin-top: 33px;
}

.lower-part button {
  border: 1px solid rgba(49, 57, 78, 0.6) !important;
  background-color: rgba(49, 57, 78, 0.6) !important;
  color: #a6a6a8 !important;
}

.popup {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background: #0000007e;
  z-index: 100;
}
</style>