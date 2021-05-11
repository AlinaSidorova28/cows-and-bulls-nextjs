import React from 'react';
import style from './Form.module.scss';

import BackToMenu from '../Button/BackToMenu';
import textForGame from '../../data/constants';
import { checkPasswordInput, checkForEmptiness, checkConfirm } from '../../utils/validator';
import redirectTo from '../../utils/redirectTo';

import waitGif from './img/wait.gif';
import eyeImg from './img/eye.png';
import click from '../../public/audio/click.mp3';

class AuthorizationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValueName: '',
      inputValuePassword: '',
      inputValueConfirm: '',
      isForSignUp: false,
      isPasswordHidden: true,
      isConfirmHidden: true,
      errorPlace: '',
      errorMessage: '',
    };
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.resetInputs = this.resetInputs.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  componentDidMount() {
    this.makeFocus('name');
  }

  handleInputName(e) {
    this.setState({ inputValueName: e.target.value });

    if (e.target.value) {
      e.target.setCustomValidity('');
    }
  }

  handleInputPassword(e) {
    const { lang } = this.props;
    const { isForSignUp } = this.state;
    this.setState({ inputValuePassword: e.target.value });

    if (isForSignUp) {
      checkPasswordInput(e, lang);
    } else if (e.target.value) {
      e.target.setCustomValidity('');
    }
  }

  handleInputConfirm(e) {
    this.setState({ inputValueConfirm: e.target.value });
    const { inputValuePassword } = this.state;
    const { lang } = this.props;

    checkConfirm(e, inputValuePassword, lang);
  }

  async handleErrors(text) {
    const { lang } = this.props;

    switch (text) {
    case 'User doesn\'t exist':
      this.setState({
        errorMessage: textForGame[lang].error[0],
        errorPlace: 'name',
      });
      this.makeFocus('name');
      break;
    case 'Password is incorrect':
      this.setState({
        errorMessage: textForGame[lang].error[1],
        errorPlace: 'password',
      });
      this.makeFocus('password');
      break;
    case 'Such user already exists':
      this.setState({
        errorMessage: textForGame[lang].error[2],
        errorPlace: 'name',
      });
      this.makeFocus('name');
      break;
    default:
      this.setState({ errorPlace: '' });
      await fetch('/');
      redirectTo('/');
      break;
    }
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    const { lang, inputId } = this.props;
    const {
      inputValueName,
      inputValuePassword,
      isForSignUp,
    } = this.state;

    if (checkForEmptiness(inputId, lang, isForSignUp)) {
      const url = isForSignUp ? '/api/users/register' : '/api/users/login';

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: inputValueName,
            password: inputValuePassword,
          }),
        }).then((response) => response.json());

        this.handleErrors(res.error);
      } catch (error) {
        console.log(error);
      }
    }
  }

  makeFocus(id) {
    const { inputId, focus } = this.props;
    if (focus) {
      document.getElementById(`${inputId}-${id}`).focus();
    }
  }

  resetInputs() {
    this.setState((prev) => ({
      inputValueName: '',
      inputValuePassword: '',
      inputValueConfirm: '',
      isPasswordHidden: true,
      isConfirmHidden: true,
      isForSignUp: !prev.isForSignUp,
      errorPlace: '',
      errorMessage: '',
    }));

    this.makeFocus('name');
  }

  render() {
    const {
      mode,
      inputId,
      lang,
      sound,
    } = this.props;

    const {
      inputValueName,
      inputValuePassword,
      inputValueConfirm,
      isForSignUp,
      isPasswordHidden,
      isConfirmHidden,
      errorPlace,
      errorMessage,
    } = this.state;

    const text = isForSignUp
      ? textForGame[lang].authorization.text[1]
      : textForGame[lang].authorization.text[0];

    return (
      <div className={style[`${mode}-player-container`]}>
        <img className={style['background-wait']} src={waitGif} alt="wait" />
        <span>{text}</span>
        <div className={style[`${mode}-player-wrapper`]}>
          <div className={style[`${mode}-player-background`]} />
          <div className={style[`${mode}-content`]}>
            <form className={style[`${mode}-form`]} onSubmit={(e) => this.onSubmitHandler(e)}>
              <input
                id={`${inputId}-name`}
                className={`${style['input-field-name']} ${style.name} ${errorPlace === 'name' ? style.red : ''}`}
                autoComplete="off"
                autoFocus
                value={inputValueName}
                placeholder={textForGame[lang].authorization.placeholder[0]}
                onChange={this.handleInputName}
              />
              <div style={{ position: 'relative' }}>
                <input
                  id={`${inputId}-password`}
                  className={`${style['input-field-name']} ${errorPlace === 'password' ? style.red : ''}`}
                  autoComplete="off"
                  type={isPasswordHidden ? 'password' : 'text'}
                  value={inputValuePassword}
                  placeholder={textForGame[lang].authorization.placeholder[1]}
                  onChange={this.handleInputPassword}
                />
                <span className={style.eye}>
                  <img
                    role="button"
                    src={eyeImg}
                    alt="visible"
                    onClick={() => {
                      this.setState({ isPasswordHidden: !isPasswordHidden });
                      if (sound) {
                        new Audio(click).play();
                      }
                    }}
                  />
                  <div className={`${style.before} ${!isPasswordHidden ? style.hidden : ''}`}>/</div>
                </span>
              </div>
              <div style={{ position: 'relative' }} className={isForSignUp ? '' : style.hidden}>
                <input
                  id={`${inputId}-confirm`}
                  className={`${style['input-field-name']} ${errorPlace === 'confirm' ? style.red : ''}`}
                  autoComplete="off"
                  type={isConfirmHidden ? 'password' : 'text'}
                  value={inputValueConfirm}
                  placeholder={textForGame[lang].authorization.placeholder[2]}
                  onChange={this.handleInputConfirm}
                />
                <span className={style.eye}>
                  <img
                    role="button"
                    src={eyeImg}
                    alt="visible"
                    onClick={() => {
                      this.setState({ isConfirmHidden: !isConfirmHidden });
                      if (sound) {
                        new Audio(click).play();
                      }
                    }}
                  />
                  <div className={`${style.before} ${!isConfirmHidden ? style.hidden : ''}`}>/</div>
                </span>
              </div>
              <p className={`${style.error} ${!errorPlace ? style.hidden : ''}`}>{errorMessage}</p>
              <input
                className={style.button}
                type="submit"
                value={text.toLowerCase()}
                onClick={() => {
                  if (sound) {
                    new Audio(click).play();
                  }
                }}
              />
              <div>
                {isForSignUp
                  ? textForGame[lang].authorization.question[1]
                  : textForGame[lang].authorization.question[0]}
                <input
                  type="button"
                  className={style.question}
                  value={isForSignUp
                    ? textForGame[lang].authorization.text[0]
                    : textForGame[lang].authorization.text[1]}
                  onClick={() => {
                    this.resetInputs();
                    if (sound) {
                      new Audio(click).play();
                    }
                  }}
                />
              </div>
            </form>
          </div>
          <BackToMenu
            mode="game"
            inscription={textForGame[lang].inscription.back}
            lang={lang}
            sound={sound}
          />
        </div>
      </div>
    );
  }
}

export default AuthorizationForm;
