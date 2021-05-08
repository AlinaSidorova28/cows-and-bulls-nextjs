import React from 'react';
import Link from 'next/link';
import nookies from 'nookies';
import style from '../css/Statistics.module.scss';

import InformativeForm from '../components/Form/InformativeForm';
import textForGame from '../data/constants';

class Statistics extends React.PureComponent {
  static async getInitialProps(ctx) {
    const {
      sound,
      music,
      language,
      difficulty,
    } = nookies.get(ctx);

    return {
      sound,
      music,
      lang: language,
      difficulty,
    };
  }

  render() {
    const { lang, sound } = this.props;

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
          sound={sound === 'true'}
        />
      </>
    );
  }
}

export default Statistics;
