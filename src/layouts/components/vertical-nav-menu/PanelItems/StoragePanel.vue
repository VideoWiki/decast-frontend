<template>
  <div class="storage-panel">
    <h2>Storage Options</h2>
    <div class="storage-options">
      <div class="option-container flex">
        <button class="storage-buttons">
          <vs-avatar color="primary" icon="storage" />
        </button>
        <span class='button-heading'>Local Disk</span>
      </div>
      <div class="option-container flex">
        <button class="storage-buttons">
          <vs-avatar color="primary" icon="storage" />
        </button>
        <span class='button-heading'>Public Cloud</span>
      </div>
      <div class="option-container flex">
        <button class="storage-buttons">
          <vs-avatar color="primary" icon="storage" />
        </button>
        <span class='button-heading'>Private Cloud</span>
      </div>
      <div class="option-container flex">
        <button class="storage-buttons">
          <vs-avatar color="primary" icon="storage" />
          <span class='button-heading'>Decentralized</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoragePanel',

};
</script>

<style scoped>

.storage-panel{
  background-color: #EEF0F5;
  color: #D0D5DD;
}
.storage-buttons{
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #D0D5DD;
  cursor: pointer;
}

.button-heading{
  color:#D0D5DD;
}

.option-container{
  background-color: #FFFFFF;
  justify-content: left;
  gap:"20px";
  margin:auto;
  width:380px;
  height:76px;
}
</style>
