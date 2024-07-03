<template>
    <div class="h-screen w-full bg-color overflow-y-scroll">
        <div class="pg-header flex items-center justify-between h-24">
            <div class="flex-1 flex items-center"><img class="product-logo mr-4" src="@/assets/images/new-dc.svg" />
                <span class="brand-text">Decast.live</span>
            </div>
            <div class="flex-1 flex items-center justify-end">
                <p v-if="wallet_address" class="text-lg mr-4 text-white">{{ wallet_address.slice(0, 8) }}...{{
                    wallet_address.slice(wallet_address.length - 5, wallet_address.length) }}</p>
                <button v-else @click="connectWallet" class="custom-button mr-4">
                    Connect Wallet
                </button>
                <img src="@/assets/images/pixel_wallet.svg" class="w-8 h-6 cursor-pointer" />
            </div>
        </div>

        <div class="pg-content flex justify-between">
            <div class="content-left">
                <div class="cl-banner" :style="bannerStyle">
                </div>
                <div class="cl-logo">
                    <img :src="castDetails.logo" class="cl-logo-img" />
                    <div v-if="isAdmin" @click="setActiveModal('editBrandingModal')" class="editBrandingDiv">✏️</div>
                    <h2 :style="{ color: dynamicColor }">{{ castDetails.event_name }}</h2>
                    <span>{{ formattedTime }}</span>
                    <div class="instr-1">
                        <p>{{ castDetails.description }}</p>
                    </div>
                    <div class="instr-2">
                        <div>
                            <p>Join Event</p>
                            <span @click="gotoJoiningPage">www.decast.live/n/{{ castDetails.public_meeting_id }}</span>
                        </div>
                        <div>
                            <p>Website</p>
                            <span @click="gotoMainPage">www.decast.live/</span>
                        </div>
                    </div>
                    <div class="instr-3">
                        <div class="flex justify-between">
                            <h5>Hosts</h5>
                            <div class="flex align-center" v-if="isAdmin">
                                <button class="req-modal-btn" @click="setActiveModal('allAudienceModal')">All
                                    Audience</button>
                                <span class="mx-2">|</span>
                                <button class="req-modal-btn" @click="setActiveModal('pendingRequestModal')">Requests
                                    ({{
                    pendingRequest.length }})</button>
                            </div>
                        </div>
                        <!-- <p @click="setActiveModal('allAudienceModal')">All Audience</p> -->
                        <div v-for="(req, index) in acceptedRequest" :key="index" v-if="isAdmin && req.isReqAccepted"
                            class="flex items-center">
                            <img :src="req.profile_image" class="instr-3-ulogo" />
                            <div class="instr-3-udetail">
                                <p>{{ req.name }}</p>
                                <span :style="{ color: dynamicColor }">{{ req.role }}</span>
                            </div>
                        </div>
                        <div v-for="(req, index) in acceptedRequest" :key="index" v-if="!isAdmin"
                            class="flex items-center">
                            <img :src="req.profile_image" class="instr-3-ulogo" />
                            <div class="instr-3-udetail">
                                <p>{{ req.name }}</p>
                                <span :style="{ color: dynamicColor }">{{ req.role }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-right">
                <div class="cr-head">
                    <div class="flex align-center justify-between">
                        <h2 :style="{ color: dynamicColor }">Event Tickets</h2>
                        <span v-if="isAdmin" @click="setActiveModal('redeemAmountModal')">Collected Amount:
                            {{ collectedAmount }} Eth</span>
                        <span v-else></span>
                    </div>
                    <p>/* Each user can mint only one NFT Ticket per Wallet. Multiple NFT minting is not permissible for
                        fair ticket distributions */</p>
                </div>
                <div v-if="wallet_address !== '' && rolesList.length > 0" class="cr-content">
                    <div v-if="rolesList" v-for="(role, index) in rolesList" :key="index" class="crc-section mb-4 mt-4">
                        <h4 class="text-white">{{ role.roleName }}</h4>
                        <div>
                            <div class="flex">
                                <div class="crc-img">
                                    <img v-if="role.roleName === 'Co-host'" :src="require('./assets/host.svg')"
                                        alt="Co-host svg" />
                                    <img v-if="role.roleName === 'Participant'"
                                        :src="require('./assets/participant.svg')" alt="Participant svg" />
                                    <img v-if="role.roleName === 'Viewer'" :src="require('./assets/viewer.svg')"
                                        alt="Viewer svg" />
                                </div>
                                <div class="crc-detail flex flex-col justify-end">
                                    <!-- <p>Tickets Left : 9</p>
                                    <p>Total Tickets : 50</p> -->
                                    <p>Cost : {{ role.ticketPrice }}ETH</p>
                                    <p v-if="isAdmin">isWhiteListed : {{ role.isWhiteListed }}</p>
                                    <div v-else-if="role.isWhiteListed">
                                        <div v-if="role.isRequested">
                                            <div v-if="role.isReqAccepted">
                                                <button v-if="!role.isPurchased" class="custm-style-btn"
                                                    :style="{ backgroundColor: dynamicColor }" :disabled="isAdmin"
                                                    @click="handleMintTicket(role.roleName, role.ticketPrice, role.tokenId)">
                                                    Buy Ticket
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z"
                                                            fill="black" />
                                                        <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z"
                                                            fill="black" />
                                                        <path
                                                            d="M10.6665 25.3334H11.9998V22.6667H22.6665V25.3334H23.9998V22.6667H25.3332V21.3334H9.33317V22.6667H10.6665V25.3334Z"
                                                            fill="black" />
                                                        <path d="M9.33317 10.6667H7.99984V18.6667H9.33317V10.6667Z"
                                                            fill="black" />
                                                        <path
                                                            d="M6.6665 6.66669L6.6665 8.00002L9.33317 8.00002V10.6667H23.9998V9.33335H10.6665V6.66669L6.6665 6.66669Z"
                                                            fill="black" />
                                                        <path d="M23.9998 18.6667H25.3332V10.6667H23.9998V18.6667Z"
                                                            fill="black" />
                                                        <path d="M23.9998 20V18.6667H9.33317V20H23.9998Z"
                                                            fill="black" />
                                                        <path d="M24.0002 10.6667H9.3335V18.6667H24.0002V10.6667Z"
                                                            fill="white" />
                                                    </svg>
                                                </button>
                                                <button v-else class="custm-style-btn-dark" :disabled="isAdmin"
                                                    @click="gotoJoiningPage">
                                                    Join now
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z"
                                                            fill="black" />
                                                        <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z"
                                                            fill="black" />
                                                        <path
                                                            d="M10.6665 25.3334H11.9998V22.6667H22.6665V25.3334H23.9998V22.6667H25.3332V21.3334H9.33317V22.6667H10.6665V25.3334Z"
                                                            fill="black" />
                                                        <path d="M9.33317 10.6667H7.99984V18.6667H9.33317V10.6667Z"
                                                            fill="black" />
                                                        <path
                                                            d="M6.6665 6.66669L6.6665 8.00002L9.33317 8.00002V10.6667H23.9998V9.33335H10.6665V6.66669L6.6665 6.66669Z"
                                                            fill="black" />
                                                        <path d="M23.9998 18.6667H25.3332V10.6667H23.9998V18.6667Z"
                                                            fill="black" />
                                                        <path d="M23.9998 20V18.6667H9.33317V20H23.9998Z"
                                                            fill="black" />
                                                        <path d="M24.0002 10.6667H9.3335V18.6667H24.0002V10.6667Z"
                                                            fill="white" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button v-else class="custm-style-btn"
                                                :style="{ backgroundColor: dynamicColor }" :disabled="isAdmin">
                                                Request Pending
                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                    <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                    <path
                                                        d="M10.6665 25.3334H11.9998V22.6667H22.6665V25.3334H23.9998V22.6667H25.3332V21.3334H9.33317V22.6667H10.6665V25.3334Z"
                                                        fill="black" />
                                                    <path d="M9.33317 10.6667H7.99984V18.6667H9.33317V10.6667Z"
                                                        fill="black" />
                                                    <path
                                                        d="M6.6665 6.66669L6.6665 8.00002L9.33317 8.00002V10.6667H23.9998V9.33335H10.6665V6.66669L6.6665 6.66669Z"
                                                        fill="black" />
                                                    <path d="M23.9998 18.6667H25.3332V10.6667H23.9998V18.6667Z"
                                                        fill="black" />
                                                    <path d="M23.9998 20V18.6667H9.33317V20H23.9998Z" fill="black" />
                                                    <path d="M24.0002 10.6667H9.3335V18.6667H24.0002V10.6667Z"
                                                        fill="white" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button v-else @click="openRequestAccessModal(role.roleName)"
                                            :disabled="isAdmin" class="custm-style-btn-dark">
                                            Request Access
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                <path
                                                    d="M10.6665 25.3334H11.9998V22.6667H22.6665V25.3334H23.9998V22.6667H25.3332V21.3334H9.33317V22.6667H10.6665V25.3334Z"
                                                    fill="black" />
                                                <path d="M9.33317 10.6667H7.99984V18.6667H9.33317V10.6667Z"
                                                    fill="black" />
                                                <path
                                                    d="M6.6665 6.66669L6.6665 8.00002L9.33317 8.00002V10.6667H23.9998V9.33335H10.6665V6.66669L6.6665 6.66669Z"
                                                    fill="black" />
                                                <path d="M23.9998 18.6667H25.3332V10.6667H23.9998V18.6667Z"
                                                    fill="black" />
                                                <path d="M23.9998 20V18.6667H9.33317V20H23.9998Z" fill="black" />
                                                <path d="M24.0002 10.6667H9.3335V18.6667H24.0002V10.6667Z"
                                                    fill="white" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button class="custm-style-btn" :style="{ backgroundColor: dynamicColor }"
                                            v-if="!role.isPurchased" :disabled="isAdmin"
                                            @click="handleMintTicket(role.roleName, role.ticketPrice, role.tokenId)">
                                            Buy Ticket
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                <path
                                                    d="M10.6665 25.3334H11.9998V22.6667H22.6665V25.3334H23.9998V22.6667H25.3332V21.3334H9.33317V22.6667H10.6665V25.3334Z"
                                                    fill="black" />
                                                <path d="M9.33317 10.6667H7.99984V18.6667H9.33317V10.6667Z"
                                                    fill="black" />
                                                <path
                                                    d="M6.6665 6.66669L6.6665 8.00002L9.33317 8.00002V10.6667H23.9998V9.33335H10.6665V6.66669L6.6665 6.66669Z"
                                                    fill="black" />
                                                <path d="M23.9998 18.6667H25.3332V10.6667H23.9998V18.6667Z"
                                                    fill="black" />
                                                <path d="M23.9998 20V18.6667H9.33317V20H23.9998Z" fill="black" />
                                                <path d="M24.0002 10.6667H9.3335V18.6667H24.0002V10.6667Z"
                                                    fill="white" />
                                            </svg>
                                        </button>
                                        <button v-else class="custm-style-btn-dark" :disabled="isAdmin"
                                            @click="gotoJoiningPage">
                                            Join now
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                <path d="M7.99984 20H9.33317V21.3334H7.99984V20Z" fill="black" />
                                                <path
                                                    d="M10.6665 25.3334H11.9998V22.6667H22.6665V25.3334H23.9998V22.6667H25.3332V21.3334H9.33317V22.6667H10.6665V25.3334Z"
                                                    fill="black" />
                                                <path d="M9.33317 10.6667H7.99984V18.6667H9.33317V10.6667Z"
                                                    fill="black" />
                                                <path
                                                    d="M6.6665 6.66669L6.6665 8.00002L9.33317 8.00002V10.6667H23.9998V9.33335H10.6665V6.66669L6.6665 6.66669Z"
                                                    fill="black" />
                                                <path d="M23.9998 18.6667H25.3332V10.6667H23.9998V18.6667Z"
                                                    fill="black" />
                                                <path d="M23.9998 20V18.6667H9.33317V20H23.9998Z" fill="black" />
                                                <path d="M24.0002 10.6667H9.3335V18.6667H24.0002V10.6667Z"
                                                    fill="white" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="cr-content">
                    <div class="cr-content-br">
                        <div class="crc-section mb-4 mt-4">
                            <h4 class="text-white">Co-Host</h4>
                            <div>
                                <div class="flex">
                                    <div class="crc-img">
                                        <img :src="require('./assets/host.svg')" alt="Co-host svg" />
                                    </div>
                                    <div class="crc-detail flex flex-col justify-end">
                                        <p>Cost : 0.12ETH</p>
                                        <div><button class="custm-style-btn-dark">Join now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="crc-section mb-4 mt-4">
                            <h4 class="text-white">Participant</h4>
                            <div>
                                <div class="flex">
                                    <div class="crc-img">
                                        <img :src="require('./assets/host.svg')" alt="Co-host svg" />
                                    </div>
                                    <div class="crc-detail flex flex-col justify-end">
                                        <p>Cost : 0.12ETH</p>
                                        <div><button class="custm-style-btn-dark">Join now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="crc-section mb-4 mt-4">
                            <h4 class="text-white">Viewer</h4>
                            <div>
                                <div class="flex">
                                    <div class="crc-img">
                                        <img :src="require('./assets/host.svg')" alt="Co-host svg" />
                                    </div>
                                    <div class="crc-detail flex flex-col justify-end">
                                        <p>Cost : 0.12ETH</p>
                                        <div><button class="custm-style-btn-dark">Join now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cr-content-br-bg">
                        <div>
                            <p class="join-type w-full">/* Connect your Wallet */</p>
                            <div class="step-content">
                                <button @click="connectWallet" class="custom-button">
                                    Connect Wallet
                                </button>
                            </div>
                        </div>
                        <div>
                            <div class="flex mt-12">
                                <svg class="mr-5 mb-5" width="37" height="35" viewBox="0 0 37 35" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4" clip-path="url(#clip0_362_1532)">
                                        <path
                                            d="M35.9485 -0.000137329L20.1572 11.8073L23.0937 4.84884L35.9485 -0.000137329Z"
                                            fill="#E17726" />
                                        <path
                                            d="M0.890501 0.0139465L13.7109 4.84984L16.4992 11.8995L0.890501 0.0139465ZM29.5943 25.1111L36.5738 25.2453L34.1346 33.619L25.618 31.2495L29.5943 25.1111ZM7.20833 25.1111L11.1698 31.2495L2.66762 33.6191L0.243164 25.2453L7.20833 25.1111Z"
                                            fill="#E27625" />
                                        <path
                                            d="M16.1199 10.1041L16.4051 19.4134L7.87012 19.021L10.2979 15.3198L10.3286 15.2842L16.1199 10.1041ZM20.594 10.0002L26.4737 15.2845L26.5042 15.32L28.9319 19.0212L20.3988 19.4134L20.594 10.0002ZM11.4196 25.1383L16.0799 28.8077L10.6663 31.4489L11.4196 25.1383ZM25.3836 25.1378L26.1212 31.449L20.7227 28.8074L25.3836 25.1378Z"
                                            fill="#E27625" />
                                        <path
                                            d="M20.8413 28.4617L26.3194 31.1422L21.2237 33.5894L21.2766 31.972L20.8413 28.4617ZM15.9583 28.4628L15.5401 31.9455L15.5745 33.5875L10.4668 31.1422L15.9583 28.4628Z"
                                            fill="#D5BFB2" />
                                        <path
                                            d="M14.3768 20.6281L15.8084 23.6684L10.9346 22.2255L14.3768 20.6281ZM22.4251 20.6284L25.8836 22.2255L20.9938 23.6679L22.4251 20.6284Z"
                                            fill="#233447" />
                                        <path
                                            d="M11.7916 25.1073L11.0038 31.6503L6.78125 25.2504L11.7916 25.1073ZM25.0101 25.1074L30.0206 25.2504L25.7822 31.6506L25.0101 25.1074ZM29.0548 18.6511L25.4084 22.4064L22.597 21.1082L21.251 23.9677L20.3686 19.0504L29.0548 18.6511ZM7.74471 18.6511L16.4327 19.0504L15.5501 23.9677L14.2039 21.1086L11.4073 22.4066L7.74471 18.6511Z"
                                            fill="#CC6228" />
                                        <path
                                            d="M7.49902 17.8801L11.6246 22.1106L11.7675 26.2869L7.49902 17.8801ZM29.3065 17.8726L25.0303 26.2943L25.1913 22.1106L29.3065 17.8726ZM16.231 18.1379L16.397 19.194L16.8073 21.825L16.5435 29.9056L15.2964 23.4142L15.296 23.3471L16.231 18.1379ZM20.5683 18.1232L21.5057 23.3471L21.5053 23.4142L20.255 29.9219L20.2056 28.2941L20.0105 21.777L20.5683 18.1232Z"
                                            fill="#E27525" />
                                        <path
                                            d="M25.5584 21.9424L25.4188 25.5709L21.0667 28.9974L20.187 28.3693L21.1731 23.2362L25.5584 21.9424ZM11.2588 21.9424L15.6289 23.2362L16.615 28.3693L15.7352 28.9974L11.383 25.5706L11.2588 21.9424Z"
                                            fill="#F5841F" />
                                        <path
                                            d="M9.63379 30.3409L15.2018 33.0069L15.1782 31.8685L15.6441 31.4552H21.1549L21.6376 31.867L21.602 33.0046L27.1348 30.3476L24.4425 32.5958L21.1871 34.8552H15.5994L12.3462 32.5865L9.63379 30.3409Z"
                                            fill="#C0AC9D" />
                                        <path
                                            d="M20.4427 28.1067L21.2299 28.6687L21.6912 32.3882L21.0236 31.8186H15.78L15.125 32.3997L15.5712 28.669L16.3587 28.1067H20.4427Z"
                                            fill="#161616" />
                                        <path
                                            d="M34.9062 0.327042L36.8018 6.07349L35.6179 11.8839L36.4609 12.5409L35.3202 13.4204L36.1776 14.0895L35.0423 15.1341L35.7393 15.6442L33.8897 17.827L26.3036 15.5949L26.2379 15.5593L20.7713 10.8994L34.9062 0.327042ZM1.89558 0.327042L16.0306 10.8994L10.5638 15.5593L10.4981 15.5949L2.91208 17.827L1.06251 15.6442L1.75887 15.1346L0.624336 14.0895L1.47998 13.4211L0.322159 12.5392L1.19692 11.8817L0 6.07378L1.89558 0.327042Z"
                                            fill="#763E1A" />
                                        <path
                                            d="M25.9325 15.1064L33.9704 17.4713L36.5817 25.6044H29.6923L24.9455 25.6648L28.3976 18.865L25.9325 15.1064ZM10.8691 15.1064L8.40351 18.865L11.8561 25.6648L7.11142 25.6044H0.234375L2.83106 17.4714L10.8691 15.1064ZM23.4875 4.80995L21.2393 10.946L20.7621 19.2351L20.5796 21.8333L20.5651 28.4704H16.2364L16.2223 21.8458L16.0392 19.233L15.5619 10.946L13.314 4.80995H23.4875Z"
                                            fill="#F5841F" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_362_1532">
                                            <rect width="36.8018" height="34.8648" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <!-- <svg class="mr-5 mb-5" width="31" height="35" viewBox="0 0 31 35" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4">
                                        <path
                                            d="M17.9906 34.8646C15.123 34.8654 12.2995 34.1587 9.77037 32.8073C7.24123 31.4558 5.08454 29.5013 3.49144 27.117C1.89834 24.7326 0.918029 21.9921 0.637395 19.1383C0.356761 16.2845 0.784469 13.4055 1.88261 10.7566C2.98076 8.1076 4.71542 5.77044 6.93286 3.95222C9.15031 2.134 11.782 0.89088 14.5948 0.333036C17.4076 -0.224808 20.3146 -0.0801476 23.0581 0.754196C25.8016 1.58854 28.2969 3.0868 30.3229 5.11618L24.477 10.9864C23.1995 9.71535 21.5741 8.85117 19.806 8.50294C18.0378 8.15471 16.2061 8.33804 14.5421 9.02978C12.878 9.72151 11.4561 10.8907 10.4559 12.3897C9.45563 13.8887 8.92182 15.6505 8.92182 17.4526C8.92182 19.2547 9.45563 21.0164 10.4559 22.5155C11.4561 24.0145 12.878 25.1837 14.5421 25.8754C16.2061 26.5671 18.0378 26.7505 19.806 26.4022C21.5741 26.054 23.1995 25.1898 24.477 23.9188L30.3472 29.789C28.7243 31.4084 26.7969 32.6906 24.6762 33.5617C22.5554 34.4329 20.2832 34.8757 17.9906 34.8646Z"
                                            fill="#3A69E3" />
                                    </g>
                                </svg>
                                <svg class="mr-5 mb-5" width="35" height="35" viewBox="0 0 35 35" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4">
                                        <path
                                            d="M24.2845 20.2042L28.2329 24.1497L17.5512 34.8314L6.86949 24.1512L10.8165 20.2042L17.5512 26.9738L24.2845 20.2042ZM31.0207 13.4694L34.9996 17.415L31.0555 21.3605L27.1085 17.415L31.0207 13.4694ZM17.5512 13.4694L21.4967 17.3801L17.5498 21.3271L13.6042 17.415L17.5512 13.4694ZM4.0803 13.4694L7.99388 17.415L4.08321 21.3257L0.134766 17.415L4.0803 13.4694ZM17.5527 0L28.23 10.6454L24.283 14.5895L17.5527 7.85621L10.8179 14.6258L6.87094 10.6803L17.5527 0Z"
                                            fill="#EBB52C" />
                                    </g>
                                </svg> -->
                            </div>
                            <p class="join-type w-full">/* Your wallet information is not mapped to your email or name.
                                It will be used to fetch your purchased ticket */</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RequestAccessModal v-if="activeModal === 'requestAccessModal'" :closeModal="() => setActiveModal('')"
            :castDetails="castDetails" :wallet_address="wallet_address" :roleRequest="roleRequest"
            :updateButtonOnRequestSent="updateButtonOnRequestSent" />
        <PendingRequestModal v-else-if="activeModal === 'pendingRequestModal'" :closeModal="() => setActiveModal('')"
            :castDetails="castDetails" :pendingRequest="pendingRequest" :getAllRequests="getAllRequests" />
        <EditBrandingModal v-else-if="activeModal === 'editBrandingModal'" :closeModal="() => setActiveModal('')"
            :castDetails="castDetails" :getMeetingDetails="getMeetingDetails" />
        <RedeemAmountModal v-else-if="activeModal === 'redeemAmountModal'" :closeModal="() => setActiveModal('')"
            :castDetails="castDetails" :collectedAmount="collectedAmount" :getCollectedAmount="getCollectedAmount" />
        <AllAudienceModal v-else-if="activeModal === 'allAudienceModal'" :closeModal="() => setActiveModal('')" />
    </div>
</template>

<script>
import { ethers } from 'ethers';
import { tokenContractWithSigner } from "./Constants"
import RequestAccessModal from './RequestAccessModal';
import PendingRequestModal from './PendingRequestModal';
import EditBrandingModal from './EditBrandingModal';
import RedeemAmountModal from './RedeemAmountModal';
import constants from '../../../../constant';
import AllAudienceModal from './AllAudienceModal.vue';

export default {
    name: 'GatedEventPage',
    data() {
        return {
            roleRequest: '',
            activeModal: '',
            wallet_address: '',
            currencyBalance: '',
            castDetails: {},
            formattedTime: '',
            isAdmin: false,
            rolesList: [],
            acceptedRequest: [],
            pendingRequest: [],
            dynamicColor: '#FFFFFF',
            collectedAmount: '-',
        };
    },
    components: {
        RequestAccessModal,
        PendingRequestModal,
        EditBrandingModal,
        RedeemAmountModal,
        AllAudienceModal,
    },
    async mounted() {
        document.getElementById('loading-bg-transparent').style.display = 'none';
        this.getMeetingDetails();
        await this.connectWallet();
        this.getCollectedAmount();
    },
    methods: {
        async getCollectedAmount() {
            if (this.wallet_address === '') {
                this.connectWallet();
            } else {
                const amount = await tokenContractWithSigner.getCollectedAmountForEventId(this.$route.params.castId)
                this.collectedAmount = ethers.utils.formatEther(amount._hex).toString();
            }
        },
        gotoJoiningPage() {
            const url = `https://decast.live/n/${this.castDetails.public_meeting_id}`;
            window.open(url, '_blank');
        },
        gotoMainPage() {
            const url = `https://decast.live/`;
            window.open(url, '_blank');
        },
        updateButtonOnRequestSent() {
            const index = this.rolesList.findIndex(item => item.roleName === this.roleRequest);
            if (index !== -1) {
                this.$set(this.rolesList, index, { ...this.rolesList[index], ...{ isRequested: true } });
            }
        },
        async handleMintTicket(roleName, ticketPrice, tokenId) {
            if (this.wallet_address === '') {
                this.connectWallet();
            } else if (!this.accessToken) {
                window.open(constants.challengeUri, '_blank', 'width=600,height=600');
            } else {
                try {
                    document.getElementById('loading-bg-transparent-title').innerText = 'Waiting for transaction';
                    document.getElementById('loading-bg-transparent').style.display = 'flex';
                    const _to = [ethers.utils.getAddress(this.wallet_address)];
                    const _eventIds = [this.$route.params.castId];
                    const _accessLevels = [roleName];
                    const _amounts = ["1"];
                    const aggregatePrice = (parseFloat(ticketPrice) * _to.length).toFixed(20);
                    const _price = ethers.utils.parseEther(aggregatePrice.toString());
                    if (aggregatePrice > 0) {
                        const tx = await tokenContractWithSigner.mintTicketPayable(
                            _to, _eventIds, _accessLevels, _amounts, { value: _price, gasLimit: 500000 }
                        );
                        document.getElementById('loading-bg-transparent-title').innerText = 'Processing transaction';
                        // Wait for the transaction to be mined
                        const receipt = await tx.wait();
                        // Transaction successful
                        document.getElementById('loading-bg-transparent-title').innerText = 'Transaction confirmed✔️ finishing up';
                        if (receipt.transactionHash) {
                            await fetch(`https://api.cast.decast.live/api/event/audience/create/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                                },
                                body: JSON.stringify({
                                    name: this.activeUserInfo.username,
                                    email: this.activeUserInfo.email,
                                    wallet_address: this.wallet_address,
                                    role: roleName,
                                    token_id: tokenId._hex,
                                    cast_id: this.castDetails.public_meeting_id,
                                }),
                            })

                            const index = this.rolesList.findIndex(item => item.tokenId === tokenId);
                            if (index !== -1) {
                                this.$set(this.rolesList, index, { ...this.rolesList[index], ...{ isPurchased: true } });
                            }
                            this.$vs.notify({
                                title: 'Hurray!🎉',
                                text: 'Ticket minted successfully!',
                                color: 'success',
                            });
                            document.getElementById('loading-bg-transparent').style.display = 'none';
                        }
                    } else {
                        const tx = await tokenContractWithSigner.mintTicket(
                            _to, _eventIds, _accessLevels, _amounts, { gasLimit: 500000 }
                        );
                        document.getElementById('loading-bg-transparent-title').innerText = 'Processing transaction';
                        // Wait for the transaction to be mined
                        const receipt = await tx.wait();
                        // Transaction successful
                        document.getElementById('loading-bg-transparent-title').innerText = 'Transaction confirmed✔️ finishing up';
                        if (receipt.transactionHash) {
                            await fetch(`https://api.cast.decast.live/api/event/audience/create/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                                },
                                body: JSON.stringify({
                                    name: this.activeUserInfo.username,
                                    email: this.activeUserInfo.email,
                                    wallet_address: this.wallet_address,
                                    role: roleName,
                                    token_id: tokenId._hex,
                                    cast_id: this.castDetails.public_meeting_id,
                                }),
                            })
                            const index = this.rolesList.findIndex(item => item.tokenId === tokenId);
                            if (index !== -1) {
                                this.$set(this.rolesList, index, { ...this.rolesList[index], ...{ isPurchased: true } });
                            }
                            this.$vs.notify({
                                title: 'Hurray!🎉',
                                text: 'Ticket minted successfully!',
                                color: 'success',
                            });
                            document.getElementById('loading-bg-transparent').style.display = 'none';
                        }
                    }

                } catch (error) {
                    console.error('Error minting ticket');
                    document.getElementById('loading-bg-transparent').style.display = 'none';
                    this.$vs.notify({
                        title: 'Something went wrong!',
                        text: 'Error minting ticket please try again later',
                        color: 'danger',
                    });
                }
            }
        },
        getRequestStatus() {
            if (this.activeUserInfo && (this.activeUserInfo.email !== '' || this.activeUserInfo.username !== '')) {
                const endPoint = this.activeUserInfo.email === '' ? `https://api.cast.decast.live/api/nft/gating/user/status/?cast_id=${this.$route.params.castId}&email=${this.activeUserInfo.username}` : `https://api.cast.decast.live/api/nft/gating/user/status/?cast_id=${this.$route.params.castId}&email=${this.activeUserInfo.email}`
                return fetch(endPoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                }).then(result => {
                    return result.data;
                }).catch(error => { });
            }
            return null;
        },
        convertDateTime(event) {
            const date = new Date(`${event.date}T${event.time}`);

            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getUTCFullYear();

            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');

            const formattedDate = `${day}/${month}/${year}`;
            const formattedTime = `${hours}:${minutes} GMT`;

            return `${formattedDate} | ${formattedTime}`;
        },
        async getMeetingDetails() {
            const res = await this.$store.dispatch(
                'cast/meetingInfo',
                this.$route.params.castId
            );
            const details = res.data.meeting_info;
            this.castDetails = details;
            this.dynamicColor = details.primary_color;
            this.formattedTime = this.convertDateTime(details);
            this.getAllRequests(this.$route.params.castId);
        },
        setActiveModal(modalName) {
            this.activeModal = modalName;
        },
        async disconnectWallet() {
            try {
                const windowWithEthereum = window;

                if (windowWithEthereum && windowWithEthereum.ethereum) {
                    const ethereum = windowWithEthereum.ethereum;
                    await ethereum.request({ method: 'eth_accounts' }); // Disconnects the wallet
                    this.wallet_address = ''; // Reset wallet_address
                    this.currencyBalance = ''; // Reset balance
                } else {
                    console.warn('Window or window.ethereum is not available.');
                }
            } catch (error) {
                console.error('Error disconnecting wallet:', error);
            }
        },
        async connectWallet() {
            try {
                const windowWithEthereum = window;

                if (windowWithEthereum && windowWithEthereum.ethereum) {
                    const ethereum = windowWithEthereum.ethereum;
                    await ethereum.request({ method: 'eth_requestAccounts' });

                    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
                    // Get current network
                    const network = await provider.getNetwork();
                    const isOpSepNetwork = network.chainId === 11155420;

                    // // Switch to Mumbai network if not already on it
                    if (!isOpSepNetwork) {
                        try {
                            await provider.send('wallet_switchEthereumChain', [{ chainId: '0xaa37dc' }]);
                        } catch (error) {
                            if (error.code === 4902) {
                                try {
                                    await window.ethereum.request({
                                        method: 'wallet_addEthereumChain',
                                        params: [
                                            {
                                                chainId: '0xaa37dc',
                                                chainName: 'Optimism Sepolia',
                                                rpcUrls: ['https://sepolia.optimism.io'],
                                                nativeCurrency: {
                                                    name: 'ether',
                                                    symbol: 'ETH',
                                                    decimals: 18,
                                                },
                                                blockExplorerUrls: ['https://optimism-sepolia.blockscout.com'],
                                            },
                                        ],
                                    });
                                } catch (error) {
                                    console.error('Failed to add optimism sepolia network');
                                }
                            } else {
                                console.error('Failed to switch to optimism sepolia network');
                            }
                        }
                    }

                    // Get account and balance
                    const signer = provider.getSigner();
                    const currentAccount = await signer.getAddress();
                    const currentBalance = await signer.getBalance();

                    this.wallet_address = currentAccount.toString();
                    this.currencyBalance = parseFloat(ethers.utils.formatEther(currentBalance || ethers.constants.Zero)).toFixed(4);
                    this.getAllRoles();
                } else {
                    this.$vs.notify({
                        title: 'MetaMask is not installed.',
                        text: 'Please install MetaMask and try again.',
                        color: 'danger',
                    });
                    console.warn('Window or window.ethereum is not available.');
                }
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        },
        getAllRequests(meetingId) {
            fetch(`https://api.cast.decast.live/api/nft/gating/admin/all/data/?cast_id=${meetingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            }).then(result => {
                this.acceptedRequest = [];
                this.pendingRequest = [];
                this.isAdmin = true;
                result.data.forEach((req) => {
                    if (req.isReqAccepted) {
                        this.acceptedRequest.push(req);
                    } else {
                        this.pendingRequest.push(req);
                    }
                })
            }).catch(error => {
                fetch(`https://api.cast.decast.live/api/nft/gating/all/data/?cast_id=${meetingId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                }).then(result => {
                    this.isAdmin = false;
                    this.acceptedRequest = result;
                }).catch(error => {

                });
            });

        },
        openRequestAccessModal(roleName) {
            this.roleRequest = roleName;
            this.setActiveModal('requestAccessModal');
        },
        async getAllRoles() {
            const castId = this.$route.params.castId;
            try {
                document.getElementById('loading-bg-transparent-title').innerText = 'Fetching all tokens';
                document.getElementById('loading-bg-transparent').style.display = 'flex';
                const tokenIds = await tokenContractWithSigner.getTokenIdsFromEventId(castId);
                const roles = await tokenContractWithSigner.getAccessLevelsFromEventId(castId);
                const pricePromises = tokenIds.map(tokenId =>
                    tokenContractWithSigner.getTicketPriceFromTokenId(tokenId._hex)
                );

                const whiteListPromises = tokenIds.map(tokenId =>
                    tokenContractWithSigner.getWhitelistBooleanFromTokenId(tokenId._hex)
                );

                //It fetch user request status
                const userRequestStatus = await this.getRequestStatus();

                const [ticketprices, isWhiteListed] = await Promise.all([
                    Promise.all(pricePromises),
                    Promise.all(whiteListPromises),
                ]);
                const rolesList = [];
                for (let i = 0; i < ticketprices.length; i++) {
                    const filteredStatus = userRequestStatus ? userRequestStatus.filter(userReq => userReq.role === roles[i]) : [];
                    const address = ethers.utils.getAddress(this.wallet_address);
                    const isPurchased = await tokenContractWithSigner.balanceOf(address, tokenIds[i]);
                    if (filteredStatus.length > 0) {
                        rolesList.push({
                            roleName: roles[i],
                            tokenId: tokenIds[i],
                            isWhiteListed: isWhiteListed[i],
                            ticketPrice: ethers.utils.formatEther(ticketprices[i]._hex).toString(),
                            isRequested: true,
                            isReqAccepted: filteredStatus[0].isReqAccepted,
                            isReqRejected: filteredStatus[0].isReqRejected,
                            isPurchased: isPurchased.toNumber() > 0,
                        })
                    } else {
                        rolesList.push({
                            roleName: roles[i],
                            tokenId: tokenIds[i],
                            isWhiteListed: isWhiteListed[i],
                            ticketPrice: ethers.utils.formatEther(ticketprices[i]._hex).toString(),
                            isRequested: false,
                            isReqAccepted: false,
                            isReqRejected: false,
                            isPurchased: isPurchased.toNumber() > 0,
                        })
                    }
                }
                this.rolesList = rolesList;
                document.getElementById('loading-bg-transparent').style.display = 'none';
            } catch (error) {
                document.getElementById('loading-bg-transparent').style.display = 'none';
                console.error("Error calling contract function:", error);
            }
        },
    },
    computed: {
        accessToken() {
            return this.$store.state.auth.accessToken;
        },
        activeUserInfo() {
            return this.$store.state.AppActiveUser;
        },
        bannerStyle() {
            return {
                backgroundImage: `url(${this.castDetails.cover_image})`
            };
        }
    },
};
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.join-type {
    color: #5B96EB;
    width: 60%;
}

