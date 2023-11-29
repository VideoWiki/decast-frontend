<template>
  <div class="foot-cont">
    <div class="footer">
      <div class="log-co">
        <img src="@/assets/images/mono-logo.svg" />
        <p>
          LEREN LEREN , UNIPESSOAL LDA, Parque de Ciéncia e Inovacáo - Vía do
          Conhecimento s/n 3830-352 Ílhavo, Portugal NIF/NIPC - 517383861 Phone
          no. +351 912159105
        </p>
      </div>
      <div class="log-co2">
        <p>See yourself</p>
        <button>Book a Demo</button>
        <div class="mt-10">
          <div>
            <p>Helpful links</p>
            <h5
              class="cursor-pointer mt-8"
              style="color: #ffffff"
              @click="$router.push('/features')"
            >
              Features
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="$router.push('/faq')"
            >
              Faqs
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="$router.push('/achievements')"
            >
              Achievements
            </h5>
          </div>
          <div>
            <P>Contact us</P>
            <h5
              class="cursor-pointer mt-8"
              style="color: #ffffff"
              @click="$router.push('/contact')"
            >
              Contact Us
            </h5>
            <h5 class="cursor-pointer mt-4" style="color: #ffffff">
              Work With Us
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="redirectToLink"
            >
              Suggestions
            </h5>
          </div>
        </div>
      </div>

      <div class="log-co3">
        <div>
          <p>Follow Us</p>
          <button><img src="@/assets/images/f.svg" /></button>
          <button @click="reTweet"><img src="@/assets/images/t.svg" /></button>
          <button @click="reLink"><img src="@/assets/images/l.svg" /></button>
        </div>

        <div class="mt-12">
          <p>Policy</p>
          <h5 class="cursor-pointer mt-8" style="color: #ffffff">Report</h5>
          <h5
            class="cursor-pointer mt-5"
            style="color: #ffffff"
            @click="redirect"
          >
            Privacy
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    redirectToLink() {
      window.open('https://fider.video.wiki/', '_blank');
    },
    redirect() {
      window.open('https://video.wiki/privacy-policy', '_blank');
    },
    reTweet() {
      window.open('https://twitter.com/VideoWiki_PT', '_blank');
    },
    reLink() {
      window.open('https://www.linkedin.com/company/videowiki.pt/', '_blank');
    },
  },
};
</script>

<style scoped>
.foot-cont {
  background-color: rgba(24, 26, 32, 1);
  padding: 40px;
  margin-top: 6rem;
}

.footer {
  width: 85%;
  margin: auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
}

.log-co {
  max-width: 250px;
  width: 20%;
}

.log-co p {
  font-size: small;
  color: #ffffff;
  text-align: left;
  margin-top: 4rem;
  cursor: pointer;
}
.log-co img {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
}

.log-co2 {
  width: 40%;
}
.log-co2 button {
  height: 60px;
  width: 200px;
  background-color: #d7df23;
  border-radius: 4px;
  border: none;
  margin-top: 3rem;
  cursor: pointer;
  font-weight: 600;
  font-size: medium;
}

.log-co2 > div {
  display: flex;
  justify-content: space-between;
}

.log-co2 p,
.log-co3 p {
  color: #637181;
  cursor: pointer;
}

.log-co3 button {
  margin-top: 2rem;
  border: 1px solid #637181;
  border-radius: 50%;
  background: transparent;
  width: 61px;
  height: 61px;
  margin-right: 10px;
  cursor: pointer;
}

.log-co3 div:nth-child(2) {
  text-align: left;
  width: fit-content;
  margin-left: 75%;
}

