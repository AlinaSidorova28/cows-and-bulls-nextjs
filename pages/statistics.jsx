import React from 'react';
import Link from 'next/link';
import nookies from 'nookies';
import style from '../css/Statistics.module.scss';

import { getUserData } from '../utils/authControllers';
import InformativeForm from '../components/Form/InformativeForm';
import LoginDropdown from '../components/Menu/LoginDropdown';
import textForGame from '../data/constants';

class Statistics extends React.PureComponent {
  static async getInitialProps(ctx) {
    const {
      language,
      music,
      sound,
      difficulty,
      userName,
    } = nookies.get(ctx);
    let settings = {
      sound: sound === 'true',
      music: music === 'true',
      language,
      difficulty,
    };

    if (userName) {
      settings = await getUserData(userName);
    }

    return {
      lang: settings.language,
      settings,
      userName,
    };
  }

  render() {
    const { lang, settings, userName } = this.props;

    let content;
    if (!userName) {
      content = (
        <>
          <div className={style['message-wrapper']}>
            <h3>
              {textForGame[lang].statistics[0]}
            </h3>
            <Link href="/login" as="login">
              {` ${textForGame[lang].statistics[1]}`}
            </Link>
          </div>
        </>
      );
    } else {
      content = (
        <>
          {/* <h3>{userName}</h3> */}
          <h3>
            У Вас пока нет рейтинга. Сыграйте свою первую партию в режиме
            <Link href="/game/[mode]" as="game/single"> &quot;1 игрок&quot;</Link>
          </h3>
        </>
      );
    }

    return (
      <>
        <div className="logo" />
        <LoginDropdown userName={userName} lang={lang} sound={settings.sound} />
        <InformativeForm
          text={textForGame[lang].menu[4]}
          mode="rules"
          content={content}
          lang={lang}
          sound={settings.sound}
        />
      </>
    );
  }
}

export default Statistics;
