<template>
    <form class="feedback modal">
        <h1>Обратная связь</h1>
        <input
            id="feedback_name"
            v-model="formData.name"
            type="text"
            class="modal--name"
            placeholder="Ваше имя"
        >
        <label for="feedback_name" />
        <input
            id="feedback_phone"
            v-model="formData.phone"
            type="text"
            class="modal--phone"
            placeholder="Телефон"
            @input="phoneInput($event.target)"
        >
        <label for="feedback_phone" />
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
        <div class="modal--photos-files">
            <span v-for="image in formData.photos" :key="image.name" class="badge" @click="removePhoto(image.name)">{{
                image.name
            }}</span>
        </div>

        <p class="modal--agree">
            Нажимая “Отправить”, Вы соглашаетесь с
            <a
                href="#"
                @click.prevent="
                    $store.dispatch('updateModal', {
                        name: 'Terms',
                        from: 'Feedback',
                    })
                "
            >пользовательским соглашением</a>
            и
            <a
                href="#"
                @click.prevent="
                    $store.dispatch('updateModal', {
                        name: 'Privacy',
                        from: 'Feedback',
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
  name: 'Feedback',
  components: {
    Checkbox,
  },
  computed: {
    formData() {
      return this.$store.state.modals.formData.find((el) => el.message_type === 'feedback');
    },
  },
  beforeDestroy() {
    for (const [key, value] of Object.entries(this.formData)) {
      if (typeof value === 'string' && value !== 'feedback') {
        this.$store.commit('assignFormDataField', {
          type: 'feedback',
          field: key,
          event: null,
        });
      }
      if (typeof value !== 'string') {
        this.$store.commit('assignFormDataField', {
          type: 'feedback',
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
        type: 'feedback',
        field: 'answer_to',
        event: e,
      });
    },
    filesInputHandle(e) {
      this.$store.dispatch('filesInputHandle', {
        type: 'feedback',
        el: this.$el,
        event: e,
      });
    },
    submitHandle() {
      this.$store.dispatch('submitHandle', 'feedback');
    },
  },
};
</script>

<style lang="scss"></style>