@media screen and (max-device-width: 980px) {
  .foot-cont {
    background-color: rgba(24, 26, 32, 1);
    padding: 20px;
    margin-top: 6rem;
  }

  .footer {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-direction: column;
  }
  .log-co {
    width: 90%;
    max-width: 350px;
  }

  .log-co p {
    text-align: left;
    margin-top: 2rem;
  }

  .log-co img {
    max-width: 120px;
    max-height: 120px;
    width: auto;
    height: auto;
    margin-left: -10px;
  }
  .log-co2 {
    width: 95%;
  }

  h5 {
    cursor: pointer !important;
  }

  .log-co2 div {
    flex-direction: column;
    gap: 30px;
  }

  .log-co3 div:nth-child(2) {
    text-align: left;
    width: fit-content;
    margin-left: 0%;
  }
}
</style>
<template>
  <div class="foot-cont">
    <div class="footer">
      <div class="log-co">
        <img src="@/assets/images/mono-logo.svg" />
        <p>
          LEREN LEREN , UNIPESSOAL LDA, Parque de Ciéncia e Inovacáo - Vía do
          Conhecimento s/n 3830-352 Ílhavo, Portugal NIF/NIPC - 517383861 Phone
          no. +351 912159105
        </p>
      </div>
      <div class="log-co2">
        <p>See yourself</p>
        <button>Book a Demo</button>
        <div class="mt-10">
          <div>
            <p>Helpful links</p>
            <h5
              class="cursor-pointer mt-8"
              style="color: #ffffff"
              @click="$router.push('/features')"
            >
              Features
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="$router.push('/faq')"
            >
              Faqs
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="$router.push('/achievements')"
            >
              Achievements
            </h5>
          </div>
          <div>
            <P>Contact us</P>
            <h5
              class="cursor-pointer mt-8"
              style="color: #ffffff"
              @click="$router.push('/contact')"
            >
              Contact Us
            </h5>
            <h5 class="cursor-pointer mt-4" style="color: #ffffff">
              Work With Us
            </h5>
            <h5
              class="cursor-pointer mt-4"
              style="color: #ffffff"
              @click="redirectToLink"
            >
              Suggestions
            </h5>
          </div>
        </div>
      </div>

      <div class="log-co3">
        <div>
          <p>Follow Us</p>
          <button><img src="@/assets/images/f.svg" /></button>
          <button @click="reTweet"><img src="@/assets/images/t.svg" /></button>
          <button @click="reLink"><img src="@/assets/images/l.svg" /></button>
        </div>

        <div class="mt-12">
          <p>Policy</p>
          <h5 class="cursor-pointer mt-8" style="color: #ffffff">Report</h5>
          <h5
            class="cursor-pointer mt-5"
            style="color: #ffffff"
            @click="redirect"
          >
            Privacy
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    redirectToLink() {
      window.open('https://fider.video.wiki/', '_blank');
    },

    redirect() {
      window.open('https://video.wiki/privacy-policy', '_blank');
    },
    reTweet() {
      window.open('https://twitter.com/VideoWiki_PT', '_blank');
    },
    reLink() {
      window.open('https://www.linkedin.com/company/videowiki.pt/', '_blank');
    },
  },
};
</script>

<style scoped>
.foot-cont {
  background-color: rgba(24, 26, 32, 1);
  padding: 40px;
  margin-top: 6rem;
}

.footer {
  width: 85%;
  margin: auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
}

.log-co {
  max-width: 250px;
  width: 20%;
}

.log-co p {
  font-size: small;
  color: #ffffff;
  text-align: left;
  margin-top: 4rem;
  cursor: pointer;
}
.log-co img {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
}

.log-co2 {
  width: 40%;
}
.log-co2 button {
  height: 60px;
  width: 200px;
  background-color: #d7df23;
  border-radius: 4px;
  border: none;
  margin-top: 3rem;
  cursor: pointer;
  font-weight: 600;
  font-size: medium;
}

.log-co2 > div {
  display: flex;
  justify-content: space-between;
}

.log-co2 p,
.log-co3 p {
  color: #637181;
  cursor: pointer;
}

.log-co3 button {
  margin-top: 2rem;
  border: 1px solid #637181;
  border-radius: 50%;
  background: transparent;
  width: 61px;
  height: 61px;
  margin-right: 10px;
  cursor: pointer;
}

.log-co3 div:nth-child(2) {
  text-align: left;
  width: fit-content;
  margin-left: 75%;
}

@media screen and (max-device-width: 980px) {
  .foot-cont {
    background-color: rgba(24, 26, 32, 1);
    padding: 20px;
    margin-top: 6rem;
  }

  .footer {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-direction: column;
  }
  .log-co {
    width: 90%;
    max-width: 350px;
  }

  .log-co p {
    text-align: left;
    margin-top: 2rem;
  }

  .log-co img {
    max-width: 120px;
    max-height: 120px;
    width: auto;
    height: auto;
    margin-left: -10px;
  }
  .log-co2 {
    width: 95%;
  }

  h5 {
    cursor: pointer !important;
  }

  .log-co2 div {
    flex-direction: column;
    gap: 30px;
  }

  .log-co3 div:nth-child(2) {
    text-align: left;
    width: fit-content;
    margin-left: 0%;
  }
}
</style>
