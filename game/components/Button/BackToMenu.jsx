import React from 'react';
import Link from 'next/link';
import { setCookie } from 'nookies';
import style from './BackToMenu.module.scss';

import textForGame from '../../data/constants';
import click from '../../public/audio/click.mp3';

class BackToMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { settings, sound } = this.props;
    if (sound) {
      new Audio(click).play();
    }

    if (settings) {
      setCookie(null, 'sound', settings.sound, { path: '/' });
      setCookie(null, 'music', settings.music, { path: '/' });
      setCookie(null, 'language', settings.language, { path: '/' });
      setCookie(null, 'difficulty', settings.difficulty, { path: '/' });
    }
  }

  render() {
    const { mode, lang, onClick } = this.props;

    return (
      <form className={`${style['form-for-button']} ${mode === 'game' ? style['buttton-for-game'] : ''} ${mode === 'multiple-game' ? style['buttton-for-multiple-game'] : ''}`}>
        <Link href="/">
          <input
            className={style['back-to-menu-button']}
            type="submit"
            value={textForGame[lang].inscription.back}
            onClick={onClick ? () => onClick() : this.handleClick}
          />
        </Link>
      </form>
    );
  }
}

export default BackToMenu;
