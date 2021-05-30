<template>
  <form class="proposal modal">
    <h1>Добавление студии</h1>
    <input
      id="name"
      name="name"
      type="text"
      class="modal--name"
      placeholder="Название студии"
    />
    <i class="for-name" />
    <input id="avatar" type="file" @input.prevent="avatarInputHandle" />
    <label for="avatar"><p>Загрузить логотип</p></label>
    <div v-show="formData.avatar" class="modal--photos-file" />
    <i v-if="!formData.avatar" class="for-avatar" />
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
    <div class="staff_gender form-module">
      <Select
        :options="Object.values(options.staff_gender)"
        :value="'Пол администраторов'"
        :selected="[options.staff_gender[formData.staff_gender]]"
        static-placeholder
        @selectedOption="selectHandle($event, 'staff_gender')"
      />
      <div
        v-if="formData.staff_gender.length && options.staff_gender"
        class="selected-options"
      >
        <div class="badge" @click="formData.staff_gender = []">
          {{ options.staff_gender[formData.staff_gender] }}
        </div>
      </div>
    </div>
    <hr />

    <textarea
      id="description"
      name="description"
      placeholder="Полное описание Вашей студии"
    />
    <i class="for-description" />

    <!-- <hr /> -->
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
    <div v-show="$store.state.modals.photos.length" class="modal--photos-files" />
    <i class="for-image_1" />
    <!-- <hr /> -->
    <!-- <template v-if="options">
      <Select
        :options="Object.values(options.staff_gender)"
        :value="'Пол администраторов'"
        static-placeholder
      />
    </template>
    <hr />
    <textarea id="proposal-bonusesForModels" placeholder="Бонусы для моделей" />
    <hr />
    <textarea
      id="proposal-advantages"
      placeholder="Кратко о главных плюсах Вашей студии по сравнению с другими"
    />
    <hr />-->
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
      name="email"
      type="text"
      class="modal--email"
      placeholder="Email представителя"
    />
    <i class="for-email" />
    <input
      id="phone"
      name="phone"
      type="tel"
      class="modal--phone"
      placeholder="Телефон представителя"
    />
    <i class="for-phone" />
    <input
      id="whatsapp"
      name="whatsapp"
      type="text"
      class="modal-whatsapp"
      placeholder="whatsapp"
    />
    <i class="for-whatsapp" />
    <input
      id="viber"
      name="viber"
      type="text"
      class="modal-viber"
      placeholder="viber"
    />
    <i class="for-whatsapp" />
    <input id="telegram" name="telegram" type="text" placeholder="telegram" />
    <i class="for-telegram" />
    <p class="modal--agree">
      Нажимая “Отправить”, Вы соглашаетесь с
      <a href="#">пользовательским соглашением</a>
      и
      <a href="#"> политикой конфиденциальности</a>
    </p>
    <button class="modal--submit" @click.prevent="submit">Отправить</button>
  </form>
</template>

<script>
import InputSearch from '@/components/form/InputSearch'
import Checkbox from '@/components/form/Checkbox'

export default {
  name: 'Proposal',
  components: {
    InputSearch,
    Checkbox,
  },
  data() {
    return {
      formData: {
        type: 'studio',
        avatar: null,
        address_json: null,
        studio_type: [],
        staff_gender: [],
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
      searchInput: '',
      searchResults: null,
    }
  },
  computed: {
    options() {
      return this.$store.state.modals.options
    },
    searchValues() {
      return this.searchResults?.map((el) => el.value)
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
      this.formData.address_json = JSON.stringify(suggestion.data)
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
    checkboxHandle(payload, selector) {
      this.$toArray(this.formData[selector], payload)
    },
    selectHandle(payload, selector) {
      Object.entries(this.options[selector]).forEach(([key, value]) => {
        if (payload.includes(value)) {
          if (selector === 'staff_gender') {
            this.formData[selector] = [key]
          } else this.$toArray(this.formData[selector], payload)
        }
      })
    },
    filesInputHandle(e) {
      this.$store.dispatch('modals/filesInputHandle', {
        el: this.$el,
        input: e.target,
      })
    },
    submit() {
      this.$store.dispatch('modals/submit', {
        message_type: 'proposal',
        form: this.$el,
        data: this.formData,
      })
    },
  },
}
</script>

<style lang="scss">
.modal {
  hr {
    margin-top: 0;
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
  .checkbox input[type='checkbox'] + label {
    margin-bottom: 0;
  }
}
</style>
