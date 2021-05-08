import React from 'react';
import nookies from 'nookies';

import Link from 'next/link';
import settingsStyle from '../css/Settings.module.scss';
import formStyle from '../components/Form/Form.module.scss';

import InformativeForm from '../components/Form/InformativeForm';
import textForGame from '../data/constants';
import soundImage from '../public/img/sound.png';
import musicImage from '../public/img/music.png';
import bookImage from '../public/img/book.png';
import click from '../public/audio/click.mp3';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    const { settings } = this.props;

    this.state = {
      soundOn: settings.sound === 'true',
      musicOn: settings.music === 'true',
      lang: settings.language,
      level: textForGame[settings.language].settings.difficulty.indexOf(settings.difficulty),
      visible: false,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickHandlerMusic = this.onClickHandlerMusic.bind(this);
  }

  static async getInitialProps(ctx) {
    const settings = nookies.get(ctx);
    return { settings };
  }

  onClickHandler(e) {
    const { soundOn } = this.state;
    if (soundOn) {
      new Audio(click).play();
    }
    const newLang = e.target.innerHTML === 'en' ? 'ru' : 'en';
    this.setState({
      lang: newLang,
    });
  }

  onClickHandlerMusic() {
    const { musicOn, soundOn } = this.state;
    if (soundOn) {
      new Audio(click).play();
    }
    this.setState({ musicOn: !musicOn });
    const audioElement = document.querySelector('video');
    audioElement.muted = musicOn;
    audioElement.play();
  }

  render() {
    const {
      soundOn,
      musicOn,
      lang,
      level,
      visible,
    } = this.state;

    const content = (
      <>
        <div className={settingsStyle['line-wrapper']}>
          <div className={`${settingsStyle['sound-wrapper']} ${settingsStyle.left}`}>
            <div className={settingsStyle['settings-cell']}>
              <span className={formStyle.inscription}>
                {`${textForGame[lang].settings.words[0]}: `}
              </span>
              <div
                role="button"
                className={`${settingsStyle.icon} ${!soundOn ? settingsStyle.dull : ''}`}
                onClick={() => {
                  if (soundOn) {
                    new Audio(click).play();
                  }
                  this.setState({ soundOn: !soundOn });
                }}
              >
                <img
                  src={soundImage}
                  alt="sound"
                  width="30"
                />
              </div>
            </div>
            <div className={settingsStyle['settings-cell']}>
              <span className={formStyle.inscription}>
                {`${textForGame[lang].settings.words[2]}: `}
              </span>
              <div
                role="button"
                className={`${settingsStyle.icon} ${!musicOn ? settingsStyle.dull : ''}`}
                onClick={this.onClickHandlerMusic}
              >
                <img
                  src={musicImage}
                  alt="music"
                  width="30"
                />
              </div>
            </div>
          </div>

          <div className={`${settingsStyle['sound-wrapper']} ${settingsStyle.right}`}>
            <div className={settingsStyle['settings-cell']}>
              <span className={formStyle.inscription}>
                {`${textForGame[lang].settings.words[1]}: `}
              </span>
              <div
                className={settingsStyle.icon}
                role="button"
                onClick={this.onClickHandler}
              >
                {lang}
              </div>
            </div>
            <div className={settingsStyle['settings-cell']}>
              <span className={formStyle.inscription}>
                {`${textForGame[lang].settings.words[3]}: `}
              </span>
              <div
                role="button"
                className={`${settingsStyle.difficulty} ${!visible ? '' : settingsStyle.transparent}`}
                onClick={() => {
                  if (soundOn) {
                    new Audio(click).play();
                  }
                  this.setState({ visible: !visible });
                }}
              >
                {textForGame[lang].settings.difficulty[level]}
              </div>
              <ul className={`${settingsStyle.language} ${visible ? '' : settingsStyle.transparent}`}>
                {textForGame[lang].settings.difficulty.map((el, index) => (
                  <li
                    key={el}
                    role="button"
                    className={`${settingsStyle.li} ${el === textForGame[lang].settings.difficulty[level] ? settingsStyle.dull : ''}`}
                    onClick={() => {
                      if (soundOn) {
                        new Audio(click).play();
                      }
                      this.setState({ level: index, visible: !visible });
                    }}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={settingsStyle['sound-wrapper']}>
          <div className={settingsStyle['settings-cell']}>
            <span className={formStyle.inscription}>
              {`${textForGame[lang].settings.words[4]}: `}
            </span>
            <div className={settingsStyle.icon}>
              <Link href="/rules" as="rules">
                <img
                  role="button"
                  src={bookImage}
                  alt="book"
                  height="27"
                  width="35"
                  onClick={() => {
                    if (soundOn) {
                      new Audio(click).play();
                    }
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
    return (
      <>
        <div className="logo" />
        <div className="login-icon" />
        <div
          role="button"
          className={`${settingsStyle['click-background']} ${visible ? '' : settingsStyle.hidden}`}
          onClick={() => {
            this.setState({ visible: false });
          }}
        >
          click
        </div>
        <InformativeForm
          text={textForGame[lang].menu[3]}
          mode="settings"
          content={content}
          lang={lang}
          sound={soundOn}
          settings={{
            sound: soundOn,
            music: musicOn,
            language: lang,
            difficulty: textForGame[lang].settings.difficulty[level],
          }}
        />
      </>
    );
  }
}

export default Settings;
