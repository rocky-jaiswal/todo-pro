import { type ReactElement } from 'react'
import Head from 'next/head'

import TopBar from '../TopBar'

interface Props {
  page: ReactElement
}

function LoggedInLayout(props: Props) {
  return (
    <div className="flex items-start justify-center">
      <Head>
        <title>To-do Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="flex flex-col min-h-screen lg:w-9/12 max-w-7xl">
        <TopBar />
        <div className="flex h-full w-full grow flex-col lg:flex-row">
          <main role="main" className="flex grow flex-col p-6">
            {props.page}
          </main>
        </div>
      </div>
    </div>
  )
}

export default LoggedInLayout
