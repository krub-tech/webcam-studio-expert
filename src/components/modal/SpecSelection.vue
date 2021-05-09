<template>
    <form class="specselection modal">
        <h1>Подбор студии</h1>
        <p class="specselection--subtitle">
            Мы подберем Вам подходящие студии, учитывая Ваши пожелания и предоставленную информацию.
        </p>
        <input
            id="specselection_name"
            v-model="formData.name"
            type="text"
            class="modal--name"
            placeholder="Ваше имя"
        >
        <label for="specselection_name" />
        <Select
            class="specselection--year_of_birth"
            :options="years"
            :placeholder="`Год рождения`"
            :parent-obj-name="'formData'"
            :selector="'year_of_birth'"
            callback
            @selectedOption="
                $store.commit('assignFormDataField', {
                    type: 'specselection',
                    field: 'year_of_birth',
                    event: $event,
                })
            "
        />
        <div v-if="options" class="specselection--model_type">
            <div
                v-for="(item, idx) in options.model_type"
                :key="item"
                class="radio"
                @mouseup="radioHandle(idx, 'model_type')"
            >
                <input :id="`specselection_model_type-${idx}`" type="radio" name="specselection_model_type">
                <label :for="`specselection_model_type-${idx}`">
                    {{ item }}
                </label>
            </div>
        </div>
        <Select
            v-if="options"
            class="specselection--english_level"
            :options="Object.values(options.english_level)"
            :placeholder="`Уровень английского`"
            :parent-obj-name="'formData'"
            :selector="'english_level'"
            callback
            @selectedOption="selectHandle($event, 'english_level')"
        />
        <div class="specselection--english-desc" @click="linkClickHandle('EnglishDesc')">
            Пояснение уровней
        </div>
        <hr>
        <h2>Желаемые условия</h2>
        <Select
            v-if="options"
            class="specselection--city"
            :options="$store.state.cities.unique_cities"
            :placeholder="`Город`"
            :parent-obj-name="'formData'"
            :selector="'city'"
            callback
            @selectedOption="cityHandle($event)"
        />
        <DistrictsSelect :city="city" />
        <MetroSelect :city="city" />
        <StudiosFilter ref="SpecSelFilter" />
        <input
            id="specselection_phone"
            v-model="formData.phone"
            type="tel"
            class="modal--phone"
            placeholder="Телефон"
            @input="phoneInput($event.target)"
        >
        <label for="specselection_phone" />
        <div v-if="formData" class="modal--answer_to">
            <p class="label">
                Если предпочитаете письменно:
            </p>
            <Checkbox
                v-for="answer in ['whatsapp', 'viber', 'telegram']"
                :key="answer"
                :item="answer"
                :parent="formData.answer_to"
                @mouseup.native="checkboxHandle(answer, 'answer_to')"
            />
        </div>
        <textarea v-model="formData.additional_information" placeholder="Дополнительная информация о Вас" />
        <p class="label">
            Предлагаем приложить Ваши фото:
        </p>
        <div class="modal--photos-files" />
        <input
            id="photos"
            type="file"
            class="modal--photos"
            multiple
            @input="filesInputHandle($event)"
        >
        <label for="photos"><p>Загрузить фото или файлы</p></label>
        <div class="modal--photos-files">
            <span v-for="image in photos" :key="image.name" class="badge" @click="removePhoto(image.name)">
                {{ image.name }}
            </span>
        </div>
        <p class="modal--agree">
            Нажимая “Отправить”, Вы соглашаетесь с
            <a href="#" @click.prevent="linkClickHandle('Terms')">пользовательским соглашением</a>
            и
            <a href="#" @click.prevent="linkClickHandle('Privacy')"> политикой конфиденциальности</a>
        </p>
        <button class="modal--submit" @click.prevent="submitHandle">
            Отправить
        </button>
    </form>
</template>

<script>
import Select from '@/components/Select';
import Checkbox from '@/components/form/Checkbox';
import StudiosFilter from '@/components/StudiosFilter';

import DistrictsSelect from '@/components/form/modules/DistrictsSelect';
import MetroSelect from '@/components/form/modules/MetroSelect';

import { phoneInput } from '@/helpers';
import { getMessageOptions } from '@/api/messages';

