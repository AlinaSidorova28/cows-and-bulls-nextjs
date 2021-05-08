import textForGame from '../data/constants';

const checkInput = (e, value, lang, diffIndex) => {
  const testArray = value.split('');
  let message = '';
  const maxLength = diffIndex ? diffIndex + 3 : 4;

  if (!value.match(/\d+/) || value.match(/\d+/)[0] !== value) {
    message = `${textForGame[lang].message[0]}`;
  } else if (!diffIndex && (!value.match(/[0-5]+/) || value.match(/[0-5]+/)[0] !== value)) {
    message = `${textForGame[lang].message[1]}`;
  } else if (value[0] === '0') {
    message = `${textForGame[lang].message[2]}`;
  } else if (value.length < maxLength) {
    message = `${textForGame[lang].message[3]} ${maxLength}-${textForGame[lang].message[4]}`;
  } else if (new Set(testArray).size !== testArray.length) {
    message = `${textForGame[lang].message[5]}`;
  }

  e.target.setCustomValidity(message);
};

const checkPasswordInput = (e, lang) => {
  let message = '';

  if (!e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
    message = `${textForGame[lang].message[7]}`;
  }

  e.target.setCustomValidity(message);
};

const checkForEmptiness = (inputId, lang, isForSignUp) => {
  const nameInput = document.getElementById(`${inputId}-name`);
  const passwordInput = document.getElementById(`${inputId}-password`);
  const confirmInput = document.getElementById(`${inputId}-confirm`);
  if (nameInput.value === '') {
    nameInput.setCustomValidity(textForGame[lang].message[6]);
    nameInput.reportValidity();

    return false;
  } if (passwordInput.value === '') {
    passwordInput.setCustomValidity(textForGame[lang].message[6]);
    passwordInput.reportValidity();

    return false;
  } if (isForSignUp && confirmInput.value === '') {
    confirmInput.setCustomValidity(textForGame[lang].message[6]);
    confirmInput.reportValidity();

    return false;
  }

  return true;
};

const checkConfirm = (el, password, lang) => {
  if (el.target.value !== password) {
    el.target.setCustomValidity(textForGame[lang].message[8]);
  } else {
    el.target.setCustomValidity('');
  }
};

const checkNumber = (number, inputValue, maxLength) => {
  let cows = 0;
  let bulls = 0;
  for (let i = 0; i < maxLength; i += 1) {
    if (inputValue[i] === number[i]) {
      bulls += 1;
    } else if (number.includes(inputValue[i])) {
      cows += 1;
    }
  }

  return { cows, bulls };
};

export {
  checkInput,
  checkNumber,
  checkPasswordInput,
  checkForEmptiness,
  checkConfirm,
};
