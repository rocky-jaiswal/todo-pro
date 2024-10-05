import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import cookie from 'cookie'

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
      <Head>
        <title>Staffing Pro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <h2>Logging out ...</h2>
      </main>
    </>
  )
}

export default Logout
