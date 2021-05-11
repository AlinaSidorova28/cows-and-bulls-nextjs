import React from 'react';
import style from './Form.module.scss';

import BackToMenu from '../Button/BackToMenu';
import { checkInput, checkNumber } from '../../utils/validator';
import textForGame from '../../data/constants';

import bullPicture from './img/bull-icon.png';
import cowPicture from './img/cow-icon.png';
import click from '../../public/audio/click.mp3';

class FormForGame extends React.PureComponent {
  constructor(props) {
    super(props);
    const { whichNumber, lang } = this.props;
    this.state = {
      inputValue: '',
      inputValueName: textForGame[lang].multiple.text[whichNumber - 1],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleInputName = this.handleInputName.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onMakingNumberSubmitHandler = this.onMakingNumberSubmitHandler.bind(this);
  }

  componentDidMount() {
    this.makeFocus();
  }

  componentDidUpdate() {
    this.makeFocus();
  }

  handleInput(e) {
    const { lang, diffIndex } = this.props;
    this.setState({ inputValue: e.target.value });
    checkInput(e, e.target.value, lang, diffIndex);
  }

  handleInputName(e) {
    this.setState({ inputValueName: e.target.value });
  }

  onMakingNumberSubmitHandler(e) {
    e.preventDefault();
    const {
      whichNumber,
      setFirstNumber,
      setSecondNumber,
      setFirstName,
      setSecondName,
      inputId,
      lang,
    } = this.props;
    const inputForm = document.getElementById(inputId);
    const inputNameForm = document.getElementById(`${inputId}-name`);

    if (inputForm.value === '') {
      inputForm.setCustomValidity(textForGame[lang].message[6]);
      inputForm.reportValidity();
    } else if (whichNumber === 1) {
      setFirstNumber(inputForm.value);
      setFirstName(inputNameForm.value);
      this.setState({
        inputValue: '',
        inputValueName: textForGame[lang].multiple.text[whichNumber],
      });
      inputNameForm.focus();
    } else {
      setSecondNumber(inputForm.value);
      setSecondName(inputNameForm.value);
      this.setState({
        inputValue: '',
        inputValueName: '',
      });
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { inputValue } = this.state;
    const {
      number,
      updateWon,
      updateAttempts,
      attempts,
      inputId,
      mode,
      changeTurn,
      lang,
    } = this.props;

    const inputForm = document.getElementById(inputId);

    if (inputForm.value === '') {
      inputForm.setCustomValidity(textForGame[lang].message[6]);
      inputForm.reportValidity();
    } else {
      updateAttempts(attempts + 1);
      this.addAttemptResult();

      if (number === inputValue) {
        updateWon();
      }

      if (mode === 'multiple') {
        changeTurn();
      }
    }
  }

  makeFocus() {
    const { inputId, focus } = this.props;
    if (focus) {
      document.getElementById(inputId).focus();
    }
  }

  addAttemptResult() {
    const {
      number,
      attemptArray,
      attempts,
      diffIndex,
    } = this.props;
    const { inputValue } = this.state;
    const length = diffIndex ? diffIndex + 3 : 4;
    const attemptResult = checkNumber(number, inputValue, length);

    attemptArray.push(
      <div className={style['attempt-result']} key={`${inputValue}-${attempts}`}>
        {`${inputValue}: `}
        <img src={bullPicture} alt="bull" />
        {` - ${attemptResult.bulls}, `}
        <img src={cowPicture} alt="cow" />
        {` - ${attemptResult.cows}`}
      </div>,
    );
    this.setState({ inputValue: '' });
  }

  render() {
    const {
      attemptArray,
      won,
      text,
      mode,
      inputId,
      focus,
      isDisabled,
      isForMakingNumber,
      lang,
      sound,
      diffIndex,
    } = this.props;
    const { inputValue, inputValueName } = this.state;

    const pattern = `\\d{${diffIndex ? diffIndex + 3 : 4}}`;

    if (isForMakingNumber) {
      return (
        <>
          <span>{text}</span>
          <div className={style[`${mode}-player-wrapper`]}>
            <div className={style[`${mode}-player-background`]} />
            <div className={style['game-content']}>
              <form onSubmit={(e) => this.onMakingNumberSubmitHandler(e)}>
                <input
                  id={`${inputId}-name`}
                  className={style['input-field-name']}
                  autoComplete="off"
                  autoFocus
                  maxLength="10"
                  value={inputValueName}
                  onChange={this.handleInputName}
                />
                <div className={style.attempt}>
                  <input
                    id={inputId}
                    className={style['input-field']}
                    disabled={isDisabled}
                    autoComplete="off"
                    maxLength={diffIndex ? diffIndex + 3 : 4}
                    pattern={pattern}
                    value={inputValue}
                    onChange={this.handleInput}
                  />
                  <input
                    className={style.button}
                    type="submit"
                    value={textForGame[lang].inscription.ok}
                    onClick={() => {
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
        </>
      );
    }

    return (
      <>
        <span>{text}</span>
        <div className={style[`${mode}-player-wrapper`]}>
          <div className={style[`${mode}-player-background`]} />
          <div className={style['game-content']}>
            {attemptArray.map((el) => el)}
            <form className={`${style.attempt} ${won ? style.hidden : ''}`} onSubmit={(e) => this.onSubmitHandler(e)}>
              <input
                id={inputId}
                className={`${style['input-field']} ${isDisabled ? style.disabled : ''}`}
                autoFocus={focus}
                disabled={isDisabled}
                autoComplete="off"
                maxLength={diffIndex ? diffIndex + 3 : 4}
                pattern={pattern}
                value={inputValue}
                onChange={this.handleInput}
              />
              <input
                className={`${style.button} ${isDisabled ? style.disabled : ''}`}
                type="submit"
                value={textForGame[lang].inscription.check}
                disabled={isDisabled}
                onClick={() => {
                  if (sound) {
                    new Audio(click).play();
                  }
                }}
              />
            </form>
          </div>
          {mode === 'multiple' ? <></> : (
            <BackToMenu
              mode="game"
              inscription={textForGame[lang].inscription.back}
              lang={lang}
              sound={sound}
            />
          )}

        </div>
      </>
    );
  }
}

export default FormForGame;
