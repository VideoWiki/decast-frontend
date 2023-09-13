<template>
  <div>
    <div class="color-preview flex"  @click="toggleColorPicker">
      <div class="color" :style="{ backgroundColor: selectedColor }"></div>
      <div class="name-color">{{ selectedColor }}</div>
      <div class="cross">
        <img src="@/assets/images/editor/Vector3.svg"/>
      </div>
    </div>
    <color-picker v-if="colorPickerVisible" v-model="selectedColor" :bottomBar="false" :hidePalette="true" @input="updateColor" />
  
  </div>
</template>

<script>
import { Sketch } from 'vue-color';

export default {
  components: {
    ColorPicker: Sketch,
  },
  data() {
    return {
      selectedColor: '#ff0000', // Initial color
      colorPickerVisible: false,
    };
  },
  methods: {
    updateColor(color) {
      this.selectedColor = color.hex;
    },
    toggleColorPicker() {
      this.colorPickerVisible = !this.colorPickerVisible;
    },
  },
};
</script>

<style>
body {
  background-color: #1D232B;
}

.color-preview {
  width: 137px;
  height: 32px;
  border: 1px solid #31394E;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
}
.color{
  width: 32px;
  height: 32px;
  border-radius: 6px;
}
.name-color{
  margin-left: 10px;
  font-weight: 500;
  font-size: 12px;
  color: #A6A6A8;

}
.cross{
  width: 33px;
  height: 32px;
  background-color: #242D36;
  border-radius: 0px 6px 6px 0px;
  border: 1px solid #31394E;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cross img{
  width: 7px;
  height: 7px;
}

.vc-sketch {
  min-width: 278px;
  min-height: 250px;
  max-height: 270px;
  border-radius: 10px;
  border: 1px solid #31394e;
  background-color: #1F272F;
  margin: auto;
  padding: 0%;
  margin-top: 2rem;
}

.vc-checkerboard {
  display: none;
}

.vc-saturation {
  width: 278px;
  height: 153px;
  margin: 0%;
  /* border: 1px solid white; */
}

.vc-saturation-circle{
  width: 16px !important;
  height: 16px !important;
}

.vc-sketch-controls {
  /* border: 1px solid green; */
  margin: auto;
  margin-top: -50px;
  width: 270px;
}

.vc-sketch-saturation-wrap {
  width: 278px;
  height: auto;
  /* min-height: 153px;
  max-height: 160px; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* border: 1px solid yellow; */
}

.vc-sketch-field--single {
  /* border: 1px solid yellow; */
  display: none;
}

.vc-editable-input{
  display: flex;
  flex-direction: row-reverse;
  color:#A6A6A8;
  gap: 5px;
  padding: 0%;
}


.vc-input__label{
  color: #A6A6A8 !important;
  font-size: 14px !important;
  margin: auto !important;
}


span{
  color: #A6A6A8;
}

.vc-input__input {
  background-color: #1D232B;
  max-width: 221px;
  height: 32px;
  border-radius: 6px;
  outline-color: #31394E !important;
  padding: 0%;
  color:#A6A6A8;
  font-size: 14px !important;
  margin: auto;
}


.vc-sketch-presets {
  display: none;
  visibility: hidden;
}
</style>
