import React from 'react';
import nookies from 'nookies';

import AuthorizationForm from '../components/Form/AuthorizationForm';

class Login extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { sound, language } = nookies.get(ctx);

    return {
      sound: sound === 'true',
      lang: language,
    };
  }

  render() {
    const { lang, sound } = this.props;

    return (
      <>
        <div className="logo" />
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
