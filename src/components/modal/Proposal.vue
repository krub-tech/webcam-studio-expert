<template>
    <section class="proposal modal">
        <h1>Добавление студии</h1>
        <div class="proposal--head">
            <input
                id="proposal-name"
                v-model="formData.name"
                type="text"
                class="modal--name"
                placeholder="Название студии"
            >
            <label for="proposal-name" />
            <input id="proposal-avatar" type="file" @input="formData.avatar = $event.target.files[0]">
            <label for="proposal-avatar" class="proposal--avatar"><p>Загрузить логотип</p></label>
            <div v-if="formData.avatar" class="modal--avatar-file badge" @click="removeAvatar">
                {{ formData.avatar.name }}
            </div>
            <InputSearch
                :id="'proposal-address_json'"
                class="proposal--address_json"
                :placeholder="'Адрес студии'"
                :results="formData.address_json"
                :field-name="'value'"
                @value="cityInputHandle($event)"
                @choose="cityChooseHandle($event)"
            />
            <hr>
        </div>
        <StudiosFilter ref="proposalFilter" />
        <hr>
        <div class="modal--description">
            <textarea
                id="proposal-description"
                v-model="formData.description"
                placeholder="Полное описание Вашей студии"
            />
        </div>
        <hr>
        <input
            id="proposal-all-photos"
            type="file"
            class="modal--photos"
            multiple
            @input="fileInputHandle($event, 'image_1')"
        >
        <label for="proposal-all-photos" class="proposal--image_1"><p>Загрузить все фото студии</p></label>
        <div v-if="formData.studioPhotos.length > 0" class="modal--photos-files">
            <span
                v-for="image in formData.studioPhotos"
                :key="image.name"
                class="badge"
                @click="removeStudioPhoto(image.name)"
            >{{ image.name }}</span>
        </div>
        <hr>
        <Select
            v-if="optionsStudios.work_with_sites"
            class="proposal--work_with_sites"
            :options="arrayFrom(optionsStudios.work_with_sites)"
            :placeholder="`Сайты, с которыми работаете`"
            multiple
            :parent-obj-name="`formData`"
            :selector="`work_with_sites`"
        />
        <hr>
        <textarea
            id="proposal-bonusesForModels"
            v-model="formData.bonuses_for_models"
            placeholder="Бонусы для моделей"
        />
        <hr>
        <textarea
            id="proposal-advantages"
            v-model="formData.advantages"
            placeholder="Кратко о главных плюсах Вашей студии по сравнению с другими"
        />
        <hr>
        <input
            id="proposal-site"
            v-model="formData.site"
            type="text"
            class="modal--site"
            placeholder="Сайт студии"
        >
        <label for="proposal-site" />
        <input
            id="proposal-email"
            v-model="formData.email"
            type="text"
            class="modal--email"
            placeholder="Email представителя"
            @change="mailValidate($event.target)"
        >
        <label for="proposal-email" />
        <input
            id="proposal-phone"
            v-model="formData.phone"
            type="tel"
            class="modal--phone"
            placeholder="Телефон представителя"
            @input="phoneInput($event.target)"
        >
        <label for="proposal-phone" />
        <input
            id="proposal-whatsapp"
            v-model="formData.whatsapp"
            type="text"
            class="modal-whatsapp"
            placeholder="whatsapp"
            @input="phoneInput($event.target)"
        >
        <label for="proposal-whatsapp" />
        <input
            id="proposal-viber"
            v-model="formData.viber"
            type="text"
            class="modal-viber"
            placeholder="viber"
            @input="phoneInput($event.target)"
        >
        <label for="proposal-viber" />
        <input id="proposal-telegram" v-model="formData.telegram" type="text" placeholder="telegram">
        <p class="modal--agree">
            Нажимая “Отправить”, Вы соглашаетесь с
            <a href="#" @click.prevent="linkClickHandle('Terms')">пользовательским соглашением</a>
            и
            <a href="#" @click.prevent="linkClickHandle('Privacy')"> политикой конфиденциальности</a>
        </p>
        <button class="modal--submit" @click="submitHandle">
            Отправить
        </button>
    </section>
</template>

<script>
import StudiosFilter from '@/components/StudiosFilter';
import Select from '@/components/Select';
import InputSearch from '@/components/form/InputSearch';

import { arrayFrom, phoneInput } from '@/helpers';
import { postFormData } from '@/api/client';

