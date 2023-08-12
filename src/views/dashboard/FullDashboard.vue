<template>
  <div class="container-full">
    <div class="nav-bar flex">
      <div class="leftPart">
        <div class="wiki-logo">
          <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" />
        </div>
      </div>
      <div class="rightPart flex">
        <div class="search-bar flex">
          <input placeholder="Search" type="text" />
          <img src="@/assets/images/dashboard/Search.svg" />
        </div>
        <div class="wallet">
          <img src="@/assets/images/dashboard/Wallet.svg" />
        </div>
        <div class="setting">
          <img src="@/assets/images/dashboard/Setting.svg" />
        </div>
      </div>
    </div>
    <div class="buttomPart">
      <div class="vertical-line sideOne flex justify-items-center">
        <LeftPart />
      </div>
      <div class="middleOne vertical-line">
        <Rooms />
      </div>
      <div class="sideOne">
        <RightPart />
      </div>
    </div>
  </div>
</template>
<script>
import LeftPart from './components/LeftPart.vue';
import RightPart from './components/RightPart.vue';
import Rooms from '../login/Room.vue';
export default {
  name: 'FullDashBoard',
  components: {
    LeftPart,
    RightPart,
    Rooms,
  },
};
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.container-full {
  background-color: #181a20;
}

.middleOne {
  width: 36%;
}

.sideOne {
  width: 30%;
}

.nav-bar {
  padding: 20px 67px 0px 67px;
  align-items: center;
  justify-content: space-between;
}
.wiki-logo img {
  height: 91px;
  width: 91px;
}
.rightPart {
  align-items: center;
}
.search-bar {
  height: 40px;
  width: 197px;
  border: 1px solid #31394e;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px 12px 10px;
}
.search-bar input {
  background-color: #181a20;
  border: none;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 14.03px;
}
.search-bar img {
  width: 16px;
  height: 16px;
  color: #7a7a7a;
}
.wallet {
  margin-left: 68px;
  width: 16px;
  height: 16px;
  color: #637181;
}
.setting {
  margin-left: 24px;
  width: 16.5px;
  height: 16.5px;
  color: #637181;
}
.buttomPart {
  height: 735px;
  display: flex;
  margin: 20px auto;
}
.vertical-line {
  border-right: 1px solid #31394e;
}
</style>