export default {
  name: 'SpecSelection',
  components: {
    Select,
    Checkbox,
    StudiosFilter,
    DistrictsSelect,
    MetroSelect,
  },
  data() {
    return {
      options: null,
      photos: [],
      requiredFields: ['city', 'name', 'phone', 'year_of_birth', 'model_type', 'english_level'],
      city: '',
    };
  },
  computed: {
    years() {
      const now = 2021;
      const res = [];
      for (let i = 0; i < 20; i++) {
        res.push(now - 18 - i);
      }
      return res;
    },
    formData() {
      return this.$store.state.modals.formData.find((el) => el.message_type === 'specselection');
    },
    districts() {
      return this.$store.state.cities.selectedDistricts;
    },
    metro() {
      return this.$store.state.cities.selectedMetro;
    },
  },
  watch: {
    districts: {
      handler() {
        this.$store.commit('assignFormDataField', {
          type: 'specselection',
          field: 'district',
          event: this.$store.state.cities.selectedDistricts,
        });
      },
      deep: true,
    },
    metro: {
      handler() {
        this.$store.commit('assignFormDataField', {
          type: 'specselection',
          field: 'metro',
          event: this.$store.state.cities.selectedMetro,
        });
      },
      deep: true,
    },
  },
  async mounted() {
    const response = await this.getMessageOptions();
    this.options = response;
    this.$refs.SpecSelFilter.$on('filterChange', () => {
      for (const [key, value] of Object.entries(this.$refs.SpecSelFilter.filterQuery)) {
        if (value?.length) {
          this.$store.commit('assignFormDataField', {
            type: 'specselection',
            field: key,
            event: value,
          });
        }
      }
    });
  },
  beforeDestroy() {
    for (const [key, value] of Object.entries(this.formData)) {
      if (typeof value === 'string' && value !== 'specselection') {
        this.$store.commit('assignFormDataField', {
          type: 'specselection',
          field: key,
          event: null,
        });
      }
      if (typeof value !== 'string') {
        this.$store.commit('assignFormDataField', {
          type: 'specselection',
          field: key,
          event: [],
        });
      }
    }
  },
  methods: {
    phoneInput,
    getMessageOptions,
    radioHandle(idx, selector) {
      this.$store.commit('assignFormDataField', {
        type: 'specselection',
        field: selector,
        event: idx,
      });
    },
    checkboxHandle(idx, selector) {
      this.$store.commit('pushFormDataField', {
        type: 'specselection',
        field: selector,
        event: idx,
      });
    },
    cityHandle(e) {
      this.city = e;
      this.$store.commit('assignFormDataField', {
        type: 'specselection',
        field: 'city',
        event: e,
      });
    },
    selectHandle(e, selector) {
      let key;
      for (const [k, value] of Object.entries(this.options[selector])) {
        if (value === e) key = k;
      }
      this.$store.commit('assignFormDataField', {
        type: 'specselection',
        field: selector,
        event: key,
      });
    },
    filesInputHandle(e) {
      const imagesStudio = e.target.files;
      Array.from(imagesStudio).forEach((img, key) => {
        if (key < 5) {
          this.formData[`image_${key + 1}`] = img;
          this.photos.push(img);
        }
      });
    },
    removePhoto(name) {
      let idx = null;
      this.photos.forEach((photo, key) => {
        delete this.formData[`image_${key + 1}`];
        if (photo.name === name) {
          idx = this.photos.indexOf(photo);
          this.photos.splice(idx, 1);
        }
      });
    },
    linkClickHandle(componentName) {
      this.$store.dispatch('updateModal', {
        name: componentName,
        from: 'SpecSelection',
      });
    },
    isActive(item, selector) {
      return this.formData[selector].includes(item);
    },
    submitHandle() {
      const formDataToDB = new FormData();
      let isValid;
      for (const [key, value] of Object.entries(this.formData)) {
        if (typeof value !== 'string' && value?.length > 1) {
          value.forEach((el) => {
            formDataToDB.append(key, el);
          });
        } else if (value !== null) {
          if (value?.length !== 0) formDataToDB.append(key, value);
        }
        if (key === 'phone') {
          formDataToDB.delete(key, value);
          const newV = value?.replace(/\D/g, '');
          if (newV?.length > 12) {
            isValid = false;
            this.$store.dispatch('invalidMessage', 'phone');
          } else {
            formDataToDB.set(key, newV);
          }
        }
      }

      for (const [name, value] of formDataToDB) {
        console.log(`${name} = ${value}`);
      }

      isValid = this.validator();
      console.log(isValid);
      if (isValid) {
        this.$store.dispatch('dataPostToDB', {
          formData: formDataToDB,
          query: 'message/help_in_selecting_studio/',
        });
        this.$store.commit('updateIsSent');
      }
    },
    validator() {
      let cnt = 0;
      let isValid = false;

      this.requiredFields.forEach((field) => {
        const invalidElem = this.$el.querySelector(`[class*='${field}']`);
        invalidElem.classList.add('invalid');

        if (this.formData[field] && this.formData[field].length !== 0) {
          cnt++;
          invalidElem.classList.remove('invalid');
        }

        if (this.requiredFields.length === cnt) isValid = true;
      });

      return isValid;
    },
  },
};
</script>

<style lang="scss">
.specselection {
    p {
        line-height: 1.3;
        color: #606074;
    }
    h2 {
        font-size: 18px;
        margin-bottom: 28px;
    }

    &--city {
        width: max-content;
        align-self: flex-start;
        margin-bottom: 30px;

        width: 290px;
        margin-left: 2px;
        .select {
            display: flex;
            justify-content: space-between;
            width: inherit;
        }
    }
    &--subtitle {
        margin-bottom: 28px;
    }
    &--year_of_birth {
        margin-bottom: 28px;
    }
    &--model_type {
        margin-bottom: 28px;
        .radio {
            display: inline-block;
            background-color: #fefeff;

            margin-bottom: 6px;
            input[type="radio"] {
                & + label {
                    border: 1px solid #c4c4cd;
                    border-radius: 0.5rem;
                }
            }
            input[type="radio"]:checked {
                & + label {
                    background-color: #ffc5e4;
                    border: 1px solid #ffc5e4;
                }
            }
        }
    }
    &--english-desc {
        align-self: flex-start;
        width: max-content;
        color: #606074;
        background-color: #e5e5ef;
        padding: 6px 10px;
        padding-left: 28px;
        border-radius: 6px;
        margin-top: 20px;
        cursor: pointer;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            width: 14px;
            height: 14px;
            left: 8px;
            background-image: url("~@/assets/svg/i-question.svg");
        }
    }

    .filter {
        &--models_age,
        &--working_with_model_types,
        &--support_staff {
            display: none;
        }
    }
    &.modal {
        hr {
            width: 100%;
            height: 1px;
        }
        .specselection--city {
            &.invalid::before {
                content: "Выберите город";
                transform: translateY(-100%);
            }
        }
    }
}
</style>
