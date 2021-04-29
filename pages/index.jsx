import Container from '@material-ui/core/Container'

import LoginButton from '../components/LoginButton'

export default function Home() {
  return (
    <main>
      <h1>
        Welcome to <a href="#">GPX Storage!</a>
      </h1>
      <div>
        <LoginButton />
      </div>
    </main>
  )
}
