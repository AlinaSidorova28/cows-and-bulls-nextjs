import React from 'react';
import Link from 'next/link';
import nookies from 'nookies';
import style from '../css/Statistics.module.scss';

import { getUserData } from '../utils/authControllers';
import InformativeForm from '../components/Form/InformativeForm';
import textForGame from '../data/constants';

class Statistics extends React.PureComponent {
  static async getInitialProps(ctx) {
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
      settings = await getUserData(userName);
    }

    return {
      lang: settings.language,
      settings,
    };
  }

  render() {
    const { lang, settings } = this.props;

    const content = (
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
    return (
      <>
        <div className="logo" />
        <div className="login-icon" />
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
