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

export default saveSettings;
