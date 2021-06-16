<template>
  <form class="certification modal">
    <h1>Запись на сертификацию</h1>
    <input
      id="name"
      v-model="formData.name"
      type="text"
      class="modal--name"
      placeholder="Ваше имя"
    />
    <i class="for-name" />
    <input
      id="phone"
      type="text"
      class="modal--phone"
      placeholder="Телефон"
      @input="phoneInputHandle($event, 'phone')"
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

    <textarea name="message" placeholder="Примечание" />

    <TermsPrivacy />

    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import Checkbox from '@/components/form/Checkbox'
import TermsPrivacy from '@/components/modals/TermsPrivacy'

import { modals } from '@/mixins/modals'

export default {
  name: 'Certification',
  components: {
    Checkbox,
    TermsPrivacy,
  },
  mixins: [modals],
  data() {
    return {
      formData: {
        message_type: 'certification',
        name: null,
        studio: '1',
        answer_to: null,
        phone: null,
      },
      requiredFields: ['name', 'phone'],
      errors: null,
    }
  },
  methods: {
    async submit() {
      this.clearErrors()
      const isValid = this.validator()
      if (!isValid) return

      const formData = new FormData(this.$el)
      this.formDataAdd({ data: this.formData, formData })

      try {
        const request = await this.$api.messages.messageRequest(formData)
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
