import React from 'react';
import Link from 'next/link';
import { setCookie, parseCookies } from 'nookies';
import style from './BackToMenu.module.scss';

import textForGame from '../../data/constants';
import click from '../../public/audio/click.mp3';

class BackToMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { settings, sound } = this.props;
    if (sound) {
      new Audio(click).play();
    }

    const { userName } = parseCookies();

    if (settings) {
      if (userName) {
        try {
          await fetch(`/api/settings/${userName}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sound: settings.sound,
              music: settings.music,
              language: settings.language,
              difficulty: settings.difficulty,
            }),
          }).then((response) => response.json());
        } catch (error) {
          console.log(error);
        }
      } else {
        setCookie(null, 'sound', settings.sound, { path: '/' });
        setCookie(null, 'music', settings.music, { path: '/' });
        setCookie(null, 'language', settings.language, { path: '/' });
        setCookie(null, 'difficulty', settings.difficulty, { path: '/' });
      }
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
