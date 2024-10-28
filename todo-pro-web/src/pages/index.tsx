import { type NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import LoginForm from '../components/LoginForm'
// import SocialLogin from '../components/SocialLogin'
import RegistrationForm from '../components/RegistrationForm'
import LoginRegister from '../components/LoginRegister'

interface ShowLogin {
  showLogin: boolean
}

const Home: NextPage = () => {
  const [display, setDisplay] = useState<ShowLogin>({ showLogin: true })

  return (
    <div className="flex items-start justify-center">
      <Head>
        <title>To-do Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="flex flex-col min-h-screen lg:flex-row max-w-7xl">
        <div className="flex flex-col p-8 lg:w-1/2">
          <div className="p-4 text-white">
            <h1 className="text-4xl">Welcome to To-do Pro</h1>
          </div>
          <div className="mt-4 w-full">
            <Image
              src="/todos.svg"
              alt="illustration"
              width="800"
              height="500"
              priority={true}
            />
          </div>
        </div>
        <div className="flex flex-col p-8 lg:w-1/2">
          <LoginRegister display={display} setDisplay={setDisplay} />
          <LoginForm display={display.showLogin} />
          <RegistrationForm display={!display.showLogin} />
          {/* <SocialLogin /> */}
        </div>
      </main>
    </div>
  )
}

export default Home
