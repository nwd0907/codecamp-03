// import "../styles/globals.css";
import "antd/dist/antd.css";
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink } from "@apollo/client";
import Layout from "../src/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { initializeApp } from "firebase/app";
import { createUploadLink } from 'apollo-upload-client'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyB2AZodzgw35GmS8qlyy3Z22jFI3Du2GH8",
  authDomain: "codecamp-01.firebaseapp.com",
  projectId: "codecamp-01",
  storageBucket: "codecamp-01.appspot.com",
  messagingSenderId: "942230859112",
  appId: "1:942230859112:web:e84fd4c9702fec4af23add",
  measurementId: "G-KSYKS7SJCT",
});

function MyApp({ Component, pageProps }) {

  const uploadLink = createUploadLink({
    uri: "http://backend03.codebootcamp.co.kr/graphql",
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Global styles={globalStyles} />
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
