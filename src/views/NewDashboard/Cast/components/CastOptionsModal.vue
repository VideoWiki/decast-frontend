<template>
    <BaseModal :title="'Cast options'" @close="closeModal">
        <template #modalContent>
            <div class="modal-content-wrapper">
                <div class="modal-content">
                    <div class="modal-heading">
                        <h3>Cast Options : Select the below actions</h3>
                    </div>
                    <div class="flex justify-center items-center mt-16">
                        <div class="grid-container">
                            <div class="grid-item relative" @click="setActiveModal('manageAudienceModal')">Manage
                                <br>Audience
                                <span class="svg-cont absolute pr-2 right-0 bottom-0"><svg width="20" height="20"
                                        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.71429 12.8571H7.14286V14.2857H5.71429V12.8571Z" fill="white" />
                                        <path d="M14.2857 12.8571H12.8571V14.2857H14.2857V12.8571Z" fill="white" />
                                        <path d="M5.71429 5.71429H7.14286V7.14286H5.71429V5.71429Z" fill="white" />
                                        <path d="M14.2857 5.71429H12.8571V7.14286H14.2857V5.71429Z" fill="white" />
                                        <path d="M7.14286 7.14286H8.57143V8.57143H7.14286V7.14286Z" fill="white" />
                                        <path d="M12.8571 7.14286H11.4286V8.57143H12.8571V7.14286Z" fill="white" />
                                        <path d="M4.28571 7.14286H5.71429V8.57143H4.28571V7.14286Z" fill="white" />
                                        <path d="M15.7143 7.14286H14.2857V8.57143H15.7143V7.14286Z" fill="white" />
                                        <path d="M5.71429 18.5714V20H14.2857V18.5714H5.71429Z" fill="white" />
                                        <path d="M12.8571 15.7143V14.2857H7.14286V15.7143H12.8571Z" fill="white" />
                                        <path d="M2.85714 17.1429V18.5714H5.71429V17.1429H2.85714Z" fill="white" />
                                        <path d="M2.85714 14.2857H1.42857V17.1429H2.85714V14.2857Z" fill="white" />
                                        <path d="M0 14.2857H1.42857V5.71429H0V14.2857Z" fill="white" />
                                        <path d="M1.42857 5.71429H2.85714V2.85714H1.42857L1.42857 5.71429Z" fill="white" />
                                        <path d="M2.85714 1.42857V2.85714H5.71429V1.42857H2.85714Z" fill="white" />
                                        <path d="M5.71429 0V1.42857H14.2857V0H5.71429Z" fill="white" />
                                        <path d="M17.1429 2.85714V1.42857H14.2857V2.85714H17.1429Z" fill="white" />
                                        <path d="M17.1429 5.71429H18.5714V2.85714H17.1429V5.71429Z" fill="white" />
                                        <path d="M18.5714 14.2857H20V5.71429H18.5714V14.2857Z" fill="white" />
                                        <path d="M18.5714 14.2857H17.1429V17.1429H18.5714V14.2857Z" fill="white" />
                                        <path d="M17.1429 18.5714V17.1429H14.2857V18.5714H17.1429Z" fill="white" />
                                    </svg>
                                </span>
                            </div>
                            <div class="grid-item relative" @click="setActiveModal('liveStreamModal')">Streaming <br>Options
                                <span class="svg-cont absolute pr-2 right-0 bottom-0">
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.33325 4.6665H9.33325V2.6665L7.33325 2.6665V4.6665Z" fill="white" />
                                        <path d="M9.33325 6.6665H11.3333V4.6665H9.33325V6.6665Z" fill="white" />
                                        <path d="M9.33325 16.6665H11.3333V14.6665H9.33325V16.6665Z" fill="white" />
                                        <path d="M7.33325 18.6665H9.33325V16.6665H7.33325L7.33325 18.6665Z" fill="white" />
                                        <path d="M3.33325 8.6665H5.33325L5.33325 6.6665H3.33325L3.33325 8.6665Z"
                                            fill="white" />
                                        <path d="M3.33325 14.6665H5.33325V12.6665H3.33325L3.33325 14.6665Z" fill="white" />
                                        <path d="M13.3333 6.6665L11.3333 6.6665L11.3333 14.6665H13.3333V6.6665Z"
                                            fill="white" />
                                        <path d="M7.33325 8.6665H5.33325V12.6665H7.33325V8.6665Z" fill="white" />
                                        <path d="M14.6666 2.6665L16.6666 2.6665V0.666504L14.6666 0.666504V2.6665Z"
                                            fill="white" />
                                        <path d="M14.6666 20.6665H16.6666V18.6665H14.6666V20.6665Z" fill="white" />
                                        <path d="M16.6666 18.6665H18.6666L18.6666 14.6665H16.6666L16.6666 18.6665Z"
                                            fill="white" />
                                        <path d="M20.6666 6.6665H18.6666V14.6665L20.6666 14.6665L20.6666 6.6665Z"
                                            fill="white" />
                                        <path d="M18.6666 2.6665L16.6666 2.6665V6.6665L18.6666 6.6665V2.6665Z"
                                            fill="white" />
                                        <path d="M4 12.6665H2L2 14.6665H4V12.6665Z" fill="white" />
                                        <path d="M4 6.6665H2V8.6665H4V6.6665Z" fill="white" />
                                        <path d="M0 12.6665H2L2 8.6665H0L0 12.6665Z" fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <div class="grid-item relative" v-if="castDetails.nft_details_submitted"
                                @click="setActiveModal('editNftDropModal')">Edit NFT/Token <br>Drop <span
                                    class="svg-cont absolute right-0 bottom-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 13.75V10H13.75V13.75H12.5Z" fill="white" />
                                        <path
                                            d="M12.5 8.75V10H8.75V13.75H12.5V15H10V16.25H8.75V15H6.25V13.75H7.5V6.25H6.25V5H10V3.75H11.25V5H12.5V6.25H8.75V8.75H12.5Z"
                                            fill="white" />
                                        <path d="M12.5 8.75V6.25H13.75V8.75H12.5Z" fill="white" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.25 0V1.25H3.75V2.5H2.5L2.49998 3.75H1.24998L1.25 6.25H0V13.75H1.25V16.25H2.5V17.5H3.75V18.75H6.25V20H13.75V18.75H16.25V17.5H17.5V16.25H18.75V13.75H20V6.25H18.75V3.75H17.5V2.5H16.25V1.25H13.75V0H6.25ZM13.75 1.25L13.75 2.5H16.25V3.75H17.5V6.25H18.75V13.75H17.5V16.25H16.25V17.5H13.75L13.75 18.75H6.25V17.5H3.75V16.25H2.5V13.75H1.25V6.25H2.5L2.49998 3.75H3.75V2.5H6.25V1.25H13.75Z"
                                            fill="white" />
                                    </svg>

                                </span></div>
                            <div class="grid-item relative" v-else @click="setActiveModal('nftDropModal')">NFT/Token
                                <br>Drop<span class="svg-cont absolute pr-2 right-0 bottom-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 13.75V10H13.75V13.75H12.5Z" fill="white" />
                                        <path
                                            d="M12.5 8.75V10H8.75V13.75H12.5V15H10V16.25H8.75V15H6.25V13.75H7.5V6.25H6.25V5H10V3.75H11.25V5H12.5V6.25H8.75V8.75H12.5Z"
                                            fill="white" />
                                        <path d="M12.5 8.75V6.25H13.75V8.75H12.5Z" fill="white" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.25 0V1.25H3.75V2.5H2.5L2.49998 3.75H1.24998L1.25 6.25H0V13.75H1.25V16.25H2.5V17.5H3.75V18.75H6.25V20H13.75V18.75H16.25V17.5H17.5V16.25H18.75V13.75H20V6.25H18.75V3.75H17.5V2.5H16.25V1.25H13.75V0H6.25ZM13.75 1.25L13.75 2.5H16.25V3.75H17.5V6.25H18.75V13.75H17.5V16.25H16.25V17.5H13.75L13.75 18.75H6.25V17.5H3.75V16.25H2.5V13.75H1.25V6.25H2.5L2.49998 3.75H3.75V2.5H6.25V1.25H13.75Z"
                                            fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <div class="grid-item relative" @click="setActiveModal('editSetupDetail')">Reschedule <br>Cast
                                <span class="svg-cont absolute pr-2 right-0 bottom-0"><svg width="20" height="21"
                                        viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 2.62497H17.5V5.24997H15V2.62497Z" fill="white" />
                                        <path d="M15 15.75L17.5 15.7501L17.5 18.375L15 18.375L15 15.75Z" fill="white" />
                                        <path d="M2.5 15.7501L5.00001 15.75L5.00003 18.375L2.50002 18.375L2.5 15.7501Z"
                                            fill="white" />
                                        <path
                                            d="M2.50003 2.62504L5.00003 2.625L5.00003 5.25004L2.5 5.25004L2.50003 2.62504Z"
                                            fill="white" />
                                        <path d="M10.5 7.87498H13V10.5L10.5 10.4999L10.5 7.87498Z" fill="white" />
                                        <path d="M0 15.7501H2.5V5.25004H0V15.7501Z" fill="white" />
                                        <path d="M5.00003 0V2.625L15 2.62497L15 0H5.00003Z" fill="white" />
                                        <path d="M20 5.25004L17.5 5.24997L17.5 15.7501H20V5.25004Z" fill="white" />
                                        <path d="M8 15.75H10.5V10.4999H8V15.75Z" fill="white" />
                                        <path d="M15 21V18.375H5.00003V21H15Z" fill="white" />
                                    </svg>
                                </span>
                            </div>
                            <div class="grid-item relative" @click="setActiveModal('editBasicDetail')">Basic <br>Details
                                <span class="svg-cont absolute pr-2 right-0 bottom-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7143 1.42857L14.2857 1.42857L14.2857 2.85715L15.7143 2.85715V1.42857Z"
                                            fill="white" />
                                        <path d="M4.28572 17.1429L5.71429 17.1429V18.5714L4.28572 18.5714V17.1429Z"
                                            fill="white" />
                                        <path d="M14.2857 1.42857V3.25838e-06L1.42857 7.49338e-07V1.42857L14.2857 1.42857Z"
                                            fill="white" />
                                        <path
                                            d="M1.42857 1.42857L0 1.42857L1.73706e-06 5.71429L1.42857 5.71429L1.42857 1.42857Z"
                                            fill="white" />
                                        <path
                                            d="M4.28572 2.85715H2.85714L2.85714 5.71429L1.42857 5.71429L1.42857 7.14286H2.85715L2.85715 17.1429H4.28572L4.28572 2.85715Z"
                                            fill="white" />
                                        <path d="M12.8571 7.14286V5.71429H7.14286V7.14286L12.8571 7.14286Z" fill="white" />
                                        <path d="M10 11.4286V10H7.14286V11.4286L10 11.4286Z" fill="white" />
                                        <path
                                            d="M7.14286 14.2857L7.14286 15.7143H18.5714V14.2857H17.1429L17.1429 2.85715L15.7143 2.85715L15.7143 14.2857L7.14286 14.2857Z"
                                            fill="white" />
                                        <path d="M20 15.7143H18.5714V18.5714L20 18.5714V15.7143Z" fill="white" />
                                        <path d="M5.71429 18.5714V20L18.5714 20V18.5714H5.71429Z" fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <div class="grid-item relative" @click="setActiveModal('editBrandingDetail')">Branding
                                <br>Details<span class="svg-cont absolute pr-2 right-0 bottom-0">
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5714 1.42857V6.24448e-08L17.1429 0V1.42857L18.5714 1.42857Z"
                                            fill="white" />
                                        <path d="M2.85714 1.42857V6.24448e-08L1.42857 0L1.42857 1.42857L2.85714 1.42857Z"
                                            fill="white" />
                                        <path d="M4.28571 2.85714V1.42857L2.85714 1.42857V2.85714H4.28571Z" fill="white" />
                                        <path d="M5.71429 4.28571V2.85714H4.28571V4.28571H5.71429Z" fill="white" />
                                        <path d="M7.14286 5.71429V4.28571H5.71429V5.71429H7.14286Z" fill="white" />
                                        <path d="M8.57143 4.28571V2.85714H7.14286L7.14286 4.28571H8.57143Z" fill="white" />
                                        <path d="M17.1429 2.85714V1.42857L15.7143 1.42857V2.85714H17.1429Z" fill="white" />
                                        <path d="M15.7143 4.28571V2.85714H14.2857V4.28571H15.7143Z" fill="white" />
                                        <path d="M14.2857 5.71429L14.2857 4.28571H12.8571V5.71429H14.2857Z" fill="white" />
                                        <path d="M12.8571 4.28571V2.85714H11.4286V4.28571H12.8571Z" fill="white" />
                                        <path d="M0 15.7143H1.42857L1.42857 1.42857L6.2445e-08 1.42857L0 15.7143Z"
                                            fill="white" />
                                        <path d="M1.42857 15.7143V17.1429H18.5714V15.7143H1.42857Z" fill="white" />
                                        <path d="M18.5714 15.7143H20V1.42857H18.5714V15.7143Z" fill="white" />
                                        <path d="M8.57143 1.42857V2.85714H11.4286V1.42857L8.57143 1.42857Z" fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <div class="grid-item relative" @click="setActiveModal('editAdvanceDetail')">Advanced
                                <br>Details <span class="svg-cont absolute pr-2 right-0 bottom-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.25 2.50002L12.5 2.50003L12.5 1.25002H11.25V2.50002Z" fill="white" />
                                        <path d="M8.75 2.50002L7.49999 2.50003L7.5 1.25002H8.75V2.50002Z" fill="white" />
                                        <path d="M17.5 8.75H18.75V7.5L17.5 7.50003L17.5 8.75Z" fill="white" />
                                        <path d="M2.5 8.75H1.25V7.5H2.5V8.75Z" fill="white" />
                                        <path d="M17.5 12.5H18.75L18.75 11.25L17.5 11.25V12.5Z" fill="white" />
                                        <path d="M2.5 12.5H1.25L1.25 11.25L2.5 11.25V12.5Z" fill="white" />
                                        <path d="M11.25 18.75L12.5 18.75L12.5 17.5L11.25 17.5L11.25 18.75Z" fill="white" />
                                        <path d="M8.75 18.75L7.5 18.75L7.49999 17.5L8.75 17.5L8.75 18.75Z" fill="white" />
                                        <path d="M13.75 7.5H12.5V12.5H13.75V7.5Z" fill="white" />
                                        <path d="M12.5 7.5L12.5 6.25003H7.5L7.49999 7.5H12.5Z" fill="white" />
                                        <path d="M7.49999 7.5H6.24999V12.5H7.49999V7.5Z" fill="white" />
                                        <path d="M12.5 13.75L12.5 12.5H7.49999L7.5 13.75H12.5Z" fill="white" />
                                        <path d="M3.75 16.25L3.75 17.5H7.49999V16.25L3.75 16.25Z" fill="white" />
                                        <path d="M2.5 16.25H3.75V12.5L2.5 12.5L2.5 16.25Z" fill="white" />
                                        <path d="M1.25 8.75L0 8.75002V11.25H1.25L1.25 8.75Z" fill="white" />
                                        <path d="M2.5 7.5L3.75 7.50003L3.75 3.75003L2.5 3.75L2.5 7.5Z" fill="white" />
                                        <path d="M7.49999 3.75003V2.50003H3.75V3.75003H7.49999Z" fill="white" />
                                        <path d="M11.25 1.25002L11.25 0H8.75L8.75 1.25002H11.25Z" fill="white" />
                                        <path d="M12.5 2.50003V3.75003H16.25V2.50003H12.5Z" fill="white" />
                                        <path d="M16.25 7.50003H17.5V3.75L16.25 3.75003L16.25 7.50003Z" fill="white" />
                                        <path d="M20 8.75002L18.75 8.75L18.75 11.25H20V8.75002Z" fill="white" />
                                        <path d="M16.25 16.25H17.5L17.5 12.5L16.25 12.5V16.25Z" fill="white" />
                                        <path d="M16.25 17.5L16.25 16.25L12.5 16.25V17.5H16.25Z" fill="white" />
                                        <path d="M11.25 20V18.75H8.75V20H11.25Z" fill="white" />
                                    </svg>

                                </span>
                            </div>
                            <!-- <div class="grid-item relative" @click="setActiveModal('editPostponeDetail')">Postpone <br>Cast
                                <span class="svg-cont absolute pr-2 right-0 bottom-0"><svg width="20" height="21"
                                        viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 2.62497H17.5V5.24997H15V2.62497Z" fill="white" />
                                        <path d="M15 15.75L17.5 15.7501L17.5 18.375L15 18.375L15 15.75Z" fill="white" />
                                        <path d="M2.5 15.7501L5.00001 15.75L5.00003 18.375L2.50002 18.375L2.5 15.7501Z"
                                            fill="white" />
                                        <path
                                            d="M2.50003 2.62504L5.00003 2.625L5.00003 5.25004L2.5 5.25004L2.50003 2.62504Z"
                                            fill="white" />
                                        <path d="M10.5 7.87498H13V10.5L10.5 10.4999L10.5 7.87498Z" fill="white" />
                                        <path d="M0 15.7501H2.5V5.25004H0V15.7501Z" fill="white" />
                                        <path d="M5.00003 0V2.625L15 2.62497L15 0H5.00003Z" fill="white" />
                                        <path d="M20 5.25004L17.5 5.24997L17.5 15.7501H20V5.25004Z" fill="white" />
                                        <path d="M8 15.75H10.5V10.4999H8V15.75Z" fill="white" />
                                        <path d="M15 21V18.375H5.00003V21H15Z" fill="white" />
                                    </svg>
                                </span>
                            </div> -->
                            <div class="grid-item relative" @click="setActiveModal('customCastUrl')">Custom <br>Cast Url
                            </div>
                            <div class="grid-item danger-button relative" @click="setActiveModal('deleteCastModal')">Delete
                                <br>Cast
                                <span class="svg-cont absolute pr-2 right-0 bottom-0">
                                    <svg width="15" height="20" viewBox="0 0 15 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3333 17.3333H12V18.6667H13.3333V17.3333Z" fill="#EF4444" />
                                        <path d="M2.66667 17.3333H1.33333L1.33333 18.6667H2.66667V17.3333Z"
                                            fill="#EF4444" />
                                        <path d="M13.3333 17.3333H14.6667V5.33333H13.3333V17.3333Z" fill="#EF4444" />
                                        <path
                                            d="M14.6667 2.66667V1.33333L9.33333 1.33333V0L5.33333 1.16564e-07V1.33333H5.8282e-08L1.74846e-07 2.66667H14.6667Z"
                                            fill="#EF4444" />
                                        <path d="M13.3333 5.33333V4H1.33333L1.33333 5.33333H13.3333Z" fill="#EF4444" />
                                        <path d="M5.8282e-08 17.3333H1.33333L1.33333 5.33333H5.8282e-08V17.3333Z"
                                            fill="#EF4444" />
                                        <path d="M12 20V18.6667H2.66667L2.66667 20H12Z" fill="#EF4444" />
                                    </svg>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cast-modal-bottom">
                    <p>>> Manage Audience > <span></span></p>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/common/BaseModal.vue";

export default {
    name: 'CastOptionsModal',
    props: ['closeModal', 'setActiveModal', 'castDetails'],
    components: {
        BaseModal,
    },
    data() {
        return {
        };
    },
}
</script>

<style scoped>
.grid-container {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
}

.grid-item {
    height: 80px;
    width: 110px;
    border: 1px solid #FFFFFF;
    padding: 4px 8px;
    cursor: pointer;
}

.grid-item:hover {
    border: 1px solid #D7DF23;
}

.danger-button {
    border: 1px solid #EF4444 !important;
    color: #EF4444 !important;
}
</style>