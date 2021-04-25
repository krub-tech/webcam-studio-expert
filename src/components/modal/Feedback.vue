<template>
  <form class="feedback modal">
    <h1>Обратная связь</h1>
    <input
      type="text"
      id="feedback_name"
      class="modal--name"
      placeholder="Ваше имя"
      v-model="formData.name"
    />
    <label for="feedback_name"></label>
    <input
      type="text"
      id="feedback_phone"
      class="modal--phone"
      placeholder="Телефон"
      v-model="formData.phone"
      @input="phoneInput($event.target)"
    />
    <label for="feedback_phone"></label>
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
    <div class="modal--photos-files">
      <span
        class="badge"
        v-for="image in formData.photos"
        :key="image.name"
        @click="removePhoto(image.name)"
        >{{ image.name }}</span
      >
    </div>

    <p class="modal--agree">
      Нажимая “Отправить”, Вы соглашаетесь с
      <a
        href="#"
        @click.prevent="
          $store.dispatch('updateModal', { name: 'Terms', from: 'Feedback' })
        "
        >пользовательским соглашением</a
      >
      и
      <a
        href="#"
        @click.prevent="
          $store.dispatch('updateModal', { name: 'Privacy', from: 'Feedback' })
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
  name: "Feedback",
  components: {
    Select,
    Checkbox,
  },
  computed: {
    formData() {
      return this.$store.state.modals.formData.find((el) => {
        return el.message_type == "feedback";
      });
    },
  },
  methods: {
    phoneInput,
    checkboxHandle(e) {
      this.$store.commit("pushFormDataField", {
        type: "feedback",
        field: "answer_to",
        event: e,
      });
    },
    filesInputHandle(e) {
      this.$store.dispatch("filesInputHandle", {
        type: "feedback",
        el: this.$el,
        event: e,
      });
    },
    submitHandle() {
      this.$store.dispatch("submitHandle", "feedback");
    },
  },
};
</script>

<style lang="scss"></style>
