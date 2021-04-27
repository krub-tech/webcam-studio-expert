<template>
  <section class="proposal modal">
    <h1>Добавление студии</h1>
    <div class="proposal--head">
      <input
        type="text"
        class="modal--name"
        id="proposal-name"
        placeholder="Название студии"
        v-model="formData.name"
      />
      <label for="proposal-name"></label>
      <input
        id="proposal-avatar"
        type="file"
        @input="formData.avatar = $event.target.files[0]"
      />
      <label for="proposal-avatar" class="proposal--avatar"
        ><p>Загрузить логотип</p></label
      >
      <div
        class="modal--avatar-file badge"
        v-if="formData.avatar"
        @click="removeAvatar"
      >
        {{ formData.avatar.name }}
      </div>
      <InputSearch
        class="proposal--address_json"
        :placeholder="'Адрес студии'"
        :results="formData.address_json"
        :fieldName="'value'"
        :id="'proposal-address_json'"
        @value="cityInputHandle($event)"
        @choose="cityChooseHandle($event)"
      />
      <hr />
    </div>
    <StudiosFilter ref="proposalFilter" />
    <hr />
    <div class="modal--description">
      <textarea
        id="proposal-description"
        placeholder="Полное описание Вашей студии"
        v-model="formData.description"
      />
    </div>
    <hr />
    <input
      type="file"
      class="modal--photos"
      id="proposal-all-photos"
      multiple
      @input="fileInputHandle($event, 'image_1')"
    />
    <label for="proposal-all-photos" class="proposal--image_1"
      ><p>Загрузить все фото студии</p></label
    >
    <div class="modal--photos-files" v-if="formData.studioPhotos.length > 0">
      <span
        class="badge"
        v-for="image in formData.studioPhotos"
        :key="image.name"
        @click="removeStudioPhoto(image.name)"
        >{{ image.name }}</span
      >
    </div>
    <hr />
    <Select
      class="proposal--work_with_sites"
      v-if="optionsStudios.work_with_sites"
      :options="valuesFromObject(optionsStudios.work_with_sites)"
      :placeholder="`Сайты, с которыми работаете`"
      multiple
      :parentObjName="`formData`"
      :selector="`work_with_sites`"
    />
    <hr />
    <textarea
      id="proposal-bonusesForModels"
      placeholder="Бонусы для моделей"
      v-model="formData.bonuses_for_models"
    />
    <hr />
    <textarea
      id="proposal-advantages"
      placeholder="Кратко о главных плюсах Вашей студии по сравнению с другими"
      v-model="formData.advantages"
    />
    <hr />
    <input
      type="text"
      class="modal--site"
      id="proposal-site"
      placeholder="Сайт студии"
      v-model="formData.site"
    />
    <label for="proposal-site"></label>
    <input
      type="text"
      class="modal--email"
      id="proposal-email"
      placeholder="Email представителя"
      v-model="formData.email"
      @change="mailValidate($event.target)"
    />
    <label for="proposal-email"></label>
    <input
      type="tel"
      class="modal--phone"
      id="proposal-phone"
      placeholder="Телефон представителя"
      v-model="formData.phone"
      @input="phoneInput($event.target)"
    />
    <label for="proposal-phone"></label>
    <input
      type="text"
      class="modal-whatsapp"
      id="proposal-whatsapp"
      placeholder="whatsapp"
      v-model="formData.whatsapp"
      @input="phoneInput($event.target)"
    />
    <label for="proposal-whatsapp"></label>
    <input
      type="text"
      class="modal-viber"
      id="proposal-viber"
      placeholder="viber"
      v-model="formData.viber"
      @input="phoneInput($event.target)"
    />
    <label for="proposal-viber"></label>
    <input
      type="text"
      id="proposal-telegram"
      placeholder="telegram"
      v-model="formData.telegram"
    />
    <p class="modal--agree">
      Нажимая “Отправить”, Вы соглашаетесь с
      <a href="#" @click.prevent="linkClickHandle('Terms')"
        >пользовательским соглашением</a
      >
      и
      <a href="#" @click.prevent="linkClickHandle('Privacy')">
        политикой конфиденциальности</a
      >
    </p>
    <button class="modal--submit" @click="submitHandle">Отправить</button>
  </section>
</template>

<script>
import StudiosFilter from "@/components/StudiosFilter";
import Select from "@/components/Select";
import Checkbox from "@/components/form/Checkbox";
import InputSearch from "@/components/form/InputSearch";

import { valuesFromObject, phoneInput } from "@/helpers.js";

