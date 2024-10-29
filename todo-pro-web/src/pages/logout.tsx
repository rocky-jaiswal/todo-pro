import type { GetServerSidePropsContext, NextPage } from 'next'
import cookie from 'cookie'

import AppHeader from '../components/AppHeader'

export function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      sameSite: 'strict',
    })
  )

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

const Logout: NextPage = () => {
  return (
    <>
      <AppHeader />
      <main className="flex">
        <h2>Logging out ...</h2>
      </main>
    </>
  )
}

export default Logout
