/* eslint no-shadow: ["error", { "allow": ["input"] }] */

function valuesFromObject(object) {
  return object ? Object.values(object) : [];
}

function checkBoxHandle(object, selector, key) {
  let result;
  if (object) {
    const idx = object[selector].indexOf(key);
    if (idx !== -1) {
      object[selector].splice(idx, 1);
    } else {
      object[selector].push(key);
    }
    result = object[selector];
  }
  return result;
}

function phoneInput(input) {
  const getInputNumbersValue = function (input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '');
  };

  const onPhonePaste = function (e) {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input);
    const pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
      }
    }
  };
  const onPhoneInput = function (e) {
    const input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    const { selectionStart } = input;
    let formattedInputValue = '';

    if (!inputNumbersValue) {
      input.value = '';
    }

    if (input.value.length !== selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === '9') inputNumbersValue = `7${inputNumbersValue}`;
      const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';
      formattedInputValue = `${firstSymbols} `;
      input.value = `${firstSymbols} `;
      if (inputNumbersValue.length > 1) {
        formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
      }
    } else {
      formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`;
    }
    input.value = formattedInputValue;
  };
  const onPhoneKeyDown = function (e) {
    // Clear input after remove last symbol
    const inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode === 8 && inputValue.length === 1) {
      e.target.value = '';
    }
  };
  input.addEventListener('keydown', onPhoneKeyDown);
  input.addEventListener('input', onPhoneInput, false);
  input.addEventListener('paste', onPhonePaste, false);
}

function previewImg(preview, file) {
  const reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export {
  valuesFromObject, checkBoxHandle, phoneInput, previewImg, insertAfter,
};
