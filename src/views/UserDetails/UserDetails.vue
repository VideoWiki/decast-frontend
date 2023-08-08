<template>
  <div class="p-20 background">
    <div class="flex mt-20 vx-card card-border relative round p-2">
      <img
        :src="coverImage"
        alt="cover Image"
        class="w-3/12 h-64 py-4 px-2 mx-1 round"
      />
      <div class="w-9/12 mx-5 py-4">
        <h3>
          {{ eventName }}
          <button
            :disabled="disableCopyID"
            class="whiteBtn cursor-pointer"
            @click="copyID"
            content="Copy cast ID"
            v-tippy="{ placement: 'top', arrow: true }"
          >
            <span></span>
            <vs-icon
              icon-pack="feather"
              icon="icon-clipboard"
              size="17px"
              rounded="true"
              style="align-self: center"
            >
            </vs-icon>
          </button>
          <ApiPopup />
        </h3>
        <p class="my-4 text-justify">{{ eventDescription }}</p>
        <div class="buttons absolute flex w-9/12">
          <h5 v-if="running" class="text-green">Cast is Live</h5>
          <h5 v-else-if="expired" class="text-danger">Cast Ended</h5>
          <h5 v-else>Cast not started yet</h5>
          <div class="flex">
            <!-- <Templates
              v-if="!stepOneProps.send_otp"
              :userType="this.userType"
              :stream_urls="this.stream_urls"
              :viewer_mode="this.viewer_mode"
              :vc_Details="
                !(
                  !(nft_details_submitted && vc_details_submitted) &&
                  !pub_nft_flow
                )
              "
            /> -->
            <vs-button
              v-if="!running"
              @click="joinNow(eventName, public_meeting_id)"
              class="ml-2 mr-1"
            >
              Start Cast
            </vs-button>
            <vs-button
              class="ml-2 mr-10"
              @click="airdrops = true"
              v-if="
                !(this.nft_details_submitted && this.vc_details_submitted) &&
                !pub_nft_flow
              "
            >
              Airdrops
            </vs-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Already added users  -->

    <div class="vx-col md:w-1/1 w-full flex flex-wrap">
      <div
        class="vx-card no-shadow card-border p-5 mb-2 pb-20 flex flex-wrap space-around"
        ref="parentSidebarUserTable"
        id="parentx"
      >
        <div
          class="vx-col md:w-1/1 w-full flex flex-wrap items-center justify-end"
        >
          <div class="flex flex-wrap items-center p-2 my-1"></div>
        </div>
        <div
          class="vx-row no-gutter w-full flex flex-wrap jutsify-left mt-1 mb-3"
        >
          <span class="heading mx-4">Invite Users</span>
          <button
            color="primary"
            type="border"
            @click="showInvite = true"
            class="invite-button mx-2 p-4"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon-plus"
              size="17px"
              rounded="true"
              style="align-self: center"
            >
            </vs-icon>
            Add
          </button>

          <button
            color="primary"
            type="border"
            @click="inviteeListUpload"
            class="invite-button mx-2 px-4"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon-upload-cloud"
              size="17px"
              rounded="true"
              style="align-self: center"
            >
            </vs-icon>
            upload
          </button>
          <div class="w-full px-2 text-white">hello</div>
          <vs-button
            v-if="
              stream_urls != null &&
              stream_urls.length > 2 &&
              stream_live_status == false &&
              (public_stream == true || public_stream == false)
            "
            @click.prevent="startStream"
            color="primary"
            class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
          >
            <span class="flex flex-wrap">
              <span></span>
              <vs-icon
                content="This will start the stream."
                v-tippy="{ placement: 'top', arrow: true }"
                icon-pack="feather"
                icon="icon-play"
                size="20px"
                rounded="true"
                style="align-self: center"
              >
              </vs-icon>
            </span>
          </vs-button>

          <vs-button
            v-if="
              stream_urls != null &&
              stream_urls.length > 2 &&
              stream_live_status == true &&
              (public_stream == true || public_stream == false)
            "
            @click.prevent="endStream"
            class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
          >
            <span
              class="flex flex-wrap"
              content="If a stream is live, This will end the stream"
              v-tippy="{ placement: 'top', arrow: true }"
            >
              <span></span>
              <vs-icon
                icon-pack="feather"
                icon="icon-pause"
                size="20px"
                rounded="true"
                style="align-self: flex-end"
              >
              </vs-icon>
            </span>
          </vs-button>
          <vs-button
            v-if="isAirdrop && pub_nft_flow"
            @click="
              public_nft_status
                ? changePublicNftStatus('False')
                : changePublicNftStatus('True')
            "
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
          >
            <span class="flex flex-wrap align-bottom">
              {{ public_nft_status ? 'Disable Claim NFT' : 'Enable Claim NFT' }}
              <div>
                &nbsp;
                <span></span>
                <vs-icon
                  content="Allow the Viewers/Attendees to mint the NFT"
                  v-tippy="{ placement: 'top', arrow: true }"
                  icon-pack="feather"
                  icon="icon-info"
                  size="12px"
                  rounded="true"
                  style="align-self: flex-end"
                >
                </vs-icon>
              </div>
            </span>
          </vs-button>

          <span></span>
          <share-popup :isAirdrop="isAirdrop" :pub_nft_flow="pub_nft_flow" />
          <span></span>
          <vs-button
            v-if="this.users"
            @click="inviteeListDownload"
            class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
            content="Download Invitee List"
            v-tippy="{ placement: 'top', arrow: true }"
          >
            <vs-icon
              icon-pack="feather"
              icon="icon-download"
              size="20px"
              rounded="true"
              style="align-self: flex-end"
            >
            </vs-icon>
          </vs-button>

          <div v-if="nft_details_submitted && !certificate_enabled">
            <vs-button
              content="Edit NFT"
              @click="NFTEdit"
              v-tippy="{ placement: 'top', arrow: true }"
              class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-edit"
                size="20px"
                rounded="true"
                style="align-self: flex-end"
              >
              </vs-icon>
            </vs-button>
          </div>
          <div v-if="certificate_enabled">
            <span></span>
            <vs-button
              class="BTN text-base lg:text-lg mx-2 my-1 airdrop-btn"
              @click.stop="CertificateEdit"
              content="Edit Certificate"
              v-tippy="{ placement: 'top', arrow: true }"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-edit"
                size="20px"
                rounded="true"
                style="align-self: flex-end"
              >
              </vs-icon>
            </vs-button>
            <!-- </tippy> -->
          </div>
          <vs-button
            v-if="
              (nft_enable_count <= 0 || certificate_done) && certificate_enabled
            "
            disabled
            @click="setMerkleTool"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Certificate Drop
          </vs-button>
          <vs-button
            v-if="
              nft_enable_count > 0 && !certificate_done && certificate_enabled
            "
            @click="setMerkleTool"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Certificate Drop</vs-button
          >
          <vs-button
            v-if="
              (nft_enable_count <= 0 || airdrop_done) &&
              event_nft_enabled &&
              this.nft_details_submitted
            "
            disabled
            @click="audienceDropMail"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Airdrop
          </vs-button>
          <vs-button
            v-if="nft_enable_count > 0 && !airdrop_done && event_nft_enabled"
            @click="audienceDropMail"
            class="text-white text-base lg:text-lg mx-2 my-1 airdrop-btn"
            >Airdrop</vs-button
          >
        </div>
        <div
          class="vx-col md:w-1/1 flex flex flex-wrap items-center justify-start pl-5"
        ></div>
        <div class="vx-col md:w-1/1 w-full flex flex-wrap items-center p-2">
          <p class="add-user" style="align-self: center">Added User List</p>
        </div>

        <div v-if="!users" class="w-full">No users added</div>
        <!-- Normal table when no nft is enabled -->
        <div
          class="w-full"
          v-else-if="!event_nft_enabled && !certificate_enabled"
        >
          <vs-table stripe :data="users">
            <template slot="thead">
              <vs-th class="normal headingFont"> Status </vs-th>
              <vs-th class="normal headingFont"> Role </vs-th>
              <vs-th class="normal headingFont"> Email </vs-th>
              <vs-th class="normal headingFont"> Delete </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="index" v-for="(user, index) in data">
                <vs-td v-if="user.email">
                  <span v-if="user.joined">
                    <span></span>
                    <vs-icon
                      content="Joined the event"
                      v-tippy="{ placement: 'top', arrow: true }"
                      icon-pack="feather"
                      icon="icon-user-check"
                      size="24px"
                      color="green"
                      rounded="true"
                    ></vs-icon>
                  </span>
                  <span v-else>
                    <span></span>
                    <vs-icon
                      content="Didn't joined the event"
                      v-tippy="{ placement: 'top', arrow: true }"
                      icon-pack="feather"
                      icon="icon-user-x"
                      size="24px"
                      color="red"
                      rounded="true"
                    ></vs-icon>
                  </span>
                </vs-td>

                <vs-td v-if="user.email">
                  {{ user.role }}
                </vs-td>

                <vs-td v-if="user.email">
                  {{ user.email }}
                </vs-td>

                <vs-td class="delete" v-if="user.email">
                  <vs-icon
                    icon-pack="feather"
                    icon="icon-trash-2"
                    class="cursor"
                    @click.stop="removeUser(user, index)"
                    size="24px"
                    rounded="true"
                    v-if="user.email"
                  >
                  </vs-icon>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <div
          class="w-full mx-auto"
          v-else-if="event_nft_enabled || certificate_enabled"
        >
          <vs-table stripe :data="users" :hoverFlat="true">
            <template slot="thead">
              <vs-th class="normal headingFont"> Status </vs-th>
              <vs-th class="normal headingFont"> Role </vs-th>
              <vs-th class="normal headingFont"> Email </vs-th>
              <vs-th class="normal headingFont"> Wallet Address </vs-th>
              <vs-th
                class="normal headingFont"
                v-if="certificate_enabled && vc_details_submitted"
                >VC status</vs-th
              >

              <vs-th
                class="normal headingFont"
                v-if="certificate_enabled && vc_details_submitted"
              >
                Enable Certificate</vs-th
              >

              <vs-th
                class="normal headingFont"
                v-if="event_nft_enabled && nft_details_submitted"
                >NFT status</vs-th
              >

              <vs-th
                class="normal"
                v-if="event_nft_enabled && nft_details_submitted"
                >Enable NFT</vs-th
              >

              <vs-th class="normal headingFont"> Delete </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="index" v-for="(user, index) in data" class="my-2">
                <vs-td>
                  <span v-if="user.joined">
                    <span></span>
                    <vs-icon
                      content="Joined the event"
                      v-tippy="{ placement: 'top', arrow: true }"
                      icon-pack="feather"
                      icon="icon-user-check"
                      size="24px"
                      color="green"
                      rounded="true"
                    ></vs-icon>
                  </span>
                  <span v-else>
                    <span></span>
                    <vs-icon
                      content="Didn't joined the event"
                      v-tippy="{ placement: 'top', arrow: true }"
                      icon-pack="feather"
                      icon="icon-user-x"
                      size="24px"
                      color="red"
                      rounded="true"
                    ></vs-icon>
                  </span>
                </vs-td>
                {{ user.joined }}
                <vs-td>
                  {{ user.role == null ? 'attendee' : user.role }}
                </vs-td>

                <vs-td>
                  {{ user.email }}
                </vs-td>

                <vs-td>
                  <span v-if="user.wallet_address">
                    {{
                      user.wallet_address.slice(0, 4) +
                      '***************' +
                      user.wallet_address.slice(
                        user.wallet_address.length - 4,
                        user.wallet_address.length
                      )
                    }}
                  </span>
                  <span class="text-danger" v-else
                    >Wallet is not connected yet...</span
                  >
                </vs-td>

                <vs-td v-if="certificate_enabled && vc_details_submitted">
                  <span
                    v-if="
                      certificate_enabled &&
                      user.vc_enable &&
                      user.vc_mint_status &&
                      vc_details_submitted
                    "
                  >
                    <span
                      content="Not Clicked"
                      v-tippy="{ placement: 'top', arrow: true }"
                      v-if="
                        user.vc_mint_status == 'not started' ||
                        user.vc_mint_status == null
                      "
                    >
                      <div
                        class="ml-1"
                        style="
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: #afb7c7;
                        "
                      ></div>
                      <span></span>
                    </span>
                    <span
                      content="clicked"
                      v-tippy="{ placement: 'top', arrow: true }"
                    >
                      <div
                        class="ml-1"
                        style="
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: #ffff00;
                        "
                      ></div>
                      <span></span>
                    </span>
                    <span
                      content="Claimed"
                      v-tippy="{ placement: 'top', arrow: true }"
                      v-if="user.vc_mint_status == 'successful'"
                    >
                      <div
                        class="ml-1"
                        style="
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: #01c34e;
                        "
                      ></div>
                      <span></span>
                    </span>
                  </span>
                </vs-td>

                <vs-td v-if="certificate_enabled && vc_details_submitted">
                  <span
                    v-if="
                      user.wallet_address &&
                      certificate_enabled &&
                      vc_details_submitted
                    "
                  >
                    <vs-checkbox
                      @change="enableCertificate(user, index)"
                      v-model="user.vc_enable"
                      :disabled="user.vc_mint_status == 'successful'"
                    ></vs-checkbox>
                  </span>
                </vs-td>

                <vs-td v-if="event_nft_enabled && nft_details_submitted">
                  <span
                    v-if="
                      event_nft_enabled &&
                      user.nft_enable &&
                      user.mint_status &&
                      nft_details_submitted
                    "
                  >
                    <span
                      content="Not Clicked"
                      v-tippy="{ placement: 'top', arrow: true }"
                      v-if="user.mint_status == 'not started'"
                    >
                      <div
                        class="ml-1"
                        style="
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: #afb7c7;
                        "
                      ></div>
                      <span></span>
                    </span>
                    <span
                      content="Clicked"
                      v-tippy="{ placement: 'top', arrow: true }"
                      v-if="user.mint_status == 'started'"
                    >
                      <div
                        class="ml-1"
                        style="
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: #ffff00;
                        "
                      ></div>
                      <span></span>
                    </span>
                    <span
                      content="Claimed"
                      v-tippy="{ placement: 'top', arrow: true }"
                      v-if="user.mint_status == 'successful'"
                    >
                      <div
                        class="ml-1"
                        style="
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: #01c34e;
                        "
                      ></div>
                      <span></span>
                    </span>
                  </span>
                </vs-td>

                <vs-td
                  style="padding: 10px"
                  v-if="event_nft_enabled && nft_details_submitted"
                >
                  <span
                    v-if="
                      user.wallet_address &&
                      event_nft_enabled &&
                      nft_details_submitted
                    "
                  >
                    <vs-checkbox
                      @change="clickIndex(user, index)"
                      v-model="user.nft_enable"
                      :disabled="user.mint_status == 'successful'"
                    ></vs-checkbox>
                  </span>
                </vs-td>

                <vs-td>
                  <vs-icon
                    icon-pack="feather"
                    icon="icon-trash-2"
                    class="cursor delete"
                    @click.stop="removeUser(user, index)"
                    size="24px"
                    rounded="true"
                  >
                  </vs-icon>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </div>
    <vs-popup
      :active.sync="showPopup"
      ref="uploadModal"
      title="Invite Attendee"
    >
      <div class="modal p-6">
        <div>
          <h5 class="my-2">Invite Attendee</h5>
          <p class="my-2">
            Invite many attendees by submitting an Excel sheet.
          </p>
        </div>
        <div class="vx-col md:w-1/1 width w-full form-group">
          <div
            class="upload-btn-wrapper cursor-pointer items-center w-full"
            @drop.prevent="handleSheet"
            @dragenter.prevent=""
            @dragover.prevent=""
            @click="sheet"
          >
            <button class="btn w-full border px-8 pt-10 pb-2">
              <span>
                <vs-icon
                  icon-pack="feather"
                  icon="icon-upload-cloud"
                  size="32px"
                  rounded="true"
                  class="upload mt-3"
                >
                </vs-icon>
                <br />
                <div class="">
                  <span class="font-bold purple">Click to upload</span> or drag
                  and drop
                  <br />
                  <span class="px-4">xlsx, xls or xlsm</span>
                </div>
              </span>
            </button>
            <input
              class="hide"
              type="file"
              name="Excel sheet"
              id="sheetUpload"
              ref="sheetUpload"
              @change="uploadSheet"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </div>
        </div>
        <div class="w-full border px-6 pt-6">
          <h4>
            <vs-icon
              icon-pack="feather"
              icon="icon-file"
              size="16px"
              class="px-2"
              rounded="true"
            >
            </vs-icon
            >{{ sheetFileName }}
          </h4>
          <div class="flex px-8">
            <progress
              max="100"
              class="w-10/12 py-1"
              :value.prop="uploadPercentage"
            ></progress>
            <p class="w-2/12 px-4" style="line-height: 15px">
              {{ uploadPercentage }}%
            </p>
          </div>
        </div>
        <div class="flex">
          <button class="whiteBtn w-full cursor mx-2">
            <a
              href="https://videowikistorage.blob.core.windows.net/room-db-backup/Sample_Invitee_List.xlsx"
              class="text-black"
            >
              <vs-icon
                icon-pack="feather"
                icon="icon-download"
                size="16px"
                rounded="true"
                style="align-self: flex-end"
              >
              </vs-icon>
              <span class="pl-1">Sample List</span>
            </a>
          </button>
          <vs-button
            class="text-base w-full mx-2 lg:text-lg"
            @click="submitSheet"
          >
            Invite People
          </vs-button>
        </div>
      </div>
    </vs-popup>
    <vs-popup :active.sync="showInvite" ref="inviteModal">
      <Invite
        :viewer_mode="viewer_mode"
        :stream_urls="stream_urls"
        :closePopup="() => (showInvite = false)"
        :showInvite="showInvite"
        :userDetails="userDetails"
    /></vs-popup>
    <vs-popup :active.sync="airdrops" ref="airdrops">
      <div v-if="airdrops">
        <div class="vx-row px-5 no-gutter" v-if="!nft_details_submitted">
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
            <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
              <div class="flex flex-wrap w-full form-group items-center">
                <label class="m-0">
                  <span class="flex flex-wrap">NFT &nbsp; </span>
                </label>
                <div>
                  <vs-switch
                    v-model="stepOneProps.audienceAirdrop"
                    v-on:change="updateGiveNft()"
                  />
                </div>
              </div>
              <hr
                v-if="stepOneProps.audienceAirdrop"
                class="w-full mt-5 border-light"
              />
              <div
                v-if="stepOneProps.audienceAirdrop"
                class="vx-row w-full mt-5"
              >
                <div
                  class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap items-center justify-left"
                >
                  <vs-chip class="p-1">
                    <vs-radio
                      v-model="stepOneProps.airdropType"
                      :class="[
                        stepOneProps.airdropType == 'NFTs'
                          ? 'dual-toggle-active'
                          : '',
                        'dual-toggle',
                        'm-0',
                        'p-1',
                        'pr-3',
                        'pl-3',
                      ]"
                      vs-value="NFTs"
                      v-on:change="updateGiveNft()"
                      >NFTs</vs-radio
                    >
                    <vs-radio
                      v-model="stepOneProps.airdropType"
                      :class="[
                        stepOneProps.airdropType == 'Token'
                          ? 'dual-toggle-active'
                          : '',
                        'dual-toggle',
                        'm-0',
                        'p-1',
                        'pr-3',
                        'pl-3',
                      ]"
                      vs-value="Token"
                      disabled
                      v-on:change="updateGiveNft()"
                      >Token</vs-radio
                    >
                  </vs-chip>
                </div>
                <div
                  class="vx-col md:w-1/2 w-full mt-5 flex flex-wrap items-center justify-end"
                >
                  <div
                    class="vx-col md:w-1/1 w-full mb-2 flex flex-wrap items-center justify-end"
                  >
                    <label class="mr-6 formgroup-label"
                      >NFT Distribution
                    </label>
                  </div>
                  <div
                    class="vx-col w-full flex flex-wrap items-center justify-end"
                  >
                    <vs-chip class="p-1">
                      <vs-radio
                        v-model="stepOneProps.public_stream_nfts"
                        id="public_stream_nfts_true"
                        :class="[
                          stepOneProps.public_stream_nfts === 'true'
                            ? 'dual-toggle-active'
                            : '',
                          'dual-toggle',
                          '-m-2',
                          'p-1',
                          'pr-3',
                          'pl-3',
                        ]"
                        @change="typeOfNft()"
                        vs-value="true"
                        ><span class="flex flex-wrap">
                          Public &nbsp;

                          <span></span> </span
                      ></vs-radio>
                      <vs-radio
                        v-model="stepOneProps.public_stream_nfts"
                        id="public_stream_nfts_false"
                        :class="[
                          stepOneProps.public_stream_nfts === 'false'
                            ? 'dual-toggle-active'
                            : '',
                          'dual-toggle',
                          'mr-1',
                          'p-1',
                          'pr-3',
                          'pl-3',
                        ]"
                        vs-value="false"
                        @change="typeOfNft()"
                        ><span class="flex flex-wrap">
                          Private &nbsp;

                          <span></span>
                        </span>
                      </vs-radio>
                    </vs-chip>
                  </div>
                </div>
              </div>
              <div
                v-if="
                  stepOneProps.audienceAirdrop &&
                  stepOneProps.airdropType == 'NFTs'
                "
                class="vx-row w-full mt-5"
              >
                <div
                  class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap"
                >
                  <label class="m-0">Select a Network</label>
                  <vs-collapse
                    open-click
                    class="selectType form-group w-full normal custom-select"
                  >
                    <vs-collapse-item>
                      <div
                        id="network"
                        slot="header"
                        style="padding: 0px"
                        class="flex flex-wrap items-center"
                      >
                        <img
                          :src="selectedNetwork.image"
                          style="
                            margin-right: 10px;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                          "
                        />
                        {{ selectedNetwork.text }}
                      </div>
                      <div class="flex flex-wrap justify-center items-center">
                        <div
                          :key="index"
                          style="width: 100%"
                          class="mb-2 custom-select-item-hover"
                          @click="
                            selectNetwork(
                              item.value,
                              item.text,
                              item.image,
                              'network'
                            )
                          "
                          v-for="(item, index) in network"
                        >
                          <div
                            class="flex flex-wrap align-center"
                            style="width: 250px"
                          >
                            <img
                              :src="item.image"
                              style="
                                margin-right: 20px;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                              "
                            />
                            {{ item.text }}
                          </div>
                        </div>
                      </div>
                    </vs-collapse-item>
                  </vs-collapse>
                </div>
                <div
                  class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap"
                >
                  <label class="m-0"
                    >Contract Address <span class="text-danger">*</span></label
                  >
                  <vs-input
                    id="contract_address"
                    v-model="stepOneProps.contract_address"
                    class="w-full form-group"
                    placeholder="Ex: 0x0710A4F91Dfa5c88A81A5b7a7670b579880dA5Df"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.contract_address_error"
                    >Contact Address is required</span
                  >
                </div>
                <div
                  class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group"
                >
                  <label class="m-0"
                    >ABI <span class="text-danger">*</span></label
                  >
                  <vs-textarea
                    id="aib"
                    v-model="stepOneProps.aib"
                    class="w-full form-group"
                    placeholder='Ex: [{"internalType": "uint256","name": "_count","type": "uint256"}]'
                    rows="4"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  /><span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.aib_error"
                    >ABI field is required</span
                  >
                </div>
                <div
                  class="vx-col md:w-1/3 w-full mt-5 form-group flex flex-wrap"
                >
                  <label class="m-0">Parameters</label>
                  <vs-input
                    id="parameter"
                    v-model="stepOneProps.parameter"
                    class="w-full form-group"
                    placeholder='Ex: {"_count": 1}'
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.parameter_error"
                    >Parameters are required</span
                  >
                </div>
                <div
                  class="vx-col md:w-1/3 w-full mt-5 flex flex-wrap form-group"
                >
                  <label class="m-0 p-0"
                    >Mint Function Name
                    <span class="text-danger">*</span></label
                  >
                  <vs-input
                    id="mint_function_name"
                    v-model="stepOneProps.mint_function_name"
                    class="w-full form-group"
                    placeholder="Ex: mintNFTs"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.mintfnc_name_error"
                    >Mint Function field is required</span
                  >
                </div>
                <div
                  class="vx-col md:w-1/3 w-full mt-5 flex flex-wrap form-group"
                >
                  <label class="m-0">Price </label>
                  <vs-input
                    id="price"
                    v-model="stepOneProps.price"
                    class="w-full form-group"
                    placeholder="Ex: 0.0009 (ETH)"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.price_error"
                    >Price field is required</span
                  >
                </div>
                <div
                  class="vx-col md:w-2/3 w-full mt-5 flex flex-wrap form-group"
                >
                  <label class="m-0"
                    >Description <span class="text-danger">*</span></label
                  >
                  <vs-textarea
                    id="nft_description"
                    v-model="stepOneProps.nft_description"
                    class="w-full form-group"
                    placeholder="Explain the utility of the NFT"
                    rows="3"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  /><span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.nft_description_error"
                    >Description of NFT is required</span
                  >
                </div>
                <div class="vx-col md:w-1/3 w-full mt-5 form-group">
                  <label class="m-0"
                    >Sample NFT<span class="text-danger">*</span></label
                  >
                  <input
                    type="file"
                    class="w-full form-control mt-4"
                    style="
                      height: 40px;
                      padding: 0.7rem !important;
                      font-size: 1rem !important;
                    "
                    name="Sample nft"
                    id="nft_image"
                    ref="nft_image"
                    v-on:change="uploadSampleNft"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.nft_image_error"
                    >Sample NFT is required</span
                  >
                </div>
                <div v-if="!stepOneProps.give_nft">
                  <vs-button
                    class="btn-wizard py-4 px-5 ml-5"
                    @click.stop="addNft(true)"
                    >Add NFT</vs-button
                  >
                </div>
              </div>
              <div
                v-if="stepOneProps.give_nft"
                class="vx-card no-shadow card-border p-5 flex flex-wrap"
              >
                <div class="flex flex-wrap w-full form-group items-center">
                  <label class="m-0">
                    <!-- <span class="flex flex-wrap">
                      Collect Wallet Address
                      <div class="">
                      &nbsp;
                    </div>

                      <span></span>
                      <vs-icon
                        class="pl-2px"
                        icon-pack="feather"
                        icon="icon-info"
                        size="12px"
                        rounded="true"
                        style="align-self: flex-end"
                      ></vs-icon>
                    </span> -->
                    <label class="tooltips">
                      <span>
                        Collect Wallet Address
                        <vs-icon
                          class="pl-2px"
                          icon-pack="feather"
                          icon="icon-info"
                          size="12px"
                          rounded="true"
                          style="align-self: flex-end"
                        ></vs-icon>
                      </span>
                      <span class="tooltipstext p-5">
                        <b
                          >The wallet information of attendees is saved with
                          encryption and only used for the airdrop configured by
                          the event admin.</b
                        >
                      </span>
                    </label>
                  </label>
                  <div>
                    <vs-switch v-model="stepOneProps.give_nft" disabled />
                  </div>
                </div>
              </div>
              <div v-if="stepOneProps.give_nft">
                <vs-button
                  class="btn-wizard py-4 px-5 mt-5"
                  @click.stop="addNft(true)"
                  >Add NFT</vs-button
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Verifiable Certificate drop -->
        <div
          class="vx-row px-5 no-gutter"
          v-if="
            !vc_details_submitted &&
            (this.stepOneProps.public_otp || this.stepOneProps.send_otp)
          "
        >
          <div class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap">
            <div class="vx-card no-shadow card-border p-5 flex flex-wrap">
              <div class="flex flex-wrap w-full form-group items-center">
                <label class="m-0">
                  <span class="flex flex-wrap"
                    >Verifiable Certificate &nbsp;
                  </span>
                </label>
                <div>
                  <vs-switch
                    v-model="certificateProps.audienceAirdrop"
                    v-on:change="updateGiveNft()"
                  />
                </div>
              </div>
              <hr
                v-if="certificateProps.audienceAirdrop"
                class="w-full mt-5 border-light"
              />
              <div
                v-if="certificateProps.audienceAirdrop"
                class="vx-row w-full mt-5"
              >
                <div
                  class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap"
                >
                  <label class="m-0">Select a Network</label>
                  <vs-collapse
                    open-hover
                    class="selectType form-group w-full normal custom-select"
                    id="Certificate-Network"
                  >
                    <vs-collapse-item>
                      <div
                        slot="header"
                        style="padding: 0px"
                        class="flex flex-wrap items-center"
                      >
                        <img
                          :src="selectedNetwork.image"
                          style="
                            margin-right: 10px;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                          "
                        />
                        {{ selectedNetwork.text }}
                      </div>
                      <div class="flex flex-wrap justify-center items-center">
                        <div
                          :key="index"
                          style="width: 100%"
                          class="mb-2 custom-select-item-hover"
                          @click="
                            selectNetwork(
                              item.value,
                              item.text,
                              item.image,
                              'Certificate-NetworK'
                            )
                          "
                          v-for="(item, index) in network"
                        >
                          <div
                            class="flex flex-wrap align-center"
                            style="width: 250px"
                          >
                            <img
                              :src="item.image"
                              style="
                                margin-right: 20px;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                              "
                            />
                            {{ item.text }}
                          </div>
                        </div>
                      </div>
                    </vs-collapse-item>
                  </vs-collapse>
                </div>
                <div
                  class="vx-col md:w-1/2 w-full mt-5 form-group flex flex-wrap"
                >
                  <label class="m-0"
                    >Contract Address <span class="text-danger">*</span></label
                  >
                  <vs-input
                    id="contract_address"
                    v-model="certificateProps.contract_address"
                    class="w-full form-group"
                    placeholder="Ex: 0x0710A4F91Dfa5c88A81A5b7a7670b579880dA5Df"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  />
                  <span
                    class="text-danger text-sm mt-1"
                    v-show="certificateProps.contract_address_error"
                    >Contact Address is required</span
                  >
                </div>
                <div
                  class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group"
                >
                  <label class="m-0"
                    >ABI <span class="text-danger">*</span></label
                  >
                  <vs-textarea
                    id="aib"
                    v-model="certificateProps.aib"
                    class="w-full form-group"
                    placeholder='Ex: [{"internalType": "uint256","name": "_count","type": "uint256"}]'
                    rows="4"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  /><span
                    class="text-danger text-sm mt-1"
                    v-show="stepOneProps.aib_error"
                    >ABI field is required</span
                  >
                </div>
                <div
                  class="vx-col md:w-1/1 w-full mt-5 flex flex-wrap form-group"
                >
                  <label class="m-0"
                    >Description <span class="text-danger">*</span></label
                  >
                  <vs-textarea
                    id="nft_description"
                    v-model="certificateProps.nft_description"
                    class="w-full form-group"
                    placeholder="Explain the utility of the NFT"
                    rows="3"
                    v-on:change="valueCheck()"
                    @keyup="valueCheck()"
                  /><span
                    class="text-danger text-sm mt-1"
                    v-show="certificateProps.nft_description_error"
                    >Description of NFT is required</span
                  >
                </div>
              </div>
              <div
                v-if="certificateProps.audienceAirdrop"
                class="vx-card no-shadow card-border p-5 flex flex-wrap"
              >
                <div class="flex flex-wrap w-full form-group items-center">
                  <label class="tooltips">
                    <span>
                      <b>Collect Wallet Address &nbsp;</b>
                      <vs-icon
                        class="pl-2px"
                        icon-pack="feather"
                        icon="icon-info"
                        size="12px"
                        rounded="true"
                        style="align-self: flex-end"
                      ></vs-icon>
                    </span>
                    <span class="tooltipstext p-5">
                      The wallet information of attendees is saved with
                      encryption and only used for the airdrop configured by the
                      event admin.
                    </span>
                  </label>
                  <div>
                    <vs-switch
                      v-model="certificateProps.audienceAirdrop"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div v-if="certificateProps.audienceAirdrop">
                <vs-button
                  class="btn-wizard py-4 px-5 my-5"
                  @click.stop="
                    () => {
                      addCertificate(false);
                    }
                  "
                  >Add Certificate</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>
