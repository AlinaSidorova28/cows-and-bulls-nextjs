import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import music from '../public/audio/music.mp3';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="body">
          <video autoPlay loop style={{ display: 'none' }} muted={this.props.__NEXT_DATA__.props.pageProps.settings.music !== 'true'}>
            <source src={music} type="audio/mp3" />
          </video>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
