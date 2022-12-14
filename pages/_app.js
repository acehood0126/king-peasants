import React, {useState, useEffect} from "react"
import Router from "next/router";
import Head from 'next/head'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Web3Provider } from "../shared/context/Web3";
import { ContractsProvider } from "../shared/context/Contracts";
import '../assets/styles/globals.scss'

library.add(fab, faEnvelope)

function MyApp({ Component, pageProps }) {
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    }
  }, [])

  return (
    <>
      <Head>
        <title>King and Peasant</title>
        <meta name="description" content="King and Peasant" />
        <link rel="icon" href="/icon.png" />
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <Web3Provider>
          <ContractsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ContractsProvider>
        </Web3Provider>
      )}
    </>
  )
}

export default MyApp
