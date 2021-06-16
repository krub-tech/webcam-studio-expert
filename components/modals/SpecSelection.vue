<template>
  <form class="proposal specselection modal">
    <h1>Подбор студии</h1>
    <p class="specselection--subtitle">
      Мы подберем Вам подходящие студии, учитывая Ваши пожелания и предоставленную
      информацию.
    </p>
    <input
      id="name"
      v-model="formData.name"
      type="text"
      class="modal--name"
      placeholder="Ваше имя"
    />
    <i class="for-name" />
    <Select
      id="year_of_birth"
      :options="years"
      :value="formData.year_of_birth || 'Год рождения'"
      @selectedOption="formData.year_of_birth = $event.toString()"
    />
    <i class="for-year_of_birth" />
    <div id="model_type" class="model_type">
      <Radio
        v-for="(model_type, key) in options.model_type"
        :key="key"
        :item="model_type"
        :selector="'models_type'"
        :selected="formData.model_type"
        @mouseup.native="radioHandle($event.target.innerText, 'model_type')"
      />
    </div>
    <i class="for-model_type" />

    <Select
      id="english_level"
      :options="Object.values(options.english_level)"
      :value="options.english_level[formData.english_level] || 'Уровень английского'"
      @selectedOption="
        formData.english_level = $keysByValues($event, options.english_level)
      "
    />
    <button
      class="english-desc"
      @click.prevent="$store.commit('modals/setCurrent', 'EnglishDesc')"
    >
      Пояснение уровней
    </button>
    <i class="for-english_level" />
    <hr />

    <h2>Желаемые условия</h2>

    <Select
      id="city"
      :options="$store.state.cities.uniques.map((el) => el.name)"
      :value="selectedCity || 'Город'"
      @selectedOption="cityHandle"
    />
    <i class="for-city" />
    <DistrictsSelect
      v-if="districts"
      :districts="districts.map((el) => el.name)"
      :selected="selectedDistricts"
      @districtSelect="districtSelectHandle"
    />
    <MetroSelect
      v-if="metro"
      :metro="metroLines"
      :selected="selectedMetro"
      @metroSelect="metroSelectHandle"
    />
    <hr />
    <div class="studio_type">
      <Checkbox
        v-for="(studio_type, key) in options.studio_type"
        :key="key"
        :item="studio_type"
        :checked="$isChecked(formData.studio_type, key)"
        @mouseup.native="checkboxHandle(key, 'studio_type')"
      />
    </div>
    <i />
    <hr />
    <div class="min_payout_percentage">
      <Range
        :label="'Минимальный % выплат'"
        :val="+formData.min_payout_percentage"
        :min="30"
        :max="90"
        @valueChange="rangeHandle($event, 'min_payout_percentage')"
      />
    </div>
    <hr />
    <div class="shift_length">
      <Range
        :label="'Длина смены'"
        :val="+formData.shift_length"
        :min="5"
        :max="12"
        @valueChange="rangeHandle($event, 'shift_length')"
      />
    </div>
    <hr />
    <div class="max_shifts_per_week">
      <Range
        :label="'Дней в неделю минимум'"
        :val="+formData.min_shifts_per_week"
        :min="3"
        :max="6"
        @valueChange="rangeHandle($event, 'min_shifts_per_week')"
      />
    </div>
    <hr />

    <div class="staff_gender form-module">
      <Select
        :options="Object.values(options.staff_gender)"
        :value="'Пол администраторов'"
        :selected="options.staff_gender[formData.staff_gender]"
        static-placeholder
        @selectedOption="selectHandle($event, 'staff_gender')"
      />
      <div
        v-if="formData.staff_gender && options.staff_gender"
        class="selected-options"
      >
        <div class="badge" @click="formData.staff_gender = null">
          {{ options.staff_gender[formData.staff_gender] }}
        </div>
      </div>
    </div>
    <hr />
    <div v-if="options.devices" class="devices form-module">
      <MultiSelect
        :options="Object.values(options.devices)"
        :placeholder="`Камеры`"
        :selected="selectedDevices"
        @selectedOption="selectHandle($event, 'devices')"
      />
    </div>
    <hr />
    <div class="conditions">
      <Checkbox
        v-for="(studio_condition, key) in options.conditions"
        :key="key"
        :item="studio_condition"
        :checked="$isChecked(formData.conditions, key)"
        @mouseup.native="checkboxHandle(key, 'conditions')"
      />
    </div>
    <hr class="hr-second" />
    <input
      id="phone"
      type="tel"
      class="modal--phone"
      placeholder="Телефон представителя"
      @input="phoneInputHandle($event, 'phone')"
    />
    <i class="for-phone" />
    <div class="modal--answer_to">
      <p class="label">Если предпочитаете письменно:</p>
      <Checkbox
        v-for="answer in ['whatsapp', 'viber', 'telegram']"
        :key="answer"
        :item="answer"
        :checked="$isChecked(formData.answer_to, answer)"
        @mouseup.native="answerToHandler(answer)"
      />
    </div>
    <i />
    <textarea
      name="additional_information"
      placeholder="Дополнительная информация о Вас"
    />
    <i />
    <input
      id="file_1"
      type="file"
      class="modal--photos"
      multiple
      @input="filesInputHandle($event)"
    />
    <label for="file_1">
      <p>Загрузить фото или файлы</p>
    </label>
    <div v-show="files" class="modal--photos-files" />
    <i class="for-file_1" />
    <TermsPrivacy />
    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import Checkbox from '@/components/form/Checkbox'
