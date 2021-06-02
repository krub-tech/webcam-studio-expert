<template>
  <form class="claim modal">
    <h1>Оставить жалобу</h1>
    <p>Мы сможем помочь в этих случаях, а вот в этих, к сожалению, нет.</p>
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
        :checked="$isChecked(formData.answer_to, answer)"
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
    <div class="modal--photos-files"></div>

    <TermsPrivacy />

    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import Checkbox from '@/components/form/Checkbox'
import TermsPrivacy from '@/components/modals/TermsPrivacy'

import { modals } from '@/mixins/modals'

export default {
  name: 'Claim',
  components: {
    Checkbox,
    TermsPrivacy,
  },
  mixins: [modals],
  data() {
    return {
      formData: {
        message_type: 'complaint',
        answer_to: [],
      },
      files: null,
      errors: null,
    }
  },
  methods: {
    async submit() {
      this.clearErrors()
      const formData = new FormData(this.$el)
      this.formDataAdd({ data: this.formData, formData })
      this.filesToFormData(formData, 'file')

      try {
        const request = await this.$api.messages.messageInput(formData)
        console.log(request)
        this.$store.commit('modals/setCurrent', 'SendSuccess')
      } catch (error) {
        if (error.response?.status === 400) {
          console.log('errors', error.response.data)
          this.errorsHandler(error.response.data)
        }
      }
    },
  },
}
</script>
