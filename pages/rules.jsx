import React from 'react';
import nookies from 'nookies';
import style from '../css/Rules.module.scss';

import { getUserData } from '../utils/authControllers';
import InformativeForm from '../components/Form/InformativeForm';
import LoginDropdown from '../components/Menu/LoginDropdown';
import textForGame from '../data/constants';

import bullPicture from '../components/Form/img/bull-icon.png';
import cowPicture from '../components/Form/img/cow-icon.png';

class Rules extends React.PureComponent {
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
        <LoginDropdown userName={userName} lang={lang} sound={settings.sound} />
        <InformativeForm
          text={textForGame[lang].menu[2]}
          mode="rules"
          content={content}
          lang={lang}
          sound={settings.sound}
        />
      </>
    );
  }
}

export default Rules;
