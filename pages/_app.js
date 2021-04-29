import Head from 'next/head'
import Footer from '../components/Footer'
import Container from '@material-ui/core/Container';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GPX Storage</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Container component="main" maxWidth="xs">
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  )
}

export default MyApp
