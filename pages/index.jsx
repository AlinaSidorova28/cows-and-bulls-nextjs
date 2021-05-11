import React from 'react';
import nookies from 'nookies';
import { getUserData } from '../utils/authControllers';
import Menu from '../components/Menu/Menu';

class HomePage extends React.PureComponent {
  static async getInitialProps(ctx) {
    let { language, sound } = nookies.get(ctx);
    const { userName } = nookies.get(ctx);
    sound = sound === 'true';

    if (userName) {
      const { settings } = await getUserData(userName);
      sound = settings.sound;
      language = settings.language;
    }

    return {
      lang: language,
      sound,
    };
  }

  render() {
    const { lang, sound } = this.props;

    return (
      <div className="App">
        <div className="logo" />
        <div className="login-icon" />
        <Menu lang={lang} sound={sound} />
      </div>
    );
  }
}

export default HomePage;
