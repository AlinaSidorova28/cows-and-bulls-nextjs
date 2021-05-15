import { setCookie, parseCookies } from 'nookies';

const saveSettings = async (settings) => {
  const { userName } = parseCookies();

  if (settings) {
    if (userName) {
      try {
        await fetch(`/api/settings/${userName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sound: settings.sound,
            music: settings.music,
            language: settings.language,
            difficulty: settings.difficulty,
          }),
        }).then((response) => response.json());
      } catch (error) {
        console.log(error);
      }
    } else {
      setCookie(null, 'sound', settings.sound, { path: '/' });
      setCookie(null, 'music', settings.music, { path: '/' });
      setCookie(null, 'language', settings.language, { path: '/' });
      setCookie(null, 'difficulty', settings.difficulty, { path: '/' });
    }
  }
};

const saveStatistics = async (difficulty, moves, number) => {
  const { userName } = parseCookies();

  if (userName) {
    try {
      await fetch(`/api/statistics/${userName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty,
          moves,
          number,
        }),
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
    }
  }
};

const resetStatistics = async () => {
  const { userName } = parseCookies();

  if (userName) {
    try {
      await fetch(`/api/statistics/${userName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
    }
  }
};

export { saveSettings, saveStatistics, resetStatistics };
