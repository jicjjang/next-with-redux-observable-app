import Link from 'next/link'
import { NextPage } from 'next';

const OtherPage: NextPage = () => (
  <div>
    <h1>Other Page</h1>
    <Link href="/">
      <a>Get back to "/"</a>
    </Link>
  </div>
)

export default OtherPage
