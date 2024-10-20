import { type NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import LoginForm from '../components/LoginForm'
import SocialLogin from '../components/SocialLogin'
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
        <title>Todo Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex flex-col lg:flex-row min-h-screen max-w-7xl">
        <div className="flex flex-col p-8 lg:w-1/2">
          <div className="p-4 text-white">
            <h1 className="text-4xl">Welcome to Todo Pro</h1>
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
          <hr />
          <SocialLogin />
        </div>
      </main>
    </div>
  )
}

export default Home
