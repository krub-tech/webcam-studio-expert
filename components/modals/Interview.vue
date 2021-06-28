<template>
  <form class="interview modal">
    <h1>Запись на собеседование</h1>
    <input
      id="name"
      v-model="formData.name"
      type="text"
      class="modal--name"
      placeholder="Ваше имя"
    />
    <i class="for-name" />
    <Select
      id="year_of_birth"
      :options="years"
      :value="formData.year_of_birth || 'Год рождения'"
      @selectedOption="formData.year_of_birth = $event.toString()"
    />
    <i class="for-year_of_birth" />
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
    <textarea name="message" placeholder="Расскажите о себе" />
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
    <TermsPrivacy />
    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import Select from '@/components/form/Select'
import Checkbox from '@/components/form/Checkbox'
import TermsPrivacy from '@/components/modals/TermsPrivacy'

import { modals } from '@/mixins/modals'

export default {
  name: 'Interview',
  components: {
    Select,
    Checkbox,
    TermsPrivacy,
  },
  mixins: [modals],
  data() {
    return {
      formData: {
        message_type: 'interview',
        name: null,
        year_of_birth: null,
        studio: null,
        answer_to: null,
        phone: null,
      },
      requiredFields: ['name', 'phone'],
      files: null,
      errors: null,
    }
  },
  methods: {
    async submit() {
      this.clearErrors()
      const isValid = this.validator()
      if (!isValid) return

      const formData = new FormData(this.$el)
      this.formData.studio = this.$route.params.id.toString()
      this.formDataAdd({ data: this.formData, formData })
      this.filesToFormData(formData, 'file')
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
