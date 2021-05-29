<template>
  <form class="claim modal">
    <h1>Оставить жалобу</h1>
    <p>Мы сможем помочь в этих случаях, а вот в этих, к сожалению, нет.</p>
    <input
      id="claim_name"
      name="name"
      type="text"
      class="modal--name"
      placeholder="Ваше имя"
    />
    <i />
    <input
      id="claim_phone"
      name="phone"
      type="text"
      class="modal--phone"
      placeholder="Телефон"
    />
    <i />
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
    <textarea name="message" placeholder="Опишите ситуацию" />
    <input
      id="photos"
      type="file"
      class="modal--photos"
      multiple
      @input="filesInputHandle($event)"
    />
    <label for="photos"><p>Загрузить фото или файлы</p></label>
    <div class="modal--photos-files"></div>

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
  name: 'Claim',
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
        files: e.target.files,
      })
    },
    submit() {
      this.$store.dispatch('modals/submit', {
        message_type: 'complaint',
        form: this.$el,
      })
    },
  },
}
</script>
