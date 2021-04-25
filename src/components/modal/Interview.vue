<template>
  <form class="interview modal">
    <h1>Запись на собеседование</h1>
    <input
      type="text"
      id="interview_name"
      class="modal--name"
      placeholder="Ваше имя"
      v-model="formData.name"
    />
    <label for="interview_name"></label>
    <Select
      :options="years"
      :placeholder="`Год рождения`"
      :parentObjName="'formData'"
      :selector="'year_of_birth'"
      callback
      @selectedOption="selectHandle($event)"
    />
    <input
      type="text"
      id="interview_phone"
      class="modal--phone"
      placeholder="Телефон"
      v-model="formData.phone"
      @input="phoneInput($event.target)"
    />
    <label for="interview_phone"></label>
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
    <p class="label">Предлагаем приложить Ваши фото:</p>
    <div class="modal--photos-files"></div>
    <input
      type="file"
      class="modal--photos"
      id="photos"
      multiple
      @input="filesInputHandle($event)"
    />
    <label for="photos"><p>Загрузить фото или файлы</p></label>

    <p class="modal--agree">
      Нажимая “Отправить”, Вы соглашаетесь с
      <a
        href="#"
        @click.prevent="
          $store.dispatch('updateModal', { name: 'Terms', from: 'Interview' })
        "
        >пользовательским соглашением</a
      >
      и
      <a
        href="#"
        @click.prevent="
          $store.dispatch('updateModal', {
            name: 'Privacy',
            from: 'Interview',
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
  name: "Interview",
  components: {
    Select,
    Checkbox,
  },
  computed: {
    years() {
      let now = 2021;
      let res = [];
      for (let i = 0; i < 20; i++) {
        res.push(now - 18 - i);
      }
      return res;
    },
    formData() {
      return this.$store.state.modals.formData.find((el) => {
        return el.message_type == "interview";
      });
    },
  },
  methods: {
    phoneInput,
    checkboxHandle(e) {
      this.$store.commit("pushFormDataField", {
        type: "interview",
        field: "answer_to",
        event: e,
      });
    },
    selectHandle(e) {
      this.$store.commit("pushFormDataField", {
        type: "interview",
        field: "year_of_birth",
        event: e,
      });
    },
    filesInputHandle(e) {
      this.$store.dispatch("filesInputHandle", {
        type: "interview",
        el: this.$el,
        event: e,
      });
    },
    submitHandle() {
      this.$store.dispatch("submitHandle", "interview");
    },
  },
};
</script>

<style lang="scss">
.interview {
  .select {
    margin-bottom: 20px;
  }
  .modal--answer_to {
    margin-bottom: 32px;
  }
}
</style>
