<template>
  <section class="certificate-page">
    <aside class="certificate-page--nav">
      <ul>
        <li>Студиям</li>
        <li>Специалистам</li>
      </ul>
    </aside>
    <main class="certificate-page--content">
      <div class="certificate-page--title">
        <button class="btn-back" @click="$router.go(-1)" />
        <h1>Сертификация веб-студии</h1>
        <button
          class="certificate-page--btn-proposal-header"
          @click="$store.dispatch('updateModal', { name: 'Certification' })"
        >
          Оставить заявку
        </button>
      </div>
      <p class="certificate-page--text">Текст</p>
      <img
        src="@/assets/img/certificate.png"
        alt="Сертификат Webcam Studio Expert"
      />
      <!-- <Slider :data="slides" /> -->
      <button
        class="certificate-page--btn-proposal-footer"
        @click="$store.dispatch('updateModal', { name: 'Certification' })"
      >
        Оставить заявку
      </button>
      <div class="certificate-page--contacts">
        <p>
          <a href="tel:+78126428980">+7 (812) 642-89-80</a>
        </p>
        <div>
          <button class="certificate-page--btn-whtsp" />
          <button class="certificate-page--btn-viber" />
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Slider from "@/components/Slider";
export default {
  name: "Certificate",
  components: {
    Slider,
  },
  data() {
    return {
      slides: [],
    };
  },
  methods: {
    getSlides() {
      for (let i = 1; i <= 6; i++) {
        fetch(`https://picsum.photos/200/300?random=${i}`).then((response) =>
          this.slides.push(response.url)
        );
      }
    },
  },
  mounted() {
    this.getSlides();
  },
};
</script>

<style lang="scss">
@mixin small-point {
  position: relative;
  margin-right: 30px;
  &::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    top: 50%;
    transform: translateY(-25%);
    border-radius: 50%;
    background-color: var(--black);
    opacity: 0.1;
    right: -18px;
    @content;
  }
}
.certificate-page {
  // height: calc(100vh - 448px);

  .slider {
    height: 200px;
    margin-bottom: 40px;
  }
}

.certificate-page--nav {
  display: none;
  ul {
    width: 320px;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto;
  }
  li {
    width: 100%;
    height: 56px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fefeff;
    border-bottom: 1px solid var(--grey);
    padding-left: var(--fr);
    &::after {
      content: attr(count);
      position: absolute;
      color: #8b8ba3;
      right: 20px;
    }
  }
}

.certificate-page--content {
  display: block;
  height: max-content;
  width: 100%;
  background-color: #fefeff;
  border-radius: 10px;
  padding: 30px;
  h1 {
    font-size: 22px;
    color: #222226;
  }
}
.certificate-page--title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.certificate-page--btn-proposal-header,
.certificate-page--btn-proposal-footer {
  height: var(--fr-2);
  background: linear-gradient(86.42deg, #b4dbff 0%, #bef3ff 100%);
  border-radius: 0.5rem;
  padding: var(--fr-m) 1rem;
}
.certificate-page--btn-proposal-header {
  display: none;
}
.certificate-page--btn-proposal-footer {
  width: 100%;
  margin: 40px 0;
}
.certificate-page--text {
  padding: 40px 0;
}
.certificate-page--contacts {
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: #222226;
    @include small-point;
  }
  div {
    display: flex;
    align-items: center;
  }
}
.certificate-page--btn-whtsp,
.certificate-page--btn-viber {
  width: 1.5rem;
  height: 1.5rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.certificate-page--btn-whtsp {
  background-image: url("~@/assets/svg/i-whatsapp.svg");
  @include small-point;
}
.certificate-page--btn-viber {
  background-image: url("~@/assets/svg/i-viber.svg");
}

@media screen and (min-width: 420px) {
  .certificate-page {
    min-height: calc(100vh - 448px);
    display: grid;
    grid-template-areas: "aside certificate-page";
    grid-template-columns: 320px max-content;
    padding: 50px 0;
    .slider {
      height: 360px;
      margin-bottom: 40px;
    }
  }
  .certificate-page--nav {
    display: block;
    grid-area: aside;
    ul {
      margin: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .certificate-page--content {
    width: 640px;
    padding: 40px;
    margin-left: 40px;
  }
  .certificate-page--title {
    padding-bottom: 30px;
    border-bottom: 1px solid #eeeef6;
  }
  .certificate-page--btn-proposal-header {
    display: block;
  }
  .certificate-page--btn-proposal-footer {
    display: none;
  }
  .certificate-page--contacts {
    justify-content: flex-start;
    margin-top: 40px;
    padding-top: 40px;
    border-top: 1px solid #eeeef6;
  }
}
@media screen and (min-width: 1360px) {
  .certificate-page {
    justify-content: center;
  }
  .certificate-page--nav {
    ul {
      border-radius: 20px;
    }
  }
}
</style>
