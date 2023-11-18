<template>
  <div class="sticky3_parent">
    <div class="sticky3">
      <div class="scroll_section">
        <div class="cont-contain">
          <div class="text">
            <h1 :style="{ fontSize: dynamicFontSize3 }">Why use</h1>
            <h1 :style="{ fontSize: dynamicFontSize3 }">Cast?</h1>
          </div>
          <div class="ima-cont" v-for="image in images" :key="image">
            <img
              style="border-radius: 80px !important"
              :src="image"
              alt="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const sticky3Sections = [...document.querySelectorAll('.sticky3')];
    const images = [
      require('@/assets/images/homepage/img1.svg'),
      require('@/assets/images/homepage/img2.svg'),
      require('@/assets/images/homepage/img3.svg'),
      require('@/assets/images/homepage/img4.svg'),
      require('@/assets/images/homepage/img5.svg'),
    ];

    images.forEach((img) => {
      sticky3Sections.forEach((section) => {
        let image = document.createElement('img');
        image.style.borderRadius = '20px';
        image.style.width = '100%';
        // image.style.maxHeight = '85vh';
        image.style.height = '100%';
        image.style.objectFit = 'contain';
        image.setAttribute('id', 'border');
        image.setAttribute('class', 'border2');
        image.src = img;
        section.querySelector('.scroll_section').appendChild(image);
      });
    });
  },
  methods: {
    // 'l4E9vuzw8mq5Uz7R2-jV_etSvY-wJFF0pFnmclfW_4Y.Y2DnBxW8hAldU7U_9DFgcZEbvGd4DEoozQgOQX5EX8Y'
    // '{"uid":0,"displayName":"John Doe","about":"Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.","email":"deepakjha0785@gmail.com","profile_image":null,"status":"online","userRole":"user","fist_name":"Sanji","profile_pic":"https://openid.video.wiki/media/user/profile_img/luufy.___Manga_anime_one_piece_Anime_faces_expressions_One_piece_luffy","username":"Sanji San","access_token":"l4E9vuzw8mq5Uz7R2-jV_etSvY-wJFF0pFnmclfW_4Y.Y2DnBxW8hAldU7U_9DFgcZEbvGd4DEoozQgOQX5EX8Y","acr":"labo","aud":["decast-prod"],"auth_time":1700286730,"first_name":"Sanji","iat":1700304394,"id":643,"iss":"https://login.decast.live/","last_name":"San","rat":1700304386,"sub":"ut "}'
  },
};
</script>

<style>
.fallbox-container {
  position: relative;
  width: 100%;
  height: 60vh;
  /* background-color: #f0f0f0; */
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.fallbox {
  position: absolute;
  width: fit-content;
  height: fit-content;
  padding: 20px 30px;
  border-radius: 35px;
  display: block;
  /* align-items: center; */
  /* justify-content: center; */
  color: white;
  font-size: xl;
  font-weight: bold;
  animation: fallbox-fall linear both;
  transform-origin: center bottom;
}

@keyframes fallbox-fall {
  0% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(20vh);
  }
  85% {
    transform: translateY(30vh);
  }
  100% {
    transform: translateY(50vh);
  }
}
</style>
