const generateNumber = (diffIndex) => {
  let number = new Set();
  let maxDigit = 10;
  let length = diffIndex + 3;
  if (!diffIndex) {
    maxDigit = 6; // цифры от 0 до 5
    length = 4;
  }

  while (number.size < length) {
    number.add(Math.floor(Math.random() * Math.floor(maxDigit)));
  }

  number = [...number];
  while (number[0] === 0) {
    number.sort(() => Math.round(Math.random() * 100) - 50);
  }

  return number.join('');
};

export default generateNumber;
