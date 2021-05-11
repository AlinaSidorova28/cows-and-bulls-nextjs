import nookies from 'nookies';
import { useRouter } from 'next/router';

import { getUserData } from '../../utils/authControllers';
import SinglePlayer from '../../components/Game/SinglePlayer';
import MultiPlayer from '../../components/Game/MultiPlayer';

const Game = ({ settings }) => {
  const router = useRouter();
  const { mode } = router.query;

  if (mode === 'single') {
    return (
      <>
        <div className="logo" />
        <div className="login-icon" />
        <SinglePlayer settings={settings} />
      </>
    );
  }

  return (
    <>
      <div className="logo" />
      <div className="login-icon" />
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

  return { settings };
};

export default Game;
