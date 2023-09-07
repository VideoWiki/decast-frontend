<template>
  <div>
    <color-picker v-model="selectedColor" :bottomBar="false" :hidePalette="true" @input="updateColor" />
    <div class="color-preview" :style="{ backgroundColor: selectedColor }"></div>
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
    };
  },
  methods: {
    updateColor(color) {
      this.selectedColor = color.hex;
    },
  },
};
</script>

<style>
body {
  background-color: #1D232B;
}

.color-preview {
  width: 150px;
  height: 150px;
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
