const textForGame = {
  en: {
    single: {
      text: "Guess the number I've made",
      congrats: [
        'Congratulations!!!',
        'You won for',
        'moves!',
      ],
    },
    multiple: {
      text: [
        'Player 1',
        'Player 2',
        'make a number',
      ],
      congrats: [
        'Congratulations!!!',
        'won for',
        'moves!',
      ],
      compassion: [
        'We are sorry(((',
        'lost... Answer:',
      ],
    },
    inscription: {
      back: 'Back to menu',
      check: 'check',
      ok: 'confirm',
    },
    menu: [
      '1 player',
      '2 players',
      'Rules',
      'Settings',
      'Statistics',
    ],
    message: [
      'Input a number',
      'Use digits from 0 to 5 only',
      'Number shouldn\'t start from 0',
      'Input',
      'digital number',
      'Digits should be different',
      'Input a value',
      'Password should contain not less than 8 characters, at least 1 digit, 1 lowercase character and 1 uppercase character',
      'Passwords should match',
    ],
    error: [
      'User doesn\'t exist',
      'Password is incorrect',
      'Such user already exists',
    ],
    rules: {
      subtitle: [
        '1 player',
        '2 players',
      ],
      description: [
        `The cow Momo has made a number, your task is to guess it. The number obeys the following rules:
        ${'1. It consists of 4 or 5 digits, depending on difficulty mode;'}
        ${'** In "easy" mode there are only used digits from 0 to 5;'}
        ${'2. Digits do not repeat;'}
        ${'3. It does not start from 0;'}
        ${'When you input a number Momo gives you hints:'}`,
        ' - bulls mean the amount of guessed digits standing on their places.',
        ' - cows mean the amount of guessed digits standing on wrong places.',
        `First, two players take turns coming up with name and number. Rules for making number are the same as in "1 player" mode.
        ${'Then, you take turns making a guess in the field with your name.'}
        ${"Your task is to guess opponent's number faster than he guesses yours."}`,
      ],
    },
    settings: {
      words: [
        'sound',
        'language',
        'music',
        'difficulty',
        'read rules',
      ],
      difficulty: [
        'easy',
        'medium',
        'hard',
      ],
    },
    statistics: [
      'To see the statistics, please,',
      'log in',
    ],
    authorization: {
      text: [
        'Log in',
        'Sign up',
      ],
      placeholder: [
        'Nickname',
        'Password',
        'Confirm password',
      ],
      question: [
        'Don\'t have an account?',
        'Already have an account?',
      ],
    },
  },
  ru: {
    single: {
      text: 'Какое число я загадал?..',
      congrats: [
        'Поздравляем!!!',
        'Вы выиграли за',
        'ходов!',
      ],
    },
    multiple: {
      text: [
        'Игрок 1',
        'Игрок 2',
        'загадай число',
      ],
      congrats: [
        'Поздравляем!!!',
        'выиграл(а) за',
        'ходов!',
      ],
      compassion: [
        'Очень жаль(((',
        'проиграл(а)... Ответ:',
      ],
    },
    inscription: {
      back: 'Вернуться в меню',
      check: 'проверить',
      ok: 'далее',
    },
    menu: [
      '1 игрок',
      '2 игрока',
      'Правила',
      'Настройки',
      'Статистика',
    ],
    message: [
      'Введите число',
      'Используйте только цифры от 0 до 5',
      'Число не может начинаться с 0',
      'Введите',
      'значное число',
      'Цифры должны отличаться',
      'Введите значение',
      'Пароль должен состоять не менее, чем из 8 знаков, содержать хотя бы 1 цифру, 1 маленькую букву и 1 большую',
      'Пароли должны совпадать',
    ],
    error: [
      'Такого пользователя не существует',
      'Неверный пароль',
      'Пользователь с таким именнем уже существует',
    ],
    rules: {
      subtitle: [
        '1 игрок',
        '2 игрока',
      ],
      description: [
        `Корова Момо загадала число, Ваша задача - отгадать его. Для числа выполняются следующие правила:
        ${'1. Оно состоит из 4 или 5 цифр, в зависимости от уровня сложности;'}
        ${'** В "легком" режиме используются цифры только от 0 до 5;'}
        ${'2. Цифры в числе не повторяются;'}
        ${'3. Число не может начинаться с 0;'}
        ${'Когда Вы вводите число, Момо дает Вам подсказки:'}`,
        ' - быки обозначают количество угаданных цифр, стоящих на своих местах.',
        ' - коровы обозначают количество угаданных цифр, стоящих на чужих местах.',
        `Сначала два игрока по очереди выбирают себе имена и загадывают число. Правила для чисел такие же, как и в режиме "1 игрок".
        ${'Затем вы по очереди делаете предположения в поле с Вашим именем.'}
        ${'Ваша задача - отгодать число противника раньше, чем он угадает Ваше.'}`,
      ],
    },
    settings: {
      words: [
        'звук',
        'язык',
        'музыка',
        'сложность',
        'правила',
      ],
      difficulty: [
        'легко',
        'средне',
        'сложно',
      ],
    },
    statistics: [
      'Чтобы посмотреть статистику,',
      'войдите в систему',
    ],
    authorization: {
      text: [
        'Войти',
        'Зарегистрироваться',
      ],
      placeholder: [
        'Ваше имя',
        'Пароль',
        'Подтвердите пароль',
      ],
      question: [
        'У вас нет учетной записи?',
        'У вас уже есть учетная запись?',
      ],
    },
  },
};

export default textForGame;
