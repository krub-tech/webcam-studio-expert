<template>
  <form class="proposal modal">
    <h1>Добавление студии</h1>
    <input
      id="name"
      v-model="formData.name"
      type="text"
      class="modal--name"
      placeholder="Название студии"
    />
    <i class="for-name" />
    <input id="avatar" type="file" @input.prevent="avatarInputHandle" />
    <label for="avatar"><p>Загрузить логотип</p></label>
    <div v-show="formData.avatar" class="modal--photos-file" />
    <i v-show="!formData.avatar" class="for-avatar" />
    <InputSearch
      id="address_json"
      class="proposal--address_json"
      :value="searchInput"
      :results="searchValues"
      :placeholder="'Адрес студии'"
      @value="cityInputHandle($event)"
      @choose="chooseAddress($event)"
    />
    <i class="for-address_json" />
    <hr style="width: 50%" />

    <div class="studio_type">
      <Checkbox
        v-for="(studio_type, key) in options.studio_type"
        :key="key"
        :item="studio_type"
        :checked="$isChecked(formData.studio_type, key)"
        @mouseup.native="checkboxHandle(key, 'studio_type')"
      />
    </div>
    <hr class="hr-second" />
    <div class="models_age">
      <Checkbox
        v-for="(models_age, key) in options.models_age"
        :key="key"
        :item="models_age"
        :checked="$isChecked(formData.models_age, key)"
        @mouseup.native="checkboxHandle(key, 'models_age')"
      />
    </div>
    <hr class="hr-second" />
    <div class="model_type">
      <Checkbox
        v-for="(model_type, key) in options.working_with_model_types"
        :key="key"
        :item="model_type"
        :checked="$isChecked(formData.working_with_model_types, key)"
        @mouseup.native="checkboxHandle(key, 'working_with_model_types')"
      />
    </div>
    <hr class="hr-second" />

    <div class="min_payout_percentage">
      <MultiRange
        :label="'Мин. и Макс. % выплат'"
        :val="+formData.min_payout_percentage"
        :min="30"
        :min-in-val="formData.min_payout_percentage"
        :max="90"
        :max-in-val="formData.max_payout_percentage"
        @valueMinChange="rangeHandle($event, 'min_payout_percentage')"
        @valueMaxChange="rangeHandle($event, 'max_payout_percentage')"
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
        :val="+formData.max_shifts_per_week"
        :min="3"
        :max="6"
        @valueChange="rangeHandle($event, 'max_shifts_per_week')"
      />
    </div>
    <hr />

    <div class="staff_gender form-module" style="margin-bottom: 0">
      <Select
        id="staff_gender"
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
    <i class="for-staff_gender" />
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

    <textarea
      id="description"
      v-model="formData.description"
      placeholder="Полное описание Вашей студии"
    />
    <i class="for-description" />
    <hr style="width: 50%" />

    <input
      id="image_1"
      type="file"
      class="modal--photos"
      multiple
      @input="filesInputHandle($event)"
    />
    <label for="image_1" class="proposal--image_1">
      <p>Загрузить все фото студии</p>
    </label>
    <div v-show="files" class="modal--photos-files" />
    <i class="for-image_1" />
    <hr style="width: 50%" />

    <div v-if="options.work_with_sites" class="work_with_sites form-module">
      <MultiSelect
        :options="Object.values(options.work_with_sites)"
        :placeholder="`Сайты с которыми работаете`"
        :selected="selectedSites"
        @selectedOption="selectHandle($event, 'work_with_sites')"
      />
    </div>
    <hr style="width: 50%" />

    <textarea
      id="bonuses_for_models"
      name="bonuses_for_models"
      placeholder="Бонусы для моделей"
    />
    <i class="for-bonuses_for_models" />
    <hr style="width: 50%" />

    <textarea
      id="advantages"
      name="advantages"
      placeholder="Кратко о главных плюсах Вашей студии по сравнению с другими"
    />
    <i class="for-advantages" />
    <hr style="width: 50%" />

    <input
      id="site"
      name="site"
      type="text"
      class="modal--site"
      placeholder="Сайт студии"
    />
    <i class="for-site" />
    <input
      id="email"
      type="text"
      class="modal--email"
      placeholder="Email для заявок"
      @change="mailValidate($event.target)"
    />
    <i class="for-email" />
    <input
      id="phone"
      type="tel"
      class="modal--phone"
      placeholder="Телефон представителя"
      @input="phoneInputHandle($event, 'phone')"
    />
    <i class="for-phone" />
    <input
      id="whatsapp"
      type="text"
      class="modal-whatsapp"
      placeholder="whatsapp"
      @input="phoneInputHandle($event, 'whatsapp')"
    />
    <i class="for-whatsapp" />
    <input
      id="viber"
      type="text"
      class="modal-viber"
      placeholder="viber"
      @input="phoneInputHandle($event, 'viber')"
    />
    <i class="for-whatsapp" />
    <input id="telegram" name="telegram" type="text" placeholder="telegram" />
    <i class="for-telegram" />
    <TermsPrivacy />
    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import InputSearch from '@/components/form/InputSearch'
