<template>
  <div>
    <div class="loading-logo">
      <img src="@/../public/logo.svg" alt="Logo" />
    </div>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import constants from '../../../constant';

export default {
  mounted() {
    const data = {
      id: this.$route.params.cast_Id,
      pass: this.$route.query.pass,
    };
    axios
      .post(constants.apiCastUrl + '/api/creator/join/cast/', data, {
        'Content-Type': 'application/json',
      })
      .then((res) => {
        console.log(res);
        location.href = res.data.cast_url;
      })
      .catch((e) => {
        console.log(e.response);
        if (
          e.response.status === 400 &&
          e.response.data.message ===
            'please check the scheduled cast start time'
        ) {
          location.href = '/joining/' + this.$route.params.cast_Id;
        }
      });
  },
};
</script>
<style scoped></style>
