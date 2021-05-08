import React from 'react';
import style from '../Form/Form.module.scss';

import Win from './Win';
import FormForGame from '../Form/FormForGame';
import BackToMenu from '../Button/BackToMenu';
import textForGame from '../../data/constants';

class MultiPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { settings } = this.props;
    this.state = {
      firstNumber: '',
      secondNumber: '',
      firstName: textForGame[settings.language].multiple.text[0],
      secondName: textForGame[settings.language].multiple.text[1],
      firstAttemptArray: [],
      secondAttemptArray: [],
      firstAttempts: 0,
      secondAttempts: 0,
      firstWon: false,
      secondWon: false,
      doesFirstMove: true,
      doesSecondMove: false,
    };
    this.setFirstNumber = this.setFirstNumber.bind(this);
    this.setSecondNumber = this.setSecondNumber.bind(this);
    this.setFirstName = this.setFirstName.bind(this);
    this.setSecondName = this.setSecondName.bind(this);
    this.updateFirstWon = this.updateFirstWon.bind(this);
    this.updateSecondWon = this.updateSecondWon.bind(this);
    this.updateFirstAttempts = this.updateFirstAttempts.bind(this);
    this.updateSecondAttempts = this.updateSecondAttempts.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
  }

  setFirstNumber(value) {
    this.setState({ firstNumber: value });
    console.log(`first number: ${value}`);
  }

  setSecondNumber(value) {
    this.setState({ secondNumber: value });
    console.log(`second number: ${value}`);
  }

  setFirstName(value) {
    this.setState({ firstName: value });
  }

  setSecondName(value) {
    this.setState({ secondName: value });
  }

  updateFirstWon() {
    this.setState({ firstWon: true });
  }

  updateSecondWon() {
    this.setState({ secondWon: true });
  }

  updateFirstAttempts(value) {
    this.setState({ firstAttempts: value });
  }

  updateSecondAttempts(value) {
    this.setState({ secondAttempts: value });
  }

  changeTurn() {
    this.setState((prevState) => (
      {
        doesFirstMove: !prevState.doesFirstMove,
        doesSecondMove: !prevState.doesSecondMove,
      }
    ));
  }

  render() {
    const {
      firstNumber,
      secondNumber,
      firstName,
      secondName,
      firstAttemptArray,
      secondAttemptArray,
      firstAttempts,
      secondAttempts,
      firstWon,
      secondWon,
      doesFirstMove,
      doesSecondMove,
    } = this.state;

    const { settings } = this.props;
    const diffIndex = textForGame[settings.language].settings.difficulty
      .indexOf(settings.difficulty);

    if (firstWon || secondWon) {
      return (
        <Win
          attempts={firstWon ? firstAttempts : secondAttempts}
          winner={firstWon ? 'first' : 'second'}
          number={firstWon ? firstNumber : secondNumber}
          mode="multiple"
          lang={settings.language}
          sound={settings.sound === 'true'}
          music={settings.music === 'true'}
          textFirst={firstName}
          textSecond={secondName}
        />
      );
    }

    while (!(firstNumber && secondNumber)) {
      const i = !firstNumber ? 0 : 1;
      return (
        <div className={`${style['multiple-player-container']} ${style.background}`}>
          <FormForGame
            inputId="input"
            mode="multiple"
            lang={settings.language}
            sound={settings.sound === 'true'}
            text={`${textForGame[settings.language].multiple.text[i]}, ${textForGame[settings.language].multiple.text[2]}`}
            isForMakingNumber
            whichNumber={i + 1}
            setFirstNumber={this.setFirstNumber}
            setSecondNumber={this.setSecondNumber}
            setFirstName={this.setFirstName}
            setSecondName={this.setSecondName}
            difficulty={settings.difficulty}
            diffIndex={diffIndex}
          />
        </div>
      );
    }

    return (
      <div className={style['app-clone']}>
        <div className={`${style['multiple-player-container']} ${doesFirstMove ? style.background : ''}`}>
          <FormForGame
            attemptArray={firstAttemptArray}
            won={firstWon}
            number={secondNumber}
            updateWon={this.updateFirstWon}
            updateAttempts={this.updateFirstAttempts}
            attempts={firstAttempts}
            text={firstName}
            mode="multiple"
            lang={settings.language}
            sound={settings.sound === 'true'}
            inputId="input-1"
            focus={doesFirstMove}
            isDisabled={!doesFirstMove}
            changeTurn={this.changeTurn}
            difficulty={settings.difficulty}
            diffIndex={diffIndex}
          />
        </div>
        <div className={`${style['multiple-player-container']} ${doesSecondMove ? style.background : ''}`}>
          <FormForGame
            attemptArray={secondAttemptArray}
            won={secondWon}
            number={firstNumber}
            updateWon={this.updateSecondWon}
            updateAttempts={this.updateSecondAttempts}
            attempts={secondAttempts}
            text={secondName}
            mode="multiple"
            lang={settings.language}
            sound={settings.sound === 'true'}
            inputId="input-2"
            focus={doesSecondMove}
            isDisabled={!doesSecondMove}
            changeTurn={this.changeTurn}
            difficulty={settings.difficulty}
            diffIndex={diffIndex}
          />
        </div>
        <BackToMenu
          mode="multiple-game"
          lang={settings.language}
          sound={settings.sound === 'true'}
        />
      </div>
    );
  }
}

export default MultiPlayer;
