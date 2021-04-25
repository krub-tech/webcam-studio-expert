<template>
  <form class="certification modal">
    <h1>Запись на сертификацию</h1>
    <input
      type="text"
      id="certification_name"
      class="modal--name"
      placeholder="Ваше имя"
      v-model="formData.name"
    />
    <label for="certification_name"></label>

    <input
      type="text"
      id="certification_phone"
      class="modal--phone"
      placeholder="Телефон"
      v-model="formData.phone"
      @input="phoneInput($event.target)"
    />
    <label for="certification_phone"></label>
    <div class="modal--answer_to" v-if="formData">
      <p>Если предпочитаете письменно:</p>
      <Checkbox
        v-for="answer in ['whatsapp', 'viber', 'telegram']"
        :key="answer"
        :item="answer"
        :parent="formData.answer_to"
        @mouseup.native="checkboxHandle(answer)"
      />
    </div>

    <textarea placeholder="Примечание" v-model="formData.message" />

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
        >пользовательским соглашением</a
      >
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
        политикой конфиденциальности</a
      >
    </p>

    <button class="modal--submit" @click.prevent="submitHandle">
      Отправить
    </button>
  </form>
</template>

<script>
import Select from "@/components/Select";
import Checkbox from "@/components/form/Checkbox";

import { phoneInput } from "@/helpers.js";

export default {
  name: "Certification",
  components: {
    Select,
    Checkbox,
  },
  computed: {
    formData() {
      return this.$store.state.modals.formData.find((el) => {
        return el.message_type == "certification";
      });
    },
  },
  methods: {
    phoneInput,
    checkboxHandle(e) {
      this.$store.commit("pushFormDataField", {
        type: "certification",
        field: "answer_to",
        event: e,
      });
    },
    selectHandle(e) {
      this.$store.commit("pushFormDataField", {
        type: "certification",
        field: "year_of_birth",
        event: e,
      });
    },
    filesInputHandle(e) {
      this.$store.dispatch("filesInputHandle", {
        type: "certification",
        el: this.$el,
        event: e,
      });
    },
    submitHandle() {
      this.$store.dispatch("submitHandle", "certification");
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
