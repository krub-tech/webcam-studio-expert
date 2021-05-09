<template>
    <div v-if="options" class="filter" :class="{ bg_gradient }" @submit.prevent>
        <div class="filter--studios-search">
            <InputSearch :placeholder="'Поиск по названию'" :results="searchResults" @value="searchQuery = $event" />
        </div>
        <div class="filter--studio_type">
            <Checkbox
                v-for="(studio_type, key) in options.studio_type"
                :key="key"
                :item="studio_type"
                :parent="filterQuery.studio_type"
                @mouseup.native="checkboxHandle('studio_type', key)"
            />
        </div>
        <div class="filter--models_age">
            <div v-if="isNotModal" class="inner">
                <Radio
                    v-for="(models_age, key) in options.models_age"
                    :key="key"
                    :item="models_age"
                    :selector="'models_age'"
                    @mouseup.native="filterQuery.models_age = [key]"
                />
            </div>
            <template v-else>
                <Checkbox
                    v-for="(models_age, key) in options.models_age"
                    :key="key"
                    :item="models_age"
                    :parent="filterQuery.models_age"
                    @mouseup.native="checkboxHandle('models_age', key)"
                />
            </template>
        </div>
        <div class="filter--working_with_model_types">
            <Checkbox
                v-for="(model_types, key) in options.working_with_model_types"
                :key="key"
                :item="model_types"
                :parent="filterQuery.working_with_model_types"
                @mouseup.native="checkboxHandle('working_with_model_types', key)"
            />
        </div>
        <div class="filter--min_payout_percentage">
            <Range
                v-if="isNotModal || this.$store.state.modals.modal.name == 'SpecSelection'"
                :label="'Минимальный % выплат'"
                :val="+filterQuery.min_payout_percentage"
                :min="30"
                :max="90"
                @valueChange="filterQuery.min_payout_percentage = $event"
            />
            <MultiRange
                v-else
                :label="'Минимальный % выплат'"
                :min-in-val="filterQuery.min_payout_percentage"
                :max-in-val="filterQuery.max_payout_percentage"
                :min="30"
                :max="90"
                @valueMinChange="filterQuery.min_payout_percentage = $event"
                @valueMaxChange="filterQuery.max_payout_percentage = $event"
            />
        </div>
        <div class="filter--shift_length">
            <Range
                :label="'Длина смены'"
                :val="+filterQuery.shift_length"
                :min="5"
                :max="12"
                @valueChange="filterQuery.shift_length = $event"
            />
        </div>
        <div class="filter--max_shifts_per_week">
            <Range
                :label="'Дней в неделю минимум'"
                :val="+filterQuery.max_shifts_per_week"
                :min="3"
                :max="6"
                @valueChange="filterQuery.max_shifts_per_week = $event"
            />
        </div>
        <div class="filter--staff_gender">
            <Select
                :options="arrayFrom(options.staff_gender)"
                :placeholder="`Пол администраторов`"
                static-placeholder
                callback
                @selectedOption="staffGenderClickHandle($event)"
            />
            <div class="select-selected">
                <div
                    v-if="filterQuery.staff_gender.length > 0"

                    class="badge"
                    @click="filterQuery.staff_gender = []"
                >
                    {{ staff_gender }}
                </div>
            </div>
        </div>
        <div class="filter--devices">
            <Select
                :options="arrayFrom(options.devices)"
                :placeholder="`Камеры`"
                multiple
                :parent-obj-name="'filterQuery'"
                :selector="'devices'"
            />
            <div class="select-selected">
                <div
                    v-for="device in filterQuery.devices"
                    :key="device"
                    class="badge"
                    @click="selectedRemove(device, 'devices')"
                >
                    {{ options.devices[device] }}
                </div>
            </div>
        </div>
        <div class="filter--conditions">
            <Checkbox
                v-for="(studio_condition, key) in options.conditions"
                :key="key"
                :item="studio_condition"
                :parent="filterQuery.conditions"
                @mouseup.native="checkboxHandle('conditions', key)"
            />
        </div>
        <div class="filter--support_staff">
            <Checkbox
                v-for="(item, key) in options.support_staff"
                :key="key"
                :item="item"
                :parent="filterQuery.support_staff"
                @mouseup.native="checkboxHandle('support_staff', key)"
            />
        </div>
        <div class="filter--certified">
            <Checkbox
                :key="true"
                :item="'Сертифицирована'"
                :parent="filterQuery.certified"
                @mouseup.native="checkboxHandle('certified', true)"
            />
        </div>
        <button class="close-btn" @click="$emit('close')" />
        <div class="filter--footer">
            <div class="filter--footer-top">
                <p>
                    <b>{{ filteredStudiosLength }}</b> из {{ allStudioLength }}
                </p>
                <button class="filter--reset" @click="formReset" />
                <button class="filter--accept" @click="$emit('close')" />
            </div>
            <div class="filter--footer-bottom">
                Послать заявку {{ filteredStudiosLength }} отобранным
            </div>
        </div>
    </div>
