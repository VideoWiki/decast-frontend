<template>
  <CastTypeModal v-if="activeModal === 'castTypeModal'" :closeModal="closeModal" :castType="castType"
    :setCastType="setCastType" :setActiveModal="setActiveModal" :createCast="createCast" :stepOneProps="stepOneProps" />
  <CastScheduleModal v-else-if="activeModal === 'castScheduleModal'" :closeModal="closeModal"
    :setActiveModal="setActiveModal" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" />
  <CastDetailModal v-else-if="activeModal === 'castDetailModal'" :closeModal="closeModal" :castType="castType"
    :setActiveModal="setActiveModal" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" :createCast="createCast" />
  <CastBrandingModal v-else-if="activeModal === 'castBrandingModal'" :closeModal="closeModal" :stepOneProps="stepOneProps"
    :stepTwoProps="stepTwoProps" :createCast="createCast" :setActiveModal="setActiveModal" :castType="castType"/>
  <CastAdvancedModal v-else-if="activeModal === 'castAdvancedModal'" :closeModal="closeModal" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps"/>
  <CastInviteModal v-else="activeModal==='castInviteModal'" :closeModal="closeModal" :inviteData="inviteData"/>
</template>

<script>
import CastAdvancedModal from './CastAdvancedModal.vue';
import CastBrandingModal from './CastBrandingModal.vue';
import CastDetailModal from './CastDetailModal.vue';
import CastInviteModal from './CastInviteModal.vue';
import CastScheduleModal from './CastScheduleModal.vue';
import CastTypeModal from './CastTypeModal.vue';

export default {
  name: 'CreateCastModal',
  props: ['closeModal', 'createCast', 'stepOneProps', 'stepTwoProps', 'inviteData'],
  components: {
    CastTypeModal,
    CastScheduleModal,
    CastDetailModal,
    CastBrandingModal,
    CastAdvancedModal,
    CastInviteModal
  },
  data() {
    return {
      castType: 'quick-cast', //quick-cast, basic-cast, branded-cast, advanced-cast
      activeModal: 'castTypeModal', //castTypeModal, castScheduleModal, castDetailModal, castBrandingModal, castAdvancedModal, castInviteModal
      formData: new FormData(),
      status: 'create',
      nft_details_submitted: false,
      castId: '',
    };
  },
  mounted() { },
  computed: {
    castInfoList() {
      return this.$store.state.cast.casts;
    },
  },
  methods: {
    setActiveModal(modalName) {
      this.activeModal = modalName;
    },
    setCastType(castType) {
      this.castType = castType;
    }
  },
};
</script>

<style scoped></style>
