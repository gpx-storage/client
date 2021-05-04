import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Footer from '../components/Footer'
import Container from '@material-ui/core/Container';
import { onActionMessage } from '../lib/window';
import '../styles/main.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    onActionMessage('authentication.unauthorized', () => {
      console.log('Redirecting to the login route...');
      router.push('/login');
    })
  }, [])
  
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
