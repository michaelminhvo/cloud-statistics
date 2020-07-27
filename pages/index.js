import Head from 'next/head'
import Correlation from "../components/Correlation";

export default function Home() {
  return (
    <>
      <div className="container">
        <Head>
          <title>Cloud statistics</title>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-173559445-1`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-173559445-1', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>

        <main>
          <Correlation />
        </main>



        <style jsx global>{`
        html,
        body {
          padding: 15px;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      </div>
      <div style={{ "marginBottom": "30px", marginLeft: "9px" }}>
        <p>
          <a href="https://www.instagram.com/michaelminhvo/">
            <img style={{ height: "32px" }} src="/glyph-logo_May2016.png"></img></a>

          <a style={{ marginLeft: "16px" }} href="https://github.com/michaelminhvo/cloud-statistics/blob/master/README.md">
            <img src="/GitHub-Mark-32px.png" />
          </a>

        </p>
        <p>
        </p>
      </div>
    </>
  )
}
