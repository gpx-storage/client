import Link from 'next/link'
import Button from '@material-ui/core/Button'

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button variant="contained" color="primary">
        Login
      </Button>
    </Link>
  )
}