import React from 'react';
import style from './Form.module.scss';

import textForGame from '../../data/constants';
import click from '../../public/audio/click.mp3';
import { resetStatistics } from '../../utils/saveChanges';

class Reset extends React.PureComponent {
  render() {
    const {
      lang,
      sound,
      shouldConfirm,
      onClickHandler,
      changeVisibility,
    } = this.props;

    return (
      <div className={`${style['confirm-wrapper']} ${!shouldConfirm ? style.hidden : ''}`}>
        <p>{textForGame[lang].statistics.question}</p>
        <input
          className={style['confirm-button']}
          type="button"
          value={textForGame[lang].statistics.confirm[0]}
          onClick={() => {
            if (sound) {
              new Audio(click).play();
            }

            resetStatistics();
            onClickHandler(true);
            changeVisibility(false);
          }}
        />
        <input
          className={style['confirm-button']}
          type="button"
          value={textForGame[lang].statistics.confirm[1]}
          onClick={() => {
            if (sound) {
              new Audio(click).play();
            }

            changeVisibility(false);
          }}
        />
      </div>
    );
  }
}

export default Reset;
