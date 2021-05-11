import React from 'react';
import style from '../Form/Form.module.scss';

import Win from './Win';
import FormForGame from '../Form/FormForGame';
import generateNumber from '../../utils/generator';
import textForGame from '../../data/constants';

class SinglePlayer extends React.Component {
  constructor(props) {
    super(props);
    const { settings } = this.props;
    const diffIndex = textForGame[settings.language].settings.difficulty
      .indexOf(settings.difficulty);
    this.state = {
      number: generateNumber(diffIndex),
      attemptArray: [],
      attempts: 0,
      won: false,
      diffIndex,
    };
    this.updateWon = this.updateWon.bind(this);
    this.updateAttempts = this.updateAttempts.bind(this);
  }

  componentDidMount() {
    console.log(this.state.number);
  }

  updateWon() {
    this.setState({ won: true });
  }

  updateAttempts(value) {
    this.setState({ attempts: value });
  }

  render() {
    const {
      attemptArray,
      won,
      attempts,
      number,
      diffIndex,
    } = this.state;

    const { settings } = this.props;

    if (won) {
      return (
        <Win
          attempts={attempts}
          mode="single"
          lang={settings.language}
          sound={settings.sound}
          music={settings.music}
        />
      );
    }

    return (
      <div className={style['single-player-container']}>
        <FormForGame
          attemptArray={attemptArray}
          won={won}
          number={number}
          updateWon={this.updateWon}
          updateAttempts={this.updateAttempts}
          attempts={attempts}
          text={textForGame[settings.language].single.text}
          diffIndex={diffIndex}
          mode="single"
          lang={settings.language}
          sound={settings.sound}
          difficulty={settings.difficulty}
          inputId="input"
          focus
        />
      </div>
    );
  }
}

export default SinglePlayer;
