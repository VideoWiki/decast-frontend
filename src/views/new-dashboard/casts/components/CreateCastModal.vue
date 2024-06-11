<template>
  <CastTypeModal v-if="activeModal === 'castTypeModal'" :closeModal="closeModal" :castType="castType"
    :setCastType="setCastType" :setActiveModal="setActiveModal" :createCast="createCast" :stepOneProps="stepOneProps" />
  <CastScheduleModal v-else-if="activeModal === 'castScheduleModal'" :closeModal="closeModal"
    :setActiveModal="setActiveModal" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" />
  <CastDetailModal v-else-if="activeModal === 'castDetailModal'" :closeModal="closeModal" :castType="castType"
    :setActiveModal="setActiveModal" :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps"
    :createCast="createCast" />
  <CastBrandingModal v-else-if="activeModal === 'castBrandingModal'" :closeModal="closeModal"
    :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" :createCast="createCast" :setActiveModal="setActiveModal"
    :castType="castType" />
  <CastAdvancedModal v-else-if="activeModal === 'castAdvancedModal'" :closeModal="closeModal"
    :stepOneProps="stepOneProps" :stepTwoProps="stepTwoProps" :stepFourProps="stepFourProps" :createCast="createCast"
    :setActiveModal="setActiveModal" />
  <CastInviteModal v-else-if="activeModal === 'castInviteModal'" :closeModal="closeModal" :inviteData="inviteData"
    :setActiveModal="setActiveModal" />
  <CreateNftModal v-else-if="activeModal === 'nftDropModal'" :closeModal="closeModal" :castDetails="inviteData"
    :getCastList="getCastList" />

  <CreateNftGating v-else-if="activeModal === 'createNFTGating'" :closeModal="() => setActiveModal('')"
    :castDetails="{ public_meeting_id: inviteData.meeting_id, isNftGated: false }" :setActiveModal="setActiveModal"
    :updateCastListElement="updateCastListElement" />
  <CreateSucessModal v-else-if="activeModal === 'createSuccessModal'" :closeModal="() => setActiveModal('')"
    :castDetails="{ public_meeting_id: inviteData.meeting_id, isNftGated: false }" />
</template>

<script>
import CreateNftModal from '../../nft/CreateNftModal.vue';
import CastAdvancedModal from './CastAdvancedModal.vue';
import CastBrandingModal from './CastBrandingModal.vue';
import CastDetailModal from './CastDetailModal.vue';
import CastInviteModal from './CastInviteModal.vue';
import CastScheduleModal from './CastScheduleModal.vue';
import CastTypeModal from './CastTypeModal.vue';
import CreateNftGating from '@/views/new-dashboard/nft-gating/CreateNftGating.vue'
import CreateSucessModal from '@/views/new-dashboard/nft-gating/CreateSucessModal.vue'

export default {
  name: 'CreateCastModal',
  props: ['closeModal', 'createCast', 'stepOneProps', 'stepTwoProps', 'stepThreeProps', 'stepFourProps', 'inviteData', 'getCastList', 'updateCastListElement'],
  components: {
    CastTypeModal,
    CastScheduleModal,
    CastDetailModal,
    CastBrandingModal,
    CastAdvancedModal,
    CastInviteModal,
    CreateNftModal,
    CreateNftGating,
    CreateSucessModal,
  },
  data() {
    return {
      castType: 'quick-cast', //quick-cast, basic-cast, branded-cast, advanced-cast
      activeModal: 'castTypeModal', //castTypeModal, castScheduleModal, castDetailModal, castBrandingModal, castAdvancedModal, castInviteModal, nftDropModal
      formData: new FormData(),
      status: 'create',
      nft_details_submitted: false,
      castId: '',
    };
  },
  mounted() {
    const castTypes = ['quick-cast', 'basic-cast', 'branded-cast', 'advanced-cast'];
    const castHash = this.$route.hash.substring(1);
    if (castHash && castTypes.includes(castHash)) {
      this.setCastType(castHash);
    } else {
      this.setCastType('quick-cast');
    }
  },
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
      this.$router.push({ hash: castType });
    }
  },
};
</script>

<style scoped></style>
