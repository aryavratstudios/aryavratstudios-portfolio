import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/jpg" href="/ARYVRAT-STUDIOS-LOGO.jpg" />
          <link rel="apple-touch-icon" href="/ARYVRAT-STUDIOS-LOGO.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;