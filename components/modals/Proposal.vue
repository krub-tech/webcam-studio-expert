<template>
  <form class="proposal modal">
    <h1>Добавление студии</h1>
    <input
      id="proposal-name"
      name="name"
      type="text"
      class="modal--name"
      placeholder="Название студии"
    />
    <label for="proposal-name" />

    <div class="proposal--avatar file-input" @click="filesInputHandle($event)">
      Загрузить логотип
    </div>
    <input id="proposal--avatar" type="file" name="avatar" />
    <label for="proposal--avatar"></label>

    <!-- <div class="modal--avatar-file badge">
        {{ formData.avatar.name }}
      </div> -->
    <InputSearch
      id="proposal--address_json"
      class="proposal--address_json"
      name="address_json"
      :value="searchInput"
      :results="searchResults"
      :placeholder="'Адрес студии'"
      @value="addressInput($event)"
      @choose="searchInput = $event"
    />
    <label for="proposal--address_json"></label>
    <hr />
    <div class="modal--description">
      <textarea id="proposal-description" placeholder="Полное описание Вашей студии" />
    </div>
    <hr />
    <input id="proposal-all-photos" type="file" class="modal--photos" multiple />
    <label for="proposal-all-photos" class="proposal--image_1"
      ><p>Загрузить все фото студии</p></label
    >
    <hr />
    <template v-if="options">
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
    <hr />
    <input
      id="proposal-site"
      type="text"
      class="modal--site"
      placeholder="Сайт студии"
    />
    <label for="proposal-site" />
    <input
      id="proposal-email"
      type="text"
      class="modal--email"
      placeholder="Email представителя"
    />
    <label for="proposal-email" />
    <input
      id="proposal-phone"
      type="tel"
      class="modal--phone"
      placeholder="Телефон представителя"
    />
    <label for="proposal-phone" />
    <input
      id="proposal-whatsapp"
      type="text"
      class="modal-whatsapp"
      placeholder="whatsapp"
    />
    <label for="proposal-whatsapp" />
    <input id="proposal-viber" type="text" class="modal-viber" placeholder="viber" />
    <label for="proposal-viber" />
    <input id="proposal-telegram" type="text" placeholder="telegram" />
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
/* eslint-disable no-debugger */
import InputSearch from '@/components/form/InputSearch'

export default {
  name: 'Proposal',
  components: {
    InputSearch,
  },
  data() {
    return {
      formData: {},
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
  },

  methods: {
    async addressInput(e) {
      this.searchInput = e
      const results = await this.cityInputHandle(e)
      this.searchResults = results.map((el) => el.value)
    },
    async cityInputHandle(query) {
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
      return results.suggestions
    },
    filesInputHandle(e) {
      const selector = Object.values(e.target.classList).find((el) =>
        el.includes('proposal')
      )
      const input = document.getElementById(selector)
      input.click()

      input.addEventListener('change', this.sendFilesToStore(input))

      // this.$store.dispatch('modals/filesInputHandle', {
      //   el: this.$el,
      //   event: e,
      // })
    },
    sendFilesToStore(input) {
      console.log(input.files)
      if (input.files.length) console.log(input.files)
      // this.$store.dispatch('modals/filesInputHandle', {
      //   el: this.$el,
      //   files,
      // })
    },
    submit() {
      this.$store.dispatch('modals/submit', {
        message_type: 'proposal',
        form: this.$el,
      })
    },
  },
}
</script>

<style lang="scss">
.modal {
  hr {
    margin: 0;
  }
}
</style>
