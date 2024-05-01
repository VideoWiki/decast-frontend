<template>
  <div class="loader-container" id="loading-bg">
    <div class="svg-container">
      <img src="https://decast.live/vw.svg" alt="Logo" style="width:100%;" />
    </div>
  </div>
</template>

<script>
import constants from '../../../../constant';

export default {
  created() {
    document.getElementById('loading-bg').style.display = 'block';
    const token = this.$route.query.token;
    const boardId = this.$route.query.board_id;
    const redirectTo = this.$route.query.redirect_to;

    this.setData(token, boardId, redirectTo)
      .then(response => {
        window.open(constants.challengeUri, '_blank', 'width=600,height=600');
        // window.location.href = constants.challengeUri;
        document.getElementById('loading-bg').style.display = 'none';
      })
      .catch(error => {
        console.error('Operation failed:', error);
        document.getElementById('loading-bg').style.display = 'none';
      });
  },
  methods: {
    async setData(token, boardId, redirectTo) {
      try {
        localStorage.setItem("LOG_TOKEN", token);
        localStorage.setItem("LOG_BOARDID", boardId);
        localStorage.setItem("LOG_REDIRECT", redirectTo);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>