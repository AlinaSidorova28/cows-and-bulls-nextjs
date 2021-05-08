import nookies from 'nookies';
import { useRouter } from 'next/router';

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
  const { language } = nookies.get(ctx);
  return { lang: language };
};

export default Game;
