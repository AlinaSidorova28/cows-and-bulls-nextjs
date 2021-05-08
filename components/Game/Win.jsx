/* eslint-disable class-methods-use-this */
import React from 'react';
import gameStyle from './Game.module.scss';
import formStyle from '../Form/Form.module.scss';

import BackToMenu from '../Button/BackToMenu';
import textForGame from '../../data/constants';
import winMusic from '../../public/audio/win.mp3';
import musicSource from '../../public/audio/music.mp3';

class Win extends React.PureComponent {
  onClickHandler() {
    const audioElement = document.querySelector('video');
    audioElement.pause();
    audioElement.src = musicSource;
    audioElement.loop = true;
    audioElement.play();
  }

  render() {
    const {
      attempts,
      mode,
      winner,
      number,
      textFirst,
      textSecond,
      lang,
      music,
      sound,
    } = this.props;

    const audioElement = document.querySelector('video');
    if (music) {
      audioElement.pause();
      audioElement.src = winMusic;
      audioElement.loop = false;
      audioElement.play();
    }

    if (mode === 'single') {
      return (
        <div className={gameStyle.win}>
          <div className={gameStyle.congratulation}>
            {textForGame[lang].single.congrats[0]}
            <br />
            {`${textForGame[lang].single.congrats[1]} ${attempts} ${textForGame[lang].single.congrats[2]}`}
          </div>
          <BackToMenu
            lang={lang}
            sound={sound}
            onClick={this.onClickHandler}
          />
        </div>
      );
    }

    const winMessage = [];
    const looseMessage = [];
    winMessage.push(textForGame[lang].multiple.congrats[0]);
    looseMessage.push(textForGame[lang].multiple.compassion[0]);

    if (winner === 'first') {
      winMessage.push(`${textFirst} ${textForGame[lang].multiple.congrats[1]}`);
      looseMessage.push(`${textSecond} ${textForGame[lang].multiple.compassion[1]} ${number}`);
    } else {
      winMessage.push(`${textSecond} ${textForGame[lang].multiple.congrats[1]}`);
      looseMessage.push(`${textFirst} ${textForGame[lang].multiple.compassion[1]} ${number}`);
    }

    winMessage.push(`${attempts} ${textForGame[lang].multiple.congrats[2]}`);

    return (
      <div className={formStyle['app-clone']}>
        <div className={winner === 'first' ? gameStyle.win : gameStyle.loose}>
          <div className={gameStyle.congratulation}>
            {winner === 'first' ? winMessage[0] : looseMessage[0]}
            <br />
            {winner === 'first' ? `${winMessage[1]} ${winMessage[2]}` : looseMessage[1]}
          </div>
        </div>
        <div className={winner === 'first' ? gameStyle.loose : gameStyle.win}>
          <div className={gameStyle.congratulation}>
            {winner === 'first' ? looseMessage[0] : winMessage[0]}
            <br />
            {winner === 'first' ? looseMessage[1] : `${winMessage[1]} ${winMessage[2]}`}
          </div>
        </div>
        <div className={gameStyle['button-wrapper']}>
          <BackToMenu
            lang={lang}
            sound={sound}
            onClick={this.onClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default Win;
