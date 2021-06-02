<template>
  <form class="interview modal">
    <h1>Обратная связь</h1>
    <input
      id="name"
      name="name"
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
    <TermsPrivacy />
    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import Checkbox from '@/components/form/Checkbox'
import TermsPrivacy from '@/components/modals/TermsPrivacy'

import { modals } from '@/mixins/modals'

export default {
  name: 'Interview',
  components: {
    Checkbox,
    TermsPrivacy,
  },
  mixins: [modals],
  data() {
    return {
      formData: {
        year_of_birth: null,
        studio: null,
      },
    }
  },
  mounted() {
    this.formData.studio = this.$route.params.id
  },
  methods: {
    submit() {
      this.$store.dispatch('modals/submit', {
        message_type: 'interview',
        form: this.$el,
        data: this.formData,
      })
    },
  },
}
</script>