.cr-content {
    position: relative;
}

.cr-content-br {
    filter: blur(8px);
}

.cr-content-br-bg {
    position: absolute;
    left: 100px;
    right: 100px;
    top: 60px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    padding: 14px;
    background: #000000;
    border: 1px solid #FFFFFF;
}

.req-modal-btn {
    background-color: transparent;
    border: none;
    outline: none;
    color: #FFFFFF;
    cursor: pointer;
    transition: 0.2s color ease;
}

.req-modal-btn:hover {
    color: #D7DF23;
}

.custom-button {
    border: 1px solid black;
    background-color: #D7DF23;
    box-shadow: 3px 3px 0px 0px #fff;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 185px;
    padding: 0.6rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 6px;
}

.custom-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.custom-button:hover {
    transition: 0.2s ease-in-out;
    box-shadow: 5px 5px 0px 0px #fff !important;
}

.custm-style-btn {
    border: 1px solid black;
    background-color: #D7DF23;
    box-shadow: 3px 3px 0px 0px #fff;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 185px;
    padding: 0.05rem 0.4rem 0.05rem 0.6rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 6px;
}

.custm-style-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.custm-style-btn-dark {
    border: 1px solid #FFFFFF;
    background-color: #000000;
    box-shadow: 3px 3px 0px 0px #fff;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 185px;
    padding: 0.05rem 0.4rem 0.05rem 0.6rem;
    font-weight: 400;
    cursor: pointer;
    margin-top: 6px;
}