import Range from '@/components/form/Range'
import Radio from '@/components/form/Radio'
import TermsPrivacy from '@/components/modals/TermsPrivacy'

import { modals } from '@/mixins/modals'

export default {
  name: 'SpecSelection',
  components: {
    Radio,
    Checkbox,
    Range,
    TermsPrivacy,
  },
  mixins: [modals],
  data() {
    return {
      selectedCity: null,
      districts: null,
      selectedDistricts: [],
      metro: null,
      selectedMetro: [],
      formData: {
        name: null,
        year_of_birth: null,
        model_type: null,
        english_level: null,
        city: null,
        districts: [],
        metro: [],
        studio_type: [],
        min_payout_percentage: null,
        shift_length: null,
        min_shifts_per_week: null,
        staff_gender: null,
        devices: [],
        conditions: [],
        answer_to: null,
        phone: null,
      },
      requiredFields: [
        'name',
        'phone',
        'year_of_birth',
        'model_type',
        'english_level',
        'city',
      ],
      files: null,
      errors: null,
    }
  },
  computed: {
    metroLines() {
      return [...new Set(this.metro.map((el) => el.station_name))]
    },
  },
  methods: {
    radioHandle(payload, selector) {
      this.formData[selector] = this.$keysByValues(payload, this.options[selector])
    },
    async cityHandle(payload) {
      this.districts = []
      this.selectedDistricts = []
      this.formData.districts = []
      this.metro = []
      this.selectedMetro = []
      this.formData.metro = []
      this.selectedCity = payload
      this.$store.state.cities.uniques.forEach((city) => {
        if (city.name === payload) {
          this.formData.city = city.id
        }
      })
      const districts = await this.$api.geo.getDistrictsByCity(this.formData.city)
      if (districts.length) this.districts = districts
      const metro = await this.$api.geo.getMetroStationsByCity(this.formData.city)
      if (metro.length) this.metro = metro
    },
    districtSelectHandle(payload) {
      this.$toArray(this.selectedDistricts, payload)
      this.districts.forEach((el) => {
        if (el.name === payload) {
          this.$toArray(this.formData.districts, el.id)
        }
      })
    },
    metroSelectHandle(payload) {
      this.$toArray(this.selectedMetro, payload)
      this.metro.forEach((el) => {
        if (el.station_name === payload) {
          this.$toArray(this.formData.metro, el.id)
        }
      })
    },
    checkboxHandle(payload, selector) {
      this.$toArray(this.formData[selector], payload)
    },

    async submit() {
      this.clearErrors()
      const isValid = this.validator()
      console.log(isValid)
      if (!isValid) return
      const formData = new FormData(this.$el)
      this.formDataAdd({ data: this.formData, formData })
      this.filesToFormData(formData, 'file')

      try {
        const request = await this.$api.messages.specSelection(formData)
        console.log(request)
        this.$store.commit('modals/setCurrent', 'SendSuccess')
      } catch (error) {
        if (error.response?.status === 400) {
          console.log('errors', error.response.data)
          this.errorsHandler(error.response.data)
        }
      }
    },
  },
}
</script>

<style lang="scss">
.modal {
  hr {
    width: 100%;
    margin-top: 0;
    &.hr-second {
      margin-top: 20px;
    }
  }
  .min_payout_percentage,
  .shift_length,
  .max_shifts_per_week {
    & + hr {
      margin-top: 42px;
    }
  }
  textarea {
    margin: 0;
  }
  #advantages {
    height: 100px;
  }
}

.specselection {
  p {
    line-height: 1.3;
    color: #606074;
  }
  h2 {
    font-size: 18px;
    margin-bottom: 28px;
  }

  &--subtitle {
    margin-bottom: 28px;
  }
  .model_type {
    .radio {
      display: inline-block;
      background-color: #fefeff;

      margin-bottom: 6px;
      input[type='radio'] {
        & + label {
          border: 1px solid #c4c4cd;
          border-radius: 0.5rem;
        }
      }
      input[type='radio'].active {
        & + label {
          background-color: #fefeff;
          border: 2px solid var(--pink);
        }
      }
    }
  }
  .english-desc {
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
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      left: 8px;
      background-image: url('~@/assets/svg/i-question.svg');
    }
  }
}
</style>
