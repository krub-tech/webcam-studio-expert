<template>
  <form class="claim modal">
    <h1>Оставить жалобу</h1>
    <p>Мы сможем помочь в этих случаях, а вот в этих, к сожалению, нет.</p>
    <input
      type="text"
      id="claim_name"
      class="modal--name"
      placeholder="Ваше имя"
      v-model="formData.name"
    />
    <label for="claim_name"></label>
    <input
      type="text"
      id="claim_phone"
      class="modal--phone"
      placeholder="Телефон"
      v-model="formData.phone"
      @input="phoneInput($event.target)"
    />
    <label for="claim_phone"></label>
    <div class="modal--answer_to" v-if="formData">
      <p class="label">Если предпочитаете письменно:</p>
      <Checkbox
        v-for="answer in ['whatsapp', 'viber', 'telegram']"
        :key="answer"
        :item="answer"
        :parent="formData.answer_to"
        @mouseup.native="checkboxHandle(answer)"
      />
    </div>

    <textarea placeholder="Опишите ситуацию" v-model="formData.message" />

    <input
      type="file"
      class="modal--photos"
      id="photos"
      multiple
      @input="filesInputHandle($event)"
    />
    <label for="photos"><p>Загрузить фото или файлы</p></label>
    <div class="modal--photos-files"></div>

    <p class="modal--agree">
      Нажимая “Отправить”, Вы соглашаетесь с
      <a
        href="#"
        @click.prevent="
          $store.dispatch('updateModal', { name: 'Terms', from: 'Claim' })
        "
        >пользовательским соглашением</a
      >
      и
      <a
        href="#"
        @click.prevent="
          $store.dispatch('updateModal', { name: 'Privacy', from: 'Claim' })
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
  name: "Claim",
  components: {
    Select,
    Checkbox,
  },
  computed: {
    formData() {
      return this.$store.state.modals.formData.find((el) => {
        return el.message_type == "complaint";
      });
    },
  },
  methods: {
    phoneInput,
    checkboxHandle(e) {
      this.$store.commit("pushFormDataField", {
        type: "complaint",
        field: "answer_to",
        event: e,
      });
    },
    selectHandle(e) {
      this.$store.commit("pushFormDataField", {
        type: "complaint",
        field: "year_of_birth",
        event: e,
      });
    },
    filesInputHandle(e) {
      this.$store.dispatch("filesInputHandle", {
        type: "complaint",
        el: this.$el,
        event: e,
      });
    },
    submitHandle() {
      this.$store.dispatch("submitHandle", "complaint");
    },
  },
};
</script>