</template>

<script>
import Checkbox from '@/components/form/Checkbox';
import Radio from '@/components/form/Radio';
import Range from '@/components/form/Range';
import MultiRange from '@/components/form/MultiRange';
import Select from '@/components/Select';
import InputSearch from '@/components/form/InputSearch';

import { arrayFrom } from '@/helpers';

export default {
  name: 'StudiosFilter',
  components: {
    Select,
    Checkbox,
    Radio,
    Range,
    MultiRange,
    InputSearch,
  },
  data() {
    return {
      searchQuery: '',
      filterQuery: {
        studio_type: [],
        models_age: [],
        working_with_model_types: [],
        conditions: [],
        min_payout_percentage: [],
        max_payout_percentage: [],
        shift_length: [],
        max_shifts_per_week: [],
        staff_gender: [],
        support_staff: [],
        devices: [],
        certified: [],
      },
    };
  },
  computed: {
    options() {
      if (this.$store.state.modals.modal?.name !== 'SpecSelection') {
        return this.$store.state.studios.optionsStudios;
      }
      if (this.$store.state.modals.modal && this.$store.state.modals.modal.name === 'SpecSelection') {
        return this.$store.state.modals.message_options;
      }
      return false;
    },
    filteredStudiosLength() {
      return this.$store.state.studios.currentStudiosLength || 0;
    },
    allStudioLength() {
      return this.$store.getters.allStudiosLength || 0;
    },
    filterMobShow() {
      return this.$parent.filterMobShow;
    },
    bg_gradient() {
      return this.filterMobShow && this.$store.state.windowWidth < 420;
    },
    isNotModal() {
      return this.$store.state.modals.modal == null;
    },
    searchResults() {
      return this.$store.state.studios.currentStudios.map((el) => el.name);
    },
    staff_gender() {
      if (this.options.staff_gender) {
        return this.options.staff_gender[this.filterQuery.staff_gender];
      }
      return [];
    },
    districts() {
      return { selected: this.$store.state.cities.selectedDistricts };
    },
    metro() {
      return { selected: this.$store.state.cities.selectedMetro };
    },
    districts_metro_isShow() {
      if (this.$store.state.modals.modal?.name === 'Proposal') {
        return false;
      }
      if (
        this.$store.state.cities.districtsByCurrentCity.length > 0
                || this.$store.getters.metroNamesByCurrentCity.length > 0
      ) {
        return true;
      }
      return [];
    },
  },
  watch: {
    filterQuery: {
      handler() {
        if (this.isNotModal) {
          localStorage.clientFilterQuery = JSON.stringify(this.filterQuery);
          this.queryBuilder();
        }
        this.$emit('filterChange');
      },
      deep: true,
    },
    searchQuery: {
      handler() {
        this.queryBuilder();
      },
      deep: true,
    },
    districts: {
      handler() {
        if (this.isNotModal) {
          localStorage.districts = JSON.stringify(this.districts.selected);
          this.queryBuilder();
        }
      },
      deep: true,
    },
    metro: {
      handler() {
        if (this.isNotModal) {
          localStorage.metro = JSON.stringify(this.metro.selected);
          this.queryBuilder();
        }
      },
      deep: true,
    },
  },
  async mounted() {
    if (this.isNotModal) {
      if (localStorage.clientFilterQuery) {
        this.filterQuery = JSON.parse(localStorage.clientFilterQuery);
      }
      if (localStorage.districts) {
        this.districts.selected = JSON.parse(localStorage.districts);
      }
      if (localStorage.metro) {
        this.metro.selected = JSON.parse(localStorage.metro);
      }
    } else if (this.$store.state.studios.filterQuery?.length > 0) {
      this.$store.commit('updateFilterQuery');
    }
    if (this.$store.state.modals.modal?.name === 'SpecSelection') {
      this.$store.dispatch('getMessageOptions');
    }
  },
  methods: {
    checkboxHandle(selector, key) {
      if (this.filterQuery[selector]) {
        const idx = this.filterQuery[selector].indexOf(key);
        if (idx !== -1) {
          this.filterQuery[selector].splice(idx, 1);
        } else {
          this.filterQuery[selector].push(key);
        }
      }
    },
    removeSelected(value, selector) {
      this[selector].selected.splice(this[selector].selected.indexOf(value, selector), 1);
    },
    staffGenderClickHandle(e) {
      for (const [key, value] of Object.entries(this.options.staff_gender)) {
        if (value === e) {
          this.filterQuery.staff_gender = key;
        }
      }
    },
    selectedRemove(e, selector) {
      this.filterQuery[selector].forEach((el) => {
        const idx = this.filterQuery[selector].indexOf(el);
        if (idx !== -1) this.filterQuery[selector].splice(idx, 1);
      });
    },
    queryBuilder() {
      this.$store.commit('updatePageNumber', 1);
      const filterObj = this.filterQuery;
      let queryBuild = '';
      for (const field in filterObj) {
        if (filterObj[field].length) queryBuild += `${field}=${filterObj[field]}&`;
      }
      if (this.isNotModal) {
        this.$store.dispatch('filterStudios', queryBuild);
        this.$store.dispatch('searchStudios', this.searchQuery);
        this.$store.commit('updateSelectedDistricts', this.districts.selected);
        this.$store.commit('updateSelectedMetro', this.metro.selected);
        this.$store.dispatch('studiosFromDB');
      }
    },
    formReset() {
      this.searchQuery = '';
      this.districts.selected = [];
      this.metro.selected = [];
      localStorage.clientFilterQuery = {};
      localStorage.districts = [];
      localStorage.metro = [];

      for (const field in this.filterQuery) {
        if (this.filterQuery) {
          this.filterQuery[field] = [];
        }
      }

      this.$emit('reset');
    },
    arrayFrom,
    validator(selector) {
      if (this.isNotModal) {
        return false;
      }
      if (this.filterQuery[selector].length < 1) return true;
      return false;
    },
  },
};
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
@mixin filter-item {
    background-color: #fefeff;
    border: 1px solid #c4c4cd;
    border-radius: 0.5rem;
    padding: var(--fr-m) 0.875rem;
}

