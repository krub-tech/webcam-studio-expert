<template>
    <form class="claim modal">
        <h1>Оставить жалобу</h1>
        <p>Мы сможем помочь в этих случаях, а вот в этих, к сожалению, нет.</p>
        <input
            id="claim_name"
            v-model="formData.name"
            type="text"
            class="modal--name"
            placeholder="Ваше имя"
        >
        <label for="claim_name" />
        <input
            id="claim_phone"
            v-model="formData.phone"
            type="text"
            class="modal--phone"
            placeholder="Телефон"
            @input="phoneInput($event.target)"
        >
        <label for="claim_phone" />
        <div v-if="formData" class="modal--answer_to">
            <p class="label">
                Если предпочитаете письменно:
            </p>
            <Checkbox
                v-for="answer in ['whatsapp', 'viber', 'telegram']"
                :key="answer"
                :item="answer"
                :parent="formData.answer_to"
                @mouseup.native="checkboxHandle(answer)"
            />
        </div>

        <textarea v-model="formData.message" placeholder="Опишите ситуацию" />

        <input
            id="photos"
            type="file"
            class="modal--photos"
            multiple
            @input="filesInputHandle($event)"
        >
        <label for="photos"><p>Загрузить фото или файлы</p></label>
        <div class="modal--photos-files" />

        <p class="modal--agree">
            Нажимая “Отправить”, Вы соглашаетесь с
            <a
                href="#"
                @click.prevent="
                    $store.dispatch('updateModal', {
                        name: 'Terms',
                        from: 'Claim',
                    })
                "
            >пользовательским соглашением</a>
            и
            <a
                href="#"
                @click.prevent="
                    $store.dispatch('updateModal', {
                        name: 'Privacy',
                        from: 'Claim',
                    })
                "
            >
                политикой конфиденциальности</a>
        </p>

        <button class="modal--submit" @click.prevent="submitHandle">
            Отправить
        </button>
    </form>
</template>

<script>
import Checkbox from '@/components/form/Checkbox';

import { phoneInput } from '@/helpers';

export default {
  name: 'Claim',
  components: {
    Checkbox,
  },
  computed: {
    formData() {
      return this.$store.state.modals.formData.find((el) => el.message_type === 'complaint');
    },
  },
  beforeDestroy() {
    for (const [key, value] of Object.entries(this.formData)) {
      if (typeof value === 'string' && value !== 'complaint') {
        this.$store.commit('assignFormDataField', {
          type: 'complaint',
          field: key,
          event: null,
        });
      }
      if (typeof value !== 'string') {
        this.$store.commit('assignFormDataField', {
          type: 'complaint',
          field: key,
          event: [],
        });
      }
    }
  },
  methods: {
    phoneInput,
    checkboxHandle(e) {
      this.$store.commit('pushFormDataField', {
        type: 'complaint',
        field: 'answer_to',
        event: e,
      });
    },
    selectHandle(e) {
      this.$store.commit('pushFormDataField', {
        type: 'complaint',
        field: 'year_of_birth',
        event: e,
      });
    },
    filesInputHandle(e) {
      this.$store.dispatch('filesInputHandle', {
        type: 'complaint',
        el: this.$el,
        event: e,
      });
    },
    submitHandle() {
      this.$store.dispatch('submitHandle', 'complaint');
    },
  },
};
</script>
