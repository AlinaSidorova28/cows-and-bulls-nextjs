import nookies from 'nookies';
import { useRouter } from 'next/router';

import { getUserData } from '../../utils/authControllers';
import SinglePlayer from '../../components/Game/SinglePlayer';
import MultiPlayer from '../../components/Game/MultiPlayer';
import LoginDropdown from '../../components/Menu/LoginDropdown';

const Game = ({ settings, userName }) => {
  const router = useRouter();
  const { mode } = router.query;

  if (mode === 'single') {
    return (
      <>
        <div className="logo" />
        <LoginDropdown userName={userName} lang={settings.language} sound={settings.sound} />
        <SinglePlayer settings={settings} />
      </>
    );
  }

  return (
    <>
      <div className="logo" />
      <LoginDropdown userName={userName} lang={settings.language} sound={settings.sound} />
      <MultiPlayer settings={settings} />
    </>
  );
};

Game.getInitialProps = async (ctx) => {
  const {
    language,
    music,
    sound,
    difficulty,
  } = nookies.get(ctx);
  let settings = {
    sound: sound === 'true',
    music: music === 'true',
    language,
    difficulty,
  };
  const { userName } = nookies.get(ctx);

  if (userName) {
    settings = await getUserData(userName).settings;
  }

  return { settings, userName };
};

export default Game;