.custm-style-btn-dark:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.crc-section>* {
    margin-bottom: 14px;
}

.crc-img {
    height: 130px;
    width: 130px;
}

.crc-img img {
    height: 130px;
    width: 130px;
    object-fit: cover;
}

.crc-detail {
    margin-left: 10px;
}

.crc-detail p {
    margin-bottom: 4px;
    color: #FFFFFF;
}

.bg-color {
    background-color: #000000 !important;
}

.brand-text {
    color: #FFFFFF;
    font-size: 22px;
}

.product-logo {
    height: 56px;
    width: 56px;
}

.pg-content {
    padding-top: 5px;
    padding-bottom: 5px;
}

.pg-header,
.pg-content {
    padding-left: 10rem;
    padding-right: 10rem;
}

.content-left {
    flex: 0.4;
    margin-right: 5px;
    background-color: #1B1B1B;
    height: 100%;
    position: relative;
}

.content-right {
    flex: 0.6;
    margin-left: 5px;
    background-color: #1B1B1B;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}

.cl-banner {
    position: relative;
    background-image: url("https://www.w3schools.com/csSref/img_5terre.jpg");
    aspect-ratio: 2.4/1;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
}

.cl-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20%;
    width: 100%;
}

.cl-logo>* {
    margin-bottom: 14px;
}

