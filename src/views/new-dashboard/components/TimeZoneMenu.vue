<template>
    <div class="timezone-select">
      <select v-model="stepOneProps.timezone" class="custom-select">
        <option v-for="item in menuList" :key="item.id" :value="item.value">
          {{ item.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: "TimeZoneMenu",
    props: {
      menuList: {
        type: Array,
        required: true,
      },
      stepOneProps: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  /* Style the select to resemble the dropdown menu */
  .timezone-select {
    position: relative;
    background-color: #FFFFFF;
    color: #000000;
    cursor: pointer;
    margin-top: 0.5rem;
    width: 196px;
  }
  
  .custom-select {
    font-family: "JetBrains Mono", monospace;
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #ffffff;
    border-radius: 6px;
    font-size: 12px;
    width: 196px;
    padding: 0.5rem;
    box-sizing: border-box;
    appearance: none; /* Hides default arrow on most browsers */
    outline: none;
  }
  
  .custom-select option {
    background: #000000;
    color: #ffffff;
    padding: 5px 10px;
  }
  
  /* Optional: Add a custom arrow */
  .custom-select::after {
    content: "▼";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 10px;
    color: #ffffff;
  }
  </style>
  