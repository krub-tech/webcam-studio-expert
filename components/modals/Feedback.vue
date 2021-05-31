<template>
  <form class="feedback modal">
    <h1>Обратная связь</h1>
    <input
      id="name"
      name="name"
      type="text"
      class="modal--name"
      placeholder="Ваше имя"
    />
    <i class="for-name" />
    <input
      id="phone"
      name="phone"
      type="text"
      class="modal--phone"
      placeholder="Телефон"
    />
    <i class="for-phone" />
    <div class="modal--answer_to">
      <p class="label">Если предпочитаете письменно:</p>
      <Checkbox
        v-for="answer in ['whatsapp', 'viber', 'telegram']"
        :key="answer"
        :item="answer"
        :checked="$isChecked($store.state.modals.answer_to, answer)"
        @mouseup.native="answerToHandler(answer)"
      />
    </div>
    <i />
    <textarea name="message" placeholder="Опишите ситуацию" />
    <i />
    <input
      id="photos"
      type="file"
      class="modal--photos"
      multiple
      @input="filesInputHandle($event)"
    />
    <label for="photos"><p>Загрузить фото или файлы</p></label>
    <div class="modal--photos-files" />
    <p class="modal--agree">
      Нажимая “Отправить”, Вы соглашаетесь с
      <a href="#">пользовательским соглашением</a>
      и
      <a href="#"> политикой конфиденциальности</a>
    </p>
    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import Checkbox from '@/components/form/Checkbox'

export default {
  name: 'Feedback',
  components: {
    Checkbox,
  },
  methods: {
    answerToHandler(answer) {
      this.$store.commit('modals/updateAnswerTo', answer)
    },
    filesInputHandle(e) {
      this.$store.dispatch('modals/filesInputHandle', {
        el: this.$el,
        input: e.target,
      })
    },
    submit() {
      this.$store.dispatch('modals/submit', {
        message_type: 'feedback',
        form: this.$el,
      })
    },
  },
}
</script>
