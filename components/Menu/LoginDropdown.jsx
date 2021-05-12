import React from 'react';
import style from './Menu.module.scss';
import settingsStyle from '../../css/Settings.module.scss';

import { logout } from '../../utils/authControllers';
import textForGame from '../../data/constants';
import click from '../../public/audio/click.mp3';

import logoutImg from '../../public/img/logout.png';
import redirectTo from '../../utils/redirectTo';

class LoginDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // убирать по клику снаружи
  handleClick() {
    const { sound, userName } = this.props;
    if (sound) {
      new Audio(click).play();
    }

    if (userName) {
      this.setState((prevState) => ({ visible: !prevState.visible }));
    } else {
      redirectTo('/login');
    }
  }

  render() {
    const { visible } = this.state;
    const { sound, lang, userName } = this.props;

    return (
      <>
        <div
          role="button"
          className={`${settingsStyle['click-background']} ${visible ? '' : settingsStyle.hidden}`}
          onClick={() => {
            this.setState({ visible: false });
          }}
        >
          click
        </div>
        <div
          className={style['login-icon-wrapper']}
          role="button"
          onClick={this.handleClick}
        >
          <div
            className={style['login-icon']}
          />
          <span className={style.name}>{userName || textForGame[lang].authorization.text[0]}</span>
          <ul className={`${style['login-dropdown']} ${!visible ? style.hidden : ''}`}>
            <li
              role="button"
              onClick={() => {
                if (sound) {
                  new Audio(click).play();
                }

                logout();
              }}
            >
              {textForGame[lang].authorization.text[2]}
              <img src={logoutImg} alt="log out" height="20" />
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default LoginDropdown;
