import React from 'react';
import nookies from 'nookies';
import style from '../css/Rules.module.scss';

import InformativeForm from '../components/Form/InformativeForm';
import textForGame from '../data/constants';

import bullPicture from '../components/Form/img/bull-icon.png';
import cowPicture from '../components/Form/img/cow-icon.png';

class Rules extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { language, sound } = nookies.get(ctx);
    return { lang: language, sound };
  }

  render() {
    const { lang, sound } = this.props;

    const content = (
      <>
        <h2>{textForGame[lang].rules.subtitle[0]}</h2>
        <p>{textForGame[lang].rules.description[0]}</p>
        <div className={style.flex}>
          <img src={bullPicture} alt="bull" width="75" />
          <p>{textForGame[lang].rules.description[1]}</p>
        </div>
        <div className={style.flex}>
          <img src={cowPicture} alt="cow" width="75" />
          <p>{textForGame[lang].rules.description[2]}</p>
        </div>
        <h2>{textForGame[lang].rules.subtitle[1]}</h2>
        <p>{textForGame[lang].rules.description[3]}</p>
      </>
    );
    return (
      <>
        <div className="logo" />
        <div className="login-icon" />
        <InformativeForm
          text={textForGame[lang].menu[2]}
          mode="rules"
          content={content}
          lang={lang}
          sound={sound === 'true'}
        />
      </>
    );
  }
}

export default Rules;
