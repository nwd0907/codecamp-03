import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink } from "@apollo/client";
import "antd/dist/antd.css";
import Layout from "../src/components/commons/layout";
import { createUploadLink } from 'apollo-upload-client'
import {AppProps} from 'next/app'

// @ts-ignore
function MyApp({ Component, pageProps }) {
  const uploadLink = createUploadLink({
    uri: "http://backend03.codebootcamp.co.kr/graphql",
  })

  const client = new ApolloClient({
    // @ts-ignore
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
