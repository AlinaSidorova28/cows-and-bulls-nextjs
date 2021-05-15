import React from 'react';
import style from './BackToMenu.module.scss';

import textForGame from '../../data/constants';
import click from '../../public/audio/click.mp3';
import Confirm from '../Form/Confirm';

class Reset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldConfirm: false,
    };
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  changeVisibility(value) {
    this.setState({ shouldConfirm: value });
  }

  render() {
    const {
      lang,
      sound,
      onClickHandler,
    } = this.props;
    const { shouldConfirm } = this.state;

    return (
      <>
        <form className={style['form-for-reset-button']}>
          <input
            className={style['back-to-menu-button']}
            type="button"
            value={textForGame[lang].inscription.reset}
            onClick={() => {
              if (sound) {
                new Audio(click).play();
              }

              this.setState({ shouldConfirm: true });
            }}
          />
        </form>
        <Confirm
          lang={lang}
          sound={sound}
          shouldConfirm={shouldConfirm}
          onClickHandler={onClickHandler}
          changeVisibility={this.changeVisibility}
        />
      </>
    );
  }
}

export default Reset;
