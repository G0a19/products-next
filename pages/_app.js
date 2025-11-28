import { Provider } from "react-redux"; //  Provider of the redux tool/kit
import store from "./../store/store";
import Head from "next/head";

import "../styles/_globals.scss";
import "../styles/layout/_header.module.scss";
import "../styles/layout/_footer.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>{process.env.siteName}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className="body">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
