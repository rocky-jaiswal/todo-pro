import { type NextPage } from 'next'
import { useState } from 'react'

import Image from 'next/image'

import AppHeader from '../components/AppHeader'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'
import LoginRegister from '../components/LoginRegister'
// import SocialLogin from '../components/SocialLogin'

interface ShowLogin {
  showLogin: boolean
}

const Home: NextPage = () => {
  const [display, setDisplay] = useState<ShowLogin>({ showLogin: true })

  return (
    <div className="flex items-start justify-center">
      <AppHeader />
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
