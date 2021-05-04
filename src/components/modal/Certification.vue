<template>
    <form class="certification modal">
        <h1>Запись на сертификацию</h1>
        <input
            id="certification_name"
            v-model="formData.name"
            type="text"
            class="modal--name"
            placeholder="Ваше имя"
        >
        <label for="certification_name" />

        <input
            id="certification_phone"
            v-model="formData.phone"
            type="text"
            class="modal--phone"
            placeholder="Телефон"
            @input="phoneInput($event.target)"
        >
        <label for="certification_phone" />
        <div v-if="formData" class="modal--answer_to">
            <p>Если предпочитаете письменно:</p>
            <Checkbox
                v-for="answer in ['whatsapp', 'viber', 'telegram']"
                :key="answer"
                :item="answer"
                :parent="formData.answer_to"
                @mouseup.native="checkboxHandle(answer)"
            />
        </div>

        <textarea v-model="formData.message" placeholder="Примечание" />

        <p class="modal--agree">
            Нажимая “Отправить”, Вы соглашаетесь с
            <a
                href="#"
                @click.prevent="
                    $store.dispatch('updateModal', {
                        name: 'Terms',
                        from: 'certification',
                    })
                "
            >пользовательским соглашением</a>
            и
            <a
                href="#"
                @click.prevent="
                    $store.dispatch('updateModal', {
                        name: 'Privacy',
                        from: 'certification',
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
  name: 'Certification',
  components: {
    Checkbox,
  },
  computed: {
    formData() {
      return this.$store.state.modals.formData.find((el) => el.message_type === 'certification');
    },
  },
  methods: {
    phoneInput,
    checkboxHandle(e) {
      this.$store.commit('pushFormDataField', {
        type: 'certification',
        field: 'answer_to',
        event: e,
      });
    },
    selectHandle(e) {
      this.$store.commit('pushFormDataField', {
        type: 'certification',
        field: 'year_of_birth',
        event: e,
      });
    },
    filesInputHandle(e) {
      this.$store.dispatch('filesInputHandle', {
        type: 'certification',
        el: this.$el,
        event: e,
      });
    },
    submitHandle() {
      this.$store.dispatch('submitHandle', 'certification');
    },
  },
};
</script>

<style lang="scss">
.certification {
    p {
        margin-bottom: 12px;
    }
}
</style>
