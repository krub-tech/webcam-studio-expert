<template>
  <div v-if="options" class="filter">
    <div class="filter--container">
      <!-- <InputSearch
        :placeholder="query.search.toString()"
        :results="searchResults"
        @value="searchStudio($event)"
      />
      <hr /> -->
      <!-- <DistrictsSelect :city="$store.state.cities.currentCity" />
      <MetroSelect :city="$store.state.cities.currentCity" /> -->
      <!-- <hr
        v-if="
          $store.state.cities.districtsByCurrentCity.length ||
          $store.state.cities.metroByCurrentCity.length
        "
      /> -->
      <div class="studio_type">
        <Checkbox
          v-for="(studio_type, key) in options.studio_type"
          :key="key"
          :item="studio_type"
          :checked="isChecked('studio_type', key)"
          @mouseup.native="checkboxHandle('studio_type', key)"
        />
      </div>
      <hr />
      <div class="models_age">
        <div class="inner">
          <Radio
            v-for="(models_age, key) in options.models_age"
            :key="key"
            :item="models_age"
            :selector="'models_age'"
            :selected="query.models_age.toString()"
            @mouseup.native="radioHandle(key, 'models_age')"
          />
        </div>
      </div>
      <hr />
      <div class="working_with_model_types">
        <Checkbox
          v-for="(model_types, key) in options.working_with_model_types"
          :key="key"
          :item="model_types"
          :checked="isChecked('working_with_model_types', key)"
          @mouseup.native="checkboxHandle('working_with_model_types', key)"
        />
      </div>
      <hr />
      <div class="min_payout_percentage">
        <Range
          :label="'Минимальный % выплат'"
          :val="+query.min_payout_percentage"
          :min="30"
          :max="90"
          @valueChange="radioHandle($event, 'min_payout_percentage')"
        />
      </div>
      <hr />
      <div class="shift_length">
        <Range
          :label="'Длина смены'"
          :val="+query.shift_length"
          :min="5"
          :max="12"
          @valueChange="radioHandle($event, 'shift_length')"
        />
      </div>
      <hr />
      <div class="max_shifts_per_week">
        <Range
          :label="'Дней в неделю минимум'"
          :val="+query.max_shifts_per_week"
          :min="3"
          :max="6"
          @valueChange="radioHandle($event, 'max_shifts_per_week')"
        />
      </div>
      <hr />
      <div class="staff_gender form-module">
        <Select
          :options="Object.values(options.staff_gender)"
          :value="'Пол администраторов'"
          static-placeholder
          @selectedOption="selectHandle($event, 'staff_gender')"
        />
        <div
          v-if="query.staff_gender.length && options.staff_gender"
          class="selected-options"
        >
          <div class="badge" @click="query.staff_gender = []">
            {{ nameByKeys('staff_gender').toString() }}
          </div>
        </div>
      </div>
      <hr />
      <div v-if="options.devices" class="devices form-module">
        <MultiSelect
          :options="Object.values(options.devices)"
          :placeholder="`Камеры`"
          :selected="nameByKeys('devices')"
          @selectedOptions="selectHandle($event, 'devices')"
        />
      </div>
      <hr />
      <div class="conditions">
        <Checkbox
          :key="'true'"
          :item="'Сертифицирована'"
          :checked="isChecked('certified', 'true')"
          @mouseup.native="checkboxHandle('certified', 'true')"
        />
        <Checkbox
          v-for="(support_staff, key) in options.support_staff"
          :key="key"
          :item="support_staff"
          :checked="isChecked('support_staff', key)"
          @mouseup.native="checkboxHandle('support_staff', key)"
        />
        <Checkbox
          v-for="(studio_condition, key) in options.conditions"
          :key="key"
          :item="studio_condition"
          :checked="isChecked('conditions', key)"
          @mouseup.native="checkboxHandle('conditions', key)"
        />
      </div>
    </div>
    <button class="close-btn" @click="$emit('close')" />
    <footer class="filter--footer">
      <div class="filter--footer-top">
        <p>
          <b>{{ currentStudiosLength }}</b> из {{ cityStudiosLength }}
        </p>
        <button class="reset" @click="filterReset" />
        <button class="accept" @click="$emit('close')" />
      </div>
      <div class="filter--footer-bottom">
        Послать заявку {{ currentStudiosLength }} отобранным
      </div>
    </footer>
  </div>
</template>

<script>
import Checkbox from '@/components/form/Checkbox'
import Radio from '@/components/form/Radio'
import Range from '@/components/form/Range'
import Select from '@/components/Select'
import MultiSelect from '@/components/MultiSelect'
// import InputSearch from '@/components/form/InputSearch'

// import DistrictsSelect from '@/components/form/modules/DistrictsSelect'
// import MetroSelect from '@/components/form/modules/MetroSelect'

