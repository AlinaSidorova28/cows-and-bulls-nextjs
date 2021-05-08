import React from 'react';
import nookies from 'nookies';
// import dbConnect from '../utils/dbConnect';
// import User from '../models/User';
// import Settings from '../models/Settings';
import Menu from '../components/Menu/Menu';

class HomePage extends React.PureComponent {
  static async getInitialProps(ctx) {
    // await dbConnect();

    // const anon = await User.find({});
    // const res = await Settings.find({});

    // ???????? User is not defined ??????????

    const settings = nookies.get(ctx);
    return { settings, lang: settings.language, sound: settings.sound };
  }

  render() {
    const { lang, sound } = this.props;

    return (
      <div className="App">
        <div className="logo" />
        <div className="login-icon" />
        <Menu lang={lang} sound={sound === 'true'} />
      </div>
    );
  }
}

export default HomePage;
