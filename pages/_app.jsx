/* eslint-disable class-methods-use-this */
import '../css/index.scss';
import nookies from 'nookies';
import App from 'next/app';
import Head from 'next/head';

class MyApp extends App {
  // ?????? разница между initial и serverSide props ??????
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

      pageProps.lang = nookies.get(ctx).language;
      pageProps.settings = nookies.get(ctx);
    }

    return { pageProps };
  }

  playAudio() {
    const audioElement = document.querySelector('video');
    audioElement.play();
  }

  componentDidMount() {
    const musicProp = this.props.pageProps.music || this.props.pageProps.settings.music;
    if (musicProp === 'true') {
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
