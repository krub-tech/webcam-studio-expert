<template>
  <form class="feedback modal">
    <h1>Обратная связь</h1>
    <input
      id="feedback_name"
      name="name"
      type="text"
      class="modal--name"
      placeholder="Ваше имя"
    />
    <label for="feedback_name" />
    <input
      id="feedback_phone"
      name="phone"
      type="text"
      class="modal--phone"
      placeholder="Телефон"
    />
    <label for="feedback_phone" />
    <div class="modal--answer_to">
      <p class="label">Если предпочитаете письменно:</p>
      <Checkbox
        v-for="answer in ['whatsapp', 'viber', 'telegram']"
        :key="answer"
        :item="answer"
        :checked="$isChecked(answer_to, answer)"
        @mouseup.native="answerToHandler(answer)"
      />
    </div>

    <textarea name="message" placeholder="Опишите ситуацию" />

    <input
      id="photos"
      type="file"
      name="photos"
      class="modal--photos"
      multiple
      @input="filesInputHandle($event)"
    />
    <label for="photos"><p>Загрузить фото или файлы</p></label>
    <div class="modal--photos-files">
      <!-- <span
        v-for="image in formData.photos"
        :key="image.name"
        class="badge"
        @click="removePhoto(image.name)"
        >{{ image.name }}</span
      > -->
    </div>

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

import { postFormData } from '@/api/misc'

export default {
  name: 'Feedback',
  components: {
    Checkbox,
  },
  data() {
    return {
      answer_to: [],
    }
  },
  methods: {
    postFormData,
    answerToHandler(answer) {
      this.$toArray(this.answer_to, answer)
    },
    filesInputHandle(e) {
      console.log(e.target.files)
      this.$store.dispatch('modals/filesInputHandle', {
        el: this.$el,
        event: e,
      })
    },
    submit() {
      const formData = new FormData(this.$el)
      // formData.append('message_type', 'feedback')
      // this.answer_to.forEach((el) => {
      //   formData.append('answer_to', el)
      // })
      this.$store.commit('modals/setAnswerTo', this.answer_to)
      this.$store.dispatch('modals/submit', {
        message_type: 'feedback',
        form: this.$el,
      })
    },
  },
}
</script>
