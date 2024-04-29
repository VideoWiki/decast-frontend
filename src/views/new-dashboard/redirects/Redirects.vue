<template>
  <div>
    <h1>Loading...</h1>
  </div>
</template>

<script>
import constants from '../../../../constant';

export default {
  created() {
    const token = this.$route.query.token;
    const boardId = this.$route.query.board_id;
    const redirectTo = this.$route.query.redirect_to;

    this.setData(token, boardId, redirectTo)
      .then(response => {
        window.location.href = constants.challengeUri;
      })
      .catch(error => {
        console.error('Operation failed:', error);
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