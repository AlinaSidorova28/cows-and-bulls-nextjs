import React from 'react';
import Link from 'next/link';
import style from './BackToMenu.module.scss';

import textForGame from '../../data/constants';
import click from '../../public/audio/click.mp3';
import { saveSettings } from '../../utils/saveChanges';

class BackToMenu extends React.PureComponent {
  render() {
    const {
      mode,
      lang,
      onClick,
      sound,
      settings,
    } = this.props;

    return (
      <form className={`${style['form-for-button']} ${mode === 'game' ? style['buttton-for-game'] : ''} ${mode === 'multiple-game' ? style['buttton-for-multiple-game'] : ''}`}>
        <Link href="/">
          <input
            className={style['back-to-menu-button']}
            type="submit"
            value={textForGame[lang].inscription.back}
            onClick={() => {
              if (sound) {
                new Audio(click).play();
              }

              if (onClick) {
                onClick();
              } else {
                saveSettings(settings);
              }
            }}
          />
        </Link>
      </form>
    );
  }
}

export default BackToMenu;