import Select from '@/components/form/Select'
import MultiSelect from '@/components/form/MultiSelect'
import Checkbox from '@/components/form/Checkbox'
import Range from '@/components/form/Range'
import MultiRange from '@/components/form/MultiRange'
import TermsPrivacy from '@/components/modals/TermsPrivacy'

import { modals } from '@/mixins/modals'

export default {
  name: 'Proposal',
  components: {
    InputSearch,
    Select,
    MultiSelect,
    Checkbox,
    Range,
    MultiRange,
    TermsPrivacy,
  },
  mixins: [modals],
  data() {
    return {
      formData: {
        type: 'studio',
        name: null,
        avatar: null,
        description: null,
        address_json: null,
        studio_type: [],
        models_age: [],
        working_with_model_types: [],
        min_payout_percentage: null,
        max_payout_percentage: null,
        shift_length: null,
        max_shifts_per_week: null,
        staff_gender: null,
        devices: [],
        conditions: [],
        support_staff: [],
        work_with_sites: [],
        email: null,
        phone: null,
        whatsapp: null,
        viber: null,
      },
      files: null,
      requiredFields: [
        'name',
        'avatar',
        'address_json',
        'email',
        'phone',
        'description',
        'image_1',
        'staff_gender',
      ],
      searchInput: '',
      searchResults: null,
      errors: null,
    }
  },
  computed: {
    options() {
      return this.$store.state.studios.options
    },
    searchValues() {
      return this.searchResults?.map((el) => el.value)
    },
    selectedSites() {
      return this.nameByKeys('work_with_sites')
    },
  },
  methods: {
    async cityInputHandle(query) {
      this.searchInput = query
      const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
      const token = 'ebb7483e04f9347fbc8d4a58d296891c05f79772'
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ query }),
      }
      const response = await fetch(url, options)
      const results = await response.json()
      this.searchResults = results.suggestions
    },
    chooseAddress(adr) {
      this.searchInput = adr
      const suggestion = this.searchResults.find((el) => el.value === adr)
      this.formData.address_json = JSON.stringify(suggestion)
    },
    avatarInputHandle(e) {
      const file = e.target.files[0]
      this.formData.avatar = file
      const preview = document.createElement('img')
      this.$previewImg({ preview, file })
      const previewWrapper = document.createElement('div')
      previewWrapper.classList.add('preview-wrapper')
      previewWrapper.appendChild(preview)
      const previews = this.$el.querySelector('.modal--photos-file')
      previews.appendChild(previewWrapper)
      previewWrapper.addEventListener('click', () => {
        previewWrapper.remove()
        this.formData.avatar = null
        e.target.value = ''
      })
    },

    async submit() {
      this.clearErrors()

      const formData = new FormData(this.$el)
      this.formDataAdd({ data: this.formData, formData })
      this.filesToFormData(formData, 'image')
      formData.forEach((val) => {
        console.log(val)
      })
      const isValid = this.validator()
      if (!isValid) return
      try {
        const request = await this.$api.studios.postToDB(formData)
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
  #proposal--avatar {
    & + label {
      p {
        &::after {
          left: 56px;
          top: 10px;
        }
      }
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
</style>
