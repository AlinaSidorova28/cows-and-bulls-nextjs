import React from 'react';
import Link from 'next/link';
import nookies from 'nookies';
import style from '../css/Statistics.module.scss';

import AuthorizationForm from '../components/Form/AuthorizationForm';
import textForGame from '../data/constants';

class Login extends React.PureComponent {
  static async getInitialProps(ctx) {
    const {
      sound,
      music,
      language,
      difficulty,
    } = nookies.get(ctx);

    return {
      sound,
      music,
      lang: language,
      difficulty,
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
          sound={sound === 'true'}
          focus
        />
      </>
    );
  }
}

export default Login;
