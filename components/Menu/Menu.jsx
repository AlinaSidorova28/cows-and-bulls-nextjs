import React from 'react';
import Link from 'next/link';
import style from './Menu.module.scss';

import textForGame from '../../data/constants';
import click from '../../public/audio/click.mp3';

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { sound } = this.props;
    if (sound) {
      new Audio(click).play();
    }
  }

  render() {
    const { lang } = this.props;

    return (
      <div className={style['menu-container']}>
        <div className={style['menu-wrapper']}>
          <div className={style['menu-background']} />
          <ul className={style.ul}>
            <Link href="/game/[mode]" as="game/single">
              <li
                className={style.li}
                role="button"
                onClick={this.handleClick}
              >
                {textForGame[lang].menu[0]}
              </li>
            </Link>
            <Link href="/game/[mode]" as="game/multiple">
              <li
                className={style.li}
                role="button"
                onClick={this.handleClick}
              >
                {textForGame[lang].menu[1]}
              </li>
            </Link>
            <Link href="/rules" as="/rules">
              <li
                className={style.li}
                role="button"
                onClick={this.handleClick}
              >
                {textForGame[lang].menu[2]}
              </li>
            </Link>
            <Link href="/settings" as="/settings">
              <li
                className={style.li}
                role="button"
                onClick={this.handleClick}
              >
                {textForGame[lang].menu[3]}
              </li>
            </Link>
            <Link href="/statistics" as="/statistics">
              <li
                className={style.li}
                role="button"
                onClick={this.handleClick}
              >
                {textForGame[lang].menu[4]}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
