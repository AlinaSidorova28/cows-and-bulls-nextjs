/* eslint-disable class-methods-use-this */
import '../css/index.scss';
import nookies from 'nookies';
import App from 'next/app';
import Head from 'next/head';

import { verifyToken, getUserData } from '../utils/authControllers';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      if (!nookies.get(ctx).sound || !nookies.get(ctx).music
      || !nookies.get(ctx).language || !nookies.get(ctx).difficulty) {
        nookies.set(ctx, 'sound', true, { path: '/' });
        nookies.set(ctx, 'music', true, { path: '/' });
        nookies.set(ctx, 'language', 'en', { path: '/' });
        nookies.set(ctx, 'difficulty', 'medium', { path: '/' });
        ctx.req.headers.cookie = 'sound=true; music=true; language=en; difficulty=medium';
      }

      const { userName } = nookies.get(ctx);
      const data = verifyToken(ctx);

      if (data.authenticated) {
        const userSettings = await getUserData(data.user);
        pageProps.lang = userSettings.settings.language;
        pageProps.settings = userSettings.settings;
      } else if (userName) {
        const userSettings = await getUserData(userName);
        pageProps.lang = userSettings.settings.language;
        pageProps.settings = userSettings.settings;
      } else {
        pageProps.lang = nookies.get(ctx).language;
        const {
          sound,
          music,
          language,
          difficulty,
        } = nookies.get(ctx);
        pageProps.settings = {
          sound: sound === 'true',
          music: music === 'true',
          language,
          difficulty,
        };
      }
    }

    return { pageProps };
  }

  playAudio() {
    const audioElement = document.querySelector('video');
    audioElement.play();
  }

  componentDidUpdate() {
    const musicProp = this.props.pageProps.music || this.props.pageProps.settings.music;
    const audioElement = document.querySelector('video');
    audioElement.muted = !musicProp;
  }

  componentDidMount() {
    const musicProp = this.props.pageProps.music || this.props.pageProps.settings.music;
    if (musicProp) {
      document.body.addEventListener('mousedown', this.playAudio);
      document.body.addEventListener('touchstart', this.playAudio);
      document.body.addEventListener('keydown', this.playAudio);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Cows and bulls</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