<script>
import Invite from './Components/Invite.vue';
import ApiPopup from './Components/ApiPopup.vue';
import constants from '../../../constant';
import axios from '../../axios';
import Vue from 'vue';
import VueTippy, { tippy, TippyComponent } from 'vue-tippy';
import { ethers } from 'ethers';
import SharePopup from './Components/SharePopup.vue';
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);
export default {
  name: 'UserDetails',
  data() {
    return {
      showCopyPopup: false,
      disableCopyID: false,
      public_meeting_id: '',
      key: '',
      showInvite: false,
      smallBox: false,
      templates: false,
      inviteeSheet: '',
      sheetFileName: 'No File Selected',
      uploadPercentage: 0,
      showPopup: false,
      userNameLengthError: false,
      public_nft_status: false,
      airdrops: false,
      validEmailError: false,
      public_stream: '',
      nft_enable_count: 0,
      pub_nft_flow: false,
      event_nft_enabled: false,
      stream_urls: [],
      isAirdrop: false,
      airdrop_done: false,
      certificate_done: false,
      certificate_enabled: false,
      airDrops: false,
      walletAddress: [],
      users: [],
      userName: '',
      running: false,
      expired: false,
      userNameError: false,
      userEmailError: false,
      userEmailDuplicate: false,
      userEmail: '',
      viewer_mode: false,
      coverImage: '',
      eventName: '',
      eventDescription: '',
      enableNft: '',
      giveNft: false,
      clickedIndex: '',
      role: 'participant',
      userRoleLabel: 'Participant',
      coin: '',
      nft: '',
      abi: [],
      receipt: false,
      isPublic: true,
      nftReceiver: [],
      inviteeList: [],
      checkBox1: false,
      merkelTool: false,
      stream_live_status: false,
      nft_details_submitted: false,
      airDropList: [],
      certificateList: [],
      vc_details_submitted: false,
      userType: [
        { text: 'Co-Host/Moderator', value: 'co-host' },
        { text: 'Participant', value: 'participant' },
        { text: 'Viewer', value: 'viewer' },
        { text: 'Spectator', value: 'spectator' },
      ],
      coinType: [
        { text: 'Choose type of chain', value: '' },
        { text: 'Ethereum', value: 'ethereum' },
        { text: 'Polygon', value: 'polygon' },
      ],
      stepOneProps: {
        mint_function_name: '',
        mintfnc_name_error: false,
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        parameter: '',
        parameter_error: false,
        network: '41',
        audienceAirdrop: false,
        give_vc: false,
        airdropType: 'NFTs',
        price: '',
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        nft_image: '',
        data_token: false,
        nft_image_error: false,
        password_auth: false,
        auth_type: 'public',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: true,
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'true',
        public_nft_flow: false,
        nft_t_ype: 'NFTs',
        nft_type: 'NFTs',
      },
      certificateProps: {
        contract_address: '',
        contract_address_error: false,
        aib: '',
        aib_error: false,
        give_vc: true,
        mint_function_name: '',
        parameter: '',
        nft_image: '',
        data_token: false,
        network: '5',
        audienceAirdrop: false,
        sender_addresses: [],
        airdropType: 'vc',
        price: '',
        price_error: false,
        nft_description: '',
        nft_description_error: false,
        auth_type: 'private',
        meeting_auth_error: false,
        send_otp: false,
        public_auth: true,
        public_otp: false,
        give_nft: false,
        public_stream_nfts: 'false',
        public_nft_flow: false,
        nft_t_ype: 'vc',
        nft_type: 'vc',
      },
      nftType: [
        { text: 'Choose type of NFT', value: '' },
        { text: 'Videowiki', value: 'mana' },
        { text: 'Upload NFT', value: 'filecoin' },
      ],
      selectedNetwork: {
        text: 'Telos EVM Testnet',
        value: '41',
        image: require('../../assets/images/create-event/telosTestnet.png'),
      },
      network: [
        {
          text: 'Ethereum',
          value: '1',
          image: require('../../assets/images/create-event/ethereum.png'),
        },
        {
          text: 'Gnosis',
          value: '100',
          image: require('../../assets/images/create-event/gnosis.svg'),
        },
        {
          text: 'Polygon',
          value: '137',
          image: require('../../assets/images/create-event/polygon.png'),
        },
        {
          text: 'Telos EVM Testnet',
          value: '41',
          image: require('../../assets/images/create-event/telosTestnet.png'),
        },
        {
          text: 'Telos EVM Mainnet',
          value: '40',
          image: require('../../assets/images/create-event/telos.png'),
        },
        {
          text: 'Goerli Testnet RPC',
          value: '5',
          image: require('../../assets/images/create-event/telosTestnet.png'),
        },
      ],
      sidebarProps: {
        sidebarOpen: false,
        reduce: true,
        NotExpand: false,
      },
    };
  },
  created() {
    this.castInfo();
    this.userDetails();
  },
  mounted() {
    this.$refs.inviteModal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.inviteModal.$el.childNodes[1].style.width = '800px';
    this.$refs.airdrops.$el.childNodes[1].childNodes[0].style.display = 'none';
    this.$refs.airdrops.$el.childNodes[1].style.width = '800px';
    this.$refs.uploadModal.$el.childNodes[1].childNodes[0].style.display =
      'none';
    this.$refs.uploadModal.$el.childNodes[1].style.width = '800px';
  },
  beforeDestroy() {
    document.querySelectorAll('body > div.vs-component').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll('body > div.vs-content-sidebar').forEach((el) => {
      el.remove();
    });
  },

  methods: {
    async joinNow(eventName, public_meeting_id) {
      axios
        .post(constants.apiCastUrl + '/api/event/meeting/join/', {
          email: '',
          name: eventName,
          password: '',
          public_meeting_id: public_meeting_id,
          redirect: true,
          room_type: 'private',
          avatar_url: '',
          guest: false,

          attendee_password: this.attendee_password,
        })
        .then((response) => {
          this.responsedata = response.data.url;
          window.open(`/user_details/${public_meeting_id}`, '_blank');
          window.location.href = response.data.url;
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            color: 'success',
          });
        })
        .catch((error) => {
          this.$vs.notify({
            title: 'Oops!',
            text:
              error.response != null
                ? error.response.data.message
                : 'Check the Scheduled time',
            color: 'danger',
          });
        });
    },
    generateKey() {
      this.$store
        .dispatch(
          'studio/generateKey',
          this.$store.state.AppActiveUser.username
        )
        .then((res) => {
          alert(res.api_key);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async selectAllusers(e) {
      this.stepOneProps.sender_addresses = [];
      if (this.selectAll) {
        for (var i = 0; i < this.inviteeList.length; i++) {
          this.inviteeList[i].nft_enable = true;
          this.users[i].nft_enable = true;
          this.inviteeList[i].nft_type = 'NFTs';
          this.stepOneProps.sender_addresses.push(this.users[i].wallet_address);
        }
        this.nft_enable_count = this.inviteeList.length;
        const payload = {
          invitee_list: this.inviteeList,
          cast_id: this.$route.params.session_key,
        };
        this.$store
          .dispatch('studio/updateEnableNft', payload)
          .then(() => {
            this.$vs.notify({
              title: 'Success',
              text: 'Drop enabled for all the users',
              color: 'success',
            });
          })
          .catch((err) => {
            this.$vs.notify({
              title: 'Error',
              text:
                err.response != null ? err.response.data.message : 'Try again',
              color: 'danger',
            });
          });
      } else {
        for (i = 0; i < this.inviteeList.length; i++) {
          this.inviteeList[i].nft_enable = false;
          this.users[i].nft_enable = false;
          this.inviteeList[i].nft_type = 'NFTs';
        }
        this.nft_enable_count = 0;
        const payload = {
          invitee_list: this.inviteeList,
          cast_id: this.$route.params.session_key,
        };
        this.$store
          .dispatch('studio/updateEnableNft', payload)
          .then(() => {
            this.$vs.notify({
              title: 'Success',
              text: 'Drop disabled for all the users',
              color: 'danger',
            });
          })
          .catch((err) => {
            this.$vs.notify({
              title: 'Error',
              text:
                err.response != null ? err.response.data.message : 'Try again',
              color: 'danger',
            });
          });
      }
    },
    NFTEdit() {
      this.$router.push({
        name: 'Edit NFT',
        params: {
          cast_Id: this.$route.params.session_key,
          otp: this.stepOneProps.send_otp || this.stepOneProps.public_otp,
        },
      });
    },
    CertificateEdit() {
      this.$router.push({
        name: 'Edit Certificate',
        params: {
          cast_Id: this.$route.params.session_key,
          nft_type: 'vc',
        },
      });
    },
    async addCertificate(x) {
      if (this.canSubmitCertificate()) {
        if (
          this.certificateProps.contract_address !==
          '0x15a0b4bba8e561f13c3c1d2acd5954b7e871cfb0'
        ) {
          this.$vs.notify({
            color: 'danger',
            title: 'Wrong Credentials',
            text: 'Contract address is not correct',
          });
          return;
        }
        var payload = new FormData();
        for (var [key, value] of Object.entries(this.certificateProps)) {
          if (value.length === 0) {
            value = '';
          } else {
            if (value === false) {
              value = 'False';
            } else if (value === true) {
              value = 'True';
            } else if (value === '') {
              value = '';
            }
          }
          payload.append(key, value);
        }
        payload.append('public_meeting_id', this.$route.params.session_key);
        await this.$store
          .dispatch('studio/addNftDetails', payload)
          .then(async (res) => {
            this.$vs.notify({
              time: 6000,
              title: 'Certificate Details Submitted',
              color: 'success',
            });
            this.castInfo(false);
            this.airdrops = false;
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
            if (e) {
              this.$vs.notify({
                time: 6000,
                title: 'Error',
                text: e.response.data.message,
                color: 'danger',
              });
            }
          });
      }
    },
    copyID() {
      this.disableCopyID = true;
      setTimeout(() => {
        this.disableCopyID = false;
      }, 2000);
      navigator.clipboard.writeText(this.$route.params.session_key);
      this.$vs.notify({
        title: 'ID Copied',
        text: 'Cast id copied successfully',
        color: 'success',
      });
    },
    inviteeListUpload() {
      this.showPopup = true;
    },
    validateErrors() {
      if (this.userNameLengthError) {
        this.userNameLengthError = this.userName < 20;
      }
      if (this.validEmailError) {
        this.validEmailError = !this.validateEmail();
      }
      if (this.userNameError) {
        this.userNameError = this.username === '' && this.userEmail === '';
      }
    },
    validateEmail(email) {
      // eslint-disable-next-line no-useless-escape
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(email);
    },
    handleSheet(e) {
      const inputFiles =
        e.target.files || e.dataTransfer.files || this.$refs.sheetUpload.files;
      this.inviteeSheet = inputFiles[0];
      this.sheetFileName =
        inputFiles[0].name.length > 40
          ? inputFiles[0].name.slice(0, 39) + '...'
          : inputFiles[0].name;
    },
    submitSheet() {
      if (this.inviteeSheet === null) {
        this.$vs.notify({
          time: 3000,
          title: 'Oh No',
          text: 'No File Selected',
          color: 'warning',
        });
        return;
      }
      var formData = new FormData();
      formData.append(
        'file',
        this.inviteeSheet,
        console.log(URL.createObjectURL(this.inviteeSheet))
      );
      formData.append('cast_id', this.$route.params.session_key);
      axios
        .post(constants.apiCastUrl + '/api/event/invitee/import/', formData, {
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((res) => {
          this.$vs.notify({
            time: 3000,
            title: 'Success',
            text: 'People Invited Successfully.',
            color: 'success',
          });
          this.showPopup = false;
          this.inviteeSheet = '';
          this.sheetFileName = 'No File Selected';
          this.uploadPercentage = 0;
          this.userDetails();
        })
        .catch((e) => {
          if (e.response.data.message === 'invalid data') {
            this.$vs.notify({
              time: 3000,
              title: 'Try Again',
              text: 'The Format of the file is not supported',
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              time: 3000,
              title: 'Unauthorize',
              text: 'You are not allowed to invite people',
              color: 'danger',
            });
          }
          this.inviteeSheet = '';
          this.sheetFileName = 'No File Selected';
          this.uploadPercentage = 0;
        });
    },

    sheet() {
      this.$refs.sheetUpload.click();
    },
    uploadSheet(event) {
      this.inviteeSheet = event.target.files[0];
      this.sheetFileName =
        event.target.files[0].name.length > 40
          ? event.target.files[0].name.slice(0, 39) + '...'
          : event.target.files[0].name;
      event.target.value = null;
    },
    castInfo(setRunning) {
      const payload = this.$route.params.session_key;
      this.$store
        .dispatch('auth/eventDetail', payload)
        .then(async (response) => {
          // eslint-disable-next-line camelcase
          const response_val = await response.data;
          this.expired = response_val.meeting_info.expired;
          this.public_meeting_id = response_val.meeting_info.public_meeting_id;
          this.vc_details_submitted =
            response_val.meeting_info.vc_details_submitted;
          this.coverImage = response_val.meeting_info.cover_image;
          this.event_nft_enabled =
            !response_val.meeting_info.pub_nft_flow &&
            response_val.meeting_info.nft_details_submitted;
          this.certificate_enabled =
            response_val.meeting_info.vc_details_submitted;
          this.public_nft_status = response_val.meeting_info.public_nft_status;
          this.pub_nft_flow = response_val.meeting_info.pub_nft_flow;
          this.public_stream = response_val.meeting_info.public_stream;
          this.viewer_mode = response_val.meeting_info.viewer_mode;
          this.stream_urls = response_val.meeting_info.stream_urls;
          this.isAirdrop = response_val.meeting_info.airdrop;
          this.stream_live_status = response_val.meeting_info.stream_status;
          this.stepOneProps.public_otp = response_val.meeting_info.public_otp;
          this.stepOneProps.send_otp = response_val.meeting_info.send_otp;
          this.stepOneProps.password_auth =
            response_val.meeting_info.password_auth;
          this.nft_details_submitted =
            response_val.meeting_info.nft_details_submitted;
          this.eventName = response_val.meeting_info.event_name;
          this.eventDescription = response_val.meeting_info.description;
          this.running = response_val.meeting_info.running;
          if (this.certificate_enabled) {
            this.getCertificateInfo();
          }
          if (!setRunning) {
            setTimeout(() => {
              this.castInfo(true);
            }, 5000);
          }
          this.isPublic = !response_val.meeting_info.send_otp;
        })
        .catch((err) => {
          // this.$router.push('/error/404');
          if (err.response.data.message === 'invalid cast id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/mycasts');
          }
        });
    },
    getCertificateInfo() {
      axios
        .get(
          `${constants.apiCastUrl}/api/event/fetch/nft/details/?cast_id=${this.$route.params.session_key}&nft_type=vc`,
          {
            mode: 'no-cors',
          }
        )
        .then((res) => {
          this.abi = res.data.aib;
        })
        .catch((e) => {
          if (e.response.data.message === 'invalid cast_id') {
            this.$vs.notify({
              title: 'Invalid Cast ID',
              color: 'danger',
            });
            this.$router.push('/error/404');
          }
          console.log(e);
        });
    },
    userDetails() {
      this.$vs.loading();
      const payload = { cast_id: this.$route.params.session_key };
      this.$store
        .dispatch('studio/inviteeDetails', payload)
        .then(async (res) => {
          this.users = await res.data.data;
          var address = [];
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].wallet_address) {
              this.walletAddress[i] = this.users[i].wallet_address;
            } else {
              this.walletAddress[i] = null;
            }
            const userList = {
              id: this.users[i].id,
              name: this.users[i].name,
              email: this.users[i].email,
              type: this.users[i].role,
              nft_enable: this.users[i].nft_enable,
              vc_enable: this.users[i].vc_enable,
            };
            if (this.users[i].nft_enable) {
              this.nft_enable_count++;
            }
            if (this.users[i].vc_enable) {
              address.push(this.users[i].wallet_address);
            }
            this.inviteeList.push(userList);
          }
          this.certificateProps.sender_addresses = address;
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },
    uploadSampleNft(event) {
      this.stepOneProps.nft_image = event.target.files[0];
      if (this.stepOneProps.nft_image === '')
        this.stepOneProps.nft_image_error = true;
      else this.stepOneProps.nft_image_error = false;
    },
    async selectNetwork(value, text, image, id) {
      await this.$vs.loading();
      this.selectedNetwork.value = value;
      this.selectedNetwork.text = text;
      this.selectedNetwork.image = image;
      this.stepOneProps.network = value;
      document.getElementById(id).click();
      this.$vs.loading.close();
    },
    updateGiveNft(e) {
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs' &&
        this.stepOneProps.public_stream_nfts === 'false'
      ) {
        this.stepOneProps.give_nft = true;
      } else {
        this.stepOneProps.give_nft = false;
      }
    },
    typeOfNft(e) {
      if (this.stepOneProps.public_stream_nfts === 'true') {
        this.stepOneProps.give_nft = false;
      } else if (this.stepOneProps.public_stream_nfts === 'false') {
        if (!this.stepOneProps.public_otp && !this.stepOneProps.send_otp) {
          this.stepOneProps.public_stream_nfts = 'true';
          this.stepOneProps.give_nft = false;
          this.$vs.notify({
            time: 6000,
            title: 'Access Restriction required',
            text:
              'You need to either collect attendee emails or stream the cast privately with OTP verification, for enabling NFTs' +
              this.stepOneProps.public_stream_nfts,
            color: 'warning',
          });
        } else {
          this.stepOneProps.give_nft = true;
        }
      }
    },
    valueCheck(e) {
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs'
      ) {
        if (this.stepOneProps.mint_function_name.length !== 0)
          this.stepOneProps.mintfnc_name_error = false;
        if (this.stepOneProps.contract_address.length !== 0)
          this.stepOneProps.contract_address_error = false;
        if (this.stepOneProps.aib.length !== 0)
          this.stepOneProps.aib_error = false;
        if (this.stepOneProps.nft_description.length !== 0)
          this.stepOneProps.nft_description_error = false;
        if (this.stepOneProps.nft_image !== '')
          this.stepOneProps.nft_image_error = false;
      }
    },
    addAddress(e, walletAddress) {
      if (e.target.value === 'false') {
        this.certificateProps.sender_addresses.push(walletAddress);
      } else {
        this.certificateProps.sender_addresses =
          this.certificateProps.sender_addresses.filter((ele) => {
            return ele !== walletAddress;
          });
      }
    },
    canSubmitCertificate() {
      if (
        this.certificateProps.audienceAirdrop &&
        (this.certificateProps.contract_address === '' ||
          this.certificateProps.aib === '' ||
          this.certificateProps.nft_description === '')
      ) {
        if (
          this.certificateProps.audienceAirdrop &&
          this.certificateProps.airdropType === 'NFTs'
        ) {
          this.certificateProps.contract_address_error =
            this.certificateProps.contract_address === '';
          this.certificateProps.aib_error = this.certificateProps.aib === '';
          this.certificateProps.nft_description_error =
            this.certificateProps.nft_description === '';
        }
        this.certificateProps.public_nft_flow =
          this.certificateProps.public_stream_nfts === 'true';
        this.$vs.notify({
          time: 3000,
          title: 'Cannot Submit',
          text: 'Please fill the fields which are required.',
          color: 'danger',
        });
        return false;
      } else {
        this.certificateProps.public_nft_flow =
          this.certificateProps.public_stream_nfts === 'true';
        return true;
      }
    },

    canSubmitNft() {
      if (
        this.stepOneProps.audienceAirdrop &&
        this.stepOneProps.airdropType === 'NFTs' &&
        (this.stepOneProps.mint_function_name === '' ||
          this.stepOneProps.contract_address === '' ||
          this.stepOneProps.aib === '' ||
          this.stepOneProps.nft_description === '' ||
          this.stepOneProps.nft_image === '')
      ) {
        if (
          this.stepOneProps.audienceAirdrop &&
          this.stepOneProps.airdropType === 'NFTs'
        ) {
          this.stepOneProps.mintfnc_name_error =
            this.stepOneProps.mint_function_name === '';
          this.stepOneProps.contract_address_error =
            this.stepOneProps.contract_address === '';
          this.stepOneProps.aib_error = this.stepOneProps.aib === '';
          this.stepOneProps.nft_image_error =
            this.stepOneProps.nft_image === '';
          this.stepOneProps.nft_description_error =
            this.stepOneProps.nft_description === '';
        }
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        this.$vs.notify({
          time: 3000,
          title: 'Cannot Submit',
          text: 'Please fill the fields which are required.',
          color: 'danger',
        });
        return false;
      } else {
        this.stepOneProps.public_nft_flow =
          this.stepOneProps.public_stream_nfts === 'true';
        return true;
      }
    },
    async addNft(x) {
      if (this.canSubmitNft()) {
        var payload = new FormData();
        for (var [key, value] of Object.entries(this.stepOneProps)) {
          if (value.length === 0) {
            value = '';
          } else {
            if (value === false) {
              value = 'False';
            } else if (value === true) {
              value = 'True';
            } else if (value === '') {
              value = '';
            }
          }
          payload.append(key, value);
        }
        payload.append('public_meeting_id', this.$route.params.session_key);
        await this.$store
          .dispatch('studio/addNftDetails', payload)
          .then(async (res) => {
            if (x) {
              this.$vs.notify({
                time: 6000,
                title: 'Airdrop Details Submitted',
                color: 'success',
              });
              this.castInfo(false);
              this.airdrops = false;
            }
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
            if (e) {
              this.$vs.notify({
                time: 6000,
                title: 'Error',
                text: e.response.data.message,
                color: 'danger',
              });
            }
          });
      }
    },
    disabledOption() {
      this.$vs.notify({
        time: 6000,
        title: 'Role Disabled',
        text: 'Viewer Role is only enabled if viewer mode is enabled in step four and Spectator role is only valid if streaming in step three is enabled. ',
        color: 'warning',
      });
    },
    async selectUserRole(x, y) {
      await this.$vs.loading();
      this.role = x;
      this.userRoleLabel = y;
      this.$vs.loading.close();
    },
    async checkInvitee(email) {
      let result = false;
      const payload = {
        email: email,
        cast_id: this.$route.params.session_key,
      };
      await this.$store
        .dispatch('studio/checkInvitee', payload)
        .then((res) => {
          result = false;
        })
        .catch((err) => {
          console.log(err);
          result = true;
        });
      return result;
    },
    async startStream() {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/startStream', {
            cast_id: this.$route.params.session_key,
          })
          .then((res) => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: 'Successful',
              text: 'Stream Started',
              color: 'success',
            });
            this.stream_live_status = !this.stream_live_status;
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'An Error occurred',
          text:
            err.response != null ? err.response.data.message : 'Try again !',
          color: 'danger',
        });
        // this.public_nft_status = !this.public_nft_status;
      }
    },
    async endStream() {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/endStream', {
            cast_id: this.$route.params.session_key,
          })
          .then((res) => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: 'Successful',
              text: 'Stream Ended',
              color: 'success',
            });
            this.stream_live_status = !this.stream_live_status;
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'An Error occurred',
          text:
            err.response != null ? err.response.data.message : 'Try again !',
          color: 'danger',
        });
      }
    },
    // eslint-disable-next-line camelcase
    async changePublicNftStatus(curr_status) {
      try {
        this.$vs.loading();
        await this.$store
          .dispatch('studio/publicNftActivate', {
            cast_id: this.$route.params.session_key,
            nft_activate: curr_status,
          })
          .then((res) => {
            // eslint-disable-next-line camelcase
            this.public_nft_status = curr_status === 'True';
            this.$vs.loading.close();
          });
      } catch (err) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: 'Error',
          text: 'Try again !',
          color: 'Danger',
        });
      }
    },
    async addUser() {
      var x = {};
      var emailList = this.userEmail.split(',').map((item) => {
        if (x[item.trim()]) {
          return;
        }
        return item.trim();
      });
      var validEmails = emailList.reduce((validEmail, item) => {
        if (!this.validateEmail(item)) {
          this.$vs.notify({
            time: 6000,
            title: 'Invalid Email',
            text: item + ' is not a valid email',
            color: 'danger',
          });
        }
        return validEmail && this.validateEmail(item);
      }, true);
      if (!validEmails) {
        this.validEmailError = true;
        return;
      }
      var users = [];
      for (let i = 0; i < emailList.length; i++) {
        const duplicate = await this.checkInvitee(emailList[i]);
        if (duplicate) {
          this.$vs.notify({
            time: 6000,
            title: 'Email Already Invited',
            text: 'We are going to  ignore user ' + emailList[i],
            color: 'warning',
          });
          continue;
        }
        users.push({
          name: '',
          email: emailList[i],
          type: this.role,
          nft_enable: '',
          give_nft: this.giveNft,
        });
      }
      const payload = {
        invitee_list: users,
        cast_id: this.$route.params.session_key,
      };
      this.validEmailError = false;
      if (users.length === 0) {
        this.$vs.loading.close();
        this.userEmail = '';
        this.$vs.notify({
          color: 'warning',
          title: 'User Already Invited',
        });
        return;
      }
      this.$store
        .dispatch('studio/addInvitee', payload)
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          const addedUser = res.data.data[0];
          this.$vs.notify({
            title: '',
            text: 'User added successfully !',
            color: 'success',
          });
          this.userName = '';
          this.userEmail = '';

          this.userNameError = false;
          this.userDetails();
          // this.users.push(addedUser);
          // if (this.walletAddress) {
          //   this.walletAddress[this.users.length - 1] =
          //     addedUser.wallet_address;
          // } else {
          //   this.walletAddress[this.users.length - 1] = null;
          // }
          // const userList = {
          //   id: addedUser.id,
          //   name: addedUser.name,
          //   email: addedUser.email,
          //   type: addedUser.role,
          //   nft_enable: addedUser.nft_enable,
          // };
          // this.inviteeList.push(userList);
          // this.giveNft = false;
          // this.$vs.loading.close();
          // this.$vs.notify({
          //   title: '',
          //   text: 'User added successfully !',
          //   color: 'success',
          // });
        })
        .catch((err) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again !',
            color: 'Danger',
          });
        });
    },
    removeUser(user, userIndex) {
      const payload = {
        email: user.email,
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/deleteInvitee', payload)
        .then((res) => {
          if (user.nft_enable) this.nft_enable_count--;
          if (userIndex > -1) {
            this.users.splice(userIndex, 1);
            this.inviteeList.splice(userIndex, 1);
          }
          this.$vs.notify({
            title: '',
            text: 'User removed successfully !',
            color: 'success',
          });
        })
        .catch((err) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again !',
            color: 'danger',
          });
        });
    },
    clickIndex(user, index) {
      if (this.inviteeList[index].nft_enable === false) {
        this.nft_enable_count = this.nft_enable_count + 1;
        this.inviteeList[index].nft_enable = true;
        this.inviteeList[index].nft_type = 'NFTs';
        this.stepOneProps.sender_addresses.push(user.wallet_address);
        user.nft_type = 'NFTs';
        this.$vs.notify({
          title: 'Success',
          text: 'Drop enabled for the user',
          color: 'success',
        });
      } else {
        this.nft_enable_count--;
        this.inviteeList[index].nft_enable = false;
        this.inviteeList[index].nft_type = 'NFTs';
        this.$vs.notify({
          title: 'Success',
          text: 'Drop disabled for the user',
          color: 'danger',
        });
      }
      const payload = {
        invitee_list: [this.inviteeList[index]],
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/updateEnableNft', payload)
        .then()
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
    enableCertificate(user, index) {
      if (user.vc_enable === true) {
        this.nft_enable_count = this.nft_enable_count + 1;
        this.inviteeList[index].vc_enable = true;
        this.inviteeList[index].nft_type = 'vc';
        this.certificateProps.sender_addresses.push(user.wallet_address);
        this.$vs.notify({
          title: 'Success',
          text: 'Drop enable for the user',
          color: 'success',
        });
      } else {
        this.nft_enable_count = this.nft_enable_count - 1;
        this.inviteeList[index].vc_enable = false;
        this.inviteeList[index].nft_type = 'vc';
        this.certificateProps.sender_addresses =
          this.certificateProps.sender_addresses.filter((ele) => {
            return ele !== user.wallet_address;
          });
        this.$vs.notify({
          title: 'Success',
          text: 'Drop disabled for the user',
          color: 'danger',
        });
      }
      const payload = {
        invitee_list: [this.inviteeList[index]],
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/updateEnableNft', payload)
        .then(() => console.log(this.nft_enable_count))
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
    inviteeListDownload() {
      const payload = {
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/inviteesCSV', payload)
        .then((res) => {
          const anchor = document.createElement('a');
          anchor.href = res.data.path;
          anchor.click();
          this.$vs.notify({
            title: 'Success',
            text: 'Downloaded Successfully !',
            color: 'success',
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
    changeSidebar(val) {
      this.sidebarProps.sidebarOpen = val;
    },
    truncate(addressString) {
      if (addressString && addressString !== '')
        return addressString.slice(0, 8) + '.....' + addressString.slice(38);
    },
    async setroothash() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const abi = this.abi;
      const contractAddress = '0x15a0b4bba8e561f13c3c1d2acd5954b7e871cfb0';
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const roothash = this.merkelTool.getRoot();
      const tx = await contract.setmerkleroot(roothash);
      this.receipt = await tx.wait();
    },
    async setMerkleTool() {
      this.$vs.loading();
      const leafNodes = this.certificateProps.sender_addresses.map((addr) =>
        keccak256(addr)
      );
      this.merkelTool = new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
      });
      if (!this.receipt) {
        try {
          await this.setroothash();
        } catch (e) {
          this.$vs.loading.close();
          if (e.code === 'ACTION_REJECTED') {
            this.$vs.notify({
              title: 'Transaction Rejected',
              color: 'danger',
            });
          } else {
            this.$vs.notify({
              title: 'Only Owner Can proceed further',
              text: 'Ask for the rights',
              color: 'danger',
            });
          }
          return;
        }
      }
      this.$store
        .dispatch('studio/setMerkleTool', {
          cast_id: this.$route.params.session_key,
          data: leafNodes,
        })
        .then(async (res) => {
          await this.audienceCertificateMail();
          this.merkelTool = false;
          this.receipt = false;
          this.$vs.loading.close();
        })
        .catch((e) => {
          this.$vs.notify({
            title: 'Error occurred',
            text: 'Try Again',
            color: 'danger',
          });
        });
    },
    audienceCertificateMail() {
      const payload = {
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/audienceCertificateMail', payload)
        .then((res) => {
          this.$vs.notify({
            title: 'Success',
            text: 'Mail sent successfully !',
            color: 'success',
          });
          this.certificate_done = true;
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
    audienceDropMail() {
      if (this.nft_enable && this.certificate_enabled) {
        this.disabled = true;
      }
      const payload = {
        cast_id: this.$route.params.session_key,
      };
      this.$store
        .dispatch('studio/audienceAirdropMail', payload)
        .then((res) => {
          this.$vs.notify({
            title: 'Success',
            text: 'Mail sent successfully !',
            color: 'success',
          });
          this.airdrop_done = true;
        })
        .catch((err) => {
          this.$vs.notify({
            title: 'Error',
            text:
              err.response != null ? err.response.data.message : 'Try again',
            color: 'danger',
          });
        });
    },
  },
  components: { Invite, ApiPopup, SharePopup },
};
</script>
<style scoped>
.tooltips {
  position: relative;
  display: inline-block;
}
.tooltips .tooltipstext {
  visibility: hidden;
  width: 30rem;
  color: white;
  border-radius: 6px;
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 80%;
  /* margin-left: -60px;  */
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltips:hover .tooltipstext {
  visibility: visible;
  opacity: 1;
  background-color: #454545;
}
.tooltips .tooltipstext::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 8%;
  transform: rotate(3.142rad);
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #454545 transparent transparent transparent;
}
.headingFont {
  font-size: 15px;
}

.con-vs-popup .vs-popup {
  width: 600px !important;
  min-width: calc(100% - 50%) !important;
  min-height: 20% !important;
}
</style>
<style>
.border {
  border: 1px solid rgb(232, 237, 241);
}

.round {
  border-radius: 0.4rem;
}

.buttons {
  bottom: 10%;
  justify-content: space-between;
}
.background * {
  font-family: sans-serif, 'feather' !important;
}
.select-roles-2 {
  position: relative;
  margin: 0px;
  padding: 0px !important;
}

.cursor {
  cursor: pointer;
}

.purple {
  color: #5925dc;
}

.select-roles-2 .vs-collapse-item--header {
  padding: 0.7rem !important;
  border-radius: 6px;
  font-size: 1rem;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fbfbfc;
}

.select-roles-2 .vs-collapse-item--content {
  position: absolute;
  width: 100%;
  z-index: 99999;
  background: #ffffff;
}

.space {
  justify-content: space-around !important;
}

.select-roles-2 .con-content--item {
  padding: 1rem 0rem 0rem 0.2rem !important;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.select-roles-2 .con-content--item div div {
  padding: 2px;
  border-radius: 1px;
}

.select-roles-item-hover:hover {
  background-color: #8d56f83a;
}

.label-role {
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
  display: inline-block;
  padding-left: 5px;
  text-transform: capitalize;
}
</style>
<style>
.drops {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.con-vs-popup .vs-popup--content {
  /* overflow: hidden; */
}

.delete {
  color: 'red' !important;
}

.drop-width {
  width: 100%;
}

.deposit-container {
  padding-right: 1.35rem;
  margin-top: 2em;
  margin-bottom: 2em;
}

.drop-heading {
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding-left: 20px;
}

.max-btn {
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  background-color: #1dc202;
  border: none;
  padding: 5px 8px;
}

.con-select-example {
  display: flex;
  align-items: center;
  justify-content: center;
}

.con-select .vs-select {
  width: 100%;
}

.adduser-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.adduser-container > label {
  font-weight: 600;
  margin-bottom: 13px;
  font-size: 16px;
  display: inline-block;
  padding-left: 5px;
}

.userdetail-box {
  display: grid;
  gap: 1rem;
  grid-template-columns: 0.5fr 1fr 1fr 2.5fr 2.5fr 1.5fr 2fr auto;
  align-items: center;
}

.padding {
  padding-top: 110px;
}

#datatoken {
  font-size: 15px;
  font-weight: 600;
}

.heading {
  font-weight: 600;
  font-size: 18px;
  line-height: 3rem;
}

.invite-button {
  font-size: 17px;
  padding: 8px 20px 8px 10px;
  border-radius: 40px;
  border: none;
  color: rgba(115, 102, 241, 255);
  cursor: pointer;
}

.userdetail-box-small {
  display: grid;
  gap: 1rem;
  grid-template-columns: 0.5fr 2fr 1.5fr 2fr 1fr;
  align-items: center;
  width: 75% !important;
}

.userdetail-box-small .userbox-div,
.userdetail-box .userbox-div {
  width: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  /* "auto" or "thin" */
  scrollbar-color: #fff #8d56f8;
  /* scroll thumb and track */
}

.userdetail-box-small .userbox-div::-webkit-scrollbar,
.userdetail-box .userbox-div::-webkit-scrollbar {
  height: 3px;
}

.userdetail-box-small .userbox-div::-webkit-scrollbar-thumb,
.userdetail-box .userbox-div::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 3px solid #fff;
}

.user-img {
  border-radius: 2em;
  width: 3em;
  height: 3em;
}

.bin-container {
  text-align-last: right;
}

.bin-img {
  padding: 8px;
  width: 3em;
  height: 3em;
}

.bin-img:hover {
  border-radius: 18px;
  background-color: #f718713d;
  filter: invert(19%) sepia(91%) saturate(6442%) hue-rotate(337deg)
    brightness(94%) contrast(100%);
}

.form-group {
  justify-content: space-between;
}

.add-user {
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding-left: 5px;
}

.airdrop-btn {
  width: fit-content;
  box-shadow: none;
  color: #8d56f8;
}

.delete:hover {
  color: red !important;
}

.BTN {
  background-color: transparent !important;
  color: #8d56f8;
}

.sidebar-divs {
  color: #ffffff8a;
}

.sidebar-divs:hover {
  background: #0000001a;
  color: #fff;
  border-radius: 2px;
}

.form-group input {
  background: #fbfbfc;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  font-weight: 500;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  font-family: sans-serif;
  font-weight: 0;
  width: 30rem;
  background-color: #000;
  color: white;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1000000;
  top: 125%;
  border: 1px solid #d1d1d1;
  left: 50%;
  margin-left: -60px;
  transform: scale(0);
  transition: transform 0.3s;
  transform-origin: bottom center;
  text-align: justify;
}

.con-vs-tooltip {
  width: fit-content;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: -8%;
  left: 15%;
  margin-left: -5px;
  border-width: 10px;
  border-style: solid;
  border-color: black transparent transparent transparent;
  transform: rotate(180deg);
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  transform: scale(1);
}

.invitees .tooltiptext::after {
  top: -25%;
  left: 69%;
}

.invitees .tooltiptext {
  left: -970%;
}

@media screen and (max-width: 1024px) {
  .userdetail-box,
  .userdetail-box-small {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media only screen and (max-width: 600px) {
  .userdetail-box,
  .userdetail-box-small {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .adduser-container {
    width: 100%;
  }
}

@media (max-width: 550px) {
  .con-select {
    flex-direction: column;
  }

  .con-select .vs-select {
    width: 100%;
  }
}

.dropdown {
  background: #fbfbfc;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  padding: 10px;
  color: darkgrey;
}

/* .file {
  background: #8d56f8;
  border: 1px solid #ebedf0 !important;
  border-radius: 6px;
  padding: 10px;
  color: darkgrey;
} */

.formgroup-label {
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  text-transform: capitalize;
  padding-left: 5px;
}

.top {
  position: relative;
  top: -100% !important;
}
</style>
<style>
.sidebar-ut .vs-sidebar {
  width: auto;
  max-width: 90%;
}

.sidebar-ut .vs-sidebar--items {
  background: #7367f0 !important;
  color: #fff !important;
  padding: 5px 10px !important;
  border-radius: 6px;
}

.sidebar-ut .vs-sidebar--items a {
  color: #fff !important;
}

.sidebar-ut .vs-sidebar--items a:hover {
  color: #fff !important;
  background: #0000001a;
  border-radius: 2px;
}

.sidebar-ut .vs-sidebar-primary .vs-sidebar-item-active {
  color: #fff !important;
}

.sidebar-ut .vs-sidebar-primary .vs-sidebar-item {
  color: #fff !important;
}

th .vs-table-text {
  cursor: default !important;
}

.dual-toggle {
  cursor: pointer;
  font-size: 16px;
}

.dual-toggle-active {
  background-color: rgb(115, 103, 240);
  color: #ebedf0;
  border-radius: 20px;
}

.dual-toggle .vs-radio--borde {
  border: 2px solid transparent !important;
}

.dual-toggle .vs-radio--input:disabled + .vs-radio {
  opacity: 0;
}

.custom-select {
  position: relative;
}

.custom-select .vs-collapse-item--header {
  padding: 0.7rem !important;
  border-radius: 6px;
  font-size: 1rem;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fbfbfc;
}

.custom-select .vs-collapse-item--content {
  position: absolute;
  width: calc(100% - 20px);
  z-index: 9999;
  background: #ffffff;
}

.custom-select .con-content--item {
  padding: 1rem 0rem 0rem 0.2rem !important;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.custom-select .con-content--item div div {
  padding: 2px;
  border-radius: 1px;
}

.custom-select-item-hover:hover {
  background-color: #8d56f83a;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

.btn {
  cursor: pointer;
  background: #ffffff;
  border: 1px dashed #eaecf0;
  border-radius: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.btnlogo {
  cursor: pointer !important;
  background: rgba(114, 71, 196, 0.1);
  border: 1px dashed #7347c470;
  box-sizing: border-box;
  border-radius: 12px;
  font-style: normal;
  font-weight: 500;
  background-position: center;
  background-size: contain;
  font-size: 16px;
  color: #7247c4;
  width: 52.48px;
  height: 52.49px;
}

.cursor-pointer {
  cursor: pointer !important;
}

.invisible {
  visibility: hidden;
}

.upload-success {
  color: #191818;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
  background-color: rgba(202, 171, 255, 0.571) !important;
  background-color: rgb(255, 255, 255) !important;
  cursor: pointer;
}

.logo-success {
  color: #ffffff;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
  background-color: rgba(202, 171, 255, 0.571) !important;
  background-color: rgb(255, 255, 255) !important;
  cursor: pointer;
}

.upload-btn-wrapper-logo input[type='file'] {
  font-size: 20px;
  position: relative;
  left: 0;
  top: calc(-52.49px / 1.33);
  width: 52.48px;
  opacity: 0;
  cursor: pointer;
}

.whiteBtn {
  background: transparent;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #d0d5dd;
  font-size: 16px;
}

.upload {
  height: 40px;
  width: 40px;
  background: #f2f4f7;
  border: 6px solid #f9fafb;
  border-radius: 28px;
}

.upload-btn-wrapper input[type='file'] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 25%;
  opacity: 0;
  cursor: pointer;
}

.upload-resume-icon {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.button-class {
  padding: 0;
  background: #ffffff !important;
}

.hide {
  display: none;
}

.no {
  margin-bottom: -4px !important;
}

.copy {
  padding-top: 5px !important;
}

.modal div {
  margin: 20px 0;
}

.up {
  margin-top: -10px !important;
}

.width {
  height: 40% !important;
}
</style>
