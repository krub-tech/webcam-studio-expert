/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { getMessageOptions } from '@/api/messages';
import { postFormData } from '@/api/client';

const state = {
  isSent: false,
  modal: null,
  formData: [
    {
      message_type: 'interview',
      name: null,
      phone: null,
      year_of_birth: null,
      answer_to: [],
    },
    {
      message_type: 'feedback',
      message: null,
      name: null,
      phone: null,
      answer_to: [],
    },
    {
      message_type: 'complaint',
      message: null,
      name: null,
      phone: null,
      answer_to: [],
    },
    {
      message_type: 'certification',
      message: null,
      name: null,
      phone: null,
      answer_to: [],
    },
    {
      message_type: 'specselection',
      name: null,
      phone: null,
      year_of_birth: null,
      model_type: null,
      english_level: null,
      city: null,
      district: null,
      metro: null,
      min_payout_percentage: null,
      shift_length: null,
      min_shifts_per_week: null,
      additional_information: null,
      studio_type: [],
      devices: [],
      conditions: [],
      answer_to: [],
    },
  ],
  message_options: null,
  errors: null,
};

const getters = {};

const mutations = {
  updateModal(state, payload) {
    state.modal = payload;
  },
  pushFormDataField: (state, payload) => {
    state.formData.forEach((el) => {
      if (el.message_type === payload.type) {
        if (el[payload.field] == null) {
          el[payload.field] = payload.event;
          return;
        }
        if (el[payload.field].indexOf(payload.event) === -1) {
          el[payload.field].push(payload.event);
        } else {
          el[payload.field].splice(el.answer_to.indexOf(payload.event), 1);
        }
      }
    });
  },
  assignFormDataField: (state, payload) => {
    state.formData.forEach((el) => {
      if (el.message_type === payload.type) {
        el[payload.field] = payload.event;
      }
    });
  },
  updateYearOfBirth: (state, payload) => {
    state.year_of_birth = payload;
  },
  updateIsSent: (state) => {
    state.isSent = !state.isSent;
  },
  updateMessageOptions: (state, payload) => {
    state.message_options = payload;
  },
  modalClose: (state) => {
    state.modal = null;
  },
};

const actions = {
  updateModal(ctx, payload) {
    ctx.commit('updateModal', payload);
    if (document.querySelector('.modal-wrapper')) document.querySelector('.modal-wrapper').scrollTop = 0;
  },
  previewImg(ctx, data) {
    const reader = new FileReader();

    reader.onloadend = function () {
      data.preview.src = reader.result;
    };

    if (data.file) {
      reader.readAsDataURL(data.file);
    }
  },
  filesInputHandle({ state }, data) {
    const previews = data.el.querySelector('.modal--photos-files');
    for (const [key, value] of Object.entries(data.event.target.files)) {
      let preview;
      if (value.type.match('image')) {
        preview = document.createElement('img');
        this.dispatch('previewImg', { preview, file: value });
      } else {
        preview = document.createElement('div');
        preview.innerText = value.name;
        preview.classList.add('badge');
      }
      const previewWrapper = document.createElement('div');
      previewWrapper.classList.add('preview-wrapper');
      previewWrapper.appendChild(preview);
      previews.appendChild(previewWrapper);

      const formData = state.formData.find((el) => el.message_type === data.type);
      formData[`file_${+key + 1}`] = value;

      previewWrapper.addEventListener('click', () => {
        delete formData[`file_${+key + 1}`];

        previewWrapper.remove();
      });
    }
  },
  invalidMessage(ctx, selector) {
    const invalidElem = document.querySelector(`input[class*='${selector}']`);
    if (invalidElem) {
      invalidElem.classList.add('invalid');
    }
  },
  submitHandle({ state, dispatch, commit }, type) {
    const formDataToDB = new FormData();
    let isValid = false;

    state.formData.forEach((el) => {
      if (el.message_type === type) {
        if (el.name && el.phone) {
          isValid = true;
        } else {
          dispatch('invalidMessage', 'name');
          dispatch('invalidMessage', 'phone');
        }
        for (const [key, value] of Object.entries(el)) {
          if (key === 'phone') {
            const newV = value?.replace(/\D/g, '');
            if (newV?.length > 12) {
              isValid = false;
              dispatch('invalidMessage', 'phone');
            } else {
              formDataToDB.append(key, newV);
            }
          }
          if (key === 'answer_to') {
            el.answer_to.forEach((l) => {
              formDataToDB.append('answer_to', l);
            });
          } else formDataToDB.append(key, value);
        }
      }
    });

    if (!isValid) return;
    if (type === 'interview') {
      formDataToDB.append('studio', getters.currentStudio.id);
    }

    let query = 'message/input/';
    if (state.modal.name === 'Interview' || state.modal.name === 'Certification') {
      query = 'message/request/';
    }

    for (const [name, value] of formDataToDB) {
      console.log(`${name} = ${value}`);
    }

    dispatch('dataPostToDB', { formData: formDataToDB, query });
    commit('updateIsSent');
  },
  async dataPostToDB({ state }, data) {
    const request = await postFormData(data);
    if (!request.ok) state.errors = request;
    else {
      console.log(request);
    }
  },
  async getMessageOptions({ commit }) {
    const response = await getMessageOptions();
    commit('updateMessageOptions', response);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