export default {
  name: 'Proposal',
  components: {
    StudiosFilter,
    Select,
    InputSearch,
  },
  data() {
    return {
      formData: {
        type: 'studio',
        name: '',
        site: '',
        email: '',
        phone: '',
        address_json: '',
        avatar: '',
        description: '',
        studioPhotos: [],
        work_with_sites: [],
        support_staff: [],
        bonuses_for_models: '',
        advantages: '',
        whatsapp: '',
        viber: '',
        telegram: '',
      },
      requiredFields: [
        'type',
        'studio_type',
        'name',
        'avatar',
        'address_json',
        'email',
        'phone',
        'description',
        'working_with_model_types',
        'models_age',
        'work_with_sites',
        'image_1',
        'staff_gender',
      ],
      errors: {},
    };
  },
  computed: {
    optionsStudios() {
      if (this.$store.getters.optionsStudios) return this.$store.getters.optionsStudios;
      return [];
    },
  },
  watch: {
    errors() {
      for (const [key, value] of Object.entries(this.errors)) {
        const invalidInput = this.$el.querySelector(`#proposal-${key}`);
        console.log(invalidInput);
        if (key === 'email' || key === 'phone' || key === 'address_json') {
          invalidInput.classList.add('invalidMessageFromDB');
          invalidInput.nextElementSibling.innerText = '';
          invalidInput.nextElementSibling.innerText = value;
        }
      }
    },
  },
  mounted() {
    this.$refs.proposalFilter.$on('filterChange', () => {
      this.filterValuesToFormData(this.$refs.proposalFilter.filterQuery);
    });
  },
  methods: {
    arrayFrom,
    phoneInput,
    cityInputHandle(query) {
      const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
      const token = 'ebb7483e04f9347fbc8d4a58d296891c05f79772';
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ query }),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
          this.formData.address_json = result.suggestions;
        })
        .catch((error) => console.log('error', error));
    },
    cityChooseHandle(data) {
      this.formData.address_json = JSON.stringify(data);
    },
    checkboxHandle(selector, key) {
      const idx = this.formData[selector].indexOf(key);
      if (idx !== -1) {
        this.formData[selector].splice(idx, 1);
      } else {
        this.formData[selector].push(key);
      }
    },
    fileInputHandle(e) {
      const imagesStudio = e.target.files;
      Array.from(imagesStudio).forEach((img, key) => {
        if (key < 5) {
          this.formData.studioPhotos.push(img);
        }
      });
      this.formData.image_1 = imagesStudio[0];
    },
    removeAvatar() {
      this.formData.avatar = '';
    },
    removeStudioPhoto(name) {
      let idx = null;
      this.formData.studioPhotos.map(async (photo, key) => {
        await delete this.formData[`image_${key + 1}`];
        if (photo.name === name) {
          idx = this.formData.studioPhotos.indexOf(photo);
          this.formData.studioPhotos.splice(idx, 1);
        }
      });
    },
    linkClickHandle(componentName) {
      this.$store.dispatch('updateModal', {
        name: componentName,
        from: 'Proposal',
      });
    },

    filterValuesToFormData(filter) {
      for (const [key, value] of Object.entries(filter)) {
        if (value.length && value.length > 0) {
          if (typeof value !== 'object') {
            this.formData[key] = value;
          } else {
            const picked = value.map((el) => el);
            this.formData[key] = picked;
          }
        } else if (typeof value !== 'object') {
          this.formData[key] = '';
        } else {
          this.formData[key] = [];
        }
      }
    },
    mailValidate(input) {
      input.classList.remove('invalid');
      const isValid = /^([A-Za-zА-Яа-я0-9_\-.])+@([A-Za-zА-Яа-я0-9_\-.])+\.([A-Za-zА-Яа-я]{2,6})$/.test(
        input.value,
      );
      if (!isValid) {
        this.formData.email = '';
        input.classList.add('invalid');
        input.nextElementSibling.classList.add('mail');
      }
    },
    validator() {
      let cnt = 0;
      let isValid = false;

      this.requiredFields.forEach((field) => {
        console.log(field);
        const invalidElem = this.$el.querySelector(`[class*='${field}']`);
        invalidElem.classList.add('invalid');
        console.log(invalidElem);
        if (this.formData[field] && this.formData[field].length !== 0) {
          cnt++;
          invalidElem.classList.remove('invalid');
        }

        if (this.requiredFields.length === cnt) isValid = true;
      });

      return isValid;
    },
    dataPostBuilder() {
      const formDataToDB = new FormData();

      formDataToDB.set('avatar', this.formData.avatar);
      this.formData.studioPhotos.forEach((photo, id) => {
        formDataToDB.append(`image_${id + 1}`, photo);
      });

      for (const [key, value] of Object.entries(this.formData)) {
        if (value.length) {
          if (typeof value === 'object' && key !== 'studioPhotos') {
            value.map((el) => formDataToDB.append(key, el));
          } else if (key !== 'studioPhotos') {
            formDataToDB.append(key, value);
            if (key === 'phone' || key === 'whatsapp' || key === 'viber') {
              formDataToDB.delete(key, value);
              const newV = value.replace(/\D/g, '');

              if (newV?.length > 12) {
                this.$store.dispatch('invalidMessage', key);
              }
              formDataToDB.set(key, newV);
            }
          }
        }
      }

      for (const [name, value] of formDataToDB) {
        console.log(`${name} = ${value}`);
      }

      return formDataToDB;
    },
    async dataPostToDB(formData) {
      const data = {
        formData,
        query: 'user/studios/',
      };
      const response = await postFormData(data);
      console.log(response);
      if (response.id) {
        this.$store.dispatch('updateModal', {
          name: 'ModalSendSuccess',
          from: 'Proposal',
        });
      }
      if (!response.id) {
        console.log(123);
        this.errors = response;
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
