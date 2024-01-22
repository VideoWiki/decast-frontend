<template>
  <label class="switch">
    <input type="checkbox" :checked="isChecked" @change="toggleSwitch" />
    <span :class="{ 'slider': !isCheck, 'slide-right': isCheck }"></span>
  </label>
</template>
<script>
export default {
  name:'ToggleSwitch',
  props:['isNewCheck'],
  data() {
    return {
      isChecked: false,
      isCheck:this.isNewCheck,
    };
  },
  mounted() {
    // this.isCheck=null;
    console.log(this.isCheck, this.isNewCheck,'fjfjj');
  },
  methods: {
    toggleSwitch() {
      this.$emit('toggle', !this.isChecked);
    },
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 21px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #353d4e;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 21px; /* Adjusted to half of the height of the switch */
}

.slide-right {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #353d4e;
  /* border: 1px solid red; */
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 21px; /* Adjusted to half of the height of the switch */
}

.slide-right::before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  right: 2px; /* Adjusted to align with the rounded slider */
  top: 1px;
  bottom: 1px;
  border-radius: 19px;
  background-color: #2196f3;
  border: white solid 2px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider::before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 2px; /* Adjusted to align with the rounded slider */
  top: 1px;
  bottom: 1px;
  border-radius: 19px;
  background-color: #2196f3;
  border: white solid 2px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.switch input:checked ~ .slide-right::before {
  -webkit-transform: translateX(-24px);
  transform: translateX(-24px);
}

.switch input:checked ~ .slider::before {
  -webkit-transform: translateX(0px);
  transform: translateX(0px);
}
</style>
