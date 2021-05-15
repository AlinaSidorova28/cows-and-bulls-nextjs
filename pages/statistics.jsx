import React from 'react';
import Link from 'next/link';
import nookies from 'nookies';
import style from '../css/Statistics.module.scss';

import { getUserData } from '../utils/authControllers';
import InformativeForm from '../components/Form/InformativeForm';
import Reset from '../components/Button/Reset';
import LoginDropdown from '../components/Menu/LoginDropdown';
import textForGame from '../data/constants';

class Statistics extends React.PureComponent {
  static async getInitialProps(ctx) {
    const {
      language,
      music,
      sound,
      difficulty,
      userName,
    } = nookies.get(ctx);
    let settings = {
      sound: sound === 'true',
      music: music === 'true',
      language,
      difficulty,
    };
    let statistics = null;

    if (userName) {
      const data = await getUserData(userName);
      settings = data.settings;
      statistics = data.statistics;
    }

    return {
      lang: settings.language,
      settings,
      statistics,
      userName,
    };
  }

  constructor(props) {
    super(props);

    const { statistics } = this.props;
    this.state = {
      isEmpty: statistics
        ? (!statistics.easy.length && !statistics.medium.length && !statistics.hard.length)
        : true,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(value) {
    this.setState({ isEmpty: value });
  }

  render() {
    const {
      lang,
      settings,
      statistics,
      userName,
    } = this.props;
    const { isEmpty } = this.state;

    let content;
    if (!userName) {
      content = (
        <div className={style['message-wrapper']}>
          <h3>
            {textForGame[lang].statistics.text[0]}
          </h3>
          <Link href="/login" as="login">
            {` ${textForGame[lang].statistics.text[1]}`}
          </Link>
        </div>
      );
    } else {
      let table;
      if (isEmpty) {
        table = (
          <h3>
            {textForGame[lang].statistics.text[2]}
            <Link href="/game/[mode]" as="game/single">
              {` "${textForGame[lang].rules.subtitle[0]}"`}
            </Link>
          </h3>
        );
      } else {
        table = (
          <table className={style['rate-table']}>
            <tbody>
              <tr className={!statistics.easy.length ? style.hidden : ''}>
                <th className={style['mode-name']} scope="col" colSpan="4">{textForGame[lang].settings.difficulty[0]}</th>
              </tr>
              <tr className={!statistics.easy.length ? style.hidden : ''}>
                <th scope="col">{textForGame[lang].statistics.columnNames[0]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[1]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[2]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[3]}</th>
              </tr>
              {statistics.easy.sort((a, b) => a.moves - b.moves).map((el, i) => (
                <tr key={`${userName}-${el.number}-${i + 1}`}>
                  <td>{i + 1}</td>
                  <td>{el.userName}</td>
                  <td>{el.moves}</td>
                  <td>{el.number}</td>
                </tr>
              ))}

              <tr className={!statistics.medium.length ? style.hidden : ''}>
                <th className={style['mode-name']} scope="col" colSpan="4">{textForGame[lang].settings.difficulty[1]}</th>
              </tr>
              <tr className={!statistics.medium.length ? style.hidden : ''}>
                <th scope="col">{textForGame[lang].statistics.columnNames[0]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[1]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[2]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[3]}</th>
              </tr>
              {statistics.medium.sort((a, b) => a.moves - b.moves).map((el, i) => (
                <tr key={`${userName}-${el.number}-${i + 1}`}>
                  <td>{i + 1}</td>
                  <td>{el.userName}</td>
                  <td>{el.moves}</td>
                  <td>{el.number}</td>
                </tr>
              ))}

              <tr className={!statistics.hard.length ? style.hidden : ''}>
                <th className={style['mode-name']} scope="col" colSpan="4">{textForGame[lang].settings.difficulty[2]}</th>
              </tr>
              <tr className={!statistics.hard.length ? style.hidden : ''}>
                <th scope="col">{textForGame[lang].statistics.columnNames[0]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[1]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[2]}</th>
                <th scope="col">{textForGame[lang].statistics.columnNames[3]}</th>
              </tr>
              {statistics.hard.sort((a, b) => a.moves - b.moves).map((el, i) => (
                <tr key={`${userName}-${el.number}-${i + 1}`}>
                  <td>{i + 1}</td>
                  <td>{el.userName}</td>
                  <td>{el.moves}</td>
                  <td>{el.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      content = (
        <>
          <div className={style['message-wrapper']}>
            {table}
          </div>
          {isEmpty ? <></> : (
            <Reset
              lang={lang}
              sound={settings.sound}
              onClickHandler={this.onClickHandler}
            />
          )}
        </>
      );
    }

    return (
      <>
        <div className="logo" />
        <LoginDropdown userName={userName} lang={lang} sound={settings.sound} />
        <InformativeForm
          text={textForGame[lang].menu[4]}
          mode="rules"
          content={content}
          lang={lang}
          sound={settings.sound}
        />
      </>
    );
  }
}

export default Statistics;
