import React from 'react';
import style from './Form.module.scss';

import BackToMenu from '../Button/BackToMenu';
import textForGame from '../../data/constants';

import waitGif from './img/wait.gif';

class InformativeForm extends React.PureComponent {
  render() {
    const {
      text,
      mode,
      content,
      lang,
      sound,
      settings,
    } = this.props;

    return (
      <div className={style[`${mode}-player-container`]}>
        <img className={style['background-wait']} src={waitGif} alt="wait" />
        <span>{text}</span>
        <div className={style[`${mode}-player-wrapper`]}>
          <div className={style[`${mode}-player-background`]} />
          <div className={style[`${mode}-content`]}>
            {content}
          </div>
          <BackToMenu
            mode="game"
            inscription={textForGame[lang].inscription.back}
            settings={settings}
            sound={sound}
            lang={lang}
          />
        </div>
      </div>
    );
  }
}

export default InformativeForm;
