export default ({ app }, inject) => {
  inject('toArray', (array, payload) => {
    const idx = array.indexOf(payload)
    if (idx === -1) array.push(payload)
    else array.splice(idx, 1)
    return array
  })

  inject('isChecked', (arr, key) => {
    let bool = false
    if (arr) {
      arr.forEach((el) => {
        if (el !== key) return
        bool = !bool
      })
    }
    return bool
  })

  inject('previewImg', (data) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      data.preview.src = reader.result
    }
    if (data.file) {
      reader.readAsDataURL(data.file)
    }
  })

  inject('scrollToTop', () => {
    const el = document.getElementById('__layout')
    el.scrollTo(0, 0)
  })

  inject('keysByValues', (payload, options) => {
    let result
    Object.entries(options).forEach(([key, value]) => {
      if (value === payload) result = key
    })
    return result
  })

  inject('phoneFormat', (payload) => {
    const getInputNumbersValue = function (input) {
      return input.value.replace(/\D/g, '')
    }

    const onPhonePaste = function (e) {
      const input = e.target
      const inputNumbersValue = getInputNumbersValue(input)
      const pasted = e.clipboardData || window.clipboardData
      if (pasted) {
        const pastedText = pasted.getData('Text')
        if (/\D/g.test(pastedText)) {
          // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
          // formatting will be in onPhoneInput handler
          input.value = inputNumbersValue
        }
      }
    }
    const onPhoneInput = function (e) {
      const input = e.target
      let inputNumbersValue = getInputNumbersValue(input)
      const { selectionStart } = input
      let formattedInputValue = ''

      if (!inputNumbersValue) {
        input.value = ''
      }

      if (input.value.length !== selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
          // Attempt to input non-numeric symbol
          input.value = inputNumbersValue
        }
        return
      }

      if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] === '9') inputNumbersValue = `7${inputNumbersValue}`
        const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7'
        formattedInputValue = `${firstSymbols} `
        input.value = `${firstSymbols} `
        if (inputNumbersValue.length > 1) {
          formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`
        }
      } else {
        formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`
      }
      input.value = formattedInputValue
    }
    const onPhoneKeyDown = function (e) {
      // Clear input after remove last symbol
      const inputValue = e.target.value.replace(/\D/g, '')
      if (e.keyCode === 8 && inputValue.length === 1) {
        e.target.value = ''
      }
    }
    payload.target.addEventListener('keydown', onPhoneKeyDown)
    payload.target.addEventListener('input', onPhoneInput, false)
    payload.target.addEventListener('paste', onPhonePaste, false)
  })

  inject('closeModal', () => {
    if (
      app.store.state.modals.current === 'Terms' ||
      app.store.state.modals.current === 'Privacy' ||
      app.store.state.modals.current === 'EnglishDesc'
    ) {
      app.store.commit('modals/setCurrent', app.store.state.modals.prev)
    } else app.store.commit('modals/setCurrent', null)
  })
}