.cl-logo h2 {
    color: #D7DF23;
}

.cl-logo span {
    color: #868686;
}

.cl-logo-img {
    width: 40%;
    aspect-ratio: 1/1;
    object-fit: cover;
    z-index: 999;
}

.instr-1,
.instr-2,
.instr-3 {
    border-top: 1px solid #383838;
    /* margin-left: 2rem;
    margin-right: 2rem;
    padding-top: 1rem; */
    width: 100%;
    padding: 1rem 2rem 0rem 2rem;
    width: -webkit-fill-available;
}

.instr-1 p {
    color: #B4B4B4;
    text-align: center;
    line-height: 1.4;
}

.instr-2>* {
    margin-bottom: 8px;
}

.instr-2 p {
    color: #FFFFFF;
}

.instr-2 span {
    color: #B4B4B4;
    transition: color 0.3s ease;
    cursor: pointer;
}

.instr-2 span:hover {
    color: #D7DF23 !important;
}

.instr-3 h5 {
    color: #787878;
    font-weight: 800;
}

.instr-3>* {
    margin-bottom: 14px;
}

.instr-3-ulogo {
    height: 50px;
    width: 50px;
    object-fit: cover;
}

.instr-3-udetail {
    display: flex;
    flex-direction: column;
}

.instr-3-udetail p {
    color: #FFFFFF;
    margin-left: 10px;
    font-size: 16px;
}

.instr-3-udetail span {
    color: #D7DF23;
    margin-left: 10px;
}

.cr-head {
    border-bottom: 1px solid #383838;
}

.cr-head h2 {
    color: #D7DF23;
    margin-bottom: 14px;
}

.cr-head p {
    color: #5B96EB;
    margin-bottom: 14px;
    line-height: 1.4;
}

.cr-head span {
    color: #FFFFFF;
    cursor: pointer;
}

.editBrandingDiv {
    position: absolute;
    top: 6px;
    right: 6px;
    background-color: #000000;
    border-radius: 6px;
    padding: 5px;
    cursor: pointer;
}
</style>