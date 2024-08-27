<template>
  <div class="full-screen-div flex flex-col justify-start items-center">
    <div
      class="dashboard_navbar max-w-6xl w-full items-center flex flex-row justify-between lg:px-12 md:px-4 px-3 py-4">
      <div class="flex justify-start gap-4 w-2/5">
        <img src="@/assets/images/logot.svg" class="w-24 h-24 cursor-pointer mr-10" @click="redirectHome" />
        <div class="text-white flex flex-col justify-center h-24">
          <p class="welcome_msg text-2xl font-bold">
            //Welcome
            <span class="text-primary">{{ activeUserInfo.first_name }}</span>!
          </p>
          <p class="text-lg" style="color: #22c55e; flex-wrap: nowrap;">
            /* what are we starting today? */
          </p>
        </div>
      </div>

      <div class="w-3/5 flex flex-row gap-6 justify-end h-24 items-center">
        <div v-if="(accessToken || loggedIn) && activeUserInfo.email == ''" class="flex gap-6">
          <img src="@/assets/images/pixel_wallet.svg" class="w-8 h-6 cursor-pointer" />
          <p class="text-lg">{{ activeUserInfo.username }}</p>
        </div>

        <div v-else class="flex gap-6">
          <img src="@/assets/images/pixel_email.svg" class="w-8 h-6 cursor-pointer" />
          <p class="text-lg">{{ activeUserInfo.email }}</p>
        </div>
        <!-- <img src="@/assets/images/pixel_smile.svg" class="w-12 h-12 cursor-pointer" /> -->
        <div class="">
          <div v-if="accessToken || loggedIn">
            <SimpleMenu :menuList="profileMenuItems">
              <template #menuButton>
                <div class="pfp">
                  <vs-avatar :text="getFirstLetter" color="primary" class="m-0 shadow-md" :src="activeUserInfo.profile_pic
                    ? activeUserInfo.profile_pic
                    : ''
                    " size="40px" />
                </div>
              </template>
            </SimpleMenu>
          </div>
          <button v-else class="butt cursor-pointer" @click="open">
            Login
          </button>
        </div>
      </div>
    </div>

    <div class="dashboard_content max-w-6xl w-full flex flex-row gap-3 justify-start lg:px-12 md:px-4 px-3 py-4">
      <div class="flex flex-col justify-start gap-4 mr-10">


        <div class="w-24 h-24 cursor-pointer" @click="onRoom"
          :class="{ 'calls_btn_': true, 'calls_clicked': isClicked1 }">
          <vx-tooltip text="/ Rooms" position="right">
            <!-- <img src="@/assets/images/pixel_call.svg" class="w-24 h-24 cursor-pointer object-contain"  @click="$router.push('/dashboard/rooms')"
               /> -->
            <span>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.666667" y="0.666667" width="78.6667" height="78.6667" class='color_2' fill="black"
                  stroke="white" stroke-width="1.33333" />
                <path
                  d="M24.0533 68.8003C23.4044 68.8003 22.8356 68.6803 22.3467 68.4403C21.8578 68.1914 21.4756 67.8492 21.2 67.4137C20.9333 66.9692 20.8 66.4537 20.8 65.867V61.7337C20.8 61.1381 20.9333 60.6225 21.2 60.187C21.4756 59.7514 21.8578 59.4137 22.3467 59.1737C22.8356 58.9248 23.4044 58.8003 24.0533 58.8003C24.7111 58.8003 25.28 58.9248 25.76 59.1737C26.2489 59.4137 26.6267 59.7514 26.8933 60.187C27.1689 60.6225 27.3067 61.1381 27.3067 61.7337H25.3067C25.3067 61.3425 25.1956 61.0448 24.9733 60.8403C24.76 60.6359 24.4533 60.5337 24.0533 60.5337C23.6533 60.5337 23.3422 60.6359 23.12 60.8403C22.9067 61.0448 22.8 61.3425 22.8 61.7337V65.867C22.8 66.2492 22.9067 66.547 23.12 66.7603C23.3422 66.9648 23.6533 67.067 24.0533 67.067C24.4533 67.067 24.76 66.9648 24.9733 66.7603C25.1956 66.547 25.3067 66.2492 25.3067 65.867H27.3067C27.3067 66.4537 27.1689 66.9692 26.8933 67.4137C26.6267 67.8492 26.2489 68.1914 25.76 68.4403C25.28 68.6803 24.7111 68.8003 24.0533 68.8003ZM28.3281 68.667L30.7148 58.9337H33.2481L35.6615 68.667H33.6215L33.1548 66.467H30.8348L30.3681 68.667H28.3281ZM31.1681 64.867H32.8081L32.3415 62.5203C32.2792 62.1825 32.2126 61.8492 32.1415 61.5203C32.0792 61.1825 32.0303 60.9203 31.9948 60.7337C31.9592 60.9203 31.9103 61.1781 31.8481 61.507C31.7948 61.8359 31.7326 62.1692 31.6615 62.507L31.1681 64.867ZM37.2563 68.667V58.9337H39.2563V66.8003H43.1896V68.667H37.2563ZM45.251 68.667V58.9337H47.251V66.8003H51.1844V68.667H45.251ZM55.9792 68.8003C55.2947 68.8003 54.6992 68.6848 54.1925 68.4537C53.6858 68.2225 53.2947 67.8981 53.0192 67.4803C52.7436 67.0625 52.6058 66.5692 52.6058 66.0003H54.6058C54.6058 66.3292 54.7303 66.5914 54.9792 66.787C55.2369 66.9737 55.5836 67.067 56.0192 67.067C56.4369 67.067 56.7614 66.9737 56.9925 66.787C57.2325 66.6003 57.3525 66.3425 57.3525 66.0137C57.3525 65.7292 57.2636 65.4848 57.0858 65.2803C56.9081 65.0759 56.6592 64.9381 56.3392 64.867L55.3525 64.6403C54.5258 64.4448 53.8814 64.0848 53.4192 63.5603C52.9658 63.027 52.7392 62.3781 52.7392 61.6137C52.7392 61.0448 52.8681 60.5514 53.1258 60.1337C53.3925 59.707 53.7658 59.3781 54.2458 59.147C54.7258 58.9159 55.2947 58.8003 55.9525 58.8003C56.9481 58.8003 57.7347 59.0492 58.3125 59.547C58.8992 60.0359 59.1925 60.6981 59.1925 61.5337H57.1925C57.1925 61.2225 57.0814 60.9781 56.8592 60.8003C56.6458 60.6225 56.3347 60.5337 55.9258 60.5337C55.5436 60.5337 55.2503 60.6225 55.0458 60.8003C54.8414 60.9692 54.7392 61.2137 54.7392 61.5337C54.7392 61.8181 54.8192 62.0625 54.9792 62.267C55.1481 62.4625 55.3836 62.5959 55.6858 62.667L56.7258 62.907C57.5881 63.1025 58.2414 63.4581 58.6858 63.9737C59.1303 64.4803 59.3525 65.1292 59.3525 65.9203C59.3525 66.4892 59.2103 66.9914 58.9258 67.427C58.6503 67.8625 58.2592 68.2003 57.7525 68.4403C57.2547 68.6803 56.6636 68.8003 55.9792 68.8003Z"
                  class='color_1' fill="white" />
                <path d="M44.103 12V14.0833H35.7696V12H44.103Z" class='color_1' fill="white" />
                <path d="M48.2698 16.1667H44.103V14.0833H48.2698V16.1667Z" class='color_1' fill="white" />
                <path d="M50.3531 18.25H48.2698V16.1667H50.3531V18.25Z" class='color_1' fill="white" />
                <path d="M52.4365 20.3333H50.3531V18.25H52.4365V20.3333Z" class='color_1' fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M54.5198 24.5H52.4365V20.3333H54.5198V24.5ZM54.5198 24.5H56.6032V34.9167H54.5198V24.5Z"
                  class='color_1' fill="white" />
                <path d="M33.6863 16.1667V18.25H25.3529V16.1667H33.6863Z" class='color_1' fill="white" />
                <path d="M25.3529 30.75H23.2695V18.25H25.3529V30.75Z" class='color_1' fill="white" />
                <path d="M27.4362 34.9167H25.3529V30.75H27.4362V34.9167Z" class='color_1' fill="white" />
                <path d="M29.5196 37H27.4362V34.9167H29.5196V37Z" class='color_1' fill="white" />
                <path d="M31.6029 39.0833H29.5196V37H31.6029V39.0833Z" class='color_1' fill="white" />
                <path d="M33.6863 41.1667H31.6029V39.0833H33.6863V41.1667Z" class='color_1' fill="white" />
                <path d="M37.853 43.25H33.6863V41.1667H37.853V43.25Z" class='color_1' fill="white" />
                <path d="M50.3531 43.25V45.3333H37.853V43.25H50.3531Z" class='color_1' fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M44.103 34.9167V32.8333H50.3531V34.9167H44.103ZM50.3531 34.9167H52.4365V43.25H50.3531V34.9167Z"
                  class='color_1' fill="white" />
                <path d="M42.0197 37V34.9167H44.103V37H42.0197Z" class='color_1' fill="white" />
                <path d="M37.853 37H42.0197V39.0833H37.853V37Z" class='color_1' fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M33.6863 32.8333H35.7696V34.9167H33.6863V32.8333ZM35.7696 34.9167H37.853V37H35.7696V34.9167Z"
                  class='color_1' fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M31.6029 26.5833V30.75H29.5196V26.5833H31.6029ZM31.6029 30.75H33.6863V32.8333H31.6029V30.75Z"
                  class='color_1' fill="white" />
                <path d="M33.6863 24.5V26.5833H31.6029V24.5H33.6863Z" class='color_1' fill="white" />
                <path d="M33.6863 24.5H35.7696V18.25H33.6863V24.5Z" class='color_1' fill="white" />
                <path
                  d="M37.853 18.25V20.3333H44.103V22.4167H46.1864V24.5H48.2698V30.75H50.3531V24.5H48.2698V22.4167H46.1864V20.3333H44.103V18.25H37.853Z"
                  class='color_1' fill="white" />
                <path
                  d="M25.353 18.25H33.6864V24.5H31.6031V26.5833H29.5197V30.75H31.6031V32.8333H33.6864V34.9167H35.7698V37H37.8531V39.0833H42.0198V37H44.1032V34.9167H50.3532V43.25H37.8531V41.1667H33.6864V39.0833H31.6031V37H29.5197V34.9167H27.4364V30.75H25.353V18.25Z"
                  class='color_1' fill="white" />
              </svg>



            </span>
          </vx-tooltip>
        </div>

        <div class="w-24 h-24 cursor-pointer" @click="onCasts"
          :class="{ 'casts_btn': true, 'cast_clicked': isClicked2 }">
          <vx-tooltip text="/ Casts" position="right">
            <!-- <img src="@/assets/images/pixel_cast.svg" class="w-24 h-24 cursor-pointer object-contain"  @click="$router.push('/dashboard/casts')"
               /> -->
            <span>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.666667" y="0.666667" width="78.6667" height="78.6667" class='color_2' fill="black"
                  stroke="white" stroke-width="1.33333" />
                <path
                  d="M24.0533 68.4663C23.4044 68.4663 22.8356 68.3463 22.3467 68.1063C21.8578 67.8575 21.4756 67.5152 21.2 67.0797C20.9333 66.6352 20.8 66.1197 20.8 65.533V61.3997C20.8 60.8041 20.9333 60.2886 21.2 59.853C21.4756 59.4175 21.8578 59.0797 22.3467 58.8397C22.8356 58.5908 23.4044 58.4663 24.0533 58.4663C24.7111 58.4663 25.28 58.5908 25.76 58.8397C26.2489 59.0797 26.6267 59.4175 26.8933 59.853C27.1689 60.2886 27.3067 60.8041 27.3067 61.3997H25.3067C25.3067 61.0086 25.1956 60.7108 24.9733 60.5063C24.76 60.3019 24.4533 60.1997 24.0533 60.1997C23.6533 60.1997 23.3422 60.3019 23.12 60.5063C22.9067 60.7108 22.8 61.0086 22.8 61.3997V65.533C22.8 65.9152 22.9067 66.213 23.12 66.4263C23.3422 66.6308 23.6533 66.733 24.0533 66.733C24.4533 66.733 24.76 66.6308 24.9733 66.4263C25.1956 66.213 25.3067 65.9152 25.3067 65.533H27.3067C27.3067 66.1197 27.1689 66.6352 26.8933 67.0797C26.6267 67.5152 26.2489 67.8575 25.76 68.1063C25.28 68.3463 24.7111 68.4663 24.0533 68.4663ZM28.3281 68.333L30.7148 58.5997H33.2481L35.6615 68.333H33.6215L33.1548 66.133H30.8348L30.3681 68.333H28.3281ZM31.1681 64.533H32.8081L32.3415 62.1863C32.2792 61.8486 32.2126 61.5152 32.1415 61.1863C32.0792 60.8486 32.0303 60.5863 31.9948 60.3997C31.9592 60.5863 31.9103 60.8441 31.8481 61.173C31.7948 61.5019 31.7326 61.8352 31.6615 62.173L31.1681 64.533ZM39.9896 68.4663C39.3051 68.4663 38.7096 68.3508 38.2029 68.1197C37.6963 67.8886 37.3051 67.5641 37.0296 67.1463C36.754 66.7286 36.6163 66.2352 36.6163 65.6663H38.6163C38.6163 65.9952 38.7407 66.2575 38.9896 66.453C39.2474 66.6397 39.594 66.733 40.0296 66.733C40.4474 66.733 40.7718 66.6397 41.0029 66.453C41.2429 66.2663 41.3629 66.0086 41.3629 65.6797C41.3629 65.3952 41.274 65.1508 41.0963 64.9463C40.9185 64.7419 40.6696 64.6041 40.3496 64.533L39.3629 64.3063C38.5363 64.1108 37.8918 63.7508 37.4296 63.2263C36.9763 62.693 36.7496 62.0441 36.7496 61.2797C36.7496 60.7108 36.8785 60.2175 37.1363 59.7997C37.4029 59.373 37.7763 59.0441 38.2563 58.813C38.7363 58.5819 39.3051 58.4663 39.9629 58.4663C40.9585 58.4663 41.7451 58.7152 42.3229 59.213C42.9096 59.7019 43.2029 60.3641 43.2029 61.1997H41.2029C41.2029 60.8886 41.0918 60.6441 40.8696 60.4663C40.6563 60.2886 40.3451 60.1997 39.9363 60.1997C39.554 60.1997 39.2607 60.2886 39.0563 60.4663C38.8518 60.6352 38.7496 60.8797 38.7496 61.1997C38.7496 61.4841 38.8296 61.7286 38.9896 61.933C39.1585 62.1286 39.394 62.2619 39.6963 62.333L40.7363 62.573C41.5985 62.7686 42.2518 63.1241 42.6963 63.6397C43.1407 64.1463 43.3629 64.7952 43.3629 65.5863C43.3629 66.1552 43.2207 66.6575 42.9363 67.093C42.6607 67.5286 42.2696 67.8663 41.7629 68.1063C41.2651 68.3463 40.674 68.4663 39.9896 68.4663ZM46.9844 68.333V60.4663H44.5177V58.5997H51.451V60.4663H48.9844V68.333H46.9844ZM55.9792 68.4663C55.2947 68.4663 54.6992 68.3508 54.1925 68.1197C53.6858 67.8886 53.2947 67.5641 53.0192 67.1463C52.7436 66.7286 52.6058 66.2352 52.6058 65.6663H54.6058C54.6058 65.9952 54.7303 66.2575 54.9792 66.453C55.2369 66.6397 55.5836 66.733 56.0192 66.733C56.4369 66.733 56.7614 66.6397 56.9925 66.453C57.2325 66.2663 57.3525 66.0086 57.3525 65.6797C57.3525 65.3952 57.2636 65.1508 57.0858 64.9463C56.9081 64.7419 56.6592 64.6041 56.3392 64.533L55.3525 64.3063C54.5258 64.1108 53.8814 63.7508 53.4192 63.2263C52.9658 62.693 52.7392 62.0441 52.7392 61.2797C52.7392 60.7108 52.8681 60.2175 53.1258 59.7997C53.3925 59.373 53.7658 59.0441 54.2458 58.813C54.7258 58.5819 55.2947 58.4663 55.9525 58.4663C56.9481 58.4663 57.7347 58.7152 58.3125 59.213C58.8992 59.7019 59.1925 60.3641 59.1925 61.1997H57.1925C57.1925 60.8886 57.0814 60.6441 56.8592 60.4663C56.6458 60.2886 56.3347 60.1997 55.9258 60.1997C55.5436 60.1997 55.2503 60.2886 55.0458 60.4663C54.8414 60.6352 54.7392 60.8797 54.7392 61.1997C54.7392 61.4841 54.8192 61.7286 54.9792 61.933C55.1481 62.1286 55.3836 62.2619 55.6858 62.333L56.7258 62.573C57.5881 62.7686 58.2414 63.1241 58.6858 63.6397C59.1303 64.1463 59.3525 64.7952 59.3525 65.5863C59.3525 66.1552 59.2103 66.6575 58.9258 67.093C58.6503 67.5286 58.2592 67.8663 57.7525 68.1063C57.2547 68.3463 56.6636 68.4663 55.9792 68.4663Z"
                  class='color_1' fill="white" />
                <path d="M43.7034 21.9996H45.9257V19.7773H43.7034V21.9996Z" class='color_1' fill="white" />
                <path d="M45.9257 24.2218H48.148V21.9996H45.9257V24.2218Z" class='color_1' fill="white" />
                <path d="M45.9257 35.3329H48.148V33.1107H45.9257V35.3329Z" class='color_1' fill="white" />
                <path d="M43.7034 37.5551H45.9257V35.3329H43.7034V37.5551Z" class='color_1' fill="white" />
                <path d="M39.2588 26.444H41.4811V24.2218H39.2588V26.444Z" class='color_1' fill="white" />
                <path d="M39.2588 33.1107H41.4811V30.8885H39.2588V33.1107Z" class='color_1' fill="white" />
                <path d="M50.3703 24.2218H48.148V33.1107H50.3703V24.2218Z" class='color_1' fill="white" />
                <path d="M43.7034 26.444H41.4811V30.8885H43.7034V26.444Z" class='color_1' fill="white" />
                <path d="M51.8525 19.7769H54.0748V17.5547H51.8525V19.7769Z" class='color_1' fill="white" />
                <path d="M51.8525 39.7769H54.0748V37.5547H51.8525V39.7769Z" class='color_1' fill="white" />
                <path d="M54.0748 37.5547H56.2971V33.1102H54.0748V37.5547Z" class='color_1' fill="white" />
                <path d="M58.5194 24.2214H56.2971V33.1102H58.5194V24.2214Z" class='color_1' fill="white" />
                <path d="M56.2971 19.7769H54.0748V24.2214H56.2971V19.7769Z" class='color_1' fill="white" />
                <path
                  d="M32.3459 21.753H36.7905V35.0864H32.3459V37.3086H27.9013V39.5308H23.4567V17.3086H27.9013V19.5308H32.3459V21.753Z"
                  class='color_2' fill="black" />
                <path d="M28.1473 39.7775V41.9997H23.7027V39.7775H28.1473Z" class='color_1' fill="white" />
                <path d="M32.5919 37.5552V39.7775H28.1473V37.5552H32.5919Z" class='color_1' fill="white" />
                <path d="M37.0365 35.333V37.5552H32.5919V35.333H37.0365Z" class='color_1' fill="white" />
                <path d="M37.0365 21.9997H39.2588V35.333H37.0365V21.9997Z" class='color_1' fill="white" />
                <path d="M32.5919 21.9997V19.7775H37.0365V21.9997H32.5919Z" class='color_1' fill="white" />
                <path d="M28.1473 19.7775V17.5552H32.5919V19.7775H28.1473Z" class='color_1' fill="white" />
                <path d="M23.7027 17.5552V15.333H28.1473V17.5552H23.7027Z" class='color_1' fill="white" />
                <path d="M23.7027 39.7775H21.4804V17.5552H23.7027V39.7775Z" class='color_1' fill="white" />
                <rect x="35.8022" y="26.6914" width="5.43228" height="3.95062" class='color_2' fill="black"/>
              </svg>


            </span>
          </vx-tooltip>
        </div>

        <div class="w-24 h-24 cursor-pointer" @click="onDecasts"
          :class="{ 'decast_btn': true, 'decast_clicked': isClicked3 }">
          <vx-tooltip text="/ Decast" position="right">
            <!-- <img src="@/assets/images/decast.svg" class="w-24 h-24 cursor-pointer object-contain" @click="$router.push('/dashboard/decast')"/> -->
            <span>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.666667" y="0.666667" width="78.6667" height="78.6667" class="color_2" fill="black"
                  stroke="white" stroke-width="1.33333" />
                <path
                  d="M42.3806 35.8094V33.4284V31.0475V28.6665H37.6187V31.0475V33.4284V35.8094V38.1903V40.5713H42.3806V38.1903V35.8094Z"
                  class='color_1' fill="white" />
                <path
                  d="M44.7613 45.3332H47.1423H49.5232H51.9042V40.5713H49.5232H47.1423H44.7613H42.3804V45.3332H44.7613Z"
                  class='color_1' fill="white" />
                <path
                  d="M47.1423 28.6667H49.5232H51.9042V23.9048H49.5232H47.1423H44.7613H42.3804V28.6667H44.7613H47.1423Z"
                  class='color_1' fill="white" />
                <path
                  d="M37.952 19.1432V17.0955H42.0472V19.1432V21.5241V23.9051V26.286V28.3336H37.952V26.286V23.9051V21.5241V19.1432Z"
                  class="color_2" fill="black" stroke="white" stroke-width="0.666667" />
                <path
                  d="M30.4762 28.9998H32.8571H35.2381H37.2857V33.0951H35.2381H32.8571H30.4762H28.4285V28.9998H30.4762Z"
                  class="color_2" fill="black" stroke="white" stroke-width="0.666667" />
                <path
                  d="M32.8571 12.3333H35.2381H37.2857V16.4286H35.2381H32.8571H30.4762H28.4285V12.3333H30.4762H32.8571Z"
                  class="color_2" fill="black" stroke="white" stroke-width="0.666667" />
                <path
                  d="M16.84 68.6665V58.9332H20C20.6756 58.9332 21.2622 59.0621 21.76 59.3198C22.2667 59.5776 22.6578 59.9421 22.9333 60.4132C23.2178 60.8754 23.36 61.4221 23.36 62.0532V65.5332C23.36 66.1554 23.2178 66.7021 22.9333 67.1732C22.6578 67.6443 22.2667 68.0132 21.76 68.2798C21.2622 68.5376 20.6756 68.6665 20 68.6665H16.84ZM18.84 66.7998H20C20.4089 66.7998 20.7378 66.6843 20.9867 66.4532C21.2356 66.2221 21.36 65.9154 21.36 65.5332V62.0532C21.36 61.6798 21.2356 61.3776 20.9867 61.1465C20.7378 60.9154 20.4089 60.7998 20 60.7998H18.84V66.7998ZM25.0615 68.6665V58.9332H31.0615V60.6398H27.0215V62.8265H30.5948V64.5332H27.0215V66.9598H31.0615V68.6665H25.0615ZM36.0429 68.7998C35.394 68.7998 34.8251 68.6798 34.3363 68.4398C33.8474 68.1909 33.4651 67.8487 33.1896 67.4132C32.9229 66.9687 32.7896 66.4532 32.7896 65.8665V61.7332C32.7896 61.1376 32.9229 60.6221 33.1896 60.1865C33.4651 59.7509 33.8474 59.4132 34.3363 59.1732C34.8251 58.9243 35.394 58.7998 36.0429 58.7998C36.7007 58.7998 37.2696 58.9243 37.7496 59.1732C38.2385 59.4132 38.6163 59.7509 38.8829 60.1865C39.1585 60.6221 39.2963 61.1376 39.2963 61.7332H37.2963C37.2963 61.3421 37.1851 61.0443 36.9629 60.8398C36.7496 60.6354 36.4429 60.5332 36.0429 60.5332C35.6429 60.5332 35.3318 60.6354 35.1096 60.8398C34.8963 61.0443 34.7896 61.3421 34.7896 61.7332V65.8665C34.7896 66.2487 34.8963 66.5465 35.1096 66.7598C35.3318 66.9643 35.6429 67.0665 36.0429 67.0665C36.4429 67.0665 36.7496 66.9643 36.9629 66.7598C37.1851 66.5465 37.2963 66.2487 37.2963 65.8665H39.2963C39.2963 66.4532 39.1585 66.9687 38.8829 67.4132C38.6163 67.8487 38.2385 68.1909 37.7496 68.4398C37.2696 68.6798 36.7007 68.7998 36.0429 68.7998ZM40.3177 68.6665L42.7044 58.9332H45.2377L47.651 68.6665H45.611L45.1444 66.4665H42.8244L42.3577 68.6665H40.3177ZM43.1577 64.8665H44.7977L44.331 62.5198C44.2688 62.1821 44.2022 61.8487 44.131 61.5198C44.0688 61.1821 44.0199 60.9198 43.9844 60.7332C43.9488 60.9198 43.8999 61.1776 43.8377 61.5065C43.7844 61.8354 43.7222 62.1687 43.651 62.5065L43.1577 64.8665ZM51.9792 68.7998C51.2947 68.7998 50.6992 68.6843 50.1925 68.4532C49.6858 68.2221 49.2947 67.8976 49.0192 67.4798C48.7436 67.0621 48.6058 66.5687 48.6058 65.9998H50.6058C50.6058 66.3287 50.7303 66.5909 50.9792 66.7865C51.2369 66.9732 51.5836 67.0665 52.0192 67.0665C52.4369 67.0665 52.7614 66.9732 52.9925 66.7865C53.2325 66.5998 53.3525 66.3421 53.3525 66.0132C53.3525 65.7287 53.2636 65.4843 53.0858 65.2798C52.9081 65.0754 52.6592 64.9376 52.3392 64.8665L51.3525 64.6398C50.5258 64.4443 49.8814 64.0843 49.4192 63.5598C48.9658 63.0265 48.7392 62.3776 48.7392 61.6132C48.7392 61.0443 48.8681 60.5509 49.1258 60.1332C49.3925 59.7065 49.7658 59.3776 50.2458 59.1465C50.7258 58.9154 51.2947 58.7998 51.9525 58.7998C52.9481 58.7998 53.7347 59.0487 54.3125 59.5465C54.8992 60.0354 55.1925 60.6976 55.1925 61.5332H53.1925C53.1925 61.2221 53.0814 60.9776 52.8592 60.7998C52.6458 60.6221 52.3347 60.5332 51.9258 60.5332C51.5436 60.5332 51.2503 60.6221 51.0458 60.7998C50.8414 60.9687 50.7392 61.2132 50.7392 61.5332C50.7392 61.8176 50.8192 62.0621 50.9792 62.2665C51.1481 62.4621 51.3836 62.5954 51.6858 62.6665L52.7258 62.9065C53.5881 63.1021 54.2414 63.4576 54.6858 63.9732C55.1303 64.4798 55.3525 65.1287 55.3525 65.9198C55.3525 66.4887 55.2103 66.9909 54.9258 67.4265C54.6503 67.8621 54.2592 68.1998 53.7525 68.4398C53.2547 68.6798 52.6636 68.7998 51.9792 68.7998ZM58.974 68.6665V60.7998H56.5073V58.9332H63.4406V60.7998H60.974V68.6665H58.974Z"
                  class='color_1' fill="white" />
              </svg>


            </span>
          </vx-tooltip>
        </div>

        <!-- <div class="w-24 h-24 cursor-pointer">
          <vx-tooltip text="/ Minutes" position="right">
            <img src="@/assets/images/pixel_min.svg" class="w-24 h-24 cursor-pointer object-contain"
              @click="$router.push('/addfunds')" />
          </vx-tooltip>
        </div> -->
      </div>

      <div class="w-full flex flex-col justify-start gap-2">
        <!-- <div class="bg-white w-full flex flex-row justify-between items-center px-4 h-12">
          <div class="bg-black w-4 h-4"></div>
          <div class="flex flex-row gap-2">
            <div class="bg-black w-4 h-4"></div>
            <div class="bg-black w-4 h-4"></div>
          </div>
        </div> -->

        <div>
          <router-view />
        </div>

        <!-- <div class="" v-if="showRoomSection">
          <RoomSection />
        </div>

        <div class="" v-else-if="showCastSection">
          <CastSection />
        </div>

        <div class="basic_details_cont w-full p-4 px-6 flex flex-col gap-6 justify-start"
          v-else-if="showCommunitySection">
          <div class="flex justify-between">
            <div class="text-white">
              <p class="font-bold text-2xl">//Communities</p>
              <p>Create large communities with like minded people.</p>
            </div>
            <div class="cursor-pointer">
              <vx-tooltip text="/ Create your own community" position="left">
                <img src="@/assets/images/pixel_create.svg" />
              </vx-tooltip>
            </div>
          </div>

          <div class="w-full h-full flex items-center justify-center text-white">
            <h1 class="text-4xl text-white">Coming Soon</h1>
          </div>
        </div> -->
      </div>
    </div>
    <ResetPasswordModal v-if="activeModal === 'resetPassModal'" :toggleActiveModal="toggleActiveModal" />
    <ProfileModal v-if="activeModal === 'profileModal'" :toggleActiveModal="toggleActiveModal" />
  </div>
