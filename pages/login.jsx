import React from 'react';
import nookies from 'nookies';

import AuthorizationForm from '../components/Form/AuthorizationForm';
import { verifyToken, getUserData } from '../utils/authControllers';

class Login extends React.PureComponent {
  static async getInitialProps(ctx) {
    let { sound, language } = nookies.get(ctx);
    sound = sound === 'true';

    const data = verifyToken(ctx);
    if (data.authenticated) {
      const settings = await getUserData(data.user);
      sound = settings.sound;
      language = settings.language;
    }

    return {
      sound,
      lang: language,
    };
  }

  render() {
    const { lang, sound } = this.props;

    return (
      <>
        <div className="logo" />
        <div className="login-icon" />
        <AuthorizationForm
          inputId="login"
          mode="login"
          lang={lang}
          sound={sound}
          focus
        />
      </>
    );
  }
}

export default Login;
