import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'
class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang={BLOG.lang}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
          {BLOG.analytics && BLOG.analytics.provider === 'ackee' && (
            <script
              async
              src={BLOG.analytics.ackeeConfig.tracker}
              data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
              data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
            ></script>
          )}
          {BLOG.analytics && BLOG.analytics.provider === 'ga' && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
              page_path: window.location.pathname,
            });
          `
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