</template>

<script>
import RoomSection from './rooms/RoomSection.vue';
import CastSection from './casts/CastSection.vue';
import DecastSection from './decast/DecastSection.vue';
import constants from '../../../constant';
import { utils } from '@/mixins/index';
import SimpleMenu from '@/components/common/simpleMenu/SimpleMenu.vue';
import ResetPasswordModal from '@/views/dashboard/components/ResetPasswordModal';
import ProfileModal from '@/views/dashboard/components/ProfileModal';
export default {
  name: 'Dashboard',
  components: {
    RoomSection,
    CastSection,
    DecastSection,
    SimpleMenu,
    ResetPasswordModal,
    ProfileModal,
  },
  data() {
    return {
      focusYourRooms: true,
      showRoomSection: true,
      showCastSection: false,
      showCommunitySection: false,
      rooms: true,
      casts: false,
      decasts: false,
      isClicked1: true,
      isClicked2: false,
      isClicked3: false,
      activeModal: '',
      offset: 0,
      url: constants.challengeUri,
      iframe: false,
      userMenuVisible: false,
      profileMenuItems: [
        {
          label: "My Profile",
          icon: () => import("@/assets/svgs/menu-icons/usermenu.vue"),
          onClick: () => this.toggleActiveModal('profileModal')
        },
        {
          label: "Reset Password",
          icon: () => import("@/assets/svgs/menu-icons/setting.vue"),
          onClick: () => this.toggleActiveModal('resetPassModal')
        },
        {
          label: "Wallet",
          icon: () => import("@/assets/svgs/menu-icons/wallet.vue"),
          onClick: () => this.$router.push('/addfunds')
        },
        {
          label: "Help Center",
          icon: () => import("@/assets/svgs/menu-icons/help.vue"),
        },
        {
          label: "Logout",
          icon: () => import("@/assets/svgs/menu-icons/export.vue"),
          onClick: () => {
            this.$cookies.remove('userId');
            this.$cookies.remove('Token');
            this.$router.push('/');
            return this.$store.dispatch('auth/logOut');
          }
        }
      ]
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    getFirstname() {
      return this.activeUserInfo.first_name;
    },
    getFirstLetter() {
      return this.activeUserInfo.first_name[0];
    },
  },
  created() {
    if (this.$router.currentRoute.path === '/dashboard/decast') {
      this.clicked = true; this.isClicked2 = false;
      this.isClicked1 = false;
      this.isClicked3 = true;
    } else if (this.$router.currentRoute.path === '/dashboard/casts') {
      this.isClicked2 = true;
      this.isClicked1 = false;
      this.isClicked3 = false;
    } else if (this.$router.currentRoute.path === '/dashboard/rooms') {
      this.isClicked2 = false;
      this.isClicked1 = true;
      this.isClicked3 = false;
    }
  },
  mounted() {
    const gb_redirect = localStorage.getItem("LOG_REDIRECT")
    if (gb_redirect) {
      localStorage.removeItem("LOG_REDIRECT");
      const url = new URL(gb_redirect);
      const path = url.pathname + url.search + url.hash; // Extract path, query, and hash
      this.$router.push(path);
    }
    this.verifyAuthToken();
    // this.userInfo = { ...this.$store.state.AppActiveUser };
    // this.$store.commit('UPDATE_USER_INFO', this.userInfo);
    setTimeout(function () {
      const ifram = document.getElementById('extFrame');
      const wind = ifram.contentWindow;
      const message = JSON.stringify(localStorage.getItem("accessToken"));
      wind.postMessage(message, 'https://live1.decast.live');
    }, 2000);
    console.log(this.activeUserInfo);
  },
  methods: {
    verifyAuthToken() {
      this.$store.dispatch('auth/verifyAuthToken');
    },
    toggleActiveModal(setModal) {
      this.activeModal = setModal;
    },
    scroll(offset) {
      this.offset = offset;
    },
    closeIframe() {
      var iframe = document.getElementById('myIframe');
      iframe.style.display = 'none';
    },
    open() {
      console.log('open');
      this.iframe = !this.iframe;
      this.url = constants.challengeUri;
      // this.url = 'http://localhost:8080/login';
      document.getElementsByTagName('iframe')[0].style.height = '66.7%';
      document.getElementsByTagName('iframe')[0].style.width = '32%';
      console.log(this.iframe);
      // window.location.href = constants.challengeUri;
    },
    toggleUserMenu() {
      console.log('Clicked');
      this.userMenuVisible = !this.userMenuVisible;
    },
    redirectHome() {
      this.$router.push('/');
    },

    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },

    // handleShowRoom() {
    //   this.showRoomSection = true;
    //   this.showCastSection = false;
    //   this.showCommunitySection = false;
    // },

    // handleShowCast() {
    //   this.showRoomSection = false;
    //   this.showCastSection = true;
    //   this.showCommunitySection = false;
    // },

    // handleShowCommunity() {
    //   this.showCommunitySection = true;
    //   this.showRoomSection = false;
    //   this.showCastSection = false;
    // },
    onRoom() {
      this.$router.push('/dashboard/rooms');
      this.isClicked2 = false;
      this.isClicked1 = true;
      this.isClicked3 = false;
    },
    onCasts() {
      this.$router.push('/dashboard/casts');
      this.isClicked2 = true;
      this.isClicked1 = false;
      this.isClicked3 = false;
    },
    onDecasts() {
      this.$router.push('/dashboard/decast');
      this.isClicked2 = false;
      this.isClicked1 = false;
      this.isClicked3 = true;
    }
  },
};
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}

.full-screen-div {
  width: 100%;
  height: 100%;
  background: #0a0b0f;
  color: white;
}

.dashboard_navbar {
  height: 16vh;
}

.dashboard_content {
  height: 84vh;
}

.basic_details_cont {
  /* border: 1px solid white;
  height: 70vh; */
}

.options-button {
  background: none;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.focused-button {
  color: #d7df23;
}

.con-vs-tooltip {
  border-radius: 0px !important;
  /* border: 1px solid red; */
  color: #0a0b0f !important;
}

.calls_clicked span svg .color_1 {
  fill: black;
}

.calls_clicked span svg .color_2 {
  fill: white;
  stroke: black;
}

.cast_clicked span svg .color_1 {
  fill: black;
}

.cast_clicked span svg .color_2 {
  fill: white;
  /* stroke: black; */
}

.decast_clicked span svg .color_1 {
  fill: black;
}

.decast_clicked span svg .color_2 {
  fill: white;
  stroke: black;
}
</style>