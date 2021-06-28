<template>
  <div class="cards">
    <main class="cards--container">
      <Card v-for="studio in studios" :key="studio.id" :data="studio" />
    </main>
    <footer>
      <Pagination :length="length" />
      <h2>
        <span>SEO-текст</span>
        Вот уже более трех лет мы успешно продвигаем свои услуги на рынке
        онлайн-развлечений. В Санкт-Петербурге мы ищем целеустремленных и
        привлекательных девушек, а также парней, которые хотели бы начать карьеру
        веб-модели в успешной компании. Мы предлагаем стабильную работу, высокую
        зарплату, свободный график, путешествия за рубеж от нашей студии, современный
        офис в центре Санкт-Петербурга и массу приятных бонусов.
      </h2>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  props: {
    studios: {
      type: Array,
      default: () => [],
    },
    length: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.cards {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  &--container {
    display: grid;
    gap: var(--fr-l);
    grid-template-columns: minmax(300px, 100%);
    justify-content: center;
    padding-bottom: var(--fr-3);
  }
  h2 {
    white-space: normal;
    font-size: 0.875rem;
    font-weight: normal;
    line-height: 1.25;
    background-color: var(--white);
    border-radius: var(--fr-m);
    padding: var(--fr-l);
    margin-top: var(--fr-3);
    margin-bottom: var(--fr-4);
    span {
      display: block;
      font-weight: bold;
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media screen and (min-width: 420px) {
  .cards {
    &--container {
      // height: max-content;
      grid-template-columns: repeat(2, 300px);
      justify-content: flex-start;
      margin: 0;
    }
    h2 {
      width: 630px;
    }
  }
  @media screen and (min-width: 1280px) {
    .cards {
      &--container {
        grid-template-columns: repeat(3, 295px);
        gap: var(--fr);
      }
      h2 {
        width: 880px;
      }
    }
  }
}
</style>