export default {
  name: 'Filt',
  components: {
    Select,
    MultiSelect,
    Checkbox,
    Radio,
    Range,
    // MultiRange,
    // InputSearch,
    // DistrictsSelect,
    // MetroSelect,
  },
  data() {
    return {
      query: {
        search: [],
        studio_type: [],
        models_age: [],
        working_with_model_types: [],
        min_payout_percentage: [],
        shift_length: [],
        max_shifts_per_week: [],
        staff_gender: [],
        devices: [],
        conditions: [],
        support_staff: [],
        certified: [],
      },
    }
  },
  computed: {
    options() {
      return this.$store.state.studios.options
    },
    currentStudiosLength() {
      return this.$store.state.studios.currents?.length
    },
    cityStudiosLength() {
      return this.$store.state.studios.cityStudiosLength
    },
  },
  watch: {
    query: {
      handler(newQuery) {
        const queryToStore = JSON.stringify(this.queryBuild(newQuery))
        this.$store.commit('studios/updateFilter', JSON.parse(queryToStore))
      },
      deep: true,
    },
  },
  methods: {
    queryBuild(query) {
      const queryToStore = {}
      for (const [key, value] of Object.entries(query)) {
        if (!value.length) queryToStore[`${key}`] = null
        else queryToStore[`${key}`] = value.toString()
      }
      return queryToStore
    },
    searchStudio(name) {
      if (name.length) {
        this.query.search = name
        this.$store.dispatch('updateSearchQuery', `&search=${name}`)
      } else {
        this.query.search = ''
        this.$store.dispatch('updateSearchQuery', '')
      }
      localStorage.filterQuery = JSON.stringify(this.query)
    },
    checkboxHandle(selector, payload) {
      this.$toArray(this.query[selector], payload).toString()
    },
    radioHandle(payload, selector) {
      this.query[selector] = payload
    },
    selectHandle(payload, selector) {
      this.query[selector] = []
      for (const [key, value] of Object.entries(this.options[selector])) {
        if (payload.includes(value)) {
          this.query[selector].push(key)
        }
      }
    },
    nameByKeys(selector) {
      return this.query[selector].map((el) => this.options[selector][el])
    },
    isChecked(selector, key) {
      let bool = false
      if (this.query[selector]) {
        this.query[selector].forEach((el) => {
          if (el !== key) return
          bool = !bool
        })
      }
      return bool
    },
    filterReset() {
      this.$store.commit('studios/filterReset')
    },
  },
}
</script>

<style lang="scss">
@mixin icon {
  display: none;
  width: var(--fr);
  height: var(--fr);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @content;
}
@mixin item {
  background-color: var(--white);
  border: 1px solid #c4c4cd;
  border-radius: 0.5rem;
  padding: var(--fr-m) 0.875rem;
}

.filter {
  width: 300px;
  background-color: var(--grey-filt);
  border-radius: 0px 20px 0px 0px;
  &--container {
    padding: 28px;
  }
  hr {
    border: 1px solid var(--grey-hr);
    margin: 28px 0;
  }
  .filter--footer {
    position: sticky;
    bottom: 0;
    left: 0;
    height: 120px;
    & > * {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
    }
    &-top {
      justify-content: space-between;
      background-color: #ffbee1;
      padding: 20px 20px 20px 20px;
      p {
        font-size: 20px;
        margin-right: 30px;
      }
    }
    &-bottom {
      justify-content: center;
      background: linear-gradient(272.12deg, #e9dbff 0%, #cdf1ff 100%);
    }
    .reset {
      width: 85px;
      height: 40px;
      background-color: rgba(#a5527e, 0.2);
      border-radius: 8px;
      margin-right: 10px;
      &::after {
        content: 'Сброс';
      }
    }
    .accept {
      width: 120px;
      height: 40px;
      background-color: white;
      border-radius: 8px;
      &::after {
        content: 'Применить';
      }
    }
  }
  .input-search {
    input {
      border-radius: 37px;
      padding-left: 35px;
    }
    &::after {
      content: '';
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 0.875rem;
      height: 0.875rem;
      background: no-repeat center / contain url('~@/assets/svg/i-search.svg');
    }
  }
  .badge:last-of-type {
    margin-bottom: 0;
  }
}

.models_age {
  .inner {
    position: relative;
    display: flex;
    width: max-content;
    @include item;
    padding: 4px;
    &::after {
      content: 'лет';
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-60%);
      color: #606074;
    }
  }
}

.working_with_model_types,
.conditions {
  display: flex;
  flex-wrap: wrap;
}

@media screen and (min-width: 420px) {
  .filter {
    .filter--footer {
      .reset {
        width: 140px;
        margin-right: 0;
        &::after {
          content: 'Сбросить всё';
        }
      }
      .accept {
        display: none;
      }
    }
    .close-btn {
      display: none;
    }
  }
}

@media screen and (min-width: 1360px) {
  .filter {
    border-top-left-radius: var(--fr);
    .filter--footer {
      width: 100%;
    }
  }
}
</style>
