<template>
  <section class="secondary-layout content">
    <h1>Тренинги</h1>
    <aside class="secondary-layout--nav">
      <ul>
        <li v-for="el in ['Моделям', 'Специалистам']" :key="el">
          {{ el }}
        </li>
      </ul>
    </aside>
    <main class="secondary-layout--list">
      <article
        v-for="item in trainings.specialist"
        :key="item.title"
        class="secondary-layout--item"
      >
        <div class="secondary-layout--item_title">
          <p class="secondary-layout--item_title-name">
            {{ item.title }}
          </p>
          <p class="secondary-layout--item_title-followers">
            {{ item.price }}
          </p>
        </div>
        <div class="secondary-layout--item_desc">
          <p>{{ item.date }}</p>
          <p>{{ item.duration }}</p>
          <p>{{ item.seats }}</p>
          <p>
            <a href="#">{{ item.link }}</a>
          </p>
          <p v-if="item.type">{{ item.type }}</p>
          <p v-if="item.address">{{ item.address }}</p>
        </div>
      </article>
    </main>
  </section>
</template>

<script>
export default {
  name: 'Trainings',
  data() {
    return {
      trainings: {
        specialist: [
          {
            title: 'Для администраторов и собственников студии',
            date: '15 янв в 18.00',
            duration: '2 ч',
            seats: '12 мест',
            link: 'Model’s guide',
            address: 'Невский проспект 14',
            price: 'бесплатно',
          },
          {
            title: 'Закрытое обучение для менеджеров',
            date: '17 янв в 12.00',
            duration: '3 ч',
            seats: '12 мест',
            link: 'Flirt4Free',
            type: 'Вебинар',
            price: '5 000 ₽',
          },
          {
            title: 'Обучение для администраторов',
            date: '21 янв в 12.00',
            duration: '5 ч',
            seats: '12 мест',
            link: 'ГОСВЕБКАМ',
            type: 'Фаянсовая 18',
            price: 'от 7 000 ₽',
          },
        ],
      },
    }
  },
}
</script>

<style lang="scss">
@mixin small-point {
  position: relative;
  margin-right: 28px;
  &::after {
    content: '';
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

.secondary-layout--item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.secondary-layout--item_title-name {
  color: var(--black);
}
.secondary-layout--item_desc {
  p {
    display: inline-block;
    &:not(:last-of-type) {
      @include small-point;
    }
  }
}
</style>