.filter {
    position: relative;

    & > * {
        display: flex;
        flex-wrap: wrap;
        &:not(:last-of-type) {
            padding: 0 0 var(--fr-l) 0;
            border-bottom: 1px solid #e6e6ea;
            margin: 0 var(--fr-l) var(--fr-l) var(--fr-l);
        }
    }
    .close-btn {
        right: 8px;
    }
    &.bg_gradient {
        &::before {
            content: "";
            width: 100vw;
            height: 60px;
            position: absolute;
            top: -60px;
            background: linear-gradient(90deg, #c45792 0%, #7f53c4 100%);
            opacity: 0.6;
        }
    }
}
.filter--studios-search {
    position: relative;
    padding-top: var(--fr-l) !important;
    input {
        font-family: inherit;
        font-size: inherit;
        @include filter-item;
        border-radius: var(--fr-2);
        padding-left: 2.5rem;
    }
    .input-search {
        width: 100%;
        margin-bottom: 0;
    }
    &::after {
        content: "";
        position: absolute;
        left: 16px;
        top: 44px;
        width: 0.875rem;
        height: 0.875rem;
        background: no-repeat center / contain url("~@/assets/svg/i-search.svg");
    }
}
.filter-districts_metro {
    padding-bottom: 0 !important;
    .select-wrapper {
        width: 100%;
    }
    .select {
        @include filter-item;
        display: flex;
        justify-content: space-between;
        width: inherit;
    }
    .selected-options {
        display: none;
    }
    .selected-districts {
        width: 100%;
        .badge {
            display: block;
        }
    }
}
.filter--studio_type {
    .checkbox input[type="checkbox"] + label {
        margin-bottom: 0;
    }
}
.filter--working_with_model_types,
.filter--conditions,
.filter--support_staff,
.filter--certified {
    padding-bottom: 20px !important;
}
.filter--models_age {
    .inner {
        position: relative;
        display: flex;
        @include filter-item;
        padding: 4px;
        &::after {
            content: "лет";
            position: absolute;
            right: -40px;
            top: 50%;
            transform: translateY(-60%);
            color: #606074;
        }
    }
}
.filter--devices {
    .select {
        width: 240px;
        @include filter-item;
        justify-content: space-between;
    }
    .selected-options {
        display: none;
    }
    padding-bottom: 0 !important;
}
.filter--staff_gender {
    @extend .filter--devices;
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
}
.filter--reset {
    width: 85px;
    height: 40px;
    background-color: rgba(#a5527e, 0.2);
    border-radius: 8px;
    margin-right: 10px;
    &::after {
        content: "Сброс";
    }
}
.filter--accept {
    width: 120px;
    height: 40px;
    background-color: white;
    border-radius: 8px;
    &::after {
        content: "Применить";
    }
}

.select-selected {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    width: 100%;
    min-height: 30px;
}

@media screen and (min-width: 420px) {
    .filter {
        width: 300px;
        height: min-content;
        background-color: #fbfbfd;
        border-top-right-radius: var(--fr);
        &::after,
        &::before {
            display: none;
        }
        .close-btn {
            display: none;
        }
    }
    .filter--reset {
        width: 140px;
        margin-right: 0;
        &::after {
            content: "Сбросить всё";
        }
    }
    .filter--accept {
        display: none;
    }
}
@media screen and (min-width: 1360px) {
    .filter {
        border-top-left-radius: var(--fr);
    }
}
</style>
