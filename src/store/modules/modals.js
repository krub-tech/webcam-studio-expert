const state = {
  isSended: false,
  modal: null,
  formData: [
    {
      message_type: "interview",
      name: null,
      phone: null,
      year_of_birth: null,
      answer_to: [],
    },
    {
      message_type: "feedback",
      message: null,
      name: null,
      phone: null,
      answer_to: [],
    },
    {
      message_type: "complaint",
      message: null,
      name: null,
      phone: null,
      answer_to: [],
    },
    {
      message_type: "certification",
      message: null,
      name: null,
      phone: null,
      answer_to: [],
    },
    {
      message_type: "specselection",
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
    state.formData.map((el) => {
      if (el.message_type == payload.type) {
        if (el[payload.field] == null) {
          el[payload.field] = payload.event;
          return;
        }
        if (el[payload.field].indexOf(payload.event) == -1) {
          el[payload.field].push(payload.event);
        } else {
          el[payload.field].splice(el.answer_to.indexOf(payload.event), 1);
        }
      }
    });
  },
  assignFormDataField: (state, payload) => {
    state.formData.map((el) => {
      if (el.message_type == payload.type) {
        el[payload.field] = payload.event;
      }
    });
  },
  updateYearOfBirth: (state, payload) => {
    state.year_of_birth = payload;
  },
  updateIsSended: (state) => {
    state.isSended = !state.isSended;
  },
  updateMessageOptions: (state, payload) => {
    state.message_options = payload;
  },
  modalClose: (state, dispatch) => {
    state.modal = null;
  },
};

const actions = {
  updateModal(ctx, payload) {
    ctx.commit("updateModal", payload);
    if (document.querySelector(".modal-wrapper"))
      document.querySelector(".modal-wrapper").scrollTop = 0;
  },
  previewImg({ commit }, data) {
    let reader = new FileReader();

    reader.onloadend = function () {
      data.preview.src = reader.result;
    };

    if (data.file) {
      reader.readAsDataURL(data.file);
    } else {
      preview.src = "";
    }
  },
  filesInputHandle({ state }, data) {
    const previews = data.el.querySelector(".modal--photos-files");
    for (let [key, value] of Object.entries(data.event.target.files)) {
      let preview;
      if (value.type.match("image")) {
        preview = document.createElement("img");
        this.dispatch("previewImg", { preview: preview, file: value });
      } else {
        preview = document.createElement("div");
        preview.innerText = value.name;
        preview.classList.add("badge");
      }
      let previewWrapper = document.createElement("div");
      previewWrapper.classList.add("preview-wrapper");
      previewWrapper.appendChild(preview);
      previews.appendChild(previewWrapper);

      let formData = state.formData.find((el) => el.message_type == data.type);
      formData[`file_${+key + 1}`] = value;

      previewWrapper.addEventListener("click", function (state) {
        delete formData[`file_${+key + 1}`];

        previewWrapper.remove();
      });
    }
  },
  invalidMessage({}, selector) {
    const invalidElem = document.querySelector(`input[class*='${selector}']`);
    if (invalidElem) {
      invalidElem.classList.add("invalid");
    }
  },
  submitHandle({ state, getters, dispatch, commit }, type) {
    let formDataToDB = new FormData();
    let isValid = false;

    state.formData.map((el) => {
      if (el.message_type == type) {
        if (el.name && el.phone) {
          isValid = true;
        } else {
          dispatch("invalidMessage", "name");
          dispatch("invalidMessage", "phone");
        }
        for (let [key, value] of Object.entries(el)) {
          if (key == "phone") {
            value = value?.replace(/\D/g, "");
            if (value?.length > 12) {
              isValid = false;
              dispatch("invalidMessage", "phone");
            }
          }
          if (key == "answer_to") {
            el.answer_to.map((el) => {
              formDataToDB.append("answer_to", el);
            });
          } else formDataToDB.append(key, value);
        }
      }
    });

    if (!isValid) return;
    if (type === "interview") {
      formDataToDB.append("studio", getters.currentStudio.id);
    }

    let query = "api/message/input/";
    if (
      state.modal.name == "Interview" ||
      state.modal.name == "Certification"
    ) {
      query = "api/message/request/";
    }

    for (let [name, value] of formDataToDB) {
      console.log(`${name} = ${value}`);
    }

    dispatch("dataPostToDB", { formData: formDataToDB, query: query });
    commit("updateIsSended");
  },
  async dataPostToDB({ state, dispatch }, data) {
    const request = await dispatch("apiPostRequest", data);
    if (!request.ok) state.errors = request;
    else {
      console.log(request);
    }
  },
  async getMessageOptions({ dispatch, commit }) {
    const response = await dispatch("apiGetRequest", "api/message/options/");
    commit("updateMessageOptions", response.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
