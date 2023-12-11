<template>
  <div class="center-container-full">
        <button
          class="header-button p-2"
          style="
            border: 1px solid #a6a6a8;
            border-radius: 5px;
            background-color: #1f272f;
            width: 28px;
            height: 28px;
          "
          @click="openModal"
        >add cast</button>
        <div> cast rendered here</div>
  </div>
</template>
<script>
export default {
  name: 'CastSection',
  data() {
    return {
      create: false,
      showCastIsLive: false,
      casts: [],
      castInfo: {},
      mouse: 0,
      index: '',
    };
  },
  mounted() {
    this.getCastList();
  },
  methods: {
    async getCastList() {
      const response = await this.$store.dispatch('cast/getUserCasts');
      const casts = response.data.my_events;
      const castInfoPromises = casts.map(async (cast) => {
        try {
          const castDetails = await this.$store.dispatch(
            'cast/editEvent',
            cast.public_meeting_id
          );
          return { castId: cast.public_meeting_id, details: castDetails.data };
        } catch (error) {
          console.error(error);
          return null;
        }
      });
      this.castsInfo = castsInfo;
      this.casts = casts
    },
    openCreate() {
      this.create = true;
    },
    closeCreate() {
      this.create = false;
    },
  }
};
</script>