export default {
  name: "Proposal",
  data() {
    return {
      formData: {
        type: "studio",
        name: "",
        site: "",
        email: "",
        phone: "",
        address_json: "",
        avatar: "",
        description: "",
        studioPhotos: [],
        work_with_sites: [],
        support_staff: [],
        bonuses_for_models: "",
        advantages: "",
        whatsapp: "",
        viber: "",
        telegram: "",
      },
      requiredFields: [
        "type",
        "studio_type",
        "name",
        "avatar",
        "address_json",
        "email",
        "phone",
        "description",
        "working_with_model_types",
        "models_age",
        "work_with_sites",
        "image_1",
      ],
      errors: {},
    };
  },
  computed: {
    optionsStudios() {
      if (this.$store.getters.optionsStudios)
        return this.$store.getters.optionsStudios;
    },
  },
  watch: {
    errors() {
      for (let [key, value] of Object.entries(this.errors)) {
        const invalidInput = this.$el.querySelector(`#proposal-${key}`);
        console.log(invalidInput);
        if (key === "email" || key === "phone" || key === "address_json") {
          invalidInput.classList.add("invalidMessageFromDB");
          invalidInput.nextElementSibling.innerText = "";
          invalidInput.nextElementSibling.innerText = value;
        }
      }
    },
  },
  components: {
    StudiosFilter,
    Select,
    Checkbox,
    InputSearch,
  },
  methods: {
    valuesFromObject,
    phoneInput,
    cityInputHandle(query) {
      let url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      let token = "ebb7483e04f9347fbc8d4a58d296891c05f79772";
      let options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ query: query }),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
          console.dir(result);
          this.formData.address_json = result.suggestions;
        })
        .catch((error) => console.log("error", error));
    },
    cityChooseHandle(data) {
      this.formData.address_json = JSON.stringify(data);
    },
    checkboxHandle(selector, key) {
      let idx = this.formData[selector].indexOf(key);
      if (idx !== -1) {
        this.formData[selector].splice(idx, 1);
      } else {
        this.formData[selector].push(key);
      }
    },
    fileInputHandle(e) {
      const imagesStudio = e.target.files;
      Array.from(imagesStudio).map((img, key) => {
        if (key < 5) {
          this.formData.studioPhotos.push(img);
        }
      });
      this.formData.image_1 = imagesStudio[0];
    },
    removeAvatar(e) {
      this.formData.avatar = "";
    },
    removeStudioPhoto(name) {
      let idx = null;
      this.formData.studioPhotos.map(async (photo, key) => {
        await delete this.formData[`image_${key + 1}`];
        if (photo.name == name) {
          idx = this.formData.studioPhotos.indexOf(photo);
          this.formData.studioPhotos.splice(idx, 1);
        }
      });
    },
    linkClickHandle(componentName) {
      this.$store.dispatch("updateModal", {
        name: componentName,
        from: "Proposal",
      });
    },

    filterValuesToFormData(filter) {
      for (let [key, value] of Object.entries(filter)) {
        if (value.length && value.length > 0) {
          if (typeof value != "object") {
            this.formData[key] = value;
          } else {
            const picked = value.map((el) => el);
            this.formData[key] = picked;
          }
        } else {
          if (typeof value != "object") {
            this.formData[key] = "";
          } else {
            this.formData[key] = [];
          }
        }
      }
    },
    mailValidate(input) {
      input.classList.remove("invalid");
      const isValid = /^([A-Za-zА-Яа-я0-9_\-\.])+\@([A-Za-zА-Яа-я0-9_\-\.])+\.([A-Za-zА-Яа-я]{2,6})$/.test(
        input.value
      );
      if (!isValid) {
        this.formData.email = "";
        input.classList.add("invalid");
        input.nextElementSibling.classList.add("mail");
      }
    },
    validator() {
      let cnt = 0;
      let isValid = false;

      this.requiredFields.map((field) => {
        const invalidElem = this.$el.querySelector(`[class*='${field}']`);
        invalidElem.classList.add("invalid");

        if (this.formData[field] && this.formData[field].length != 0) {
          cnt++;
          invalidElem.classList.remove("invalid");
        }

        if (this.requiredFields.length == cnt) isValid = true;
      });

      return isValid;
    },
    dataPostBuilder() {
      let formDataToDB = new FormData();

      formDataToDB.set("avatar", this.formData.avatar);
      this.formData.studioPhotos.map((photo, id) => {
        formDataToDB.append(`image_${id + 1}`, photo);
      });

      for (let [key, value] of Object.entries(this.formData)) {
        if (value.length) {
          if (typeof value == "object" && key != "studioPhotos") {
            value.map((el) => formDataToDB.append(key, el));
          } else if (key != "studioPhotos") {
            if (key == "phone" || key == "whatsapp" || key == "viber") {
              value = value.replace(/\D/g, "");

              if (value?.length > 12) {
                this.$store.dispatch("invalidMessage", key);
              }
              console.log(key, value?.length);
            }
            formDataToDB.append(key, value);
          }
        }
      }

      for (let [name, value] of formDataToDB) {
        console.log(`${name} = ${value}`);
      }

      return formDataToDB;
    },
    async dataPostToDB(formData) {
      const data = {
        formData: formData,
        query: "api/user/studios/",
      };
      console.log(this);
      debugger;

      const request = await this.$store.dispatch("apiPostRequest", data);

      console.log(request);
      if (!request.ok) this.errors = request;
      else {
        console.log(request);
        this.$store.dispatch("updateModal", { name: "ModalSendSuccess" });
      }
    },
    submitHandle() {
      const formDataToDB = this.dataPostBuilder();
      const isValid = this.validator();
      console.log(isValid);
      if (isValid) {
        this.dataPostToDB(formDataToDB);
      }
    },
  },
  mounted() {
    this.$refs.proposalFilter.$on("filterChange", () => {
      this.filterValuesToFormData(this.$refs.proposalFilter.filterQuery);
    });
  },
};
</script>

<style lang="scss">
.proposal {
  &.modal {
    input[type="file"] + label {
      p::after {
        top: -2px;
      }
    }
    input[type="text"],
    input[type="tel"] {
      margin-bottom: 28px;
      &.invalid,
      &.invalidMessageFromDB {
        margin-bottom: 0;
      }
    }
    textarea {
      margin: 0;
    }
  }
  .proposal--address_json.invalid {
    padding-bottom: 0;
    &::before {
      transform: translateY(140%);
    }
  }
}
.proposal--address_json {
  margin-top: 28px;
}

#proposal-advantages {
  height: 100px;
}
</style>
